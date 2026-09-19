#!/usr/bin/env bash
# Render scripts/og-card.html to public/images/og-image.png at 1200×630.
# Headless Chrome so `ui-serif` resolves to New York, the way it does on the
# site itself — ImageMagick and rsvg cannot see Apple's system UI faces.
set -euo pipefail
cd "$(dirname "$0")/.."
CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
OUT="public/images/og-image.png"
"$CHROME" --headless --disable-gpu --hide-scrollbars \
  --screenshot="$PWD/$OUT" --window-size=1200,630 --default-background-color=00000000 \
  "file://$PWD/scripts/og-card.html" >/dev/null 2>&1
magick "$OUT" -strip -quality 92 "$OUT"
echo "wrote $OUT ($(magick "$OUT" -format '%wx%h' info:))"
