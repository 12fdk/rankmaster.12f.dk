// Ordinals for the rail's labels.
//
// DESIGN.md §9: the `1.` / `12.` suffix under the rail is locale-dependent and
// must come from Intl, never a hardcoded ".". Intl.PluralRules gives the
// *category* for a number in a locale; the strings that go with each category
// are per-locale and have to be supplied — so they live here, one table per
// locale the site ships in, rather than being guessed at the call site.
type Category = Intl.LDMLPluralRule;

const SUFFIXES: Record<string, Partial<Record<Category, string>> & { other: string }> = {
  // one → 1st, two → 2nd, few → 3rd, other → 4th
  en: { one: "st", two: "nd", few: "rd", other: "th" },
  // Danish marks every ordinal with a full stop: 1., 2., 12.
  da: { other: "." },
};

export function ordinal(n: number, locale = "en"): string {
  const lang = locale.split("-")[0];
  const table = SUFFIXES[lang] ?? SUFFIXES.en;
  const category = new Intl.PluralRules(lang in SUFFIXES ? lang : "en", {
    type: "ordinal",
  }).select(n);
  return `${n}${table[category] ?? table.other}`;
}
