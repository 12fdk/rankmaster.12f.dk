# CLAUDE.md

Guidance for Claude Code (claude.ai/code) working in this repository.

> **Status: not built yet.** This repo currently contains only `README.md`. This file is the
> brief. Do not start scaffolding until Robert says so — then follow §9 in order.

---

## 1. What this is

The marketing landing page for **RankMaster: Guess the Rank**, an iOS game by **12F ApS**
(Danish company, CVR 45362957).

| | |
|---|---|
| Site | `https://rankmaster.12f.dk` |
| Repo | `12fdk/rankmaster.12f.dk` |
| Framework | **Astro 5**, static output, **pnpm** |
| Hosting | **GitHub Pages**, custom domain via `public/CNAME` |
| App Store | https://apps.apple.com/us/app/rankmaster-guess-the-rank/id6810373394 |
| App Store ID | `6810373394` |
| Bundle id | `12f.RankMaster` |
| Team id | `9643M8PZU4` |
| Support email | `rankmaster@12f.dk` |

**The site sells the app. It is not the game and it is not the backend.** No gameplay, no
leaderboard fetching, no Appwrite calls, no API keys. It is a static brochure plus a privacy
policy and a support page.

### Sibling repos — where the truth lives

| Repo | Path | Authority on |
|---|---|---|
| iOS app | `~/Git/rankMaster/RankMaster-IOS` | The game, the brand, the screenshots, App Store metadata |
| Backend | `~/Git/rankMaster/rankmaster-backend` | Data model, API contract. **Irrelevant to this site.** |
| 12f.dk (Hugo) | `~/Git/12f.dk` | The *current* `/rankmaster/` privacy + support pages we are migrating from |

### ⚠️ Two companion files in this repo are binding. Read both before writing anything.

| File | Owns | The rule |
|---|---|---|
| **`DESIGN.md`** | How it looks and moves | **Every visual decision on this site is settled there.** Colour, type, spacing, shape, the rank rail, motion, accessibility floors, which assets to use. If a colour, size, font, radius or animation is not in `DESIGN.md`, it does not go on the page until it is added there **in the same commit**. Do not improvise a visual decision and do not "adjust" a token. |
| **`MESSAGING.md`** | The words | The StoryBrand framework: hero, problem, villain, the authority we may claim, the plan, the CTAs, the one-liner, and a section-by-section homepage wireframe with the actual copy in it. **Every headline, button label and meta description comes from that file.** If a line of copy cannot be traced back to an element in it, it does not belong on the page. |

`DESIGN.md` is the web translation of the app's own design bible and carries a §12 log of the
places it knowingly departs from it. **Departing further is a decision, not a detail** — add a
row to that table, with the reason, or do not depart.

Two files in the iOS repo are worth reading before writing any copy or CSS:

- `~/Git/rankMaster/RankMaster-IOS/design.md` — the brand bible (palette, typography, the
  reasoning behind both). Huge; read the sections you need, not the whole file.
- `~/Git/rankMaster/RankMaster-IOS/fastlane/metadata/en-US/description.txt` — the App Store
  long description. The landing page copy should agree with it, not contradict it.

---

## 2. The product, in enough detail to write about it

Each question states a fact with the rank removed — *"Australia is the __ largest country on
Earth"* — and the player slides to a number. **Closer is better:**

```
points = max(0, 10 - 2 * |guess - correctRank|)
```

| Off by | 0 | 1 | 2 | 3 | 4 | 5+ |
|---|---|---|---|---|---|---|
| Points | 10 | 8 | 6 | 4 | 2 | 0 |

This is a game about **judgement, not memorised lists**. That framing is the whole pitch — keep
it in the copy.

**Game modes:** `daily` (ten questions, the same ten for everyone worldwide, once a day),
`endless`, `category` (geography, population, sport, economy, nature), `versus`.

**Selling points, in the order the App Store description uses them:**

1. The daily challenge — the same ten questions for everyone, every day.
2. Play your way — endless, categories, daily.
3. The reveal — the true rank appears on the same scale as your guess and the **distance**
   between the two is drawn out. No red crosses. This is the thing no competitor has; give it
   real estate.
4. Leaderboards — today, this week, all-time, per category. Your own place is always pinned.
5. Every fact is sourced, with the year it is from.
6. No sign-up wall — you play within seconds; Sign in with Apple only to keep scores.

**Free.** No subscription, no IAP, no ads, no IDFA, no attribution SDKs. Say so.

**Languages the app ships in (10):** English, Danish, German, Spanish, French, Italian, Dutch,
Norwegian (Bokmål), Portuguese (Brazil), Swedish. The canonical locale table, including the
`nb` vs `no` trap, is `~/Git/rankMaster/RankMaster-IOS/fastlane/locales.json`.

---

## 3. Brand — summary only; `DESIGN.md` is the specification

The app's metaphor is **a measuring instrument on a lit stage**: deep indigo ground, one gold
accent, a serif for the things being measured. The table below is a quick reference so this file
reads on its own. **`DESIGN.md` §2 is the authority** — it carries the usage rules that come with
each token, and those rules are the part that actually keeps the brand intact.

| Role | Hex | Use on the site |
|---|---|---|
| `ground` | `#0A1130` | Page background |
| `surface` | `#111C48` | Cards, raised panels |
| `sunken` | `#05081A` | Footer, wells |
| `line` | `#1E2A5C` | Hairlines, dividers |
| `textPrimary` | `#EDF1FF` | Headings, body |
| `textSecondary` | `#ABB5DC` | Body copy, prompts |
| `textTertiary` | `#808CBE` | Eyebrows, footnotes |
| `guessInk` / `guessFill` | `#F4C24A` | The accent — the player's guess. Buttons, marks. |
| `guessFillDeep` | `#E3A22E` | Bottom stop of a gold gradient surface |
| `onGuess` | `#14102E` | Label colour **on** gold (8.3:1 on the deep stop) |
| `truth` | `#45E3B8` | The correct answer. Only ever the right answer. |
| `miss` | `#E0705F` | Zero points. Warm terracotta — **never** `#FF3B30`. |

**The site is dark-only**, like the app (`.preferredColorScheme(.dark)`). Do not build a light
theme; do not add a theme toggle.

**Typography.** The app pairs **New York** (serif, `design: .serif`) for *numbers and the
subject being ranked only* with **SF Pro** for all interface text. On the web:

- Serif display → a New York-adjacent transitional serif. Ship a self-hosted webfont in
  `public/fonts/`, not a Google Fonts CDN call. Use it for the hero headline, big numerals and
  section headings — **nothing else**.
- Everything else → the system stack (`-apple-system, BlinkMacSystemFont, "Segoe UI", …`),
  which is SF Pro for the iPhone-owning audience that matters.
- **Not Inter, not Poppins.** `design.md` names those as the defaults the design exists to
  avoid. Ignoring that is the one way to get the brand visibly wrong.

**Icon and logo assets:** `~/Git/rankMaster/RankMaster-IOS/Icon/` (`icon.svg`, `icon.png`,
`icon-light.svg`, `icon-fg-*.svg`). Copy what is needed into `public/images/`; do not
re-draw them.

---

## 4. Screenshots

Framed, localized, App Store-ready, six slots per locale:

```
~/Git/rankMaster/RankMaster-IOS/fastlane/screenshots/framed/<locale>/0{1..6}_*.png
  01_Guess  02_Reveal  03_Summary  04_Leaderboard  05_Profile  06_Categories
```

Unframed device captures are in `.../screenshots/raw/<locale>/`. Prefer **raw** on the site and
frame them in CSS/SVG — the framed PNGs carry App Store caption text baked in, which will fight
the page's own copy.

Caption copy per slot and per locale (good raw material for section headings) lives in
`~/Git/rankMaster/RankMaster-IOS/fastlane/frame_titles.json`. English slot 1–2:

- *How well do you know the world?* / Slide to your guess. Closer is better.
- *See exactly how close you were.*

Optimise for web before committing: resize to what the layout actually renders, convert to
WebP/AVIF with a PNG fallback, and never ship a 1290×2796 PNG straight into `public/`.

---

## 5. Site structure to build

```
astro.config.mjs        # site: "https://rankmaster.12f.dk", build.format: 'file'
src/
  consts.ts             # SITE, APP_STORE_URL, APP_ID, JSON-LD @id anchors, author bio
  layouts/Layout.astro  # head: meta, OG/Twitter, favicons, stylesheet, Umami, JSON-LD
  components/           # Navbar, Hero, HowItWorks (the scoring table), Reveal,
                        #   Modes, Screenshots, Leaderboards, Faq, DownloadCta, Footer
  pages/
    index.astro         # landing page + SoftwareApplication/VideoGame JSON-LD
    privacy-policy.astro
    support.astro       # FAQ + contact; App Store "Support URL" points here
    404.astro
    sitemap.xml.ts      # generated, with <lastmod>
public/
  CNAME                                     # rankmaster.12f.dk
  b0b687723d7b1c12e407c2dfb52947d1.txt      # IndexNow key (see §7)
  css/style.css                             # all styles, tokens as CSS custom properties
  js/main.js                                # i18n, scroll animations, mobile nav
  images/screenshots/<locale>/1..6.webp
  robots.txt, llms.txt
```

`build.format: 'file'` so `privacy-policy.astro` → `/privacy-policy.html`. This matters: the
App Store metadata URLs are being repointed at this site (§8) and a trailing-slash directory URL
is a different URL.

**Copy the working setup from `~/Git/meugrana.12f.dk`** — same stack, same host, same author.
It is the reference implementation for `Layout.astro`, `consts.ts`, the workflows and the
build-time App Store rating lookup. Sister sites on the same stack: `~/Git/home-stories.12f.dk`,
`~/Git/event-stories.12f.dk`.

### Localization

The app ships in 10 languages; the site should not launch in 10. **Start English-only**, with
the markup ready for the meugrana pattern (client-side `data-i18n` dictionary in
`public/js/main.js`, preference in LocalStorage, browser language sniffed on first visit). Add
Danish second — it is the home market and the screenshots already exist. Anything beyond that is
a separate, tracked decision.

---

## 6. Content already written — reuse it, don't rewrite it

The Hugo site `~/Git/12f.dk` already serves `/rankmaster/`, `/rankmaster/privacy-policy/` and
`/rankmaster/support/`. Those pages are **good and current** (written 2026-09-16):

- `~/Git/12f.dk/content/rankmaster/privacy-policy.md` — full GDPR policy: anonymous play sends
  nothing, display name is public on leaderboards, what Sign in with Apple stores, EU-hosted
  server, no IDFA, no ads, no data brokers, deletion route. **Port this text**; changing its
  substance is a legal decision, not a design one.
- `~/Git/12f.dk/content/rankmaster/support.md` — contact, App Store link, FAQ (scoring, why an
  account is needed for leaderboards, what happens to pre-sign-in scores).

Privacy facts the policy must keep saying, straight from
`~/Git/rankMaster/RankMaster-IOS/fastlane/privacy.json` (the App Store nutrition label):
coarse location, email, name, product interaction and user ID — analytics and app functionality,
all *linked to you*, **none used for tracking**. The site's own policy must not claim less
collection than the label declares.

**When the new pages go live, the old Hugo ones must redirect here**, not sit there competing
for the same queries. That is a change in `~/Git/12f.dk` — do it in that repo, in its own issue.

---

## 7. SEO, IndexNow, analytics

**IndexNow is mandatory** (global rule for every new 12F site). Reuse the shared public key
`b0b687723d7b1c12e407c2dfb52947d1`:

1. `public/b0b687723d7b1c12e407c2dfb52947d1.txt` containing that key as its only line.
2. `.github/workflows/indexnow.yml` — copy verbatim from
   `~/Git/meugrana.12f.dk/.github/workflows/indexnow.yml`. It fires on a successful Pages
   deployment, diffs the sitemap against the previous deploy and submits only changed URLs.
   No per-repo configuration. Google does not participate; Bing/Yandex/Seznam/Naver/Yep do.

**The sitemap must emit `<lastmod>`** — without it IndexNow can only detect brand-new URLs.

**Analytics: Umami**, self-hosted at `https://umami.robert-jensen.dk/script.js`, loaded from
`Layout.astro` behind an `analytics` prop that `404.astro` opts out of.
⚠️ **A new website id must be created for rankmaster.12f.dk** — do not paste meugrana's
(`6c5c421d-…`). Ask Robert for the id rather than guessing.

**Structured data:** `SoftwareApplication` (or `VideoGame` with an `applicationCategory` of
`GameApplication`), `Organization` (12F ApS), `WebSite`, and `FAQPage` on the support page.
Anchor them by `@id` from `src/consts.ts` the way meugrana does.

**Social proof:** rating and review count can be fetched at build time from
`https://itunes.apple.com/us/lookup?id=6810373394` (see `src/utils/appStoreData.ts` in
meugrana). Gate it — **hide the rating entirely below ~5 ratings**, because a 5.0 from two
reviews reads as fake. `deploy.yml` runs weekly on cron so the number stays fresh.

---

## 8. After launch — App Store metadata must be repointed

`~/Git/rankMaster/RankMaster-IOS/fastlane/metadata/<locale>/` currently says:

```
marketing_url.txt  https://12f.dk/rankmaster/
support_url.txt    https://12f.dk/rankmaster/support/
privacy_url.txt    https://12f.dk/rankmaster/privacy-policy/
```

Once the equivalents are live here, update all ten locales to
`https://rankmaster.12f.dk/`, `/support.html`, `/privacy-policy.html` and push them with
`fastlane/upload_metadata.sh`. **That is work in the iOS repo, under its own GitHub issue.** Do
not leave it implied — a privacy URL that 404s blocks an App Store submission.

---

## 9. Build order, when Robert gives the go-ahead

1. Scaffold Astro 5 + pnpm; `public/CNAME`; enable Pages (GitHub Actions source) on the repo.
2. `.github/workflows/deploy.yml`, `ci.yml`, `indexnow.yml` — copied from meugrana. Keep the
   `notify-failure` job that opens a `deploy-failure` issue.
3. `Layout.astro` + `consts.ts` + the token stylesheet — **transcribed from `DESIGN.md` §2–§4**,
   token for token. Get the palette and the serif right before building any section; everything
   else is downstream of it.
3a. Build the **rank rail** (`DESIGN.md` §5) before any other component. It is the signature
   element and the site fails without it — do not leave it until last and discover it does not
   fit the layout.
4. `index.astro` — **section order and copy come from `MESSAGING.md` §9**, which is the
   StoryBrand order: hero → stakes → the problem made visible → three benefits → guide →
   how it works (with the scoring table) → screenshots → modes → the five commitments →
   FAQ → final CTA.
5. `privacy-policy.astro` and `support.astro`, ported from `~/Git/12f.dk/content/rankmaster/`.
6. `robots.txt`, `llms.txt`, `sitemap.xml.ts` with `<lastmod>`, `404.astro`, OG image.
7. Verify (§10), then repoint the App Store URLs (§8).

---

## 10. Commands and verification

```bash
pnpm install
pnpm dev        # http://localhost:4321
pnpm build      # → dist/
pnpm preview
pnpm check      # astro check
```

**Deploy:** push to `main`. PRs are build-checked by `ci.yml`.

No automated tests. **`DESIGN.md` §11 is the pre-launch checklist — run it, item by item.** In
addition, verify by hand:

- Mobile first — the audience is on an iPhone. 375px, 768px, 1024px, 1400px.
- iOS Safari specifically, not just Chrome DevTools.
- Every gold-on-navy and text-on-navy pair against WCAG AA. The app holds itself to 7:1 on body
  copy; the site should not be visibly worse than the product it advertises.
- `prefers-reduced-motion` honoured by every scroll animation.
- Lighthouse: a static brochure has no excuse for anything below 95.
- The App Store link opens the right app.

---

## 11. Working rules

- **GitHub issues are the single source of truth** for tasks (`gh issue list`). No local todo
  files. Update the issue as work proceeds so other agents can read the state.
- **Branch per issue**; never commit straight to `main`.
- Use **Context7 MCP** for Astro API questions rather than recalling them.
- **Design decisions come from `DESIGN.md`, copy from `MESSAGING.md`.** Neither is a suggestion.
  Changing how something looks means changing `DESIGN.md` in the same commit — it is a living
  record, like the app's own design.md, not a one-time brief.
- Copy is a deliverable, not filler. It comes from `MESSAGING.md` and must agree with the App
  Store description — if the two disagree, one of them is wrong and that is worth raising, not
  papering over.
- **No invented social proof.** The app launched 2026-09-18 and has **0 ratings and 0 reviews**
  (verified 2026-09-19). Until that changes: no star ratings, no review or download counts, no
  testimonials, no "join thousands of players". `MESSAGING.md` §0 and §3 say what we may claim
  instead, and §11 says when to switch social proof on.
- Facts about the game (scoring, modes, privacy) come from the iOS repo. If this file disagrees
  with `design.md` or the App Store metadata, **they win — and fix this file.**
