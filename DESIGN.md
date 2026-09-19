# DESIGN.md — rankmaster.12f.dk

The design direction for this site. **Every visual decision on this site is settled here.** If a
colour, a size, a font, a radius or an animation is not in this file, it is not on the page until
it is added here in the same commit that introduces it.

This is the web translation of `~/Git/rankMaster/RankMaster-IOS/design.md` — the app's design
bible, ~2,000 lines, a living record with a decision log. **That file is the authority.** Where
this one disagrees with it, the app wins and this file gets fixed. Where the web genuinely needs
a different answer, the difference is written down here *with its reason* (§12), never left
implicit.

Companion files: `CLAUDE.md` owns the build and the rules. `MESSAGING.md` owns the words. This
file owns how it looks and moves.

---

## 1. The idea — inherited whole

> **RankMaster is a measuring instrument, not a quiz app.**

Every question asks the player to place a thing on a scale, so the interface *is* a scale: an
engraved rail, a machined thumb, a numeral that tracks your finger. The player is not answering a
question, they are taking a measurement and then finding out how far off they were.

**The instrument stands on a stage.** A deep indigo room with light falling into it from above
and one gold object in the middle. The ground is never the subject — its entire job is to make
the gold mark the brightest thing on the screen.

**There is one room, not two.** The app does not follow the system appearance and neither does
this site. The stage is not a *theme*; it is the thing the game is played inside.

### What this means for a landing page

The site is not a page *about* an instrument. It is a page built out of the same parts. The
visitor should be able to tell, from the first viewport, that the site and the app were made by
the same hand — same dark, same gold, same serif, same rail.

**The rail is the hero of this site too** (§5). A landing page for this app that does not draw a
working rank rail has failed, however tidy the rest of it is. It is the single most persuasive
object available, because it *is* the product's argument.

### The five rules, on the web

1. **Two colours carry all the meaning.** Gold is *your guess*. Teal is *the truth*. Nothing else
   on this site may use either colour — no gold dividers, no teal links, no decorative accents in
   either.
2. **The instrument is the hero.** The rail gets 120% of the craft budget here as well. It is the
   one element allowed to span the full text column.
3. **No chrome the content doesn't need.** No cards around things that are already legible. No
   bordered boxes to "group" text that whitespace already groups.
4. **Wrong must feel survivable.** Where the site shows a near miss, it celebrates it. Never draw
   a red cross except as the villain being rejected (`MESSAGING.md` §2).
5. **Direct manipulation is instant.** Anything the visitor drags, hovers or scrubs responds on
   the same frame — no easing, no lag. Animation is for things the visitor did *not* do.

### What we deliberately are not

Inherited bans, all still in force:

- **Not neon-on-dark.** Not a desaturated near-black (`#0D1117`, `#12131C`) under cyan and
  magenta. The ground is a *colour* — `#0A1130` spans 38 values darkest channel to brightest —
  carrying one warm metal, not a spectrum.
- **Not gamified.** No confetti, no streak flames, no coin animations, no emoji in the UI.
- **Not a card stack.**
- **Not Inter, not Poppins.** Named in the app's design.md as the defaults the design exists to
  avoid. This is the fastest way to get the brand visibly wrong.

Web-specific additions to the ban list, because they are what a dark landing page defaults to:

- No glassmorphism, no frosted panels, no backdrop-blur cards.
- No purple/violet gradient blobs, no mesh gradients, no aurora backgrounds.
- No floating 3D phone mockup at a jaunty angle with a drop shadow.
- No logo strip, no animated stat counters, no fabricated social proof (`MESSAGING.md` §0).
- No icon fonts, no emoji, no third-party icon set with its own visual voice.
- No light mode, no theme toggle.

---

## 2. Colour

Values are the app's shipped tokens, verified against
`~/Git/rankMaster/RankMaster-IOS/RankMaster/Design/DesignTokens.swift`. **Copy them exactly. Do
not re-derive, re-tint or "adjust for screens".**

### Tokens

```css
:root {
  color-scheme: dark;                 /* one room. Not a media query. */

  /* Neutrals — named for the role they play, not for what they look like */
  --ground:          #0A1130;  /* page ground; the logo's disc at its outer stop */
  --surface:         #111C48;  /* raised: panels, the reveal card, sheets */
  --sunken:          #05081A;  /* recessed: footer, wells, the unfilled rail track */
  --line:            #1E2A5C;  /* hairlines, minor ticks, dividers. 1px. */

  --text-primary:    #EDF1FF;
  --text-secondary:  #ABB5DC;  /* body copy */
  --text-tertiary:   #808CBE;  /* eyebrows, scale labels, footnotes */

  /* The two meaning colours — nothing else may use these */
  --guess-ink:       #F4C24A;  /* YOUR GUESS, as a mark. 11.2:1 on ground. */
  --guess-fill:      #F4C24A;  /* top stop of a gold surface */
  --guess-fill-deep: #E3A22E;  /* bottom stop — the logo's gold at 72% */
  --on-guess:        #14102E;  /* label ON gold. 8.3:1 on the deep stop. */
  --truth:           #45E3B8;  /* THE CORRECT ANSWER. A mark only, never a surface. */
  --miss:            #E0705F;  /* zero points. Warm terracotta. */

  /* The villain's red cross, and nothing else on the site. Not a palette
     colour — a quotation of one, in the one panel where a right/wrong buzzer
     is being shown in order to be rejected. */
  --villain:         #B08581;  /* 5.08:1 on --surface. Saturation 0.23 against --miss's 0.68. */
}
```

### The rules that come with them

- **One accent: gold.** Teal is not a second accent — it is a semantic signal with exactly one
  job, the correct answer. A teal link or a teal hover state is a bug.
- **`--miss` is `#E0705F`, never `#FF3B30`.** A red alert is the wrong emotion for a wrong guess
  (decision D-010). The one place the site may show a hard red is the villain panel
  (`MESSAGING.md` §9), where a red cross is being *rejected* — and even there, draw it in a
  neutral grey-red, not in `--miss`, so the app's own token keeps its single meaning.
  That grey-red is `--villain`, `#B08581`: a third as saturated as `--miss` and clearly a
  different material beside it, while still reading as red. It appears in the villain panel and
  **nowhere else** — not on an error state, not on a link, not on a negative number. If a second
  use is ever wanted, the answer is that the site has no second villain.
- **Gold as a filled surface is always the gradient**, never a flat slab:
  ```css
  background: linear-gradient(to bottom, var(--guess-fill), var(--guess-fill-deep));
  ```
  The emblem's rank bars are gradient-filled in the logo, and a flat slab of the same yellow
  beside them reads as a different material (D-084). A flat gold *mark* (text, a rule, a tick) is
  correct; a flat gold *surface* is not.
- **One gold-filled surface per viewport.** The app's rule is one per screen (D-023); a landing
  page is many screens tall, so the rule becomes: as the visitor scrolls, no two gold-filled
  surfaces are ever in view at once. This is what makes the CTA unmissable without shouting. The
  Apple download badge counts as a surface — it sits *beside* the gold button, never a second
  gold button.
- **No fourth blue.** The ground, the surface and the sunken are three. A fifth decorative blue
  in the content puts four blues on a page that has one.

### Result bands

Points are coloured by how close the guess was. Use these if the site draws a scoring table, a
sparkline or a sample reveal:

| Points | Off by | Colour |
|---|---|---|
| 8–10 | 0–1 | `--truth` |
| 4–6 | 2–3 | `--guess-ink` |
| 2 | 4 | `--text-secondary` |
| 0 | 5+ | `--miss` |

Every band is a **mark** colour — a numeral, a bar, a 4px edge — never a filled gold surface.

### The stage

The ground is a lit room, and it is **supplied artwork**, not a gradient stack:
`~/Git/rankMaster/RankMaster-IOS/RankMaster/Assets.xcassets/Stage.imageset/rankmaster-stage.png`
— 1080×2160, 1:2. The app tried building it from tokens and failed: the beams were either a
hard-edged cut-out silhouette or, blurred enough to fix that, invisible.

**On the web:**

- The stage is the **hero section's** background, not the whole page's. The art is 1:2 portrait;
  stretching it across a 16:9 desktop viewport destroys the beam convergence that is the entire
  image. Below the hero, the ground is flat `--ground`.
- **Top-anchored, cover.** `background-position: top center; background-size: cover;` The beams
  converge at the very top edge and that convergence is the image. Centring crops it off.
- **Ship it exposed down 30%**, like the app. Bake the 0.70 exposure into the exported asset —
  do not apply `filter: brightness(.7)` at runtime, which costs a paint and can be defeated by a
  cache of the un-dimmed file. At full exposure the beams put `#4B5D9F` behind small text, which
  is **1.44:1** — invisible. This number is solved, not chosen.
- Export as AVIF + WebP with a JPEG fallback, at no more than 1440px wide for desktop and a
  separate ~800px mobile crop. The 132 KB source PNG must not ship as-is.
- It is decoration. `aria-hidden`, `role="presentation"`, never an `<img>` with alt text.

### Contrast floors — stricter than WCAG, on purpose

The app holds itself to **≥7:1 for body copy** and **≥4.5:1 for large text**, and verifies it by
sampling the shipped stage PNG under each element's own rectangle. The site holds the same floors.
A marketing page for an app that takes contrast that seriously must not be visibly worse than the
product it advertises.

Practical consequence: **text over the stage art must be checked against the brightest pixel
under it**, not against `--ground`. If a headline lands on the beams' apex, either move it or
darken the art behind it with a `--ground` scrim. Do not lift the ink to compensate — that is how
the three text tokens collapse into one off-white.

### Measured, so it is not re-litigated

Sampled from the shipped `rankmaster-stage.png` and computed in sRGB, the way a browser
composites. These are results, not preferences — if a value here is changed, re-measure first.

| Fact | Value |
|---|---|
| Brightest pixel in the source art | `#3E4A73`, at x=537 y=44 — the beams' apex, dead centre at the top edge |
| The same pixel at the baked 0.70 exposure | `#2B3450` |
| `--text-secondary` on it, unscrimmed | **6.07:1** — *below the 7:1 body floor* |
| `--text-tertiary` on it, unscrimmed | **3.75:1** — below 4.5:1 |

So the hero carries a **`--ground` scrim at 0.40**, which is the `--stage-scrim` token. It takes
the brightest pixel to `#1E2643`, where `--text-secondary` reaches **7.34:1** and
`--text-tertiary` **4.54:1**. Like the 0.70 exposure, this number is solved rather than chosen:
0.35 leaves tertiary at 4.43:1 and 0.30 leaves body at 6.99:1. The scrim is uniform down to 55%
of the hero and then ramps to solid `--ground`, which also gives the art a bottom edge to blend
into — §2 says the ground below the hero is flat, and a hard cut there is worse than a fade.

**`--text-tertiary` cannot reach 7:1 anywhere.** On flat `--ground` it is **5.65:1**. That is the
app's own token and it is correct: §8's 7:1 floor is a floor for *body copy*, and tertiary is a
de-emphasised label — eyebrows, scale labels, footnotes. It clears 4.5:1 on every surface the
site uses. Do not "fix" this by lifting the ink; that collapses the three text tokens into one.

Reference values on the flat surfaces, for the same reason:

| | `--ground` | `--surface` | `--sunken` |
|---|---|---|---|
| `--text-primary` | 16.40:1 | 14.51:1 | 17.64:1 |
| `--text-secondary` | 9.13:1 | 8.08:1 | 9.82:1 |
| `--text-tertiary` | 5.65:1 | 5.00:1 | 6.07:1 |
| `--guess-ink` | 11.15:1 | 9.87:1 | 11.99:1 |
| `--truth` | 11.39:1 | 10.08:1 | — |
| `--miss` | 5.86:1 | 5.18:1 | — |

`--on-guess` on the gold gradient: **11.08:1** at the top stop, **8.29:1** at the deep stop.
`--miss` at 5.86:1 is a *large* display numeral only (the 0-point band), never body copy.

> ⚠️ **One known conflict, unresolved on purpose.** §5 draws the rail's baseline in `--line`,
> which is **1.36:1** on `--ground` — below the 3:1 non-text floor in §8. It is kept because the
> rail's state is carried by the gold fill, the thumb and the numeral, all of which clear 8:1,
> and because `--line` is the app's shipped token for exactly this part. Raising it would be a
> token change, which is a decision for the app's `design.md` first, not for this file.

---

## 3. Typography

**Two families. No more. This is not negotiable and it is the thing most likely to go wrong.**

The app pairs **New York** (Apple's system serif) with **SF Pro** (Apple's system sans). Both are
available on the web **at zero bytes** on exactly the hardware this site's audience is using:

```css
:root {
  /* New York on every Apple device. ui-serif resolves to it in Safari 13.1+. */
  --font-display: ui-serif, "New York", "Iowan Old Style", "Palatino Linotype",
                  Palatino, Georgia, serif;

  /* SF Pro on Apple, the platform UI face elsewhere. */
  --font-ui: -apple-system, BlinkMacSystemFont, "SF Pro Text", "Segoe UI",
             system-ui, sans-serif;
}
```

**Why this stack and not a webfont:** the audience is iPhone owners. `ui-serif` gives them
literally the typeface the app uses, with no download, no FOUT, no layout shift and no licence.
Nothing bought with a webfont can beat that.

**Non-Apple visitors** (Windows, Android) fall through to Iowan Old Style → Palatino → Georgia,
which is a reasonable transitional-serif approximation. If that is judged not good enough, the
*only* acceptable fix is to self-host one fallback family (Newsreader, Source Serif 4 or Spectral
— all open-licensed, all New York-adjacent) in `public/fonts/` and insert it **after `"New York"`
in the stack**. Because the browser only downloads a font it actually resolves to, Apple devices
never fetch the file. Never a Google Fonts CDN call; never a webfont in front of `ui-serif`.

### The scale

Fluid, `clamp()`-based. The app's pt values are the anchor for the ratios, not the absolute sizes
— a phone held at 30cm and a laptop at 60cm are different problems.

| Role | Family | Size | Weight | Notes |
|---|---|---|---|---|
| H1 / hero | display | `clamp(2.5rem, 7vw, 4.5rem)` | 700 | Tracking −0.02em. The app's subject line is 44pt bold with −0.5 tracking; this is that, scaled up. |
| Section heading | display | `clamp(1.75rem, 4vw, 2.75rem)` | 700 | |
| Numeral | display | `clamp(3rem, 9vw, 5rem)` | 700 | **`font-variant-numeric: tabular-nums`** — see below. |
| Subhead / lede | ui | `clamp(1.125rem, 2vw, 1.375rem)` | 400 | `line-height: 1.45` |
| Body | ui | `1.0625rem` (17px) | 400 | `line-height: 1.6`, `--text-secondary` |
| Small / footnote | ui | `0.8125rem` (13px) | 400 | `--text-tertiary` |
| Eyebrow | ui | `0.6875rem` (11px) | 600 | UPPERCASE, `letter-spacing: 0.16em` (+1.8pt at 11pt) |
| Button label | ui | `1.0625rem` (17px) | 600 | |

### The serif rule — where it may and may not go

In the app: **serif is for numbers and the subject only.** Every piece of interface text is SF
Pro. That split is what makes the serif read as editorial rather than decorative.

**On this site the rule is extended by exactly one step, deliberately:** the serif is also allowed
on the **H1 and section headings**, because on a marketing page the headline *is* the subject
being presented — it is the thing the reader is being asked to measure. This is the one place this
file knowingly departs from the app, and it is recorded in §12.

The serif is **banned** from: buttons, navigation, body copy, labels, form fields, the footer,
captions, the FAQ answers, and anything that is chrome rather than content. If in doubt, it is
SF Pro.

### Tabular numerals are a correctness requirement

`font-variant-numeric: tabular-nums` on **every numeral** — the scoring table, the sample rail's
guess numeral, any count. In the app this is non-negotiable because the guess numeral changes
while the finger moves and proportional digits make it jitter horizontally, which makes the whole
instrument feel cheap. The same is true of any number this site animates or updates.

**"Numeral" means a measurement or a count, not every digit on the page.** A rank, a score, a
points row, a tick label — anything that changes, or that is read against another number — is
tabular. A CVR number in the footer, `iOS 17.6`, a year inside a citation: those are words that
happen to be spelled with digits. They never move and nothing lines up beside them, and setting
them in monospaced figures visibly disturbs the rhythm of the sentence they sit in. The two
villain panels are the borderline case and they *are* tabular, because the whole point of that
section is that the reader compares one panel's figures with the other's.

### Measure

Body text column: `max-width: 34rem` (≈60–66 characters). The app caps its prompt at ~42
characters per line at 17pt — tighter than the web wants, because a phone is narrow. Display type
may run wider but never past `20ch` for the H1, or it stops reading as a statement.

---

## 4. Space, grid, shape

**8px grid.** Every value is a multiple of 4.

```css
--space-xxs: 2px;   --space-xs: 4px;   --space-s: 8px;   --space-m: 16px;
--space-l: 24px;    --space-xl: 32px;  --space-xxl: 48px;
--space-section: clamp(64px, 10vw, 128px);   /* between page sections */
```

**Page gutter:** `20px` on phone — matching the app's 20pt, which is deliberately wider than the
16pt default because the type is large and the screen is otherwise empty. Scale to `32px` at
768px and `48px` at 1024px+. Content column caps at `72rem`.

**Radius:** `--radius-s: 10px` · `--radius-m: 14px` · `--radius-l: 20px`. The primary button takes
`--radius-l`. **Nothing on this site is a perfect capsule except the rail's thumb, which is a true
circle.** No pill buttons, no pill badges, no `border-radius: 999px`.

**Hit targets:** 44×44px minimum, including nav links and the footer — a nav link needs 44px of
*width* as well as height, which "FAQ" does not get for free. The rail's interactive band is 64px
tall even though it draws 3px of line.

**The one carve-out: a link inside a running sentence.** "the <u>privacy policy</u>" in a
paragraph cannot be 44px tall without wrecking the leading of the text around it, and padding it
out would overlap the neighbouring lines, which is worse for a pointer, not better. WCAG 2.2
makes the same exception by name (2.5.8, *inline*). It applies to links set in prose and to
nothing else: every standalone link, button, nav item, footer item and control clears 44px.

**Borders:** 1px, `--line`. Never 2px, never a coloured border except the gold edge on the sample
reveal panel (4px, banded — §5).

**Elevation:** there are no drop shadows on this site except the instrument's own glow (§5). A
raised surface is raised by being `--surface` against `--ground`, plus a 1px `--line` stroke. Not
by a shadow.

---

## 5. The rank rail — the signature component

The one element that gets 120% effort. **Build it in inline SVG**, sized by the text column, with
the same anatomy as the app.

```
                    6                ← guess numeral: display serif, gold,
                    │                  tabular, centred on the thumb
                    ▼
    ├──┼──┼──┼──┼──●──┼──┼──┼──┤     ← rail
    1                        12      ← end labels, --text-tertiary
```

**Anatomy, bottom to top — all seven parts, in order:**

1. **Baseline** — 3px line, `--line`, round caps, spanning the text column. **`--line`, not
   `--sunken`** — §2's token comment calls `--sunken` "the unfilled rail track", which is loose:
   `--sunken` is *darker* than `--ground` (1.26:1 the wrong way) and a track you cannot see is
   not a scale. The app draws it in `--line`. Where the two sections disagree about the rail,
   this one is the rail's spec.
2. **Fill** — rank 1 → the guess, gold, **fading from 25% opacity at the left to 100% at the
   thumb**. The gradient is what makes it read as *accumulated distance* rather than as a progress
   bar. A flat fill is wrong.
3. **Ticks** — one per rank, centred on the line. Minor 9px in `--line`; major 16px in gold at 25%
   at the first rank, the last rank, and every absolute multiple of five. **Above 20 ranks in the
   range, drop the minors** and draw majors only, or the rail turns into a solid block.
4. **Thumb** — 28px gold disc with a 4px `--ground` ring cut out of it and a 1px gold outer
   stroke, over a soft gold glow (blur 14px, 45%). **The cut-out ring is what makes it look
   machined rather than painted on.** Do not simplify it away.
5. **Blade** — a 1px gold line rising 12px from the thumb toward the numeral. It costs nothing and
   it is the detail that ties the number to the position.
6. **Guess label** — the guess's own rank, gold, hanging **below** the thumb.
7. **Truth pin** *(reveal state only)* — 22px teal disc, same ring construction, sitting **on** the
   line, its rank in teal **above** it. Above and not below because the guess took the space
   underneath, and two labels under one rail collide at a distance of one — which is the commonest
   near miss and the exact case the reveal exists to celebrate.
8. **Gap bridge** *(reveal only)* — a dashed 3px rule spanning guess → truth at 30% opacity.
   **This is the point of the whole thing.** The error is a physical distance you can see.
   Drawn in `--text-secondary`, not in gold and not in teal: the bridge measures the error, so
   it belongs to neither the guess nor the truth, and rule 1 forbids a third use of either
   meaning colour.

   **It is drawn twice.** Underneath the dashes, the same dashes again in the background's own
   colour (`--rail-ring`), so each one sits in a notch cut out of whatever is beneath it. Without
   that casing the bridge disappears the moment the guess **overshoots** the truth, because the
   fill runs from rank 1 to the guess — straight under the bridge — and a 30% grey dash on gold
   is nothing at all. The two backgrounds are opposite in luminance, so no single stroke colour
   can survive both; the casing makes the bridge look identical in either direction, which is
   the point, since the error is the same quantity whichever way you missed.

**Two details the anatomy above leaves open, settled here:**

- **The end labels are hidden when a mark sits on that end.** A guess of 1 otherwise prints
  `1st` in gold under the thumb and `1st` in `--text-tertiary` directly beneath it. They are
  hidden by `visibility`, not removed, so the demo can toggle them mid-drag without rebuilding
  nodes.
- **The thumb's glow is a radial gradient, not `feGaussianBlur`.** Same soft halo at the same
  45% peak, with no filter region to overflow and no per-frame blur cost while the thumb is
  being dragged — and rule 5 says a dragged thumb responds on the same frame.

**If the site builds the interactive one-question demo** (`MESSAGING.md` §5), it must behave like
the app's:

- Drag anywhere in the 64px band; the rank under the pointer is selected. The thumb does not have
  to be grabbed. Tapping a position jumps there.
- **1:1 with the pointer. No easing, no rubber-banding, no momentum.** Rule 5.
- Starts at the **midpoint** of the range, so the visitor always has to move it. A pre-answered
  slider makes the first guess feel accidental.
- Keyboard: arrow keys step one rank, Home/End jump to the ends.
- `role="slider"` with `aria-valuemin`/`max`/`now` and `aria-valuetext="Rank 6 of 12"`. The app
  exposes a real slider to VoiceOver for exactly this reason — a hand-rolled adjustable element
  gets its string value silently dropped.
- **A tap focuses the rail but does not draw the focus ring.** Focus has to move so the arrow
  keys adjust it afterwards, the way a native range input behaves; a gold ring appearing under
  your own finger is noise, not feedback. `:focus-visible` does not settle this on its own —
  the focus is programmatic, and browsers disagree about what that means — so the rail marks
  pointer-initiated focus itself and drops the mark on the first keypress. §8's rule is
  unchanged: every element that can be reached by keyboard shows the ring when it is.
- The tick marks and the glow are `aria-hidden`.
- After lock-in the rail is disabled but stays fully visible. It is now a diagram of the result.

**The haptic has no web equivalent and nothing should be substituted for it.** In the app, a
selection tick under the thumb is the single highest-value detail — a slider that ticks feels like
an instrument and a silent one feels like a web page. On the web it *is* a web page, so do not
reach for `navigator.vibrate` (Safari does not support it) or a click sound. Spend the budget on
the visual instead: the glow, the ring cut-out, the blade.

---

## 6. Components

**Primary button** — the one gold thing. Full width on phone, auto on desktop, 56px tall,
`--radius-l`, the gold **gradient** (§2), `--on-guess` label in UI 17/600. Press: `scale(.97)`
over 90ms. Hover: no colour change — it is already the brightest thing on the page; lift the glow
by 10% instead. Label comes from `MESSAGING.md` §5.

**Secondary button** — same geometry, `--surface` fill, 1px `--line` stroke, `--text-primary`
label. Used at most once per section, and never beside the primary in the hero.

**Eyebrow** — a 5px gold dot, 8px gap, then the uppercase tracked label in `--text-tertiary`. This
is the site's section marker. Use it instead of an `<h6>` or a coloured chip.

**Wordmark** — the emblem, then `RANK` in `--text-primary`, then `MASTER` in `--guess-ink`, UI
13px bold, `letter-spacing: 0.2em` (+2.6pt). The emblem sits at **2× the wordmark's font size** —
26px to the wordmark's 13 — which is what it takes to clear the cap height on both sides and read
as a disc rather than as a bullet. The whole lockup is one link and one accessible name,
"RankMaster": the emblem and the letters are the same word said twice.

**Panel** (the sample reveal, the FAQ answers if they need containment) — `--surface`,
`--radius-l`, 1px `--line` stroke, 24px separation from the rail. The app's reveal panel carries a
4px banded edge (§2, result bands) on its leading side; reproduce that on the sample reveal.

**Source citation** — `--text-tertiary`, 13px, prefixed with a small info glyph. Where the site
shows a sample question it **must** show its citation, because "every fact is sourced" is one of
the five authority claims in `MESSAGING.md` §3 and a sample without one undercuts it.

**Icons** — the app uses SF Symbols, which do not exist on the web. **Draw the handful the site
needs as inline SVG**, 1.5px stroke, round caps and joins, on a 24px box, to match SF Symbols
`.medium`. Never an icon font, never emoji, never a third-party set with its own voice. If a
section needs more than about six icons, it is over-decorated — cut them.

**Screenshots** — raw device captures from
`~/Git/rankMaster/RankMaster-IOS/fastlane/screenshots/raw/en-US/`, framed in CSS: a `--line`
1px border at `--radius-l` × the device's proportion, no perspective, no tilt, no shadow, no
floating. `02_Reveal` gets the most space — it is the argument.

---

## 7. Motion

**Direct manipulation is instant; consequence is animated. That is the whole rule.**

| Moment | Treatment |
|---|---|
| Dragging the demo's thumb | **None.** 1:1 with the pointer, every frame. |
| Hover on a link or button | 120ms, opacity/transform only. Never colour-cycling. |
| Button press | `scale(.97)`, 90ms. |
| Section entering the viewport | Fade + 12px rise, 400ms `ease-out`, once, staggered 60ms at most. |
| Truth pin appearing (demo) | 60ms delay, then `scale(0→1)` with a slight overshoot — the pin *lands*. |
| Gap bridge (demo) | Fade in 350ms, starting with the pin. |
| Points count-up (demo) | 90ms per point from 0, after a 300ms beat. A 10-point win takes 0.9s and is worth every millisecond. |
| Anything else | Nothing. |

**Nothing on this site loops, pulses, floats, parallaxes or bursts.** In the app, exactly one
thing bursts — a gold ring and eight sparks, only on an exact hit — and that restraint is what
makes it worth seeing. A landing page with an ambient animation has spent that budget on nothing.

**`prefers-reduced-motion: reduce` is honoured exactly as the app honours it:** every spring
becomes a 150ms linear cross-fade, the pin appears without scaling, the count-up is skipped and
shows its final value immediately, and scroll-triggered reveals do not move — they are simply
already visible. Not "reduced" — *replaced*.

---

## 8. Accessibility

Non-negotiable, and the floors are the app's, not the web's minimum:

- **Contrast:** body ≥7:1, large text ≥4.5:1, non-text ≥3:1. Measured against the brightest pixel
  behind the element, not against `--ground` (§2).
- **Colour is never the only signal.** Guess and truth differ by shape, by position and by text,
  not only by gold vs teal. The scoring table states points as numbers, not just as bands.
- **Every interactive element has a visible focus ring** — 2px gold, 2px offset. The gold is the
  one place a focus ring may use a meaning colour, because focus *is* "where you are", which is
  what gold means.
- Keyboard: full tab order, skip-link to main, no keyboard trap in the demo.
- The stage art, the rail's ticks and every glow are `aria-hidden`.
- `prefers-reduced-motion` and `prefers-reduced-transparency` both honoured.
- Headings form a real outline: one `h1`, no level skipped, no heading used for its size.
- Respect zoom to 200% without horizontal scroll.

---

## 9. Localization — design consequences

The app ships in 10 languages; the site launches English, Danish second (`CLAUDE.md` §5). The
app's rule applies here from the first commit, because retrofitting is miserable:

- **German and Danish run ~30% longer than English.** No button may be sized to fit its English
  label. No `white-space: nowrap` on anything that holds a translated string. Test every
  component at +30% text before calling it done.
- The H1 must survive two lines at its largest size without overflowing.
- Numerals stay Latin and tabular in every locale.
- The `1.` / `12.` ordinal suffix under the rail is locale-dependent and must come from
  `Intl.PluralRules`/`Intl.NumberFormat`, never a hardcoded `.`.

---

## 10. Assets — where to take them from, and the trap

| Asset | Take it from | Notes |
|---|---|---|
| **Logo (full)** | `RankMaster/ICON.icon/Assets/rankmaster-logo.svg` | The current indigo-and-gold mark. Ground is `#0A1130`. |
| **Emblem (mark only)** | `RankMaster/Assets.xcassets/Emblem.imageset/rankmaster-emblem.svg` | Disc + four ascending bars + star, cropped to the disc's bounds. This is the one to put in the wordmark and the favicon. |
| **Stage** | `RankMaster/Assets.xcassets/Stage.imageset/rankmaster-stage.png` | 1080×2160. Re-export at 0.70 exposure, AVIF/WebP (§2). |
| **Screenshots** | `fastlane/screenshots/raw/<locale>/` | Raw, not `framed/` — the framed ones have App Store caption text baked in. |
| **Caption copy** | `fastlane/frame_titles.json` | Already written and already localized into all ten languages. |

All paths relative to `~/Git/rankMaster/RankMaster-IOS/`.

> ### ⚠️ Do not use the `Icon/` directory.
> `Icon/icon.svg`, `icon.png`, `icon-light.*` and `icon-fg-*.svg` are **stale** — dated
> 2026-09-15 and drawn in the *old warm palette* (`#2E271D` → `#171412` ground, `#F0A93B` gold).
> The design moved to the indigo stage in decisions D-081/D-084 and the shipping assets are dated
> 2026-09-18. Using anything from `Icon/` would put a brown app icon on a navy site.
> Two further traps in the current logo SVG, both of which must be fixed on the copy that lands in
> `public/`, not left as-is: it carries an embedded **C2PA metadata block** (kilobytes of base64,
> strip it), and its `aria-label` says **"RANGVID app logo"** — a leftover from another project.

**Favicon and OG image:** build both from the emblem on `--ground`. The OG image is 1200×630 and
should be the emblem plus the one-liner short form from `MESSAGING.md` §8 — set in the display
serif, gold on indigo. Not a screenshot, not a collage.

### What shipped, and how to rebuild it

| In `public/images/` | Built from | How |
|---|---|---|
| `emblem.svg` | `Emblem.imageset/rankmaster-emblem.svg` | Copied verbatim. It carries neither of the logo's two traps — no C2PA block, no `RANGVID` label — which is the second reason to prefer it over `rankmaster-logo.svg`. |
| `favicon.ico`, `favicon-16x16.png`, `favicon-32x32.png`, `apple-touch-icon.png`, `emblem-512.png` | `emblem.svg` | `rsvg-convert` onto a flat `--ground` square. **Not ImageMagick** — its internal SVG renderer drops the gradients and returns a black disc. |
| `stage{,-mobile}.{avif,webp,jpg}` | `Stage.imageset/rankmaster-stage.png` | `magick -colorspace sRGB -evaluate multiply 0.7`, which is the exact arithmetic `filter: brightness(.7)` performs, then 1080px desktop / 800px mobile. The source is 1080px wide, so it is never upscaled to the 1440px ceiling. 132 KB PNG → 10 KB AVIF. |
| `og-image.png` | `scripts/og-card.html` | `scripts/build-og.sh`, through headless Chrome, so `ui-serif` resolves to the real New York. ImageMagick and rsvg cannot see Apple's system UI faces — `fc-match "New York"` returns Verdana. |
| `app-store-badge.svg` | Apple's badge API | Fetched once and self-hosted, rather than hot-linking `tools.applemediaservices.com` on every page view. |

---

## 11. Checklist before any page is called done

**Most of this list is now a script.** `scripts/verify.sh` runs the parts a machine can judge —
contrast against the brightest pixel behind each element, the serif's boundaries, tabular
numerals, overflow and 44px targets at 375 / 700 / 768 / 1024 / 1400, a +35% text stress, the
one-gold-surface rule at every scroll position, looping animations, the reduced-motion
replacement, internal links, stray `Icon/` assets and one-off hex. Run it against a preview
server and read the output; it prints findings rather than a pass mark, because several of the
"failures" are deliberate and documented (every `--text-tertiary` label, for one).

Two lines of the list cannot be scripted. **Real iOS Safari** is done in the Simulator —
`xcrun simctl openurl <udid> <url>`, then `idb ui swipe`/`idb ui tap` to drive the rail by touch,
which is the only way to confirm that `touch-action: none` actually stops the page scrolling under
a dragging finger. And whether the page is any good is still a judgement.


- [ ] Every colour on the page is a token from §2. No one-off hex values anywhere.
- [ ] Gold and teal appear **only** as guess and truth. No gold dividers, no teal links.
- [ ] No two gold-filled surfaces in view at once, at any scroll position, at any width.
- [ ] The serif appears only on H1, section headings and numerals. Nowhere else.
- [ ] Every numeral is `tabular-nums`.
- [ ] A real rank rail is on the page, with all seven parts including the ring cut-out, the blade
      and the fill gradient.
- [ ] Body copy clears 7:1 **against the brightest pixel behind it**, including over the stage.
- [ ] Nothing loops, pulses or floats.
- [ ] `prefers-reduced-motion` replaces every animation, and the page is fully usable with it on.
- [ ] Every component survives +30% text length without breaking.
- [ ] 44px minimum hit targets, visible gold focus rings, full keyboard path.
- [ ] 375 / 768 / 1024 / 1400px all checked, **on real iOS Safari**, not only DevTools.
- [ ] Zero layout shift from fonts or the stage image. Lighthouse ≥95 across the board.
- [ ] Nothing from `Icon/` is in `public/`.

---

## 12. Where this file knowingly departs from the app

Recorded, with reasons. Append to this list rather than silently diverging.

| # | Departure | Why |
|---|---|---|
| W-001 | **The serif is allowed on headings**, not only on the subject and numerals. | On a marketing page the headline *is* the subject being presented. The app's split exists so the serif reads as editorial rather than decorative; on a page that is entirely editorial, headings are the subject. Still banned from all chrome. |
| W-002 | **The stage is the hero's background, not the page's.** | The artwork is 1:2 portrait and top-anchored around a beam convergence. A desktop viewport is landscape; stretching it destroys the image. Below the hero, flat `--ground`. |
| W-003 | **No haptic, and nothing substitutes for it.** | The selection tick is the app's highest-value detail and has no honest web equivalent. `navigator.vibrate` is unsupported in Safari; a click sound is worse than silence. |
| W-004 | **Fluid `clamp()` type instead of Dynamic Type.** | The app scales type by the player's content-size setting; the web scales by viewport. The pt values in the app's §3 are kept as *ratios*, not as absolute sizes. |
| W-005 | **SF Symbols replaced by hand-drawn inline SVG** at matching weight. | SF Symbols are not licensed or available for web use. |
| W-006 | **Fonts come from the system stack, not a webfont.** | `ui-serif` resolves to New York and `-apple-system` to SF Pro on the audience's own hardware, at zero bytes. Any self-hosted fallback sits *after* them so Apple devices never fetch it. |
