# AIPOCH Sphere

Open preview.html directly in a browser for the offline, code-rendered example.

For an existing React 18 project with JSX/CSS support, copy Sphere.jsx, components/ and tokens/ together, then import Sphere. React and React DOM are supplied by the host project.

The supplied DotField and IlloCanvas drawing components are unchanged. Composition settings match the downloadable SVG: shape=sphere, cell=8, levels=5, maxDot=0.86, grain=0.12, seed=6, accent=3, field=280×280, canvas=400×400.

Keep these parameters to reproduce the same visual. The seeded dot pattern and accent positions are stable.

preview.html bundles the entry point and React dependencies for offline viewing; see REACT-LICENSE.txt.
