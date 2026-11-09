#!/usr/bin/env python3
"""Render a tonal source as native, regular square-mark SVG. Leaves the source untouched."""
import argparse
import json
import math
from pathlib import Path
from xml.sax.saxutils import escape

from PIL import Image, ImageStat


def luminance(rgb):
    return sum(a * b for a, b in zip(rgb, (0.2126, 0.7152, 0.0722))) / 255


def rgb(hex_color):
    return tuple(int(hex_color[i:i + 2], 16) for i in (1, 3, 5))


def render(source, output, mode, cell=12, levels=5, role='foreground', transparent=False):
    if mode not in ('light', 'dark'):
        raise ValueError('An explicit light or dark mode is required')
    if not isinstance(cell, int) or cell < 2 or not 2 <= levels <= 16:
        raise ValueError('cell must be an integer >= 2; levels must be between 2 and 16')
    if role not in ('foreground', 'background'):
        raise ValueError('role must be foreground or background')
    source, output = Path(source), Path(output)
    if source.resolve() == output.resolve() or output.suffix.lower() != '.svg':
        raise ValueError('Use a new .svg output path; preserve the source image')
    background = '#F2F2F0' if mode == 'light' else '#0B0B0B'
    ink = '#111111' if mode == 'light' else ('#4C4B48' if role == 'background' else '#A5A39C')
    with Image.open(source) as original:
        rgba = original.convert('RGBA')
    w, h = rgba.size
    field = Image.new('RGBA', (w, h), rgb(background) + (255,))
    field.alpha_composite(rgba)
    field = field.convert('RGB')
    bg_lum, ink_lum = luminance(rgb(background)), luminance(rgb(ink))
    contrast = abs(ink_lum - bg_lum)
    cells = []
    # Area averaging avoids inferring shape from a single bright/dark pixel and reduces moire.
    for y in range(0, h, cell):
        for x in range(0, w, cell):
            patch = field.crop((x, y, min(w, x + cell), min(h, y + cell)))
            means = ImageStat.Stat(patch).mean
            lum = luminance(means)
            strength = (bg_lum - lum) if mode == 'light' else (lum - bg_lum)
            coverage = max(0.0, min(1.0, strength / contrast))
            # Ignore low-amplitude background texture; size represents coverage area.
            level = int(math.sqrt(coverage) * levels + 0.5) if coverage >= 0.018 else 0
            if not level:
                continue
            pixels = list(patch.getdata())
            gold_fraction = sum(r > 120 and g > 80 and r - b > 55 and g - b > 25
                                and r > g * 1.08 for r, g, b in pixels) / len(pixels)
            size = cell * 0.86 * level / levels
            cx, cy = x + cell / 2, y + cell / 2
            # At partial boundary cells, retain the same global centers without cropping marks.
            if cx + size / 2 > w or cy + size / 2 > h:
                continue
            cells.append((cx, cy, size, gold_fraction))
    accent_limit = math.floor(len(cells) * 0.03)
    candidates = sorted((i for i, c in enumerate(cells) if c[3] >= 0.05),
                        key=lambda i: (-cells[i][3], i))[:accent_limit]
    accents = set(candidates)
    title = escape('AIPOCH square-halftone illustration')
    parts = [f'<svg xmlns="http://www.w3.org/2000/svg" width="{w}" height="{h}" viewBox="0 0 {w} {h}" role="img" aria-label="{title}" data-cell="{cell}" data-levels="{levels}" data-mode="{mode}">']
    if not transparent:
        parts.append(f'<rect width="{w}" height="{h}" fill="{background}" data-background="true"/>')
    for i, (cx, cy, size, _) in enumerate(cells):
        fill = '#EDB732' if i in accents else ink
        parts.append(f'<rect x="{cx-size/2:.6f}" y="{cy-size/2:.6f}" width="{size:.6f}" height="{size:.6f}" fill="{fill}"/>')
    parts.append('</svg>')
    output.parent.mkdir(parents=True, exist_ok=True)
    output.write_text('\n'.join(parts) + '\n')
    return {'width': w, 'height': h, 'marks': len(cells), 'accent_marks': len(accents),
            'mode': mode, 'role': role, 'cell': cell, 'levels': levels,
            'background': None if transparent else background, 'ink': ink,
            'output': str(output)}


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('source', type=Path)
    parser.add_argument('output', type=Path)
    parser.add_argument('--mode', choices=['light', 'dark'], required=True)
    parser.add_argument('--cell', type=int, default=12)
    parser.add_argument('--levels', type=int, default=5)
    parser.add_argument('--role', choices=['foreground', 'background'], default='foreground')
    parser.add_argument('--transparent', action='store_true')
    args = parser.parse_args()
    try:
        result = render(**vars(args))
    except (ValueError, OSError) as exc:
        parser.error(str(exc))
    print(json.dumps(result, ensure_ascii=False))


if __name__ == '__main__':
    main()
