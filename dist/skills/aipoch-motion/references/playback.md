# Playback and review

Use one playhead for the story and a separate interaction transition. The saved playhead controls both the geometry and the automatic annotation. For a presentation, drive entry and exit from the actual slide visibility signal. For a standalone figure, use visibility of the figure and document.

| State | What happens |
| --- | --- |
| Entry | Render the approved opening pose immediately. Begin the autoplay loop when visible. |
| Hover a part | Save the current playhead once. Pause autoplay and ease from the visible pose to the part's inspect pose. Reveal its corresponding annotation when it is readable. |
| Move to another part | Retarget smoothly from the current pose while preserving the original playhead. |
| Move away from every hit area | Ease back to the pose and automatic annotation at the saved playhead, then resume the story there. Re-entry during this ease retargets from the visible pose. |
| Slide or tab hidden | Pause. Reset to the opening pose on slide re-entry. Resume on tab visibility return if the same slide is still active. |
| Reduced motion | Hold the approved overview. Show the selected annotation without spatial motion. |

Place hit areas at fixed rest or target positions. Test moving boundaries with a stationary pointer. Use corresponding focus behavior when the figure is keyboard operable. Provide a way to pause a looping figure without hover alone, such as keyboard focus on an inspectable region. Keep that behavior available in the standalone example. On touch-only surfaces, the automatic story must remain understandable without hover. Start with the design system's 300 ms direct response for hover transitions. Use the presentation token ranges for short reveals and stagger, and set holds by reading time at the intended size. Tie the annotation to the actual visible part, and reserve its space in the static design. For arrows beside moving objects, check the swept paths of the arrowhead, shaft and object contours through automatic and inspect poses. Update the connector geometry or limit travel to maintain a visible gap; safe endpoints in the static frame alone are insufficient. Use one purposeful motion per beat and preserve the silhouette throughout. Keep annotations anchored; fade between readable messages without showing two sentences on top of one another. Apply reduced-motion changes immediately, retaining the selected annotation with no spatial movement. Connect the last pose back to the opening pose with a continuous return.

Check the opening, all extremes, the transitions in between and the loop seam in the target browser. Verify no clipping, occlusion errors, stretched letters, wandering callouts or unwanted backplates. Verify hover during motion, moving between parts, pointer exit during a transition, slide re-entry, reduced motion and offline rendering as applicable. Test readability at the actual slide scale and verify that the exported artifact contains the same geometry and typography the user approved.
