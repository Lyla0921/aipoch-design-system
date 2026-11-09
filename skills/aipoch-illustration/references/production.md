# Production grid rendering

Image generation can establish a useful subject while approximating square marks with warped rows, hollow fragments, or continuous contours. Actual light/dark microscope trials showed that a text-only cleanup can leave these defects. Do not keep prompting indefinitely or call such a result exact.

For a delivery expected to match the regular grid, use `scripts/render_halftone.py` to build a **new native SVG** from the approved tonal composition. It leaves the source image unchanged. All visible marks become solid squares centered on a single screen-aligned grid, with discrete size levels, background-aware polarity, and at most 3% gold marks. The output is editable as grid marks, not as semantic microscope components.

Use a clean tonal source when available; a generated halftone draft can also be sampled, but inspect for moire and lost details. Mode describes both the source ground and desired output: do not feed a light-ground source into dark mode as a shortcut to inversion. Create the intended mode first. Do not run the sampler again on an already compliant SVG.

The utility needs Python 3 and Pillow; install `scripts/requirements.txt` in a virtual environment using the host's permitted package workflow. Run from any directory using absolute paths or paths relative to the current directory:

```sh
python /path/to/aipoch-illustration/scripts/render_halftone.py source.png final.svg --mode dark --role foreground --cell 12
```

- `--mode light|dark` is required. Supply the user's confirmed choice.
- `--role foreground` is the default and keeps a dark main subject legible. `--role background` uses the poster's subdued #4C4B48 on #0B0B0B. Light mode uses #111111 on #F2F2F0.
- `--cell` is measured in the source canvas pixels; begin with 12 for a roughly 1500px-wide image and adjust after reviewing at final viewing size. `--levels` defaults to 5.
- `--transparent` removes the background rectangle while retaining the chosen destination mode's ink. It does not remove an opaque source background of an unrelated color; start with transparency or the matching neutral ground.
- The source canvas dimensions and aspect ratio are retained. Minor source texture below the tone threshold is discarded; very fine detail can be lost. The tool does not understand meaning, correct anatomy, or fix a poor composition.

Open/render the SVG and inspect the entire image plus a close detail. Confirm that the subject and any necessary thin feature survive resampling; adjust grid density or simplify the source if needed. Rasterize this SVG at the requested output dimensions using an available SVG renderer for PNG delivery. Preserve the SVG as the exact source. Do not use a cropped operating-system thumbnail as proof of the complete image.

If the renderer/dependency is unavailable or visual review still fails, report that limitation. Label the image a draft instead of claiming exact-grid compliance. If the user explicitly requests the original generated raster or another rendering approach, honor that choice and state the observed approximation.

Regression checks: `python -m unittest discover -s /path/to/aipoch-illustration/tests -v`.

The packaged `tests/outputs/` examples and `tests/validation.json` record both-mode forward tests. They are evidence of the workflow, not additional default subject references.
