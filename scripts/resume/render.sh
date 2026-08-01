#!/usr/bin/env bash
# Regenerate the styled résumé PDFs (EN + RU) into static/.
# Usage: bash scripts/resume/render.sh
set -euo pipefail

DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT="$(cd "$DIR/../.." && pwd)"
CHROME="${CHROME:-/Applications/Google Chrome.app/Contents/MacOS/Google Chrome}"

node "$DIR/build.mjs"

# Chrome's print-to-PDF embeds a whole font for every family it touched, which is how a
# two-page text document reaches half a megabyte. Ghostscript re-embeds them as subsets.
# Images are left alone on purpose (`-dDownsample*=false`, Flate instead of JPEG): the
# résumé is dark with soft gradients, and JPEG would band them for nothing — measured,
# the fonts are the entire difference (255 KB either way).
shrink() {
  local file="$1"

  if ! command -v gs >/dev/null 2>&1; then
    echo "! ghostscript not found — skipping font subsetting for $(basename "$file")"
    return 0
  fi

  local tmp="${file}.shrunk"

  gs -q -dNOPAUSE -dBATCH -dSAFER \
    -sDEVICE=pdfwrite -dCompatibilityLevel=1.7 \
    -dSubsetFonts=true -dEmbedAllFonts=true -dDetectDuplicateImages=true \
    -dDownsampleColorImages=false -dDownsampleGrayImages=false -dDownsampleMonoImages=false \
    -dAutoFilterColorImages=false -dColorImageFilter=/FlateEncode \
    -dAutoFilterGrayImages=false -dGrayImageFilter=/FlateEncode \
    -sOutputFile="$tmp" "$file"

  mv "$tmp" "$file"
}

# Portable across the stock macOS bash 3.2 (no associative arrays).
for L in en ru; do
  if [ "$L" = "en" ]; then OUT="Alexey-Popov-Resume.pdf"; else OUT="Alexey-Popov-Resume-ru.pdf"; fi
  TMP="$(mktemp -d)"
  "$CHROME" --headless --disable-gpu --no-pdf-header-footer --user-data-dir="$TMP" \
    --print-to-pdf="$ROOT/static/$OUT" --virtual-time-budget=8000 \
    "file://$DIR/resume.$L.html"
  rm -rf "$TMP"
  shrink "$ROOT/static/$OUT"
  echo "✓ static/$OUT ($(du -h "$ROOT/static/$OUT" | cut -f1))"
done
