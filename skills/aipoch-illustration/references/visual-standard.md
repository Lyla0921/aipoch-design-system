# AIPOCH square-halftone standard

## Shared rules

- **Marks:** separated, axis-aligned square marks on a regular grid. Mark size, density, and restrained tonal variation form a continuous recognizable subject. Do not use uniform tiles as a substitute for tonal imagery.
- **Tone:** begin with five mark-size steps and adjust for the output. The form studies use an 8px grid on a 400px canvas; this is a reference scale, not a mandatory grid for every destination. The light application has two grid sizes on the same 1600 × 1373 canvas: 8px fine and 12px coarse. These are grid-density variants, not different canvas dimensions or illustration styles. Preserve the user’s chosen density; otherwise select for detail and intended viewing size. Judge detail and legibility at final size.
- **Form:** perspective and depicted volume are allowed. Light, shadow, contour, and edges must read through the halftone treatment rather than gloss, bevels, or extruded pixels. Keep lighting coherent; the form studies use lighter upper/left-facing regions.
- **Composition:** a clear subject or relationship, generous negative space, deliberate hierarchy. The message determines the composition. The grid is the rendering language, not a mandatory diagram layout.
- **Accents:** optional gold #EDB732, sparingly applied to meaningful details. The form-study token convention limits gold to at most 3% of marks. All-neutral artwork is valid, including the dark poster.

## Background modes

These are two surface treatments within one standard. They do not introduce different subjects, a second style, or another Skill. Explicit user selection is required before drawing; follow SKILL.md's first step.

### Light background

Use near-black #111111 and warm neutral tones on #F2F2F0 or white. Larger/darker marks carry heavier tones; fine or sparse marks recede into the field. Keep important silhouettes readable at destination size. The brand concept example illustrates this treatment on a complex subject; do not copy its architecture into unrelated work.

### Dark background

Use warm gray marks on a near-black field. Preserve the same square grid and tonal hierarchy; tune visible mark coverage against the dark ground instead of applying a blind image inversion.

The supplied Figma `hackathon-poster 2` uses **#0B0B0B background** and **#4C4B48 marks**, with full fill opacity; its soft appearance comes from mark coverage and low color contrast. These measured values are the reference for a subdued background illustration. They are not a universal foreground contrast requirement. If the illustration is the main subject, adjust the gray brightness and mark size enough to keep the intended silhouette legible. Do not default to pure-white marks, glow, or saturated colors.

The poster's brighter logo and date are host-layout elements. Their color is not the illustration ink. Its keyboard, letters, logo, date, and composition are not required content for other illustrations. Use the bundled poster to judge the relationship between illustration and foreground text.

## Content, background, and density are independent

- **Content:** brand concept, keyboard, research subject, or another message.
- **Background mode:** light or dark, confirmed by the user.
- **Grid density:** selected for destination size and detail, within the same square-halftone language.

“Brand concept” names one application's content. Treat it as evidence that the standard transfers to a complex image, not as a separate standard, preset, or mandatory composition.
