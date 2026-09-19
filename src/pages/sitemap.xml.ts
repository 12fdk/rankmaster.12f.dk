import type { APIContext } from "astro";
import { execFileSync } from "node:child_process";
import { SITE } from "../consts";

// A hand-built sitemap, because the site is three pages and an integration
// would be more configuration than content.
//
// **<lastmod> is mandatory here** (CLAUDE.md §7): the IndexNow workflow diffs
// the sitemap against the previous deploy, and without <lastmod> it can only
// detect brand-new URLs — so an edit to an existing page would never be
// submitted.
//
// The date comes from git, not from the build clock. deploy.yml runs on a
// weekly cron, so a build-time date would change every Monday and resubmit
// every URL on the site for no reason. The last commit that touched a page's
// own sources is the honest answer and is stable across rebuilds.
//
// This needs full history: the workflows check out with fetch-depth: 0.

interface Page {
  path: string;
  /** Sources whose last commit dates this page. */
  sources: string[];
  changefreq: string;
  priority: string;
  images?: string[];
}

const SHARED = ["src/layouts", "public/css/style.css", "src/consts.ts"];

const PAGES: Page[] = [
  {
    path: "/",
    sources: [
      "src/pages/index.astro",
      "src/components",
      "src/data/faq.ts",
      "public/js/main.js",
      ...SHARED,
    ],
    changefreq: "weekly",
    priority: "1.0",
    images: [
      "/images/og-image.png",
      "/images/screenshots/en-US/02_Reveal.jpg",
      "/images/screenshots/en-US/01_Guess.jpg",
      "/images/screenshots/en-US/06_Categories.jpg",
      "/images/screenshots/en-US/04_Leaderboard.jpg",
      "/images/screenshots/en-US/03_Summary.jpg",
    ],
  },
  {
    path: "/support.html",
    sources: ["src/pages/support.astro", "src/data/faq.ts", ...SHARED],
    changefreq: "monthly",
    priority: "0.6",
  },
  {
    path: "/privacy-policy.html",
    sources: ["src/pages/privacy-policy.astro", ...SHARED],
    changefreq: "yearly",
    priority: "0.4",
  },
];

/** ISO date of the newest commit touching any of `paths`. */
function lastCommit(paths: string[]): string {
  try {
    const out = execFileSync("git", ["log", "-1", "--format=%cI", "--", ...paths], {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    }).trim();
    if (out) return out.slice(0, 10);
  } catch {
    // No git, or a shallow clone with nothing touching these paths in it.
  }
  return new Date().toISOString().slice(0, 10);
}

const xmlEscape = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;");

export async function GET(_context: APIContext) {
  const urls = PAGES.map((page) => {
    const images = (page.images ?? [])
      .map((src) => `    <image:image>\n      <image:loc>${SITE}${src}</image:loc>\n    </image:image>`)
      .join("\n");
    return [
      "  <url>",
      `    <loc>${xmlEscape(SITE + page.path)}</loc>`,
      `    <lastmod>${lastCommit(page.sources)}</lastmod>`,
      `    <changefreq>${page.changefreq}</changefreq>`,
      `    <priority>${page.priority}</priority>`,
      images,
      "  </url>",
    ]
      .filter(Boolean)
      .join("\n");
  }).join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${urls}
</urlset>
`;

  return new Response(xml, {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
}
