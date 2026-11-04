---
name: aipoch-motion
description: Create standalone AIPOCH branded 2.5D illustrations with minimal labels, then animate approved artwork. Use for concept-to-illustration work that needs a static review before motion and consistent autoplay and hover behavior.
---

# AIPOCH Motion

## 1. Draw and review

1. Identify the one thing the audience should understand. Use the user's concept, intended surface, and supplied artwork or product facts. Choose an object and show the parts that explain it. When the same parts appear in different views, give each a distinct visual structure and carry that structure across the views. The default deliverable is a standalone illustration with essential labels only. Size its frame to the artwork and the room required for motion. Slide titles, logos, page grids, headers, and footers belong to the host layout. Include them only when the user requests a full slide, poster, or branded page.
2. Read [the brand mapping](references/brand.md), render the [bundled visual references](references/examples.md), and inspect any user-supplied reference before choosing the view, forms, or type treatment. Use the thin-sheet profile as the default AIPOCH style reference. Match its light surfaces, shallow depth, fine outlines and restrained accents. Select the actual object to explain the concept; a folder is an example, not a required container. Follow the target brand and any style the user explicitly selects. Build neighboring solids in one consistent projected space; folded or rotated surfaces may have different local axes, while their shared joints must coincide. Construct visible depth faces from the same vertices as the front and top. At joints, align the shared edges and use a consistent radius or bevel. Fill faces with neutral colors and draw them in occlusion order. Give each annotation a short purpose and a stable position outside the object's path of travel. Reserve room for the largest inspect pose. Place text printed on a face, such as a package label or screen title, in the same local coordinate system as that face. Keep external callouts horizontal.
3. Group parts and their callouts by stable semantic IDs so motion can target the approved geometry. Render the static SVG or self-contained HTML in a browser after fonts load. Check the whole silhouette at its intended placement size and inspect the depth faces and joints at close range. For workshop use, check it at the size it would occupy on a 1280 × 720 projected slide. Fix every visible geometry defect before sending the preview:
   - **Depth and occlusion.** Show every face visible from the chosen view. Keep hidden edges and the portions inserted into a container behind the appropriate wall or lip.
   - **Proportions and joints.** Check the unprojected dimensions against the intended object or reference. Check that joined parts share edge endpoints after projection and use consistent corner treatment at the same joint.
   - **Text and projection.** Check that lettering printed on a surface shares its axes and that external callouts remain horizontal.
   - **Connections.** Check both ends of each leader or relationship line against its intended source and destination at the rendered scale. Anchor it to the specific edge, marker, or region it describes.
4. Use the same render for any PNG review image. Wait for the user to explicitly approve this rendered artwork before creating or adding motion. Apply requested design changes to the static preview and review the new version.

The geometry approach is informed by [Hairline](https://hairline.lucasmarkes.com/skills). This skill ships independently authored SVG/HTML examples and requires no external Hairline installation. AIPOCH defines its own surfaces, labels and playback rules.

## 2. Animate the approved version

Read [playback and review](references/playback.md). Use the approved vectors and text as the source. Keep their composition, palette and type identity. Move the parts that explain the concept. Move surface lettering together with its face and preserve its approved projection. Keep external callouts horizontal and clear, with at most translation or uniform scale. If motion requires a substantive change to the approved composition or style, show the revised static artwork for approval first. Apply explicitly requested local corrections within their authorized scope.

Autoplay on entry. When a figure has inspectable parts, hover pauses the story and smoothly brings the part and its annotation into view. Pointer exit returns to the saved point and resumes from there. An explicit noninteractive brief disables hover. The default loop joins end to start through continuous motion. Leaving the page pauses playback. Re-entry starts from the approved opening pose. Preserve these behaviors across figures while tailoring the actual motions to the concept.

Deliver a runnable offline HTML preview for HTML presentations unless another format was requested. Check the target display size, all key poses, a full loop and the input behavior before claiming the animation is verified.

Use editable SVG/HTML for independently moving parts. The [offline motion example](assets/experiment-plan-motion.html) demonstrates the playback contract; adapt the subject and geometry rather than reusing its scientific content as product facts.
