// Shared site-wide constants.
export const SITE = "https://rankmaster.12f.dk";

/** JSON-LD @id anchors for the site-wide entities emitted by Layout.astro.
 *  Reference these from page-level schema (VideoGame, FAQPage) so the graph
 *  resolves to one Organization and one WebSite rather than duplicates. */
export const ORG_ID = `${SITE}/#organization`;
export const WEBSITE_ID = `${SITE}/#website`;
export const APP_ID_ANCHOR = `${SITE}/#app`;

/** The app. */
export const APP_NAME = "RankMaster: Guess the Rank";
export const APP_SHORT_NAME = "RankMaster";
export const APP_ID = "6810373394";
export const APP_STORE_URL = `https://apps.apple.com/us/app/rankmaster-guess-the-rank/id${APP_ID}`;
export const BUNDLE_ID = "12f.RankMaster";
export const MIN_IOS = "17.6";

/** The publisher. */
export const ORG_NAME = "12F ApS";
export const ORG_CVR = "45362957";
export const ORG_URL = "https://12f.dk";
export const SUPPORT_EMAIL = "rankmaster@12f.dk";

/** Umami, self-hosted. A website id of its own — meugrana's must never be
 *  pasted here (CLAUDE.md §7). An empty string renders no script at all. */
export const UMAMI_SCRIPT = "https://umami.robert-jensen.dk/script.js";
export const UMAMI_WEBSITE_ID = "218af82b-a0aa-4471-b3a3-6b110a15c41a";

/** The one-liner, from MESSAGING.md §8. One source for the meta description,
 *  the footer and the OG card — if it is edited, it is edited here. */
export const ONE_LINER =
  "RankMaster is the quiz where you slide to your answer instead of picking one — so being close still counts, and you finally find out how well you know the world.";

/** The cocktail-party short form (MESSAGING.md §8). */
export const ONE_LINER_SHORT = "It's a quiz where nearly right still scores.";

/** The direct CTA. One action, everywhere (MESSAGING.md §5). */
export const CTA_LABEL = "Play today's ten";

/** Social proof gate. The app launched 2026-09-18 with 0 ratings and 0
 *  reviews; below this many ratings the site shows none at all, because a 5.0
 *  from two reviews reads as fake (MESSAGING.md §0, CLAUDE.md §7). */
export const MIN_RATING_COUNT = 5;
