// Runs the same Lighthouse audit locally that `.github/workflows/lighthouse.yml`
// runs on every pull request, so a failing gate can be reproduced without pushing.
//
// The site, the URL list and the thresholds all come from shared definitions —
// `scripts/lighthouse-server.mjs` and `lighthouserc.json` — so "all good" locally
// and "all good" in CI cannot drift into meaning different things.

import { spawn } from 'node:child_process';
import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

import { AUDIT_PATHS, DIST, ORIGIN, startServer } from './lighthouse-server.mjs';

const REPORTS = '.lighthouseci';

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

const startedAt = Date.now();

const lhci = spawn(
  'bunx',
  ['lhci', 'autorun', '--config=lighthouserc.json', ...AUDIT_PATHS.map((path) => `--collect.url=${ORIGIN}${path}`)],
  { stdio: 'inherit' },
);

const code = await new Promise((resolve) => lhci.on('close', resolve));

summarize(startedAt);

server.close();
process.exit(code ?? 1);
