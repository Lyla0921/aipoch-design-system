#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const repositoryRoot = path.resolve(scriptDir, "..");
const skillDir = path.join(repositoryRoot, "skills", "aipoch-presentation");
const designSystemPath = path.join(
  repositoryRoot,
  "AIPOCH Visual Design System.html"
);
const tokensPath = path.join(skillDir, "references", "tokens.json");

const designSystem = fs.readFileSync(designSystemPath, "utf8");
const tokens = JSON.parse(fs.readFileSync(tokensPath, "utf8"));
const errors = [];

const expectedVariables = {
  "--color-accent-orange": tokens.color.accentOrange,
  "--color-primary-highlight": tokens.color.highlight,
  "--color-canvas": tokens.color.canvas,
  "--color-surface": tokens.color.surface,
  "--color-line": tokens.color.line,
};

for (const [variable, expected] of Object.entries(expectedVariables)) {
  const match = designSystem.match(
    new RegExp(`${variable.replace(/[.*+?^${}()|[\\]\\\\]/g, "\\\\$&")}\\s*:\\s*(#[0-9a-fA-F]{6})`)
  );
  if (!match) {
    errors.push(`Design System variable not found: ${variable}`);
    continue;
  }
  if (match[1].toUpperCase() !== expected.toUpperCase()) {
    errors.push(`${variable} is ${match[1]} but tokens.json contains ${expected}`);
  }
}

for (const token of ["ink", "muted", "disabled"]) {
  const value = tokens.color[token];
  if (!designSystem.toUpperCase().includes(value.toUpperCase())) {
    errors.push(`Color token ${token} (${value}) is not present in the Design System.`);
  }
}

const result = {
  synchronized: errors.length === 0,
  designSystem: designSystemPath,
  tokens: tokensPath,
  errors,
};

console.log(JSON.stringify(result, null, 2));
process.exit(errors.length ? 1 : 0);
