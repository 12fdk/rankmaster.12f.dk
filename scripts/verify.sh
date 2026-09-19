#!/usr/bin/env bash
# The DESIGN.md §11 checklist, as far as it can be run rather than eyeballed.
#
#   pnpm build && pnpm preview --port 4399 &
#   scripts/verify.sh [base-url]
#
# What it cannot do is the last two lines of §11: real iOS Safari, and whether
# the page is any good. Both are done by hand — the simulator for the first
# (see the note in that section), your eyes for the second.
set -uo pipefail
cd "$(dirname "$0")/.."
BASE="${1:-http://localhost:4399}"
PAGES=("/" "/support.html" "/privacy-policy.html" "/404.html")
fail=0

run() { # run <label> <check.js> <url> [extra shot.mjs flags...]
  local label="$1" check="$2" url="$3"; shift 3
  echo "── $label — $url"
  node scripts/shot.mjs "$url" 1400x900 --motion=reduce --evalFile="$check" "$@" | sed 's/^/   /'
}

echo "== Contrast (body ≥7:1, large ≥4.5:1, against the brightest pixel behind) =="
for p in "${PAGES[@]}"; do run contrast scripts/check-contrast.js "$BASE$p"; done

echo; echo "== Typography (serif only on headings and numerals; numerals tabular) =="
for p in "${PAGES[@]}"; do run type scripts/check-typography.js "$BASE$p"; done

echo; echo "== Overflow and 44px targets, at §11's four widths plus 200% zoom =="
for w in 375 700 768 1024 1400; do
  echo "── ${w}px"
  node scripts/shot.mjs "$BASE/" "${w}x900" --motion=reduce --evalFile=scripts/check-overflow.js | sed 's/^/   /'
done

echo; echo "== +35% text length (DESIGN.md §9) =="
for w in 375 768 1400; do
  echo "── ${w}px"
  node scripts/shot.mjs "$BASE/" "${w}x900" --motion=reduce --evalFile=scripts/check-longtext.js | sed 's/^/   /'
done

echo; echo "== One gold-filled surface in view at a time (DESIGN.md §2) =="
node scripts/shot.mjs "$BASE/" 1400x900 --motion=reduce --evalFile=scripts/check-gold.js | sed 's/^/   /'
echo "   …and with the demo played:"
node scripts/shot.mjs "$BASE/" 1400x900 --motion=reduce --click='[data-try-lock]' --after=300 --evalFile=scripts/check-gold.js | sed 's/^/   /'

echo; echo "== Motion: nothing loops; reduced motion replaces rather than shortens =="
node scripts/shot.mjs "$BASE/" 1400x900 --evalFile=scripts/check-motion.js | sed 's/^/   /'
node scripts/shot.mjs "$BASE/" 1400x900 --motion=reduce --evalFile=scripts/check-motion.js | sed 's/^/   /'

echo; echo "== Links and images =="
for p in "${PAGES[@]}"; do run links scripts/check-links.js "$BASE$p"; done

echo; echo "== Nothing from the stale Icon/ directory =="
if grep -ril "icon-light\|icon-fg\|F0A93B\|2E271D" public src 2>/dev/null; then
  echo "   FOUND — see DESIGN.md §10"; fail=1
else
  echo "   clean"
fi

echo; echo "== No one-off hex outside :root =="
python3 - <<'PY'
import re
s = open("public/css/style.css").read()
body = s[s.index("}", s.index(":root {")):]
body = re.sub(r"/\*.*?\*/", "", body, flags=re.S)
hits = sorted(set(re.findall(r"#[0-9a-fA-F]{3,8}\b", body)))
print("   " + (", ".join(hits) if hits else "clean"))
PY

exit $fail
