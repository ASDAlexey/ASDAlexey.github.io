// Weight budget for the assembled GitHub Pages deploy.
//
// `angular.json` budgets cover JavaScript and component styles — everything the
// bundler owns. They say nothing about what actually travels to a visitor: images,
// PDFs, prerendered HTML, or the size of the deploy as a whole. A 4 MB screenshot
// dropped into `static/my-projects/` passes every other gate in this repository.
//
// Run after `bun run build && bun run assemble`:
//   bun run size
//
// Limits are deliberately close to the measured numbers — a budget with 3× headroom
// only fires after the regression has shipped. Raising one is a decision, so it wants
// a commit message.
import { appendFileSync, existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { gzipSync } from 'node:zlib';

const ROOT = 'dist/ngportfolio/browser';
const KB = 1024;
const MB = 1024 * KB;

// Re-measured on 8 Aug 2026, roughly 10% of headroom each. The comment after every limit is what
// it actually weighed that day, so the next person can see how much room a change has eaten.
//
// Two limits moved that day: the experience copy grew into the figures behind it, and the résumé
// gained the full core-skills table. That is content, not bloat, so the ceilings rose to keep
// their usual headroom rather than the content being cut to fit a number.
const BUDGETS = [
  { label: 'Deploy total', limit: 6.4 * MB, measure: () => dirSize(ROOT) }, // 5.73 MB
  { label: 'Locale bundle (en)', limit: 1.1 * MB, measure: () => dirSize(join(ROOT, 'en')) }, // 940 KB
  { label: 'Locale bundle (ru)', limit: 1.1 * MB, measure: () => dirSize(join(ROOT, 'ru')) }, // 985 KB
  { label: 'Screenshots', limit: 3.6 * MB, measure: () => dirSize(join(ROOT, 'my-projects')) }, // 3.20 MB
  { label: 'index.html (worst locale)', limit: 176 * KB, measure: () => worstIndexHtml() }, // 158 KB
  { label: 'main.js gzipped (worst locale)', limit: 64 * KB, measure: () => worstMainJsGzip() }, // 55 KB
  { label: 'og-image.png', limit: 56 * KB, measure: () => fileSize(join(ROOT, 'og-image.png')) }, // 41 KB
  // Only the two designed PDFs are deployed. The plain single-column pair for job boards is built
  // beside them into content/resume-ats/ and never reaches dist, so it is not measured here.
  { label: 'Résumé PDFs', limit: 700 * KB, measure: () => resumeSize() }, // 629 KB
];

function dirSize(dir) {
  if (!existsSync(dir)) {
    return 0;
  }

  let total = 0;

  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);

    total += entry.isDirectory() ? dirSize(path) : statSync(path).size;
  }

  return total;
}

function fileSize(path) {
  return existsSync(path) ? statSync(path).size : 0;
}

function worstIndexHtml() {
  return Math.max(fileSize(join(ROOT, 'en', 'index.html')), fileSize(join(ROOT, 'ru', 'index.html')));
}

function worstMainJsGzip() {
  const gzipped = ['en', 'ru'].flatMap((locale) => {
    const dir = join(ROOT, locale);

    if (!existsSync(dir)) {
      return [];
    }

    return readdirSync(dir)
      .filter((name) => /^main-.*\.js$/.test(name))
      .map((name) => gzipSync(readFileSync(join(dir, name))).length);
  });

  return gzipped.length > 0 ? Math.max(...gzipped) : 0;
}

function resumeSize() {
  return readdirSync(ROOT)
    .filter((name) => name.endsWith('.pdf'))
    .reduce((total, name) => total + fileSize(join(ROOT, name)), 0);
}

function format(bytes) {
  return bytes >= MB ? `${(bytes / MB).toFixed(2)} MB` : `${Math.round(bytes / KB)} KB`;
}

if (!existsSync(ROOT)) {
  console.error(`✗ ${ROOT} not found. Run "bun run build && bun run assemble" first.`);
  process.exit(1);
}

const results = BUDGETS.map((budget) => {
  const actual = budget.measure();

  return { ...budget, actual, over: actual > budget.limit, used: actual / budget.limit };
});

const rows = results.map(
  (result) =>
    `| ${result.over ? '✗' : '✓'} | ${result.label} | ${format(result.actual)} | ${format(result.limit)} | ${Math.round(result.used * 100)}% |`,
);

const table = ['| | Budget | Actual | Limit | Used |', '| --- | --- | ---: | ---: | ---: |', ...rows].join('\n');

console.info(table);

if (process.env.GITHUB_STEP_SUMMARY) {
  appendFileSync(process.env.GITHUB_STEP_SUMMARY, `### Weight budget\n\n${table}\n`);
}

const breached = results.filter((result) => result.over);

if (breached.length > 0) {
  console.error(`\n✗ Over budget: ${breached.map((result) => `${result.label} (+${format(result.actual - result.limit)})`).join(', ')}`);
  process.exit(1);
}

console.info('\n✓ Every budget respected');
