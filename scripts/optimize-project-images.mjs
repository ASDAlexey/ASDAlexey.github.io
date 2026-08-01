/**
 * Project-gallery pipeline.
 *
 * Walks `static/my-projects/<slug>/<locale>/`, re-encodes every raster it finds into AVIF + WebP
 * (a full-size slide and a narrow thumb for the card tile), drops the heavy sources, and writes a
 * typed manifest the app reads at runtime.
 *
 * The manifest — not the component — resolves the locale fallback: a project shot only in Russian
 * still has a gallery in the English build, and vice versa. Doing it here keeps the runtime dumb
 * and keeps the fallback visible in a file a human can read.
 *
 *   bun run images:projects
 */

import { readdir, readFile, rm, writeFile } from 'node:fs/promises';
import { basename, extname, join } from 'node:path';

import sharp from 'sharp';

const ROOT = new URL('..', import.meta.url).pathname;
// `static/`, not `public/`: the screenshots are identical in both locales, so they are copied to
// the site root once by scripts/assemble-dist.mjs instead of into `/en/` and `/ru/` by the asset
// glob. That is also why every path in the manifest below is root-absolute.
const MEDIA_DIR = join(ROOT, 'static/my-projects');
const MANIFEST = join(ROOT, 'src/app/shared/data/project-gallery.generated.ts');

const LOCALES = ['en', 'ru'];
const RASTER = new Set(['.png', '.jpg', '.jpeg', '.webp']);
const VECTOR = new Set(['.svg']);

/** Slides are capped rather than served at retina-phone resolution — nobody pinch-zooms a lightbox. */
const SLIDE_WIDTH = 1200;
const THUMB_WIDTH = 400;

const AVIF = { quality: 52, effort: 6 };
const WEBP = { quality: 80, effort: 6 };

/** ` segment.png` and `1-stopwatch.png` have to come out as URLs, not as bug reports. */
function slugify(name) {
  return basename(name, extname(name))
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

/** `10.webp` sorts after `9.webp`, and `1-stopwatch` still leads the list it was numbered for. */
function byNaturalOrder(a, b) {
  return a.localeCompare(b, 'en', { numeric: true, sensitivity: 'base' });
}

async function listLocaleDir(dir) {
  try {
    const entries = await readdir(dir, { withFileTypes: true });

    return entries
      .filter((entry) => entry.isFile() && !entry.name.startsWith('.'))
      .map((entry) => entry.name)
      .sort(byNaturalOrder);
  } catch {
    return [];
  }
}

async function encode(input, outDir, slug) {
  const image = sharp(input, { animated: false }).rotate();
  const meta = await image.metadata();

  const width = Math.min(meta.width ?? SLIDE_WIDTH, SLIDE_WIDTH);
  const slide = image.clone().resize({ width, withoutEnlargement: true });
  const thumb = image.clone().resize({ width: Math.min(THUMB_WIDTH, width), withoutEnlargement: true });

  const targets = [
    [`${slug}.avif`, slide.clone().avif(AVIF)],
    [`${slug}.webp`, slide.clone().webp(WEBP)],
    [`${slug}-thumb.avif`, thumb.clone().avif(AVIF)],
    [`${slug}-thumb.webp`, thumb.clone().webp(WEBP)],
  ];

  await Promise.all(targets.map(([name, pipeline]) => pipeline.toFile(join(outDir, name))));

  const height = Math.round(((meta.height ?? 1) * width) / (meta.width ?? 1));

  return { width, height };
}

async function buildLocale(slug, locale) {
  const dir = join(MEDIA_DIR, slug, locale);
  const files = await listLocaleDir(dir);

  if (!files.length) {
    return [];
  }

  // A previous run's output is a source for the next one otherwise: `1.webp` would re-encode into
  // itself and `1-thumb.webp` would become a slide of its own.
  const sources = files.filter((name) => !name.includes('-thumb.') && !name.endsWith('.avif'));
  const slides = [];

  for (const name of sources) {
    const ext = extname(name).toLowerCase();
    const path = join(dir, name);
    const id = slugify(name);
    const base = `/my-projects/${slug}/${locale}/${id}`;

    if (VECTOR.has(ext)) {
      const svg = await readFile(path);
      const meta = await sharp(svg).metadata();

      slides.push({
        id,
        src: `${base}${ext}`,
        thumb: `${base}${ext}`,
        width: meta.width ?? 1200,
        height: meta.height ?? 630,
        vector: true,
      });

      continue;
    }

    if (!RASTER.has(ext)) {
      continue;
    }

    // Already converted on an earlier run: a `.webp` that has an `.avif` twin is this script's own
    // output. Re-encoding it would re-compress a lossy file every time the manifest is rebuilt.
    if (files.includes(`${id}.avif`)) {
      const meta = await sharp(join(dir, `${id}.avif`)).metadata();

      slides.push({
        id,
        src: `${base}.avif`,
        thumb: `${base}-thumb.avif`,
        width: meta.width ?? SLIDE_WIDTH,
        height: meta.height ?? SLIDE_WIDTH,
        vector: false,
      });

      continue;
    }

    // Read first, then delete: sharp streams from the path, and an in-place `1.webp` → `1.webp`
    // would otherwise be writing into the file it is still reading.
    const buffer = await readFile(path);
    const { width, height } = await encode(buffer, dir, id);

    if (`${id}${ext}` !== name || ext !== '.webp') {
      await rm(path);
    }

    slides.push({ id, src: `${base}.avif`, thumb: `${base}-thumb.avif`, width, height, vector: false });
  }

  return slides;
}

// One slide per line — the file is read by a human only when something looks wrong, and forty
// screenshots spread over six lines each is five hundred lines of punctuation.
function serialise(slides) {
  const rows = slides.map(
    (slide) =>
      `      { id: '${slide.id}', src: '${slide.src}', thumb: '${slide.thumb}', ` +
      `width: ${slide.width}, height: ${slide.height}, vector: ${slide.vector} },`,
  );

  return rows.length ? `[\n${rows.join('\n')}\n    ]` : '[]';
}

async function main() {
  const projects = (await readdir(MEDIA_DIR, { withFileTypes: true }))
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort(byNaturalOrder);

  const manifest = [];

  for (const slug of projects) {
    const shot = {};

    for (const locale of LOCALES) {
      shot[locale] = await buildLocale(slug, locale);
    }

    // The fallback, resolved once here: a gallery shot only in one language is still a gallery in
    // the other build. An English reader sees the Russian screenshots rather than an empty card.
    for (const locale of LOCALES) {
      if (!shot[locale].length) {
        shot[locale] = shot[LOCALES.find((other) => other !== locale)] ?? [];
      }
    }

    if (shot.en.length || shot.ru.length) {
      manifest.push([slug, shot]);
      console.log(`${slug}: en ${shot.en.length}, ru ${shot.ru.length}`);
    }
  }

  const body = manifest
    .map(([slug, shot]) => `  '${slug}': {\n    en: ${serialise(shot.en)},\n    ru: ${serialise(shot.ru)},\n  },`)
    .join('\n');

  const file =
    `// GENERATED by scripts/optimize-project-images.mjs — do not edit by hand.\n` +
    `// Re-run \`bun run images:projects\` after adding or replacing screenshots.\n\n` +
    `import { ProjectGallery } from '@core/models/portfolio.interface';\n\n` +
    `export const PROJECT_GALLERIES: Readonly<Record<string, ProjectGallery>> = {\n${body}\n};\n`;

  await writeFile(MANIFEST, file);
  console.log(`\nmanifest → ${MANIFEST}`);
}

await main();
