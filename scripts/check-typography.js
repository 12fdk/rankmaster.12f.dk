// DESIGN.md §11: "The serif appears only on H1, section headings and numerals.
// Nowhere else." and "Every numeral is tabular-nums."
//
// The serif is banned from buttons, navigation, body copy, labels, form
// fields, the footer, captions, FAQ answers — anything that is chrome rather
// than content.
(() => {
  // Careful: --font-ui ends in "sans-serif", so a bare /serif/ matches every
  // element on the site.
  const isSerif = (f) => /\bui-serif\b|New York|Iowan|Palatino|Georgia|(^|[,\s])serif\b/i.test(f) && !/^-apple-system/.test(f.trim());
  const ALLOWED = "h1, h2, .numeral, .rail__readout-value, .scoring__points, .how__step-number, .how__example, .stakes__line, .modes__item h3, .code";

  const serifOffenders = [];
  const untabularNumerals = [];

  document.querySelectorAll("body *").forEach((el) => {
    const own = [...el.childNodes].filter((n) => n.nodeType === 3 && n.textContent.trim());
    if (!own.length) return;
    const text = own.map((n) => n.textContent.trim()).join(" ");
    const cs = getComputedStyle(el);

    if (isSerif(cs.fontFamily) && !el.matches(ALLOWED) && !el.closest(ALLOWED)) {
      serifOffenders.push(el.tagName.toLowerCase() + "." + (el.className.baseVal ?? el.className ?? "") + " :: " + text.slice(0, 40));
    }
    // Numerals presented as measurements or counts — see DESIGN.md §3. Digits
    // inside a running sentence (a CVR number, "iOS 17.6", a year in a
    // citation) are words, not measurements, and are skipped.
    const measurement = /^[^A-Za-z]*\d[\d\s.,+–—×%-]*(st|nd|rd|th|pts?|points?)?[^A-Za-z]*$/i.test(text);
    if (measurement && /\d/.test(text) && !/tabular-nums/.test(cs.fontVariantNumeric)) {
      untabularNumerals.push(el.tagName.toLowerCase() + "." + (el.className.baseVal ?? el.className ?? "") + " :: " + text.slice(0, 40));
    }
  });

  return JSON.stringify(
    {
      serifOutsideAllowed: [...new Set(serifOffenders)].slice(0, 15),
      numeralsNotTabular: [...new Set(untabularNumerals)].slice(0, 15),
    },
    null,
    1,
  );
})();
