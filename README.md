# AIPOCH Visual Design System

This repository contains the AIPOCH visual design system, approved brand assets, static documentation site, and the AIPOCH Presentation Skill.

## Design System Site

The static site is built from:

```text
AIPOCH Visual Design System.html
assets/
```

Build it with:

```bash
npm run build
```

Vercel publishes the generated `dist/` directory.

## AIPOCH Presentation Skill

The reusable presentation system is located at:

```text
skills/aipoch-presentation/
```

It includes:

- AIPOCH presentation workflow and content-fidelity rules;
- versioned brand and presentation tokens;
- official logo and background assets;
- a 1920 × 1080 HTML starter deck;
- HTML deck validation and visual rendering scripts;
- Windows and offline delivery guidance;
- GitHub validation and release workflows.

Install the `skills/aipoch-presentation` folder through a GitHub-compatible Skill installer, or copy it to:

```text
$CODEX_HOME/skills/aipoch-presentation
```

## Validation

```bash
npm run validate:skill
npm run validate:tokens
npm run validate:starter
```

Render the starter deck when Playwright is available:

```bash
node skills/aipoch-presentation/scripts/render_deck.mjs \
  skills/aipoch-presentation/assets/starter/index.html \
  tmp/presentation-starter-render
```

## Release

Push a tag named `presentation-vX.Y.Z` to create a GitHub Release containing a standalone Skill ZIP.
