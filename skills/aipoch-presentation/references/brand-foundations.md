# AIPOCH Brand Foundations

## Source Of Truth

The repository Design System is authoritative. Presentation rules extend it for 16:9 decks but must not redefine the brand.

## Logo

Approved assets are bundled in `assets/`:

- `aipoch-logo-primary.svg`: light backgrounds;
- `aipoch-logo-inverse.svg`: dark backgrounds;
- `aipoch-mark.svg`: compact UI metadata and the Skill icon.

Rules:

- Preserve the original proportions, spacing, and colors.
- Keep clear space equal to the rendered logo height on all sides. Reduce to `0.5x` only in constrained metadata areas.
- Do not stretch, rotate, recolor, outline, shadow, or apply effects.
- Use the logo on clean, high-contrast areas.

## Color

Use `tokens.json` for exact values.

Primary:

- Highlight: `#F1DD67`
- Ink: `#111111`
- Canvas: `#FFFFFF`
- Surface: `#F7F7F4`
- Line: `#E7E5DE`
- Muted text: `#6B6B66`
- Disabled: `#B4B4AE`

Semantic colors are secondary and should not dominate a deck:

- Success: `#3E7A63`
- Warning: `#A9772A`
- Error: `#A15454`
- Information: `#4B6778`
- Accent orange: `#EA580C`

Use highlight yellow for key transitions, selected states, small labels, data emphasis, and one focal module. Do not wash an entire deck in yellow.

## Typography

Official Latin families:

- Inter: headlines, body, UI, and labels;
- Tinos Italic: one emphasized keyword in selected titles only;
- Roboto Mono: compact system labels, paths, flags, and technical metadata.

Cross-platform Chinese presentation stack:

```css
font-family: Inter, "Microsoft YaHei", "PingFang SC",
  "Noto Sans CJK SC", Arial, sans-serif;
```

Offline decks must not rely on a remote font request. Use available fallbacks or bundle licensed font files.

Typography behavior:

- Use only one emphasis treatment in a title.
- Keep sentences short, factual, and low-drama.
- Use mono labels sparingly and never for paragraphs.
- Do not use negative letter spacing in compact interface text.

## Icons And Lines

- Prefer a consistent outline icon family such as Lucide.
- Keep icon stroke weight consistent within a deck.
- Do not mix filled, outlined, hand-drawn, and emoji icons in one system.
- Use thin neutral lines for structure and black or yellow only for active direction.

## Global Composition Rules

- Preserve media aspect ratios.
- Do not add nested frames, duplicate containers, or ornamental outlines.
- Do not show placeholders, debug text, or annotation marks in final output.
- Every rendered element must have a content or navigation purpose.
- Keep the result calm, precise, technical, and legible.
