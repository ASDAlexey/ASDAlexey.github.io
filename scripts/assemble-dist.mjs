// Assembles the GitHub Pages site root after `ng build --localize`.
//
// Adds: the shared asset tree (`static/`), the root language-redirect (index.html +
// 404.html), robots.txt, sitemap.xml (with today's lastmod), the favicon and .nojekyll.
//
// Why `static/` exists at all: `ng build --localize` runs the asset glob once per
// locale, so anything under `public/` is written into both `/en/` and `/ru/`. That is
// right for what a locale owns (favicon, fonts, avatars) and pure waste for what both
// locales share — screenshots, résumé PDFs, the OG image. Those live in `static/`, are
// copied here exactly once, and are referenced root-absolutely (`/my-projects/…`).
//
// The site is served from the domain root (asdalexey.github.io). If it ever moves into
// a subfolder, those root-absolute references are what will break — it would need a
// `<base href>`-aware helper then.
import { cpSync, existsSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const ROOT = 'dist/ngportfolio/browser';

if (!existsSync(ROOT)) {
  console.error(`✗ Build output not found at ${ROOT}. Run "bun run build" first.`);
  process.exit(1);
}

const today = new Date().toISOString().slice(0, 10);

cpSync('static', ROOT, { recursive: true, filter: (source) => !source.endsWith('.DS_Store') });

const sitemap = readFileSync('seo/sitemap.xml', 'utf8').split('{{LASTMOD}}').join(today);
writeFileSync(join(ROOT, 'sitemap.xml'), sitemap);

cpSync('seo/robots.txt', join(ROOT, 'robots.txt'));

const redirect = readFileSync('seo/redirect.html', 'utf8');
writeFileSync(join(ROOT, 'index.html'), redirect);
writeFileSync(join(ROOT, '404.html'), redirect);

cpSync('public/favicon.svg', join(ROOT, 'favicon.svg'));

writeFileSync(join(ROOT, '.nojekyll'), '');

console.log(`✓ Assembled GitHub Pages site root in ${ROOT} (lastmod ${today})`);
