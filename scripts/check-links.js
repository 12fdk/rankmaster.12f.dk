// Every internal link resolves, and every image actually loaded.
(async () => {
  const origin = location.origin;
  const links = [...document.querySelectorAll("a[href]")]
    .map((a) => a.getAttribute("href"))
    .filter((h) => h && !h.startsWith("mailto:") && !h.startsWith("#"))
    .map((h) => new URL(h, location.href))
    .filter((u) => u.origin === origin);

  const broken = [];
  for (const url of [...new Set(links.map((u) => u.pathname))]) {
    const res = await fetch(url, { method: "GET" });
    if (!res.ok) broken.push(`${url} → ${res.status}`);
  }

  const fragments = [...document.querySelectorAll('a[href^="#"], a[href^="/#"]')]
    .map((a) => a.getAttribute("href").split("#")[1])
    .filter(Boolean);
  const deadFragments =
    location.pathname === "/" || location.pathname === "/index.html"
      ? fragments.filter((id) => !document.getElementById(id))
      : [];

  const badImages = [...document.images]
    .filter((i) => i.complete && i.naturalWidth === 0)
    .map((i) => i.currentSrc || i.src);

  return JSON.stringify({ checkedLinks: links.length, broken, deadFragments, badImages }, null, 1);
})()
