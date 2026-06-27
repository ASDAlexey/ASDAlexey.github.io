#!/usr/bin/env bash
# Regenerate the styled résumé PDFs (EN + RU) into public/.
# Usage: bash scripts/resume/render.sh
set -euo pipefail

DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT="$(cd "$DIR/../.." && pwd)"
CHROME="${CHROME:-/Applications/Google Chrome.app/Contents/MacOS/Google Chrome}"

node "$DIR/build.mjs"

declare -A OUT=([en]="Alexey-Popov-Resume.pdf" [ru]="Alexey-Popov-Resume-ru.pdf")
for L in en ru; do
  TMP="$(mktemp -d)"
  "$CHROME" --headless --disable-gpu --no-pdf-header-footer --user-data-dir="$TMP" \
    --print-to-pdf="$ROOT/public/${OUT[$L]}" --virtual-time-budget=8000 \
    "file://$DIR/resume.$L.html"
  rm -rf "$TMP"
  echo "✓ public/${OUT[$L]}"
done
