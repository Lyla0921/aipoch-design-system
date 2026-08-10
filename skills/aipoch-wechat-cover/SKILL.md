---
name: aipoch-wechat-cover
description: Create and revise static 900×383 AIPOCH WeChat article covers. Use when a product manager, operator, or content creator needs an AIPOCH-branded WeChat cover for a product launch, event, or viewpoint/content article, including when they need the agent to collect missing brief details through guided questions before generating the image.
---

# AIPOCH WeChat Cover

Create one polished, static 900×383 cover image. Treat the output as a strong first production draft: it must use AIPOCH typography and color cues, while leaving room for later brand refinement. Do not create motion, slides, or a presentation.

## Source Priority

Apply sources in this order:

1. The user's supplied facts, exact copy, and assets.
2. `references/brand-foundations.md` and `references/tokens.json`.
3. `references/cover-system.md`.
4. The bundled assets.

Never invent a product name, statistic, date, quotation, person, event detail, or logo. Do not let an old cover or generic AI trend override supplied copy or the brand tokens.

## 1. Collect A Brief Before Designing

If the user supplies a complete brief, summarize it and proceed. Otherwise ask only the missing questions below, one compact group at a time. Offer the listed options so a non-designer can answer with short selections.

1. **Content type:** product launch / event / viewpoint or content article.
2. **Required copy:** title; optional subtitle or one supporting line; required label, date, or CTA if any.
3. **Text density:** title only / title + one supporting line / title + compact metadata.
4. **Visual direction:** typographic / product or interface / editorial image / abstract graphic. If uncertain, recommend the default for the selected content type in `references/cover-system.md`.
5. **Assets and constraints:** supplied photo, screenshot, logo requirement, prohibited imagery, and any deadline-sensitive fact that must be exact.

Ask a follow-up only when an answer changes the design. If the user declines a choice, choose the documented default and state it in one sentence. Do not begin image generation with an unresolved title or an unknown factual claim.

## 2. Create The Cover

Read `references/brand-foundations.md`, `references/cover-system.md`, and `references/tokens.json` before generating. Use the image-generation capability to create a flat final image at exactly **900×383 pixels**.

Build the composition around one clear reading path: label or metadata → title → supporting detail → visual. Keep text deliberately short; use the supplied Chinese or English copy exactly. Use the bundled logo only when it improves recognition; a logo is optional unless requested.

Select a layout family and visual treatment from `references/cover-system.md`. Vary the composition between requests rather than repeatedly producing a centered headline on a generic gradient. Make imagery meaningful to the article: product/interface crops for launches, contextual editorial imagery for events, and conceptual or typographic visuals for viewpoints.

## 3. Quality Gate

Before presenting the result, verify:

- canvas is exactly 900×383 and static;
- all required copy is present, readable, and spelled exactly as supplied;
- title is dominant and not crowded by decoration;
- contrast is high enough for mobile feed viewing;
- the crop has a safe text area and no important content is near an edge;
- the AIPOCH palette and typography cues are visible without turning the whole image yellow;
- no fake UI, fake logos, gibberish text, watermarks, or unapproved claims appear;
- the image is appropriate to the selected content type and has no presentation-style motion treatment.

If image generation renders text inaccurately, create the visual background with reserved text space, then place the exact text with an appropriate image or graphics workflow before delivering. Do not pretend inaccurate text is acceptable.

## 4. Deliver And Revise

Deliver the 900×383 image and give one short summary of the selected content type, layout family, and visual direction. For revisions, preserve confirmed facts and ask only for the changed field. Offer a small controlled choice when useful, such as “more typographic” versus “more image-led,” rather than reopening the full brief.
