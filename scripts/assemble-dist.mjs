// Assembles the GitHub Pages site root after `ng build --localize`.
// Adds: root language-redirect (index.html + 404.html), robots.txt,
// sitemap.xml (with today's lastmod), og-image, favicon, .nojekyll.
import { cpSync, existsSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const ROOT = 'dist/ngportfolio/browser';

if (!existsSync(ROOT)) {
  console.error(`✗ Build output not found at ${ROOT}. Run "bun run build" first.`);
  process.exit(1);
}

const today = new Date().toISOString().slice(0, 10);

const sitemap = readFileSync('seo/sitemap.xml', 'utf8').split('{{LASTMOD}}').join(today);
writeFileSync(join(ROOT, 'sitemap.xml'), sitemap);

cpSync('seo/robots.txt', join(ROOT, 'robots.txt'));

const redirect = readFileSync('seo/redirect.html', 'utf8');
writeFileSync(join(ROOT, 'index.html'), redirect);
writeFileSync(join(ROOT, '404.html'), redirect);

cpSync('public/og-image.png', join(ROOT, 'og-image.png'));
cpSync('public/favicon.svg', join(ROOT, 'favicon.svg'));

writeFileSync(join(ROOT, '.nojekyll'), '');

console.log(`✓ Assembled GitHub Pages site root in ${ROOT} (lastmod ${today})`);
