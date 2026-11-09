---
name: aipoch-illustration
description: Create or revise AIPOCH square-halftone illustrations using one visual standard for light and dark backgrounds. Use for branded editorial, website, campaign, or cover illustration assets; confirm the background mode before drawing and inspect the three bundled form studies together.
---

# AIPOCH Illustration

Use one illustration language across subjects and backgrounds. Square marks on a regular grid form the image, its tonal transitions, and its silhouette. The three geometric studies explain that language together. They are neither product graphics nor three independent styles. Brand concept and hackathon keyboard are application subjects, not separate visual categories.

## Required first step: confirm light or dark

Before generating or drawing, establish the user's explicit choice of **light background** or **dark background** for this output.

- If the current request has not specified a mode, ask: **“这张插画要用浅色背景还是深色背景？”** In an English conversation: **“Should this illustration use a light or dark background?”** Wait for the answer. Do not generate an image or silently choose a mode while waiting.
- A supplied reference, the current website theme, the subject, or an earlier unrelated image does not count as a choice. Even with a dark poster reference, ask if the requested output's mode is not explicit. Time passing is not a choice.
- An explicit request such as “draw a dark version” already resolves the question; do not ask again. For revisions of the same output, retain its confirmed mode unless the user changes it. “Both” explicitly requests two coordinated variants.
- If the user requests transparency, still confirm whether the cutout will sit on a light or dark surface; preserve actual transparency in the delivered file.

You may read the brief and inspect references while waiting. Drawing begins only after the mode is confirmed.

## Inspect the shared references

Read [the visual standard](references/visual-standard.md). Inspect all three PNGs together before drawing:

- [Cube](assets/studies/cube.png): flat faces and edges.
- [Sphere](assets/studies/sphere.png): continuous curvature and tonal transitions.
- [Cylinder](assets/studies/cylinder.png): transitions between flat and curved surfaces.

Matching SVGs are included in the same folder for exact geometry and implementation. Inspect both light-background applications, [fine 8px](assets/applications/brand-concept-light.png) and [coarse 12px](assets/applications/brand-concept-light-12px.png), to compare grid density on the same 1600 × 1373 canvas and [hackathon poster on dark](assets/applications/hackathon-poster-dark.png) for a restrained dark-background treatment. These examples guide rendering and contrast, not the required objects, layout, lettering, or topic of a new illustration. See [reference provenance](references/sources.md) when source details matter.

## Compose and draw

Identify the message and a recognizable subject before applying halftone. Choose composition and perspective for the user's destination; leave clear space for any host title or logo. Do not turn unrelated concepts into cubes, keyboards, architecture, or flowcharts just because those appear in the references.

Apply the confirmed background mode and the common mark, tone, color, and composition rules in the visual standard. Let content determine the objects; let the system determine how they are drawn. Do not invent facts, research data, product features, or brand marks.

Use the environment's image-generation tool for raster illustration, or SVG/vector tooling when editable geometry is requested. Pass the actual three form-study images and the relevant background application to a reference-capable image tool; filenames in a text prompt alone do not supply reference images. Keep the selected background mode and grid density in the generation prompt. Use both light application references to compare density; preserve an explicitly requested 8px or 12px treatment. If the tool cannot accept reference images, state that limitation rather than claiming it inspected them. No particular provider or Figma connection is required; all references are bundled.

For standalone artwork, omit headline, official logo, poster dates, and decorative text unless requested. Preserve explicit user format, transparency, and content requirements. Deliver static artwork unless motion was requested.

## Make the grid reproducible

Treat generated raster artwork as a composition draft until the marks pass review. If it contains warped rows, irregular or hollow marks, or continuous contours, follow [production grid rendering](references/production.md) to create a regular square-mark SVG from that composition. Use this step for exact-grid delivery; keep the source draft unchanged. Render a full preview and inspect it before delivering. If the user requested PNG, rasterize the validated SVG at the requested size. Do not present approximate model output as exact geometry.

## Review and deliver

Inspect at both intended display size and close range. Confirm that:

- The subject and message are readable; grid marks genuinely form the image.
- All forms share one grid treatment and coherent tonal structure.
- The selected light/dark mode is correct. Foreground illustration remains legible; atmospheric background illustration stays subordinate to host text.
- Gold is optional and restrained. No shiny 3D materials, extruded voxel blocks, accidental round-dot texture, or smooth picture with a grid overlay has replaced the square-halftone language.
- Application subjects, logos, dates, and slogans have not leaked from the references into unrelated output.

Correct visible mismatches, then deliver a preview and a downloadable file. Keep the generation prompt with the output. If using the production renderer, retain its SVG and settings alongside the PNG. The SVG is editable as grid marks; a raster or traced grid is not a semantic object model.
