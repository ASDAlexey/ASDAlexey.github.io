#!/usr/bin/env bash
# Regenerate the styled résumé PDFs (EN + RU) into public/.
# Usage: bash scripts/resume/render.sh
set -euo pipefail

DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT="$(cd "$DIR/../.." && pwd)"
CHROME="${CHROME:-/Applications/Google Chrome.app/Contents/MacOS/Google Chrome}"

node "$DIR/build.mjs"

# Portable across the stock macOS bash 3.2 (no associative arrays).
for L in en ru; do
  if [ "$L" = "en" ]; then OUT="Alexey-Popov-Resume.pdf"; else OUT="Alexey-Popov-Resume-ru.pdf"; fi
  TMP="$(mktemp -d)"
  "$CHROME" --headless --disable-gpu --no-pdf-header-footer --user-data-dir="$TMP" \
    --print-to-pdf="$ROOT/public/$OUT" --virtual-time-budget=8000 \
    "file://$DIR/resume.$L.html"
  rm -rf "$TMP"
  echo "✓ public/$OUT"
done
