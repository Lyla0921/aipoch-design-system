#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";

const input = process.argv[2];
if (!input) {
  console.error("Usage: node validate_deck.mjs /absolute/path/to/index.html");
  process.exit(2);
}

const htmlPath = path.resolve(input);
const root = path.dirname(htmlPath);
const html = fs.readFileSync(htmlPath, "utf8");
const linkedStylesheets = [
  ...html.matchAll(
    /<link\b[^>]*rel=["']stylesheet["'][^>]*href=["']([^"']+)["'][^>]*>/gi
  ),
].map((match) => match[1]);
const stylesheetText = linkedStylesheets
  .filter((reference) => !/^(?:data:|https?:|#)/i.test(reference))
  .map((reference) => {
    const clean = decodeURIComponent(reference.split(/[?#]/)[0]);
    const stylesheetPath = path.resolve(root, clean);
    return fs.existsSync(stylesheetPath)
      ? fs.readFileSync(stylesheetPath, "utf8")
      : "";
  })
  .join("\n");
const searchableSource = `${html}\n${stylesheetText}`;
const errors = [];
const warnings = [];

const slideTags = [
  ...html.matchAll(/<section\b[^>]*class=["'][^"']*\bslide\b[^"']*["'][^>]*>/gi),
].map((match) => match[0]);

if (slideTags.length === 0) {
  errors.push("No <section class=\"slide\"> elements found.");
}

const slideNumbers = slideTags
  .map((tag) => tag.match(/\bdata-slide=["']([^"']+)["']/i)?.[1])
  .filter(Boolean);
const duplicates = slideNumbers.filter(
  (value, index) => slideNumbers.indexOf(value) !== index
);

if (duplicates.length) {
  errors.push(`Duplicate data-slide values: ${[...new Set(duplicates)].join(", ")}`);
}

if (
  !/\.stage\s*\{[^}]*\bwidth\s*:\s*(?:var\([^)]*\)|1920px)/is.test(
    searchableSource
  )
) {
  warnings.push("Could not confirm a 1920px stage width in the HTML.");
}

const referenced = new Set();
const patterns = [
  /(?:src|poster|href)\s*=\s*["']([^"']+)["']/gi,
  /url\(\s*["']?([^"')]+)["']?\s*\)/gi,
];

for (const pattern of patterns) {
  let match;
  while ((match = pattern.exec(html))) {
    referenced.add(match[1]);
  }
}

const localReferences = [...referenced].filter((reference) => {
  if (!reference) return false;
  if (/^(?:data:|https?:|mailto:|javascript:|#)/i.test(reference)) return false;
  if (reference.includes("${") || reference.includes("{{")) return false;
  return true;
});

for (const reference of localReferences) {
  const clean = decodeURIComponent(reference.split(/[?#]/)[0]);
  const resolved = path.resolve(root, clean);
  if (!resolved.startsWith(root)) {
    warnings.push(`Resource escapes deck directory: ${reference}`);
  }
  if (!fs.existsSync(resolved)) {
    errors.push(`Missing local resource: ${reference}`);
  }
}

const placeholderMatches = [...html.matchAll(/\[\[[A-Z0-9 _-]+\]\]/g)].map(
  (match) => match[0]
);
if (placeholderMatches.length) {
  warnings.push(
    `Unresolved placeholders: ${[...new Set(placeholderMatches)].join(", ")}`
  );
}

const result = {
  file: htmlPath,
  slides: slideTags.length,
  localResources: localReferences.length,
  errors,
  warnings,
};

console.log(JSON.stringify(result, null, 2));
process.exit(errors.length ? 1 : 0);
