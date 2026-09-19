#!/usr/bin/env bash
# Raw device captures → web assets.
#
# DESIGN.md §6 and §4: use the RAW captures, not fastlane's `framed/` ones —
# those have App Store caption text baked in, which fights the page's own copy.
# The frame is drawn in CSS, so what ships here is only the screen itself.
#
# CLAUDE.md §4: never ship a 1290×2796 PNG into public/. 620px is twice the
# widest size the layout renders, which is all a 2× display can use.
set -euo pipefail
cd "$(dirname "$0")/.."
RAW="$HOME/Git/rankMaster/RankMaster-IOS/fastlane/screenshots/raw"
LOCALE="${1:-en-US}"
OUT="public/images/screenshots/$LOCALE"
DEVICE="iPhone 17 Pro"
WIDTH=620

mkdir -p "$OUT"
for slot in 01_Guess 02_Reveal 03_Summary 04_Leaderboard 05_Profile 06_Categories; do
  src="$RAW/$LOCALE/$DEVICE-$slot.png"
  [ -f "$src" ] || { echo "missing: $src" >&2; continue; }
  base="$OUT/$slot"
  magick "$src" -resize "${WIDTH}x" -strip -quality 60 "$base.avif"
  magick "$src" -resize "${WIDTH}x" -strip -quality 78 -define webp:method=6 "$base.webp"
  magick "$src" -resize "${WIDTH}x" -strip -quality 84 -sampling-factor 4:4:4 "$base.jpg"
done
magick "$RAW/$LOCALE/$DEVICE-01_Guess.png" -format "source %wx%h\n" info:
du -sh "$OUT"
ls -la "$OUT" | head -20
