#!/usr/bin/env node
// Screenshot a URL at an exact CSS viewport width.
//
//   node scripts/shot.mjs <url> <width>x<height> <out.png> [--full] [--dpr=2]
//                         [--motion=reduce] [--eval='<js>']
//
// Chrome's --window-size cannot go below 500px on macOS, which silently
// renders a "375px" phone check at 500px and hides every real overflow bug.
// So this drives the DevTools protocol and sets the viewport with
// Emulation.setDeviceMetricsOverride instead, which has no floor.
//
// --eval runs an expression in the page after load and prints the result;
// with no --out it is a headless query tool (overflow audits, contrast
// sampling, checking a computed style).
import { spawn } from "node:child_process";
import { mkdtemp, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";

const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

const args = process.argv.slice(2);
const flags = Object.fromEntries(
  args.filter((a) => a.startsWith("--")).map((a) => {
    const i = a.indexOf("=");
    return i === -1 ? [a.slice(2), true] : [a.slice(2, i), a.slice(i + 1)];
  }),
);
const positional = args.filter((a) => !a.startsWith("--"));
const [url, size = "1400x900", out] = positional;
if (!url) {
  console.error("usage: node scripts/shot.mjs <url> <WxH> [out.png] [--full] [--dpr=N]");
  process.exit(1);
}
const [width, height] = size.split("x").map(Number);
const dpr = Number(flags.dpr ?? 2);

const port = 9222 + Math.floor(Math.random() * 500);
const profile = await mkdtemp(join(tmpdir(), "rm-shot-"));
const chrome = spawn(
  CHROME,
  [
    "--headless=new",
    "--disable-gpu",
    "--hide-scrollbars",
    "--no-first-run",
    "--no-default-browser-check",
    `--user-data-dir=${profile}`,
    `--remote-debugging-port=${port}`,
    "about:blank",
  ],
  { stdio: "ignore" },
);

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function target() {
  for (let i = 0; i < 100; i++) {
    try {
      const list = await (await fetch(`http://127.0.0.1:${port}/json/list`)).json();
      const page = list.find((t) => t.type === "page");
      if (page) return page.webSocketDebuggerUrl;
    } catch {
      /* not up yet */
    }
    await sleep(100);
  }
  throw new Error("Chrome did not expose a debugging target");
}

const ws = new WebSocket(await target());
await new Promise((r) => (ws.onopen = r));

let nextId = 1;
const pending = new Map();
const events = [];
ws.onmessage = (m) => {
  const msg = JSON.parse(m.data);
  if (msg.id && pending.has(msg.id)) {
    const { resolve, reject } = pending.get(msg.id);
    pending.delete(msg.id);
    msg.error ? reject(new Error(JSON.stringify(msg.error))) : resolve(msg.result);
  } else {
    events.push(msg);
  }
};
const send = (method, params = {}) =>
  new Promise((resolve, reject) => {
    const id = nextId++;
    pending.set(id, { resolve, reject });
    ws.send(JSON.stringify({ id, method, params }));
  });

await send("Page.enable");
await send("Emulation.setDeviceMetricsOverride", {
  width,
  height,
  deviceScaleFactor: dpr,
  mobile: width <= 480,
});
if (flags.motion === "reduce") {
  await send("Emulation.setEmulatedMedia", {
    features: [{ name: "prefers-reduced-motion", value: "reduce" }],
  });
}

await send("Page.navigate", { url });
// Wait for the load event, then a beat for fonts, images and IntersectionObserver.
for (let i = 0; i < 150; i++) {
  if (events.some((e) => e.method === "Page.loadEventFired")) break;
  await sleep(100);
}
await send("Runtime.evaluate", { expression: "document.fonts.ready", awaitPromise: true });
await sleep(Number(flags.settle ?? 600));

if (flags.eval) {
  const r = await send("Runtime.evaluate", {
    expression: flags.eval,
    returnByValue: true,
    awaitPromise: true,
  });
  console.log(
    typeof r.result.value === "string" ? r.result.value : JSON.stringify(r.result.value, null, 2),
  );
}

if (out) {
  const shot = await send("Page.captureScreenshot", {
    format: "png",
    captureBeyondViewport: Boolean(flags.full),
    ...(flags.full
      ? {}
      : { clip: { x: 0, y: 0, width, height, scale: 1 } }),
  });
  await writeFile(out, Buffer.from(shot.data, "base64"));
  console.log(`${out} ${width}x${flags.full ? "full" : height} @${dpr}x`);
}

ws.close();
chrome.kill();
