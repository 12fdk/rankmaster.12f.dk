/* RankMaster — rankmaster.12f.dk
 *
 * Two things: scroll reveals, and the one-question demo.
 * No framework, no bundler. The page works without any of this.
 */

(() => {
  "use strict";

  const reduceMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* --------------------------------------------------------------------
     Ordinals. Mirrors src/utils/ordinal.ts — if a locale is added there,
     add it here too, or the rail's labels will stop agreeing with each
     other the moment the demo is touched.
     -------------------------------------------------------------------- */
  const SUFFIXES = {
    en: { one: "st", two: "nd", few: "rd", other: "th" },
    da: { other: "." },
  };

  function ordinal(n, locale) {
    const lang = (locale || document.documentElement.lang || "en").split("-")[0];
    const table = SUFFIXES[lang] || SUFFIXES.en;
    const category = new Intl.PluralRules(SUFFIXES[lang] ? lang : "en", {
      type: "ordinal",
    }).select(n);
    return n + (table[category] || table.other);
  }

  /* --------------------------------------------------------------------
     Scroll reveals. Fade + 12px rise, once, never on the way back up.
     With reduced motion the CSS has already left them visible, so this
     does not run at all.
     -------------------------------------------------------------------- */
  function initReveals() {
    const items = document.querySelectorAll("[data-reveal]");
    if (!items.length) return;
    if (reduceMotion() || !("IntersectionObserver" in window)) {
      items.forEach((el) => el.classList.add("is-visible"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.1 },
    );
    items.forEach((el) => io.observe(el));
  }

  /* --------------------------------------------------------------------
     The rank rail.

     Rule 5: direct manipulation is instant. Every pointer event moves the
     thumb on the same frame — no easing, no rubber-banding, no momentum,
     and no requestAnimationFrame queue between the finger and the mark.
     -------------------------------------------------------------------- */
  function createRail(root) {
    const track = root.querySelector(".rail__track");
    const svg = root.querySelector(".rail__svg");
    const min = Number(root.dataset.min);
    const max = Number(root.dataset.max);

    const thumbCircles = root.querySelectorAll("[data-rail-thumb] circle");
    const blade = root.querySelector("[data-rail-blade]");
    const fill = root.querySelector("[data-rail-fill]");
    const guessLabel = root.querySelector("[data-rail-guess-label]");
    const readout = root.querySelector("[data-rail-readout]");
    const numeral = root.querySelector("[data-rail-numeral]");
    const endMin = root.querySelector('[data-rail-end="min"]');
    const endMax = root.querySelector('[data-rail-end="max"]');

    let value = Number(root.dataset.guess);
    let locked = false;

    const pct = (rank) => ((rank - min) / (max - min)) * 100;

    function paint() {
      const p = pct(value) + "%";
      thumbCircles.forEach((c) => c.setAttribute("cx", p));
      if (blade) {
        blade.setAttribute("x1", p);
        blade.setAttribute("x2", p);
      }
      if (fill) fill.setAttribute("width", p);
      if (guessLabel) {
        guessLabel.setAttribute("x", p);
        guessLabel.textContent = ordinal(value);
      }
      if (readout) readout.style.setProperty("--pos", p);
      if (numeral) numeral.textContent = String(value);
      if (endMin) endMin.classList.toggle("is-hidden", value === min);
      if (endMax) endMax.classList.toggle("is-hidden", value === max);
      track.setAttribute("aria-valuenow", String(value));
      track.setAttribute("aria-valuetext", "Rank " + value + " of " + max);
      root.dataset.guess = String(value);
    }

    function set(next) {
      const clamped = Math.min(max, Math.max(min, next));
      if (clamped === value) return;
      value = clamped;
      paint();
    }

    function rankAt(clientX) {
      const box = svg.getBoundingClientRect();
      if (!box.width) return value;
      const t = (clientX - box.left) / box.width;
      return min + Math.round(t * (max - min));
    }

    let pointerId = null;

    track.addEventListener("pointerdown", (e) => {
      if (locked) return;
      pointerId = e.pointerId;
      track.setPointerCapture(pointerId);
      // Focus so the arrow keys adjust the rail after a tap, the way a native
      // range input behaves — but mark it as pointer-initiated, because a
      // focus ring that appears under your own finger is noise, not feedback.
      track.dataset.pointerFocus = "";
      track.focus({ preventScroll: true });
      set(rankAt(e.clientX));
      e.preventDefault();
    });

    track.addEventListener("pointermove", (e) => {
      if (locked || e.pointerId !== pointerId) return;
      set(rankAt(e.clientX));
    });

    const release = (e) => {
      if (e.pointerId !== pointerId) return;
      if (track.hasPointerCapture(pointerId)) track.releasePointerCapture(pointerId);
      pointerId = null;
    };
    track.addEventListener("pointerup", release);
    track.addEventListener("pointercancel", release);

    track.addEventListener("blur", () => {
      delete track.dataset.pointerFocus;
    });

    track.addEventListener("keydown", (e) => {
      if (locked) return;
      // The moment a key is used, the ring is wanted again.
      delete track.dataset.pointerFocus;
      let next = null;
      switch (e.key) {
        case "ArrowRight":
        case "ArrowUp":
          next = value + 1;
          break;
        case "ArrowLeft":
        case "ArrowDown":
          next = value - 1;
          break;
        case "Home":
          next = min;
          break;
        case "End":
          next = max;
          break;
        default:
          return;
      }
      e.preventDefault();
      set(next);
    });

    return {
      get value() {
        return value;
      },
      lock() {
        locked = true;
        track.setAttribute("aria-disabled", "true");
        // Stays fully visible — it is now a diagram of the result.
        root.classList.add("rail--locked", "rail--revealed");
      },
      /** Land the truth pin and draw the bridge across the error. */
      reveal() {
        const bridge = root.querySelectorAll("[data-rail-bridge]");
        const truth = root.querySelector("[data-rail-truth]");
        const pin = root.querySelector("[data-rail-truth-pin]");
        bridge.forEach((b) => {
          b.setAttribute("x1", pct(value) + "%");
          b.classList.remove("is-pending");
        });
        if (!truth) return;
        truth.classList.remove("is-pending");
        if (reduceMotion() || !pin) return;
        // The pin lands: 60ms beat, then scale 0 → 1 with a slight overshoot.
        pin.classList.add("is-landing");
        pin.addEventListener("animationend", () => pin.classList.remove("is-landing"), {
          once: true,
        });
      },
    };
  }

  /* --------------------------------------------------------------------
     The one-question demo.
     -------------------------------------------------------------------- */
  const VERDICTS = [
    // The app's own strings (Game/Scoring.swift), minus the emoji and the
    // exclamation mark — MESSAGING.md §5 has the table and the reason.
    "Exactly right.",
    "Only one place off.",
    "Close.",
    "Not quite.",
    "Not quite.",
  ];
  const verdictFor = (distance) => VERDICTS[distance] || "Way off.";

  // max(0, 10 - 2 * |guess - answer|). CLAUDE.md §2 names this the single
  // source of truth for the whole game; it is copied here, not reshaped.
  const pointsFor = (distance) => Math.max(0, 10 - 2 * distance);

  /** Colour band for a result (DESIGN.md §2). A mark colour, never a fill. */
  function bandFor(points) {
    if (points >= 8) return "truth";
    if (points >= 4) return "guess";
    if (points >= 2) return "secondary";
    return "miss";
  }

  function countUp(el, to, done) {
    if (reduceMotion() || to === 0) {
      el.textContent = String(to);
      if (done) done();
      return;
    }
    let n = 0;
    el.textContent = "0";
    const step = () => {
      n += 1;
      el.textContent = String(n);
      if (n < to) {
        setTimeout(step, 90);
      } else if (done) {
        done();
      }
    };
    setTimeout(step, 90);
  }

  function initDemo() {
    const demo = document.querySelector("[data-try]");
    if (!demo) return;
    const railEl = demo.querySelector(".rail");
    const lockBtn = demo.querySelector("[data-try-lock]");
    const revealEl = demo.querySelector("[data-try-reveal]");
    if (!railEl || !lockBtn || !revealEl) return;

    const answer = Number(demo.dataset.answer);
    const rail = createRail(railEl);
    const hint = demo.querySelector("[data-try-hint]");
    const pointsEl = demo.querySelector("[data-try-points]");
    const verdictEl = demo.querySelector("[data-try-verdict]");
    const saidEl = demo.querySelector("[data-try-said]");
    const panel = demo.querySelector("[data-try-panel]");

    // The demo needs JavaScript, so the affordances that only mean anything
    // with it are switched on here rather than shipped in the HTML.
    demo.classList.add("try--ready");

    lockBtn.addEventListener("click", () => {
      const guess = rail.value;
      const distance = Math.abs(guess - answer);
      const points = pointsFor(distance);

      rail.lock();
      lockBtn.disabled = true;
      if (hint) hint.hidden = true;

      saidEl.textContent = ordinal(guess);
      verdictEl.textContent = verdictFor(distance);
      panel.dataset.band = bandFor(points);
      revealEl.hidden = false;

      rail.reveal();
      // A 300ms beat, then 90ms per point. A ten-point win takes 0.9s and is
      // worth every millisecond (DESIGN.md §7).
      setTimeout(() => countUp(pointsEl, points), reduceMotion() ? 0 : 300);
    });
  }

  const start = () => {
    initReveals();
    initDemo();
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start);
  } else {
    start();
  }
})();
