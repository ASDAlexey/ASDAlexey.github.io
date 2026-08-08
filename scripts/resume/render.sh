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

# How long Chrome gets before it is assumed hung. It has been seen to write the PDF and then
# never exit — which, printing straight into static/, left a half-shrunk file over the committed
# one. Hence both the watchdog and the staging file below.
CHROME_TIMEOUT=90

# The plain single-column variants are for job boards and ATS uploads, so they deliberately do
# not go to static/: they are not part of the site, and putting them there would push the deploy
# budget up for two files no visitor ever opens.
ATS_DIR="$ROOT/content/resume-ats"
mkdir -p "$ATS_DIR"

# `print SOURCE_HTML DEST_PDF` — renders one PDF, leaving DEST untouched unless the run produced
# a real one. Portable across the stock macOS bash 3.2 (no associative arrays).
print_pdf() {
  local src="$1" dest="$2"
  local tmp stage
  tmp="$(mktemp -d)"
  stage="$tmp/out.pdf"

  # `--headless=new` is the mode that actually exits after --print-to-pdf; the old one is what
  # hangs. The watchdog stays anyway, so a hang costs a minute and an error, not a broken file.
  "$CHROME" --headless=new --disable-gpu --no-pdf-header-footer --user-data-dir="$tmp/profile" \
    --print-to-pdf="$stage" --virtual-time-budget=8000 "file://$src" &
  local chrome_pid=$!

  (sleep "$CHROME_TIMEOUT"; kill "$chrome_pid" 2>/dev/null) &
  local watchdog=$!

  wait "$chrome_pid" 2>/dev/null || true
  kill "$watchdog" 2>/dev/null || true

  # Only a plausible PDF replaces the committed one — a killed Chrome leaves nothing or a stub.
  if [ ! -s "$stage" ] || [ "$(head -c 4 "$stage")" != "%PDF" ]; then
    rm -rf "$tmp"
    echo "✗ $(basename "$dest") — Chrome produced no usable PDF (hung or failed); the existing one is untouched" >&2
    return 1
  fi

  shrink "$stage"
  mv "$stage" "$dest"
  rm -rf "$tmp"
  echo "✓ ${dest#"$ROOT"/} ($(du -h "$dest" | cut -f1))"
}

for L in en ru; do
  if [ "$L" = "en" ]; then OUT="Alexey-Popov-Resume.pdf"; else OUT="Alexey-Popov-Resume-ru.pdf"; fi
  print_pdf "$DIR/resume.$L.html" "$ROOT/static/$OUT" || exit 1
  print_pdf "$DIR/resume.$L.ats.html" "$ATS_DIR/${OUT%.pdf}-ATS.pdf" || exit 1
done
