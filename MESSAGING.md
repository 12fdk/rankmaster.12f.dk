# MESSAGING.md — RankMaster StoryBrand

The messaging brief for **rankmaster.12f.dk**. Every headline, section, button and meta
description on the site comes from this file. If a piece of copy cannot be traced back to an
element below, it does not belong on the page.

Built with the SB7 framework (Donald Miller, *Building a StoryBrand*). Written 2026-09-19.

> **The one rule:** the player is the hero. RankMaster is the guide. The site never says how
> clever the game is; it says how clever the player is about to find out they are.

---

## 0. Reality check — what we may and may not claim

Verified against `itunes.apple.com/lookup?id=6810373394` on 2026-09-19:

| Fact | Value |
|---|---|
| Released | **2026-09-18** — the day before this was written |
| Ratings | **0** |
| Reviews | **0** |
| Price | Free |
| Age rating | 4+ |
| Genres | Games → Trivia, Puzzle |
| Languages | 10 (DA, NL, EN, FR, DE, IT, NB, PT, ES, SV) |
| Minimum iOS | 17.6 |
| Size | 24 MB |

**Therefore: no social proof anywhere on the launch site.** No star rating, no review count, no
"join thousands of players", no invented testimonials. The framework's authority (§3) is built
entirely from things that are true on day one. This is a constraint, not a weakness — see §3.

Switch social proof on later, not sooner: the `MIN_RATING_COUNT = 5` gate described in
`CLAUDE.md` §7 exists for exactly this. A 5.0 from two ratings reads as fake and costs more
trust than it buys.

---

## 1. Character — the hero

**Who:** Someone who reckons they have a decent sense of the world. They read the news, finish
the documentary, hold their own at a pub quiz. Not a trivia obsessive who memorises capitals —
the opposite. They know roughly where things stand and have never had a way to find out whether
"roughly" is any good.

**What they want (one desire):** To find out how well they actually know the world — and to
watch that get better.

**Aspirational identity:** The person at the table whose instinct for scale can be trusted.
Ask them how big Madagascar is, or where Nigeria sits on population, and the answer they give
off the top of their head is close.

> **Copy discipline:** one desire per page. The homepage is about *finding out how well you know
> the world*. Not about leaderboards, not about categories, not about daily streaks. Those are
> evidence for the desire, not competing desires.

### Secondary segments (for later pages/ads, never the homepage)

| Segment | Their version of the desire |
|---|---|
| The daily-puzzle habit (Wordle, Connections) | "One more thing to do with my coffee that isn't doomscrolling." |
| The competitive quizzer | "Prove it against everyone else playing the same ten questions." |
| Parents / teachers (4+ rated, sourced facts) | "Something my kid can play that is actually about the world." |

---

## 2. Problem

### External (tangible)
Every quiz app grades you right or wrong. You either had the fact memorised or you did not.
Nothing measures whether your *sense* of the world is any good.

### Internal (how it feels) — this is the one that sells
You said Australia was the 5th largest country. It is the 6th. A red cross, zero points, and
the quiet suggestion that you knew nothing at all. **You did know. You were one place off.**
Being nearly right has never counted for anything, and it makes a knowledgeable person feel
stupid.

### Philosophical (the injustice)
Knowing roughly where things stand *is* knowledge — arguably the more useful kind. Judgement
should be worth something. A game that treats "nearly right" as identical to "no idea" is
measuring memory and calling it knowledge.

### The villain
**The red cross.** The right/wrong buzzer that throws away the distance between a good guess and
a wild one. Give it a face on the page — literally draw it, then draw what RankMaster does
instead.

*Secondary villain, for the "free, no ads" beats:* the free quiz app that is really an
advertising machine wearing a quiz as a costume — lives, timers, interstitials, a popup between
you and the next question.

> Keep the secondary villain secondary. Two villains on one page splits the story.

---

## 3. Guide — RankMaster

### Empathy (lead with this)

> "You knew Australia was one of the big ones. You said 5th. It's 6th. Every quiz you have ever
> played called that wrong."

Empathy lines to use across the site:
- "You are not bad at this. You have been marked badly."
- "Nobody has the list memorised. That was never the interesting question."
- "You knew it was about that big. That is worth eight points here."

### Authority — day one, no social proof

Five proof points, all true on launch day and all verifiable by the visitor:

1. **The scoring rule is published in full.** Exact = 10, one off = 8, two off = 6, three = 4,
   four = 2, five or more = 0. Print the table on the page. A game confident enough to show you
   its marking scheme before you play is a game that is not fudging it.
2. **Every question cites its source and the year the number is from.** Rankings go stale; the
   app tells you which vintage you are playing. Show a real citation in the screenshot.
3. **Free. No ads, no subscription, no in-app purchases.** Nothing to upsell, so nothing to
   interrupt you.
4. **No tracking.** We never touch the advertising identifier, we run no attribution or ad SDKs,
   and nothing is ever sold or shared with data brokers. (Substantiated by the privacy policy
   and the App Store nutrition label — do not soften or overstate this wording.)
5. **Made by 12F ApS**, a registered Danish company (CVR 45362957), by a named developer, with
   a support address a human answers: `rankmaster@12f.dk`. Not an anonymous studio.

**What is explicitly banned from the launch site:** star ratings, review counts, download
counts, player counts, testimonials, "as featured in", and any phrasing implying an existing
crowd ("join the players who…"). The daily challenge is shared by everyone playing *today* —
that is a true statement about the format, not a claim about volume. Write it as format.

**Do not tell the origin story.** No "why I built this", no founder journey on the homepage.
That is hero behaviour. One line of provenance in the footer and on `/support.html` is plenty.

### Tone

Plain, dry, quietly confident. Short sentences. The app's own voice — read
`~/Git/rankMaster/RankMaster-IOS/fastlane/metadata/en-US/description.txt` and match it. No
exclamation marks, no "Ready to test your knowledge?!", no emoji in body copy.

Banned words: *ultimate, addictive, brain-teasing, mind-blowing, challenge yourself, test your
knowledge, gamified, unleash, embark*. Every one of them is what the competition writes.

---

## 4. The Plan

### Process plan — three steps, this is the "How it works" section

| # | Title | Copy |
|---|---|---|
| 1 | **Read the fact** | A fact with the rank taken out. *Madagascar is the __ largest island in the world.* |
| 2 | **Slide to your guess** | No options to pick from. Put the marker where you think it lands. |
| 3 | **See the distance** | The true rank appears on the same scale, and the gap between the two is drawn out. Closer scores more. |

Ends with the Direct CTA button. Three steps, no more.

### Agreement plan — put these directly under the download button

- **Free, with no ads and nothing to buy.**
- **No sign-up.** You are playing within seconds of opening it.
- **Play anonymously and nothing leaves your phone.** Scores are only sent once you choose to
  sign in.
- **Your display name is the only thing other players ever see.** Change it whenever you like.
- **Delete everything, from inside the app, whenever you want.**

Each of these is load-bearing legally as well as commercially — they must stay consistent with
`/privacy-policy.html`. If one changes, change both.

---

## 5. Calls to action

**Direct CTA — one action, everywhere:** download the app.

Button label: **"Play today's ten"** — states the outcome, not the mechanism. The Apple badge
sits beside it for recognition; the badge alone is a weaker CTA than a labelled button.
Acceptable alternates: *"Get RankMaster — free"*, *"Download on the App Store"* (fallback if the
badge must stand alone).

Placement: header, hero, after the How-it-works section, after the screenshots, and in the final
CTA block. Gold (`#F4C24A`) on navy, `#14102E` label — it is the only gold button on the page,
so nothing competes with it.

**Transitional CTA — the recommended one requires building something:**

> **"Try one question, right here."** — a single question playable in the browser: the fact, the
> slider, the reveal, the score. Then: *"That's one. There are ten waiting in the app."*

This is the strongest possible transitional CTA for this product, because the product's entire
argument — that the distance between guess and truth is more interesting than a tick or a cross
— can be *demonstrated* in about eight seconds and cannot be explained in a paragraph. It is
worth the build. Scope it as its own GitHub issue.

Cheaper fallbacks if that is cut: *"See how scoring works"* (anchor to the scoring table), or
*"Read today's sources"*. **Do not** build an email capture — there is no newsletter to put
people in, and a transitional CTA that leads nowhere is worse than none.

### The demo's question, and the words in it

**The question is a real one from the app's own content**, not one written for the site:
`~/Git/rankMaster/rankmaster-backend/seed/questions/en.json`. Using a real one is not a detail —
authority point 2 is that every question cites its source and its year, and a sample question
invented for a landing page cannot honestly carry a citation.

> **Brazil is the __ largest country in the world by total area.** 1–20, answer **5**.
> *UN Statistics Division, Demographic Yearbook — surface area, 2023.*

Chosen because a thoughtful visitor lands on 5 or 6. The demo exists to show that the *distance*
scores, so a question almost everyone gets exactly right proves nothing, and one almost everyone
misses by six argues against the product. Brazil sits where the argument is.

**The verdicts are the app's own**, from `RankMaster/Game/Scoring.swift`, minus the emoji and the
exclamation mark — §3 bans both in the site's voice, and so does `DESIGN.md` §1:

| Off by | App string | On the site |
|---|---|---|
| 0 | `Exactly right 🎯` | **Exactly right.** |
| 1 | `Only one place off!` | **Only one place off.** |
| 2 | `Close.` | **Close.** |
| 3–4 | `Not quite.` | **Not quite.** |
| 5+ | `Way off.` | **Way off.** |

The closing line after the reveal is fixed: *"That's one. There are ten waiting in the app."*

---

## 6. Failure — the stakes

Proportionate and honest. This is a free game; the stakes are small and the copy must not
pretend otherwise. Manufactured urgency would break the tone that the rest of the page depends
on.

Two honest stakes, both structural facts about the product:

1. **Today's ten expire.** The daily is the same ten questions for everyone, for one day. Miss
   it and it is gone — tomorrow is a different ten. *"Today's ten are live until midnight."*
2. **You still do not know.** *"You can keep assuming you're good at this. Or you can find out
   in about two minutes."*

One stakes line, once, immediately before a CTA. Never a countdown timer, never "don't miss
out", never a fake scarcity badge.

---

## 7. Success — what the page is selling

**Status:** You become the person at the table whose guess is close. Not the one who recites the
list — the one whose instinct is right.

**Completeness:** You finally have a number for something you have only ever assumed: how well
you know the world. And it moves.

**Self-realization:** You stop learning lists and start learning the *shape* of things — how big,
how many, in what order. That does not leave you when the quiz ends.

**Specific, substantiable outcomes** (all true; none require social proof):
- Ten questions a day, the same ten as everyone else playing today.
- You see exactly how far off you were, every time, on the same scale as your guess.
- Every answer comes with where the number came from and what year it is from.
- You can play for two minutes or until you get bored — daily, endless, or by category.

Success imagery = the **reveal screen** (`02_Reveal`), not the guess screen. The guess screen is
the problem; the reveal is the resolution. Whatever else the page shows, the reveal gets the
most space.

---

## 8. The one-liner

**Primary — use this in the App Store subtitle's spirit, the site's meta description, the
footer, and any bio:**

> **RankMaster is the quiz where you slide to your answer instead of picking one — so being
> close still counts, and you finally find out how well you know the world.**

**Cocktail-party short form** (the repeatable one):

> **"It's a quiz where nearly right still scores."**

**Full SB7 formula version** (for internal use, decks, App Store review notes):

> We help people who know more about the world than any right-or-wrong quiz gives them credit
> for guess where things rank on a sliding scale, so being close finally counts — and they find
> out how good their judgement really is.

**Variants, for ads and social bios:**
- *"You don't have to be right. Just close."*
- *"Ten questions a day. No multiple choice, no red crosses."*
- *"A quiz that measures judgement, not memory."*

Passes the tests: a competitor cannot use it (the sliding scale is the differentiator), it
names the problem (right-or-wrong grading), and the benefit is a transformation, not a feature.

---

## 9. Homepage wireframe — with the actual copy

Section order is the StoryBrand order. Build it in this order too.

### Above the fold

```
LOGO                    How it works · Modes · FAQ      [ Play today's ten ]
─────────────────────────────────────────────────────────────────────────────
              Find out how well you really know the world.

        Ten questions a day. Slide to your guess — the closer you land,
              the more you score. Free, no ads, no sign-up.

                      [ Play today's ten ]   [ Apple badge ]

                    « Try one question, right here » (transitional)

                     [ Hero: the reveal screen, 02_Reveal ]
```

- **H1:** `Find out how well you really know the world.`
  (Alternate, matching screenshot slot 1 and the App Store opening line, if message-match with
  the store listing is judged more valuable than the declarative form:
  `How well do you really know the world?`)
- **Subhead:** `Ten questions a day. Slide to your guess — the closer you land, the more you score.`
- **Trust line under the CTA:** `Free · No ads · No sign-up · No tracking`
- **Hero image:** the reveal, not the guess. Show the gap.

### Stakes — short, one block

> Every quiz you've played told you that a guess one place off was simply wrong.
> So you still don't know whether you're good at this.

### The problem, made visible

Two panels side by side. Left: a red cross, "Australia — 5th. WRONG. 0 points." Right:
RankMaster's reveal, "You said 5. It's 6. **8 points.**" No headline needed above it; the
picture is the argument. If one is wanted: **`Nearly right has never counted. It does here.`**

### Value proposition — three benefits, outcomes not features

| | |
|---|---|
| **Being close counts** | Exact takes ten points. One place off takes eight. This is a game about judgement, not memorised lists. |
| **You see exactly how close** | The true rank appears on the same scale as your guess and the distance is drawn out in full. No red crosses. Just the gap. |
| **Everyone gets the same ten** | One shared daily round, the same ten questions for every player, everywhere, every day. |

### Guide section — empathy then authority

Headline: **`You knew it was about that big.`**

Body: the empathy paragraph from §3, then the five authority points from §3 as a plain list.
No founder photo. No logo strip — there is nothing honest to put in one yet.

### Plan — "How it works"

The three steps from §4, then the scoring table in full:

| Off by | 0 | 1 | 2 | 3 | 4 | 5+ |
|---|---|---|---|---|---|---|
| **Points** | **10** | 8 | 6 | 4 | 2 | 0 |

Caption: `That's the whole marking scheme. Nothing hidden.`
Then the Direct CTA.

### Screenshots

Raw captures, framed in CSS. Order: `02_Reveal` first (the argument), then `01_Guess`,
`06_Categories`, `04_Leaderboard`, `03_Summary`. Caption each with the line from
`fastlane/frame_titles.json` for that slot — the copy is already written and already localized.

### Modes — four, one line each

Daily · Endless · Categories · Versus. One sentence each, no icons-for-the-sake-of-icons.

### Agreement plan

The five commitments from §4, as a plain list. This is where the privacy story lives on the
homepage — briefly, linking to `/privacy-policy.html`, not restated in full.

### FAQ (also the `FAQPage` JSON-LD source)

Port from `~/Git/12f.dk/content/rankmaster/support.md`, which already answers the real ones:
how scoring works, why a leaderboard needs an account, what happens to scores from before you
signed in. Add: *Is it free?* *Are there ads?* *What languages?* *Which iPhones?* (iOS 17.6+.)

### Final CTA

```
                   [ Success image: the reveal, or a summary screen ]

                     Today's ten are live until midnight.

                            [ Play today's ten ]
```

### Footer

12F ApS · CVR 45362957 · `rankmaster@12f.dk` · Privacy · Support · the one-liner, once.

---

## 10. Localization note

The site launches English-only (`CLAUDE.md` §5), Danish second. When Danish lands, **the one-liner
and the H1 get translated by meaning, not word-for-word** — "nearly right still scores" has to
land as an idiom in Danish, and the App Store screenshot captions in
`fastlane/frame_titles.json` already show how each line was solved in all ten languages. Use
those as the tone reference for any locale, rather than translating this document literally.

---

## 11. Diagnostic — where this scores today

| # | Check | Status |
|---|---|---|
| 1 | Understandable in 5 seconds | ✅ "Slide to your guess. Closer is better." |
| 2 | Customer is the hero | ✅ No origin story; every headline is about the player |
| 3 | Internal problem named | ✅ "Being nearly right has never counted" — the emotional core |
| 4 | Empathy **and** authority | ⚠️ Empathy strong. Authority is transparency + provenance only, because there are no ratings yet |
| 5 | Clear 3-step plan | ✅ Read · Slide · See the distance |
| 6 | One obvious CTA | ✅ "Play today's ten", gold, repeated, only gold button on the page |
| 7 | Success **and** failure stakes | ✅ Both present, stakes deliberately small |

**Score: 8/10 as written. The two points are recoverable, not rhetorical:**

1. **+1 — Build the one-question web demo** (§5). It converts the central claim from an
   assertion into an experience, and it is the only transitional CTA worth having here.
2. **+1 — Add real social proof once it exists.** At ≥5 ratings, switch on the build-time
   rating block; at the first genuine App Store review worth quoting, add a testimonial with
   the reviewer's name and country as shown in the store. **Never before, and never invented.**

Re-run this diagnostic against the built page before launch, not against this document.
