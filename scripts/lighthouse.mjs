// Runs the same Lighthouse audit locally that `.github/workflows/lighthouse.yml`
// runs on every pull request, so a failing gate can be reproduced without pushing.
//
// The site, the URL list and the thresholds all come from shared definitions —
// `scripts/lighthouse-server.mjs` and `lighthouserc.json` — so "all good" locally
// and "all good" in CI cannot drift into meaning different things.
//
// The one deliberate difference is the browser: locally the audit prefers
// `chrome-headless-shell` (see `resolveChrome`), which scores performance a point
// or two above the full Chrome CI runs on. Every other category is identical, and
// `LH_FULL_CHROME=1` drops back to the browser CI uses.

import { spawn } from 'node:child_process';
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { homedir } from 'node:os';
import { join } from 'node:path';

import { AUDIT_PATHS, DIST, ORIGIN, startServer } from './lighthouse-server.mjs';

const REPORTS = '.lighthouseci';

const HEADLESS_SHELL_CACHE = join(homedir(), '.cache', 'puppeteer', 'chrome-headless-shell');

/**
 * Picks the browser the audit drives.
 *
 * Chrome still registers a macOS app — and so takes a Dock icon — under
 * `--headless=new`, which makes a local run feel like it hijacks the desktop.
 * `chrome-headless-shell` has no UI layer at all and stays invisible. It also
 * scores a point or two higher on performance than the full browser CI gates
 * on, so `LH_FULL_CHROME=1` opts back into reproducing the CI number exactly.
 *
 * Install the shell with `bunx @puppeteer/browsers install chrome-headless-shell@stable`.
 */
function resolveChrome() {
  if (process.env.CHROME_PATH) {
    return process.env.CHROME_PATH;
  }

  if (process.env.LH_FULL_CHROME || !existsSync(HEADLESS_SHELL_CACHE)) {
    return undefined;
  }

  // Newest build first — the cache keeps every version ever downloaded.
  const builds = readdirSync(HEADLESS_SHELL_CACHE).sort((a, b) => b.localeCompare(a, undefined, { numeric: true }));

  for (const build of builds) {
    for (const platform of readdirSync(join(HEADLESS_SHELL_CACHE, build))) {
      const binary = join(HEADLESS_SHELL_CACHE, build, platform, 'chrome-headless-shell');

      if (existsSync(binary)) {
        return binary;
      }
    }
  }

  return undefined;
}

/** Reads the reports this run produced — the filenames carry the collection timestamp. */
function reportsSince(startedAt) {
  return readdirSync(REPORTS)
    .map((name) => /^lhr-(\d+)\.json$/.exec(name))
    .filter((match) => match && Number(match[1]) >= startedAt)
    .map((match) => JSON.parse(readFileSync(join(REPORTS, match[0]), 'utf8')));
}

/** Prints the category scores per URL, so the numbers are readable without opening the HTML report. */
function summarize(startedAt) {
  const reports = reportsSince(startedAt);
  if (reports.length === 0) {
    return;
  }

  const byUrl = new Map();
  for (const report of reports) {
    const path = new URL(report.finalUrl).pathname;
    const scores = byUrl.get(path) ?? new Map();

    for (const category of Object.values(report.categories)) {
      scores.set(category.title, [...(scores.get(category.title) ?? []), Math.round(category.score * 100)]);
    }

    byUrl.set(path, scores);
  }

  console.log('');
  for (const [path, scores] of byUrl) {
    const line = [...scores]
      // The median run is the one Lighthouse itself reports as representative.
      .map(([title, runs]) => `${title} ${runs.sort((a, b) => a - b)[Math.floor(runs.length / 2)]}`)
      .join('   ');

    console.log(`${path.padEnd(6)} ${line}`);
  }
}

const server = await startServer().catch((error) => {
  console.error(`ERROR: ${error.message}`);
  process.exit(1);
});

console.log(`Serving ${DIST} on ${ORIGIN}`);

const chrome = resolveChrome();

console.log(chrome ? `Browser ${chrome}` : 'Browser installed Chrome (CI parity, takes a Dock icon)');

const startedAt = Date.now();

const lhci = spawn(
  'bunx',
  ['lhci', 'autorun', '--config=lighthouserc.json', ...AUDIT_PATHS.map((path) => `--collect.url=${ORIGIN}${path}`)],
  { stdio: 'inherit', env: chrome ? { ...process.env, CHROME_PATH: chrome } : process.env },
);

const code = await new Promise((resolve) => lhci.on('close', resolve));

summarize(startedAt);

server.close();
process.exit(code ?? 1);
