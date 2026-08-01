// Serves the built site the way GitHub Pages serves it, for Lighthouse to audit.
//
// Plain static files, no dev server and no framework in the loop — but gzipped,
// because Pages gzips text responses too. A server that skipped compression would
// hand the audit a "uses-text-compression" opportunity worth hundreds of KiB that
// production never pays, and the performance score would be wrong by ~20 points in
// the pessimistic direction. Both `bun run lighthouse` and the CI workflow use this
// module so the local number and the CI number mean the same thing.
//
// Run directly (`node scripts/lighthouse-server.mjs`) to serve until killed; import
// `startServer` to own the lifetime yourself.

import { createReadStream, existsSync } from 'node:fs';
import { stat } from 'node:fs/promises';
import { createServer } from 'node:http';
import { extname, join, normalize } from 'node:path';
import { createGzip } from 'node:zlib';

export const DIST = 'dist/ngportfolio/browser';
export const PORT = Number(process.env.LIGHTHOUSE_PORT ?? 8080);
export const ORIGIN = `http://127.0.0.1:${PORT}`;

/** The pages to audit — one route, two locales. */
export const AUDIT_PATHS = ['/en/', '/ru/'];

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
  '.xml': 'application/xml; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
};

const COMPRESSIBLE = new Set(['.html', '.js', '.css', '.json', '.svg', '.xml', '.txt']);

/** Resolves a request path to a file inside DIST, or null if it escapes the root or is missing. */
async function resolveFile(urlPath) {
  const decoded = decodeURIComponent(urlPath.split('?')[0]);
  const relative = normalize(decoded).replace(/^(\.\.[/\\])+/, '');
  let candidate = join(DIST, relative);

  try {
    if ((await stat(candidate)).isDirectory()) {
      candidate = join(candidate, 'index.html');
    }
  } catch {
    return null;
  }

  return existsSync(candidate) ? candidate : null;
}

function handle(request, response) {
  resolveFile(request.url ?? '/').then((file) => {
    if (!file) {
      response.writeHead(404, { 'content-type': 'text/plain; charset=utf-8' });
      response.end('Not found');
      return;
    }

    const gzip = COMPRESSIBLE.has(extname(file)) && (request.headers['accept-encoding'] ?? '').includes('gzip');

    response.writeHead(200, {
      'content-type': MIME[extname(file)] ?? 'application/octet-stream',
      'cache-control': 'no-store',
      ...(gzip ? { 'content-encoding': 'gzip', vary: 'Accept-Encoding' } : {}),
    });

    const body = createReadStream(file);
    if (gzip) {
      body.pipe(createGzip()).pipe(response);
    } else {
      body.pipe(response);
    }
  });
}

/** Starts the server on PORT, rejecting if DIST is missing or the port is taken. */
export async function startServer() {
  if (!existsSync(DIST)) {
    throw new Error(`${DIST} not found — run \`bun run build:gh\` first.`);
  }

  const server = createServer(handle);

  await new Promise((resolve, reject) => {
    server.once('error', reject);
    server.listen(PORT, '127.0.0.1', resolve);
  });

  return server;
}

if (import.meta.filename === process.argv[1]) {
  await startServer();
  console.log(`Serving ${DIST} on ${ORIGIN}`);
}
