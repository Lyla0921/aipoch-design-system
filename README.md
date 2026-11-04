# AIPOCH Visual Design System

This repository contains the AIPOCH visual design system, approved brand assets, static documentation site, and reusable AIPOCH skills.

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

## AIPOCH Illustration & Motion Skill

[skills/aipoch-motion](skills/aipoch-motion/SKILL.md) turns concepts into standalone AIPOCH illustrations, then animates the approved artwork. It includes portable SVG references, brand tokens, an offline HTML example, and consistent autoplay, hover inspection, saved-playhead resume and reduced-motion rules.

Install the complete `skills/aipoch-motion` folder through a compatible Skill installer, or copy it to `$CODEX_HOME/skills/aipoch-motion`. Start with [the visual examples](skills/aipoch-motion/references/examples.md). Static artwork is reviewed before animation; examples remain editable and work without the workshop PPT.

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
