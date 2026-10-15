# Report And Workshop Layout Recipes

Use these only when the content fits. They are reusable compositions distilled from a 22-page mid-year report and a nine-page research workshop, not factual content templates. Names, metrics, partner marks, scientific conclusions, dates, and QR destinations in a reference deck must not become defaults.

## Selection and example map

Open `../assets/layout-gallery/index.html?slide=N`. Each section has a stable `data-layout` ID. Copy the section and its relevant CSS into the starter; keep the starter navigation and the current brand tokens. The gallery uses workshop surfaces to make geometry readable; apply the core palette for ordinary reports. Do not infer a collaboration partner from the workshop styling.

| Slide / ID | Use when | Source composition |
| --- | --- | --- |
| 1 / pain-comparison | Two distinct sources of friction need comparison | Workshop 2 |
| 2 / product-definition | Explain a product and distinguish it from adjacent tools | Workshop 3 |
| 3 / scenarios-boundaries | Explain where a product helps and where it stops | Workshop 4 |
| 4 / lead-and-team | One explicitly identified lead needs more space than peers | Workshop 5 |
| 5 / case-context | Establish the question and study constraints before a demo | Workshop 6 |
| 6 / case-execution | Connect inputs, method steps, checks, and deliverables | Workshop 7 |
| 7 / case-evaluation | Tell the audience what evidence to inspect in a live demo | Workshop 8 |
| 8 / event-closing | Close an event with requested participation actions | Workshop 9 |
| 9 / positioning-matrix | Compare options on two evidenced dimensions | Report 9 |
| 10 / research-cycle | Explain a genuinely repeating process | Report 13 |
| 11 / capability-bridge | Explain how existing capabilities reach a user through an entry point | Report 18 |
| 12 / dual-path-goal | Two independent strategies contribute to one goal | Report 20 |

## Workshop recipes

### pain-comparison
Two equal columns, each with a clear category heading and 3–4 aligned rows. Each row contains an icon or short label, a problem title, and one explanatory sentence. Compare the two categories without implying row-by-row equivalence unless the content supports it. Avoid repeating the same pain in both columns.

### product-definition
Use a broad left area (about 2/3) for the product definition and a compact grouping diagram; use the right area for the one-sentence takeaway. Below, contrast adjacent tool categories with the actual end-to-end workflow. Keep negative examples visually subordinate. Grouping connectors mean containment; arrows mean sequence. Do not draw arrows between unrelated features.

### scenarios-boundaries
Use a 2×2 composition: scenarios, advantages, limitations, and synthesis. Give the first row roughly 60% of the height. Use 3–5 concise items per list. Keep boundaries explicit rather than hiding them in captions. The synthesis may be a short statement or a supplied illustration; it should not repeat all three lists.

### lead-and-team
Use a 5/7 split. The lead region holds one supplied portrait, role, and at most two short experience groups; the peer region holds 2–3 consistent horizontal profile rows. Use this hierarchy only when the user identifies a lead; otherwise use equal profiles. Match optical head sizes across peers, not between intentionally different hierarchy levels. Never invent credentials or reuse a reference person's biography.

### Three-page case sequence
Use the following as a sequence when a demo needs context, execution, and assessment. For a short talk, choose one page instead of forcing all three.

- **case-context:** large left region with 4–5 obstacles or research steps; narrow right rail with 3 study facts. Bottom strip states input → intended output and the evidence question. Study facts must be supplied; do not infer sample counts or causal conclusions.
- **case-execution:** left rail contains dataset, population, comparison, and data type. Right region contains 4–6 method steps, then 2–3 checkpoints, then one deliverable strip. Arrows describe the intended method, not proof that work has already succeeded.
- **case-evaluation:** left 1/3 contains 3 observable evaluation criteria. Right 2/3 shows the actual product capture at its original aspect ratio. Put the demo cue below the media. A capture is illustrative evidence, not an automatically verified scientific result.

### event-closing
Group the final statement with a restrained central visual. Put one or two supplied QR codes below with distinct labels (for example community and feedback). Keep codes square, uncropped, high contrast, and preserve their quiet zones. Test the final rendered codes with an actual decoder or device before claiming scan verification. Do not create fake QR artwork. If destinations are missing, omit codes in the deliverable and request the assets. A gallery's labeled media slot is only an authoring aid.

## Report recipes

### positioning-matrix
Allocate about 1/3 to the comparison criteria and takeaway, 2/3 to a two-axis chart. Name both axes and what low/high mean. Use at most 6–8 plotted labels before splitting the slide. Positions require sourced evidence or must be clearly labeled as illustrative; do not fabricate competitor scores. Keep labels away from axis lines and each other.

### research-cycle
Use 4–6 stages around a center statement; put supporting notes in a separate side column if needed. Connect the final stage back to the first only for a true loop. Keep labels stationary if geometry rotates. A linear pipeline should use Process instead.

### capability-bridge
Compose three regions: existing capabilities (about 55%), the connecting product or entry point (20%), and the user's actions (25%). Puzzle-like interlocks may express complementary capabilities, but they are optional; the text must still communicate the relationship without decoration. Avoid implying technical integration or availability that the user has not supplied.

### dual-path-goal
Use approximately 5/2/5 columns. Each side has its own strategy title and 3–4 ordered steps; the center states the shared outcome. Both paths point toward the outcome, not toward each other. Numbers in the center must distinguish a target from an achieved result. Keep path steps at comparable density.

## Adaptation and verification

Keep 1920×1080, readable text, and the current brand rules. The sample copy is explanatory, not approved marketing or research claims. Replace it with user-supplied content. Split rather than shrink overloaded pages. These recipes do not require animation; if motion is requested, follow `motion-and-delivery.md` and make the final state fully visible. Verify the rendered DOM and actual slide navigation: legacy HTML may retain old slides in source and replace or remove them at runtime. Do not copy accumulated patch scripts or unused legacy slides into new decks.
