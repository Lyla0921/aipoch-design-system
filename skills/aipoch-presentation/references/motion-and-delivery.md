# Motion And Delivery

## Motion Principles

Motion must explain:

- sequence;
- progression;
- cause and effect;
- state change;
- emphasis on a final number or conclusion.

Avoid continuous decorative motion, excessive easing, and animations that make labels drift away from their corresponding visual.

## Timing

- Standard reveal: `400–700ms`
- Stagger between related items: `80–160ms`
- Counter animation: `900–1600ms`
- Process line draw: `700–1200ms`
- Carousel interval: `3500–5000ms`
- Slide transition: `180–260ms`

Use transform and opacity for performance. Every sequence must settle in a readable final state.

## Required Fallbacks

HTML decks must implement:

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 1ms !important;
    animation-delay: 0ms !important;
    transition-duration: 1ms !important;
  }
}
```

Static PDF capture must show:

- final counter values;
- completed process lines;
- visible text;
- a representative carousel frame;
- no hidden pre-animation elements.

## HTML Delivery

- Keep all resources local.
- Do not require a development server unless the deck genuinely needs one.
- Test the extracted package using a `file://` URL.
- Use relative asset paths.
- Do not open the deck from inside a ZIP archive.

## Windows Delivery

- Use ASCII package and folder names.
- Recommend Microsoft Edge or Google Chrome.
- Keep the extracted folder on a short path such as `D:\AIPOCH_Deck`.
- Keep browser zoom at `100%`.
- Test offline before the event.
- Include a static PDF alongside the HTML package.

## Recommended Delivery Set

1. HTML: primary version with interaction and motion.
2. PDF: complete static fallback with one 16:9 page per slide.
3. MP4: optional fallback when preserving animation is more important than presenter control.

PPTX is appropriate when native editing is required, but HTML-to-PPTX conversion must not be assumed to preserve layout or motion.
