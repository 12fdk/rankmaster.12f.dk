// DESIGN.md §7 and §11: "Nothing on this site loops, pulses, floats,
// parallaxes or bursts", and prefers-reduced-motion is *replaced*, not
// shortened. Run it twice — once normally, once with --motion=reduce.
(() => {
  const looping = [];
  const moving = [];
  document.querySelectorAll("body *").forEach((el) => {
    const cs = getComputedStyle(el);
    if (cs.animationName !== "none" && cs.animationIterationCount !== "1") {
      looping.push(`${el.tagName.toLowerCase()} ${cs.animationName} ×${cs.animationIterationCount}`);
    }
    if (cs.animationName !== "none") {
      moving.push(`${el.tagName.toLowerCase()} ${cs.animationName} ${cs.animationDuration}`);
    }
  });

  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const reveals = [...document.querySelectorAll("[data-reveal]")];
  const hiddenReveals = reveals.filter((el) => getComputedStyle(el).opacity === "0").length;

  return JSON.stringify(
    {
      reducedMotion: reduced,
      loopingAnimations: [...new Set(looping)],
      runningAnimations: [...new Set(moving)],
      reveals: reveals.length,
      // Under reduced motion no reveal may be waiting at opacity 0 — the CSS
      // leaves them visible rather than animating them in.
      revealsStillHidden: hiddenReveals,
    },
    null,
    1,
  );
})();
