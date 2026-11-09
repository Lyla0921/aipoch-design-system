"""Behavioral checks for the deliverable's geometry, surfaces, transparency and safety."""
import importlib.util
import subprocess
import sys
import tempfile
import unittest
from pathlib import Path
from xml.etree import ElementTree as ET
from PIL import Image, ImageDraw

SCRIPT = Path(__file__).resolve().parents[1] / 'scripts/render_halftone.py'
spec = importlib.util.spec_from_file_location('halftone', SCRIPT)
module = importlib.util.module_from_spec(spec)
spec.loader.exec_module(module)
NS = '{http://www.w3.org/2000/svg}'


def verify_svg(path, mode, transparent=False):
    root = ET.parse(path).getroot()
    width, height = int(root.attrib['width']), int(root.attrib['height'])
    cell, levels = int(root.attrib['data-cell']), int(root.attrib['data-levels'])
    background = [n for n in root if n.get('data-background')]
    assert len(background) == (0 if transparent else 1)
    if background:
        assert background[0].get('fill') == ('#F2F2F0' if mode == 'light' else '#0B0B0B')
    marks = [n for n in root if not n.get('data-background')]
    sizes = set()
    for mark in marks:
        assert mark.tag == NS + 'rect', 'Non-square drawing primitive'
        assert not mark.get('transform') and not mark.get('stroke'), 'Rotated or outlined mark'
        x, y, w, h = (float(mark.get(k)) for k in ('x', 'y', 'width', 'height'))
        assert w == h and 0 < w < cell
        assert 0 <= x and 0 <= y and x + w <= width and y + h <= height
        for center in (x + w / 2, y + h / 2):
            assert abs((center / cell - 0.5) - round(center / cell - 0.5)) < 1e-6
        sizes.add(w)
    assert len(sizes) <= levels
    assert sum(n.get('fill') == '#EDB732' for n in marks) <= len(marks) * 0.03
    return len(marks)


class RendererTest(unittest.TestCase):
    def test_both_modes_geometry_palette_and_determinism(self):
        with tempfile.TemporaryDirectory() as d:
            for mode, bg, ink in [('light', '#F2F2F0', '#111111'), ('dark', '#0B0B0B', '#A5A39C')]:
                source, out = Path(d) / (mode + '.png'), Path(d) / (mode + '.svg')
                image = Image.new('RGB', (143, 97), bg)
                draw = ImageDraw.Draw(image)
                draw.ellipse((20, 10, 100, 90), fill=ink)
                draw.rectangle((42, 30, 90, 65), fill='#EDB732')
                image.save(source)
                before = source.read_bytes()
                module.render(source, out, mode, cell=8)
                self.assertGreater(verify_svg(out, mode), 20)
                first = out.read_bytes()
                module.render(source, out, mode, cell=8)
                self.assertEqual(first, out.read_bytes())
                self.assertEqual(before, source.read_bytes())
                self.assertEqual(ET.parse(out).getroot().get('viewBox'), '0 0 143 97')

    def test_transparent_source_and_output(self):
        with tempfile.TemporaryDirectory() as d:
            source, out = Path(d)/'alpha.png', Path(d)/'alpha.svg'
            image = Image.new('RGBA', (80, 80), (0, 0, 0, 0))
            ImageDraw.Draw(image).rectangle((24, 24, 55, 55), fill=(120, 119, 115, 255))
            image.save(source)
            module.render(source, out, 'dark', cell=8, transparent=True)
            self.assertEqual(verify_svg(out, 'dark', True), 16)

    def test_blank_fields_have_no_marks(self):
        with tempfile.TemporaryDirectory() as d:
            for mode, color in [('light', '#F2F2F0'), ('dark', '#0B0B0B')]:
                source, out = Path(d)/'blank.png', Path(d)/'blank.svg'
                Image.new('RGB', (64, 64), color).save(source)
                module.render(source, out, mode, cell=8)
                self.assertEqual(verify_svg(out, mode), 0)

    def test_mode_is_required_and_invalid_grid_is_rejected(self):
        result = subprocess.run([sys.executable, str(SCRIPT), 'in.png', 'out.svg'], capture_output=True)
        self.assertNotEqual(result.returncode, 0)
        with self.assertRaises(ValueError):
            module.render('in.png', 'out.svg', 'dark', cell=0)
        with self.assertRaises(ValueError):
            module.render('in.png', 'out.svg', 'automatic')


if __name__ == '__main__':
    unittest.main()
