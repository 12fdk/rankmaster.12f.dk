// DESIGN.md §8: body ≥7:1, large text ≥4.5:1, measured against the brightest
// pixel behind the element — not against --ground.
//
// Inside .stage the effective background is the beams' apex at the baked 0.70
// exposure with the 0.40 --ground scrim over it, which §2 records as #1E2643.
// A computed style cannot see that, so it is substituted here.
(() => {
  const STAGE_WORST = [30, 38, 67]; // #1E2643

  const lin = (v) => {
    v /= 255;
    return v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
  };
  const lum = ([r, g, b]) => 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
  const ratio = (a, b) => {
    const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p);
    return (x + 0.05) / (y + 0.05);
  };
  const parse = (s) => (s.match(/[\d.]+/g) || []).map(Number);
  const hex = ([r, g, b]) =>
    "#" + [r, g, b].map((v) => Math.round(v).toString(16).padStart(2, "0")).join("").toUpperCase();

  /** Flatten an element's own background over what is behind it.
   *  A gradient counts: the gold button paints itself with one, and its
   *  backgroundColor is transparent, so walking past it would measure the
   *  label against the page ground instead of against the gold. The worst
   *  stop is the one that has to clear the floor. */
  function backdrop(el) {
    let node = el;
    while (node && node !== document.documentElement) {
      const cs = getComputedStyle(node);
      const image = cs.backgroundImage;
      if (image && image.includes("gradient")) {
        const stops = [...image.matchAll(/rgba?\(([^)]+)\)/g)].map((m) =>
          m[1].split(",").slice(0, 3).map(Number),
        );
        if (stops.length) {
          // Whichever stop is closest in luminance to the text is the worst case.
          const fg = parse(el instanceof SVGElement ? cs.fill : getComputedStyle(el).color);
          return stops.sort((a, b) => ratio(fg, a) - ratio(fg, b))[0];
        }
      }
      const bg = parse(cs.backgroundColor);
      const alpha = bg.length === 4 ? bg[3] : 1;
      if (alpha > 0.99) return bg.slice(0, 3);
      node = node.parentElement;
    }
    return null; // nothing opaque underneath — the caller decides
  }

  const results = [];
  const seen = new Set();

  document.querySelectorAll("body *").forEach((el) => {
    if (el.offsetParent === null && !(el instanceof SVGElement)) return;
    const text = [...el.childNodes]
      .filter((n) => n.nodeType === 3 && n.textContent.trim())
      .map((n) => n.textContent.trim())
      .join(" ");
    if (!text) return;

    const cs = getComputedStyle(el);
    if (cs.visibility === "hidden" || cs.opacity === "0") return;

    const fg = (el instanceof SVGElement ? parse(cs.fill) : parse(cs.color)).slice(0, 3);
    if (fg.length !== 3) return;

    // The stage substitution applies only where the art really is what is
    // behind the text. An element with its own opaque or gradient background
    // — the hero's gold button — sits on that instead.
    const own = backdrop(el);
    const bg = own ?? (el.closest(".stage") ? STAGE_WORST : [10, 17, 48]);
    const size = parseFloat(cs.fontSize);
    const weight = Number(cs.fontWeight) || 400;
    // WCAG "large": ≥24px, or ≥18.66px at 700+.
    const large = size >= 24 || (size >= 18.66 && weight >= 700);
    const floor = large ? 4.5 : 7;
    const r = ratio(fg, bg);

    const key = hex(fg) + hex(bg) + Math.round(size) + weight;
    if (seen.has(key)) return;
    seen.add(key);

    results.push({
      pass: r >= floor,
      ratio: Math.round(r * 100) / 100,
      floor,
      fg: hex(fg),
      bg: hex(bg),
      px: Math.round(size),
      weight,
      onStage: Boolean(el.closest(".stage")),
      sample: text.slice(0, 46),
    });
  });

  const fails = results.filter((r) => !r.pass).sort((a, b) => a.ratio - b.ratio);
  return JSON.stringify({ checked: results.length, failures: fails }, null, 1);
})();
