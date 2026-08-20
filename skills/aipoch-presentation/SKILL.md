---
name: aipoch-presentation
description: Create, revise, validate, and package AIPOCH-branded presentations in HTML, PPTX, or PDF. Use for slide decks, reports, product launches, research presentations, architecture diagrams, team updates, and any presentation that must follow the AIPOCH visual design system, typography, color, logo, layout, motion, content-fidelity, and Windows delivery rules.
---

# AIPOCH Presentation

Create presentation artifacts that are recognizably AIPOCH, preserve supplied facts and copy, and remain reliable during offline delivery.

## Source Priority

Apply sources in this order:

1. User-provided copy, data, annotations, and assets.
2. The current repository Design System and `references/tokens.json`.
3. This skill's presentation rules and bundled assets.
4. Existing decks as layout references only.

Never let an old deck override current user copy or official brand tokens.

## Required Reading

- Read `references/brand-foundations.md` for every deck.
- Read `references/presentation-system.md` before choosing layouts or components.
- Read `references/content-rules.md` before editing supplied copy.
- Read `references/collaboration-workshops.md` when the deck is co-branded, co-hosted, an external workshop, or includes a partner logo.
- Read `references/motion-and-delivery.md` when the output includes motion, HTML, PDF, video, packaging, or Windows delivery.
- Use `references/tokens.json` as the machine-readable token source.

## Workflow

### 1. Establish The Deliverable

Confirm or infer:

- audience and presentation setting;
- output format: HTML, PPTX, PDF, or a bundle;
- aspect ratio, defaulting to 16:9;
- whether animation is required;
- whether the deck must run offline or on Windows;
- whether the deck is AIPOCH-only or co-branded, and which official partner logo asset is authoritative;
- supplied copy and assets that must remain unchanged.

When HTML motion is requested, start from `assets/starter/`. For PPTX, recreate the same system with native editable shapes and text. Do not rasterize complete slides unless the user explicitly requests a static deck.

### 2. Build A Content Inventory

Create a slide-by-slide inventory before layout work:

- slide purpose;
- exact title and supporting copy;
- required data and source;
- required image, diagram, table, or product capture;
- intended animation;
- unresolved content.

Do not invent missing names, figures, dates, claims, product capabilities, quotations, or relationships. Mark unresolved content clearly and ask for the missing source.

### 3. Choose Page Archetypes

Use the archetypes in `references/presentation-system.md`. Prefer one clear composition per slide. Reuse established page headers, footers, metric blocks, process arrows, labels, and media treatments.

Avoid decorative card grids, nested cards, duplicated outlines, generic marketing heroes, and visual elements that are not defined by the brand system.

### 4. Apply Brand Foundations

Use official tokens and bundled logos. Preserve logo proportions and clear space. Keep the visual hierarchy quiet, technical, and precise.

For a co-branded deck, activate the collaboration variant in `references/collaboration-workshops.md`. Keep AIPOCH and partner marks optically balanced in one stable header lockup. Never infer a partner, reconstruct its logo, or apply collaboration rules to an AIPOCH-only deck.

For Chinese decks, use the documented cross-platform fallback stack. Do not depend on an unbundled local font for critical layout.

### 5. Implement Motion With A Static End State

Every animation must:

- communicate sequence, progress, comparison, or emphasis;
- finish in a complete readable state;
- have a `prefers-reduced-motion` fallback;
- render correctly in static PDF capture;
- avoid moving text away from its corresponding visual.

Do not animate for decoration alone.

### 6. Validate

For HTML decks, run:

```bash
node scripts/validate_deck.mjs /absolute/path/to/index.html
```

For visual verification, when Playwright is available:

```bash
node scripts/render_deck.mjs /absolute/path/to/index.html /absolute/path/to/rendered-pages
```

Inspect every rendered page. Check:

- no clipped or overlapping text;
- no missing or distorted images;
- consistent headers, footers, and page numbers;
- readable body text at presentation distance;
- no debug labels or unresolved placeholders;
- animation and static states both remain complete;
- final slide copy matches the supplied source exactly.

### 7. Package

For HTML delivery:

- keep `index.html` and `assets/` together;
- use ASCII file and folder names for Windows packages;
- include a short `README.txt`;
- test the extracted ZIP using `file://`;
- provide a full-slide PDF fallback;
- use MP4 only when animation must be preserved without browser risk.

## Output Rules

- Default canvas: 1920 by 1080.
- Default background: official canvas or surface token.
- Use one dominant message per slide.
- Keep body text at or above the documented minimum.
- Preserve image aspect ratios.
- Keep partner logos proportional, unaltered, and optically balanced with the AIPOCH logo.
- Use arrows only when they express direction or causality.
- Keep page numbers sequential after slide deletion or insertion.
- Never claim validation or packaging succeeded without running the checks.
- Never silently rewrite user-provided copy.
