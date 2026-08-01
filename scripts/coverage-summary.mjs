// Turns coverage/coverage-summary.json into a line for the log and a table for the
// GitHub job summary, so a run's coverage is readable without downloading an artifact.
//
// The threshold itself is enforced by Vitest (`vitest-base.config.ts`, 100% on every
// metric) — this script only reports. It prints the weakest metric first because that
// is the number worth arguing about.
import { appendFileSync, existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

const COVERAGE_DIR = 'coverage';
const METRICS = ['statements', 'branches', 'functions', 'lines'];

// The Angular unit-test builder writes into `coverage/<project>/`, not `coverage/` — and the
// project name is not this script's business to know.
function findSummary(dir) {
  if (!existsSync(dir)) {
    return null;
  }

  const direct = join(dir, 'coverage-summary.json');

  if (existsSync(direct)) {
    return direct;
  }

  for (const entry of readdirSync(dir)) {
    const path = join(dir, entry);

    if (statSync(path).isDirectory()) {
      const found = findSummary(path);

      if (found) {
        return found;
      }
    }
  }

  return null;
}

const summaryPath = findSummary(COVERAGE_DIR);

if (!summaryPath) {
  console.error(`✗ No coverage-summary.json under ${COVERAGE_DIR}/ — is "json-summary" still in coverageReporters?`);
  process.exit(1);
}

const { total } = JSON.parse(readFileSync(summaryPath, 'utf8'));

if (!total) {
  console.error(`✗ No "total" section in ${summaryPath}`);
  process.exit(1);
}

const measured = METRICS.filter((metric) => typeof total[metric]?.pct === 'number');
const weakest = measured.reduce((min, metric) => (total[metric].pct < total[min].pct ? metric : min), measured[0]);

console.info(`Minimum coverage (${weakest}): ${total[weakest].pct.toFixed(2)}%`);

if (process.env.GITHUB_STEP_SUMMARY) {
  const rows = measured.map(
    (metric) => `| ${metric} | ${total[metric].pct.toFixed(2)}% | ${total[metric].covered}/${total[metric].total} |`,
  );
  const table = ['| Metric | Covered | Ratio |', '| --- | ---: | ---: |', ...rows].join('\n');

  appendFileSync(process.env.GITHUB_STEP_SUMMARY, `### Coverage\n\n${table}\n`);
}
