// Runs the same Lighthouse audit locally that `.github/workflows/lighthouse.yml`
// runs on every pull request, so a failing gate can be reproduced without pushing.
//
// The site, the URL list and the thresholds all come from shared definitions —
// `scripts/lighthouse-server.mjs` and `lighthouserc.json` — so "all good" locally
// and "all good" in CI cannot drift into meaning different things.

import { spawn } from 'node:child_process';

import { AUDIT_PATHS, DIST, ORIGIN, startServer } from './lighthouse-server.mjs';

const server = await startServer().catch((error) => {
  console.error(`ERROR: ${error.message}`);
  process.exit(1);
});

console.log(`Serving ${DIST} on ${ORIGIN}`);

const lhci = spawn(
  'bunx',
  ['lhci', 'autorun', '--config=lighthouserc.json', ...AUDIT_PATHS.map((path) => `--collect.url=${ORIGIN}${path}`)],
  { stdio: 'inherit' },
);

const code = await new Promise((resolve) => lhci.on('close', resolve));

server.close();
process.exit(code ?? 1);
