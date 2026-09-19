// DESIGN.md §9: German and Danish run ~30% longer than English, and no
// component may be sized to fit its English label. This stretches every
// string on the page by ~35% and then looks for anything that has burst its
// container or pushed the page sideways.
(() => {
  const pad = (s) => {
    const words = s.trim().split(/\s+/);
    const extra = Math.ceil(words.length * 0.35);
    return s + " " + words.slice(0, Math.max(1, extra)).join(" ");
  };

  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  const nodes = [];
  while (walker.nextNode()) {
    if (walker.currentNode.textContent.trim().length > 2) nodes.push(walker.currentNode);
  }
  nodes.forEach((n) => (n.textContent = pad(n.textContent)));

  const vw = document.documentElement.clientWidth;
  const over = [];
  document.querySelectorAll("body *").forEach((el) => {
    if (el.offsetParent === null) return;
    if (el.closest(".rail__svg") || el.classList.contains("stage__art") || el.classList.contains("visually-hidden")) return;
    const r = el.getBoundingClientRect();
    if (!r.width || !r.height) return;
    if (r.right > vw + 1 || r.left < -1) {
      const cls = (el.className.baseVal ?? el.className ?? "").toString().split(" ")[0];
      over.push(`${el.tagName.toLowerCase()}.${cls}`);
    }
    // Text escaping a container that clips or bounds it.
    if (el.scrollWidth > el.clientWidth + 1 && getComputedStyle(el).overflowX === "hidden") {
      over.push(`clipped ${el.tagName.toLowerCase()}.${(el.className.baseVal ?? el.className ?? "").toString().split(" ")[0]}`);
    }
  });

  return JSON.stringify(
    { stretchedNodes: nodes.length, pageScrollWidth: document.documentElement.scrollWidth, vw, problems: [...new Set(over)].slice(0, 15) },
    null,
    1,
  );
})();
