// DESIGN.md §2: "as the visitor scrolls, no two gold-filled surfaces are ever
// in view at once." Two are simultaneously visible exactly when the distance
// from the top of the earlier to the bottom of the later fits in one viewport,
// so what this prints is the smallest window height that would break the rule.
//
//   node scripts/shot.mjs <url> 1400x900 --motion=reduce --evalFile=scripts/check-gold.js
//
// Run it again with --click='[data-try-lock]', because the demo's reveal adds
// a fifth gold button that is not in the page's initial state.
(() => {
  const box = (el) => {
    const r = el.getBoundingClientRect();
    const top = r.top + scrollY;
    return [top, top + r.height];
  };
  const gold = [...document.querySelectorAll(".btn--primary")]
    .filter((el) => el.offsetParent !== null)
    .map((el) => ({
      where: el.dataset.umamiEventPlacement || el.closest("[id]")?.id || "?",
      box: box(el),
    }))
    .sort((a, b) => a.box[0] - b.box[0]);

  const gaps = [];
  for (let i = 0; i < gold.length - 1; i++) {
    gaps.push({
      a: gold[i].where,
      b: gold[i + 1].where,
      breaksAboveViewportHeight: Math.round(gold[i + 1].box[1] - gold[i].box[0]),
    });
  }
  return JSON.stringify({ goldButtons: gold.length, gaps }, null, 1);
})();
