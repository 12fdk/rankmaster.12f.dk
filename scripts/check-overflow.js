// Anything sticking out past the viewport, and any tap target under 44px.
// DESIGN.md §4 and §8; §11 checks 375 / 768 / 1024 / 1400.
(() => {
  const vw = document.documentElement.clientWidth;
  const over = [];
  document.querySelectorAll("body *").forEach((el) => {
    if (el.tagName !== "BODY" && el.offsetParent === null && !(el instanceof SVGElement)) return;
    const r = el.getBoundingClientRect();
    if (!r.width || !r.height) return;
    // The rail's glow and labels overflow their SVG on purpose, and the stage
    // art is a background layer. Neither can push the page wide.
    if (el.closest(".rail__svg") || el.classList.contains("stage__art")) return;
    if (r.right > vw + 1 || r.left < -1) {
      const cls = (el.className.baseVal ?? el.className ?? "").toString().split(" ")[0];
      over.push(`${el.tagName.toLowerCase()}.${cls} [${Math.round(r.left)}->${Math.round(r.right)}]`);
    }
  });
  const small = [];
  document.querySelectorAll('a[href], button, summary, [tabindex="0"]').forEach((el) => {
    if (el.offsetParent === null) return;
    const r = el.getBoundingClientRect();
    if (r.height < 43.5 || r.width < 43.5) {
      const name = (el.textContent || el.getAttribute("aria-label") || el.tagName).trim().slice(0, 40);
      small.push(`${name} ${Math.round(r.width)}x${Math.round(r.height)}`);
    }
  });
  return JSON.stringify({
    vw,
    scrollW: document.documentElement.scrollWidth,
    overflowing: [...new Set(over)].slice(0, 12),
    smallTargets: [...new Set(small)].slice(0, 12),
  });
})();
