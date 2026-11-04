# AIPOCH illustration palette

Use the target surface's approved tokens first. For a new standalone figure with no target palette, use the warm light thin-sheet profile below. In the Design System repository, read `skills/aipoch-presentation/references/tokens.json` for presentation and workshop surfaces. If the host tokens and repository file are unavailable, use [the source snapshot](tokens.json). It records the AIPOCH Presentation Tokens v1.1.0 at Design System commit `f85c16e`. Refresh the snapshot from the same source when preparing a release against a newer system version.

| Role | Standard light surface | Collaboration workshop | Dark surface |
| --- | --- | --- | --- |
| Canvas | `color.canvas` | `variants.collaborationWorkshop.canvas` | `color.ink` |
| Main face | `color.surface` | `variants.collaborationWorkshop.surface` | Neutral mix of canvas and light ink |
| Depth face | `color.line` | `color.line` | A second neutral mix, distinct from the main face |
| Text | `color.ink` | `color.ink` | `color.canvas` |
| Secondary text | `color.muted` | `color.muted` | `color.line` |
| Accent | `color.highlight` | `variants.collaborationWorkshop.accent` | `color.highlight` |

The dark column is a role mapping for illustration using existing tokens. If the target has an approved dark palette, use it. Build depth with small value differences in neutral faces. Use accent for one meaningful cue at a time, such as a tab, an active edge, or the selected node. Labels remain readable in rest and active states. Reuse the target typography and caption sizing. The token file gives Inter and platform Chinese fallbacks. Standalone examples use system fallbacks so they open offline. Presentation type sizes are slide-layout values, not literal font sizes for small SVGs; judge rendered legibility at the intended placement size.

Apply the palette to the illustration's faces, edges, and labels. Use a transparent background for an embeddable SVG, or a flat canvas token for a standalone preview when its background is part of the brief. The workshop palette works independently of the workshop page layout.

## Thin-sheet folder profile — current reference

The primary style was established from a workshop illustration and reviewed on two standalone subjects. Render the [bundled examples](examples.md); the original workshop and chat history are not required. Its visual identity comes from thin paper-like surfaces, restrained oblique projection, fine rounded outlines, shallow edge depth and warm neutral fills. Small diagrams and brief labels sit on the card planes. The selected card uses a fine gold contour or small accent; large faces remain light. External annotations stay horizontal in a stable nearby position.

Reference colors: faces `#F4F1EC`, contours `#292A23`, secondary marks `#AAA08E`, muted detail `#7E786C`, active outline `#D1A628`. Preserve actual visible face geometry and shared joints even when depth is very thin. Avoid turning thin cards into thick blocks. The page's grid, typography hierarchy and presentation chrome are not part of the standalone illustration.

For motion, use the thin-sheet reference rhythm: a modest card lift with a soft settling motion, a readable hold, then return. Keep the semantic content attached to each moving face. Its sample cycle allows approximately 3.6 seconds per card, including lift and return; adapt to reading needs. The skill's playback and hover rules remain authoritative, including saved-playhead resume.

Choose another visual profile when the user requests one. A research topic alone does not imply a dark reading panel, a folder, or a slide layout.
