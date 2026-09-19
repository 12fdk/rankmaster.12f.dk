import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  site: "https://rankmaster.12f.dk",
  base: "/",
  // 'file' so `privacy-policy.astro` builds to `/privacy-policy.html`. The App
  // Store metadata URLs are being repointed at those exact paths (CLAUDE.md §8)
  // and a trailing-slash directory URL is a different URL.
  build: {
    format: "file",
  },
});
