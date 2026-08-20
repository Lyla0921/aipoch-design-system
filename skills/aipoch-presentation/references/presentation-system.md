# AIPOCH Presentation System

## Canvas

- Size: `1920 × 1080`
- Aspect ratio: `16:9`
- Safe horizontal margin: `64px`
- Header band: `88px`
- Footer band: `40px`
- Default content top: `112px`
- Default content bottom: `72px`
- Major gap: `48px`
- Section rhythm: `24px`
- Compact gap: `12px`
- Technical panel padding: `32px`

Use a 12-column grid. Prefer asymmetric `7/5`, equal `6/6`, or process-based `4/4/4` compositions.

## Type Scale

Use these ranges at 1920 × 1080:

| Role | Size | Weight | Line height |
| --- | ---: | ---: | ---: |
| Cover title | 64–80px | 500–700 | 1.05–1.15 |
| Slide title | 44–56px | 600–700 | 1.1–1.2 |
| Subtitle | 22–28px | 400–500 | 1.35–1.5 |
| Metric | 54–76px | 700 | 1 |
| Panel title | 24–32px | 600–700 | 1.2 |
| Body | 20–26px | 400–500 | 1.45–1.65 |
| Caption | 16–18px | 400–500 | 1.4 |
| System label | 13–16px | 500–700 | 1.2 |
| Footer | 13–14px | 500 | 1 |

Do not shrink text to solve layout problems. Reduce copy, change the archetype, or add a slide.

## Persistent Structure

Content slides use:

- AIPOCH mark or primary logo at top left.
- Compact section label at top right.
- Thin neutral header line.
- Yellow footer band or a restrained yellow footer accent.
- Report name at bottom left.
- Current slide number at bottom right.

Keep these elements aligned and identical across the deck.

For a co-branded event, replace the single-logo header with the lockup defined in `collaboration-workshops.md`. The partner logo is part of the persistent header, not a discretionary decoration, and must not disappear on interior slides.

When a technical grid is used, align the header rule to a grid row so the two lines read as one. Panels placed over the grid must use an opaque fill; the grid must never show through foreground frames, cards, diagrams, portraits, or summary illustrations.

## Page Archetypes

### Cover

- Brand or literal presentation title is the first-viewport signal.
- Use one structural background composition or one relevant product/research image.
- Do not put the title inside a card.
- Keep metadata secondary.

### Section Transition

- One question, claim, or section title.
- Large whitespace.
- One yellow rule or small numeric marker.

### Data And Evidence

- Use two to four equal metric modules.
- Keep numbers visually equal when they have equal importance.
- Place sources close to the relevant number and use one consistent source format.
- Avoid tiny charts. Enlarge the chart or split the slide.

### Process

- Use a directional line only when sequence matters.
- Keep arrows separate from text and inside the slide safe area.
- Use equal node styles for equal states.
- Align node centers before adding labels.

### Architecture

- Use three clear zones: input or goal, execution, output or delivery.
- Use native shapes and text where possible.
- Highlight one focal module with yellow.
- Keep connectors behind nodes and use one arrow style.

### Product Demonstration

- Show the actual product state, not an atmospheric image.
- Preserve the screenshot or GIF aspect ratio.
- Do not add a decorative device frame unless the source requires it.
- Pair product media with concise explanatory text.

### Timeline

- Use consistent milestone circles and connector lines.
- Keep dates, titles, descriptions, and callouts aligned by baseline.
- Remove redundant date words when the number is already clear.

### Team

- Use supplied names, roles, and relationships exactly.
- Use equal avatar treatment and spacing.
- Normalize portraits by optical head size, eye line, and headroom, not by image-box dimensions alone.
- Keep the top of every head visible and match shoulder exposure across comparable portraits.
- Do not infer leadership or reporting relationships.
- Long descriptions should use a clean row list or a focused carousel, never tiny cards.

### Closing

- Use one final statement only.
- Keep the title, accent rule, and closing copy grouped.
- Remove unrelated calls to action or summary copy.

## Component Rules

- Cards: maximum `8px` radius unless the official component requires otherwise.
- Do not place cards inside cards.
- For flat-geometric or collaboration-workshop slides, use square opaque panels with no border and no shadow.
- Use yellow dots for compact evidence lists.
- Use labels for categories, not decoration.
- Use a familiar icon instead of a rounded text button when the action is symbolic.
- Keep equal modules equal in size, padding, font weight, and alignment.

## Media

- Use `object-fit: contain` when the complete product or document must be visible.
- Use `object-fit: cover` only when cropping is intentional and safe.
- Remove accidental white borders, shadows, and black backgrounds from supplied product captures.
- Match any retained raster matte to the slide canvas exactly so the asset does not appear as a separate rectangular layer.
- For a cover hero, extend the image treatment to the intended edge or crop/fill the available area; do not leave an accidental strip at the bottom or expose a mismatched image background.
- Do not upscale low-resolution images beyond legibility.
