#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import { pathToFileURL } from "node:url";

const input = process.argv[2];
const output = process.argv[3];

if (!input || !output) {
  console.error(
    "Usage: node render_deck.mjs /absolute/path/to/index.html /absolute/path/to/output"
  );
  process.exit(2);
}

let chromium;
try {
  ({ chromium } = await import("playwright"));
} catch {
  console.error("Playwright is required to render deck screenshots.");
  process.exit(2);
}

const htmlPath = path.resolve(input);
const outputPath = path.resolve(output);
fs.mkdirSync(outputPath, { recursive: true });

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({
  viewport: { width: 1920, height: 1080 },
  deviceScaleFactor: 1,
});
const failures = [];

page.on("pageerror", (error) => failures.push(error.message));
page.on("requestfailed", (request) => {
  failures.push(`${request.url()} :: ${request.failure()?.errorText || "failed"}`);
});

const baseUrl = pathToFileURL(htmlPath);
baseUrl.searchParams.set("slide", "1");
await page.goto(baseUrl.href, { waitUntil: "load", timeout: 60000 });
const total = await page.locator(".slide").count();

for (let slide = 1; slide <= total; slide += 1) {
  const url = pathToFileURL(htmlPath);
  url.searchParams.set("slide", String(slide));
  await page.goto(url.href, { waitUntil: "load", timeout: 60000 });
  await page.addStyleTag({
    content: ".controls,.preflight{display:none!important}",
  });
  await page.evaluate(async () => {
    if (document.fonts?.ready) await document.fonts.ready;
  });
  await page.waitForTimeout(1800);

  const state = await page.evaluate(() => {
    const stage = document.querySelector(".stage");
    const box = stage?.getBoundingClientRect();
    return {
      active: document.querySelector(".slide.active")?.getAttribute("data-slide"),
      brokenImages: [...document.images]
        .filter((image) => !image.complete || !image.naturalWidth)
        .map((image) => image.getAttribute("src")),
      stage: box && { width: box.width, height: box.height },
    };
  });

  if (state.active !== String(slide)) {
    failures.push(`Slide ${slide} did not become active.`);
  }
  if (state.brokenImages.length) {
    failures.push(`Slide ${slide} has broken images: ${state.brokenImages.join(", ")}`);
  }
  if (
    Math.round(state.stage?.width || 0) !== 1920 ||
    Math.round(state.stage?.height || 0) !== 1080
  ) {
    failures.push(`Slide ${slide} did not render at 1920 × 1080.`);
  }

  await page.locator(".stage").screenshot({
    path: path.join(outputPath, `page-${String(slide).padStart(2, "0")}.png`),
  });
  console.log(`Rendered ${slide}/${total}`);
}

await browser.close();

if (failures.length) {
  console.error(JSON.stringify({ failures }, null, 2));
  process.exit(1);
}
