# AIPOCH basic elements — source

Open `preview.html` directly in a browser for an offline, code-rendered preview. No installation or server is required for that preview.

To reuse in an existing React 18 project, copy BasicElements.jsx, components/ and tokens/ together. Import BasicElements for all three forms, or BasicElement with shape="cube", "sphere", or "cylinder". Your build tool must support JSX and CSS imports. React and React DOM are provided by the host project.

The drawing components and palette are taken from the supplied AIPOCH Design System archive. The composition uses the same shape equations, seeds (5, 6, 7), square grid (cell=8), dot-size levels (5), grain (0.12), and accent count (sphere only: 3). Each field is 280 × 280 on a 400 × 400 SVG canvas.

DotField.jsx defines the tone fields, seeded variation and SVG square placement. IlloCanvas.jsx supplies the SVG canvas and background grid. BasicElements.jsx supplies the reviewed composition. The SVG downloads are fixed vector exports of these same settings.

To reproduce the artwork, keep seeds, palette and sampling parameters unchanged. Change dimensions or cell size only when intentionally making a new variant.

preview.html bundles React/React DOM and the JSX/CSS for offline viewing. The included React license applies to those dependencies.
