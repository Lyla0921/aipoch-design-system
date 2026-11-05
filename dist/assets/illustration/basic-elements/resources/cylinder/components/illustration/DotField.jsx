import React from 'react';

const clamp = v => (v < 0 ? 0 : v > 1 ? 1 : v);
function rng(seed) { let s = seed >>> 0 || 1; return () => { s ^= s << 13; s ^= s >>> 17; s ^= s << 5; return ((s >>> 0) % 100000) / 100000; }; }

/* Tone fields: (x, y) in [-1, 1] → darkness 0..1, or null for empty ground. */
export const tones = {
  sphere: (o = {}) => { const lx = o.lx ?? -0.55, ly = o.ly ?? -0.6, lz = Math.sqrt(Math.max(0, 1 - lx * lx - ly * ly)); return (x, y) => { const r2 = x * x + y * y; if (r2 > 1) return null; const z = Math.sqrt(1 - r2); const d = x * lx + y * ly + z * lz; return clamp(0.08 + 0.92 * (1 - (d * 0.5 + 0.5)) ** 1.15); }; },
  ring: (o = {}) => { const inner = o.inner ?? 0.55; return (x, y) => { const r = Math.hypot(x, y); if (r > 1 || r < inner) return null; const t = (r - inner) / (1 - inner); const a = Math.atan2(y, x); return clamp(0.25 + 0.55 * Math.abs(Math.sin(t * Math.PI)) * 0.6 + 0.35 * (0.5 + 0.5 * Math.sin(a + 2.2))); }; },
  disc: (o = {}) => { const v = o.value ?? 0.6; return (x, y) => (x * x + y * y > 1 ? null : v); },
  cube: (o = {}) => { const top = o.top ?? 0.15, left = o.left ?? 0.5, right = o.right ?? 0.85; const c = Math.cos(Math.PI / 6), k = 0.5 / c;
    return (x, y) => { const ax = Math.abs(x); if (ax > c || y < -1 + ax * k || y > 1 - ax * k) return null; if (y <= -ax * k) return top; return x < 0 ? left : right; }; },
  cylinder: (o = {}) => { const e = o.ellipse ?? 0.35; return (x, y) => { const w = 0.8; if (Math.abs(x) > w) return null; const ex = x / w; const cap = Math.sqrt(Math.max(0, 1 - ex * ex)) * e; const top = -1 + e; if (y < top - cap || y > 1 - e + cap) return null; if (y < top + cap) return 0.12; return clamp(0.2 + 0.7 * ((ex + 1) / 2) ** 1.4); }; },
  gradient: (o = {}) => { const a = o.angle ?? 0; const ca = Math.cos(a), sa = Math.sin(a); return (x, y) => clamp((x * ca + y * sa + 1) / 2); },
};

const imageCache = {};
function useImageTone(src, cols, rows, threshold) {
  const [grid, setGrid] = React.useState(null);
  React.useEffect(() => {
    if (!src) return; let alive = true;
    const run = img => { const k = 4, W = cols * k, H = rows * k; const c = document.createElement('canvas'); c.width = W; c.height = H; const x = c.getContext('2d'); x.drawImage(img, 0, 0, W, H); const d = x.getImageData(0, 0, W, H).data; const g = new Array(cols * rows);
      for (let j = 0; j < rows; j++) for (let i = 0; i < cols; i++) { let mx = 0, sum = 0, yel = 0;
        for (let v = 0; v < k; v++) for (let u = 0; u < k; u++) { const p = ((j * k + v) * W + (i * k + u)) * 4; const R = d[p], G = d[p + 1], B = d[p + 2], A = d[p + 3] / 255; const dk = (1 - (0.2126 * R + 0.7152 * G + 0.0722 * B) / 255) * A; sum += dk; if (dk > mx) mx = dk; if (A > 0.5 && R > 140 && G > 110 && R - B > 55 && G - B > 35) yel++; }
        const dark = mx * 0.65 + (sum / (k * k)) * 0.35; const isY = yel >= 5; g[j * cols + i] = dark < threshold && !isY ? null : (isY ? -Math.max(dark, 0.45) : dark); }
      if (alive) setGrid(g); };
    const cached = imageCache[src]; if (cached && cached.complete) run(cached); else { const img = cached || new Image(); imageCache[src] = img; img.crossOrigin = 'anonymous'; img.addEventListener('load', () => run(img)); if (!cached) img.src = src; }
    return () => { alive = false; };
  }, [src, cols, rows, threshold]);
  return grid;
}

const TONE_LIGHT = ['#E6E6E2', '#DCDCD8', '#CFCFCA', '#BDBDB8', '#A9A9A4'];
const TONE_MEDIUM = ['#BDBDB8', '#A0A09B', '#8A8A85', '#6A6A66', '#4A4A47'];
export function DotField({ x = 0, y = 0, width = 400, height = 400, cell = 8, shape = 'sphere', shapeOptions, src, threshold = 0.08, levels = 5, maxDot = 0.86, dot = 'square', mode = 'size', tone = 'medium', palette, gap = 1, contrast = 1, grain = 0.12, accent = 0, accentCells, imageAccent = true, accentColor = 'var(--illo-accent)', ink = 'var(--illo-ink-100)', seed = 7, invert = false }) {
  const cols = Math.floor(width / cell), rows = Math.floor(height / cell);
  const imgGrid = useImageTone(src, cols, rows, threshold);
  const cells = React.useMemo(() => {
    const out = []; const r = rng(seed); const m = Math.min(cols, rows);
    const fn = !src ? (typeof shape === 'function' ? shape : (tones[shape] || tones.sphere)(shapeOptions || {})) : null;
    if (src && !imgGrid) return out;
    for (let j = 0; j < rows; j++) for (let i = 0; i < cols; i++) {
      let v = src ? imgGrid[j * cols + i] : fn(((i + 0.5) - cols / 2) / (m / 2), ((j + 0.5) - rows / 2) / (m / 2));
      if (v == null) { r(); continue; }
      let y = false; if (v < 0) { y = imageAccent; v = -v; }
      if (invert) v = 1 - v;
      v = clamp(0.5 + (v - 0.5) * contrast + (r() - 0.5) * grain * 2);
      const lv = Math.max(y ? 2 : 0, Math.round(v * levels)); if (lv <= 0) continue;
      out.push([i, j, lv, y]);
    }
    return out;
  }, [cols, rows, shape, shapeOptions, src, imgGrid, levels, contrast, grain, seed, invert, imageAccent]);
  const accentSet = React.useMemo(() => {
    const set = new Set((accentCells || []).map(([i, j]) => i + ',' + j)); if (accent > 0) { const r = rng(seed * 31 + 3); const pool = cells.filter(c => c[2] >= Math.ceil(levels * 0.4)); for (let k = 0; k < accent && pool.length; k++) { const c = pool.splice(Math.floor(r() * pool.length), 1)[0]; set.add(c[0] + ',' + c[1]); } } return set;
  }, [cells, accent, accentCells, seed, levels]);
  if (dot === 'cube') {
    const pal = palette || (tone === 'light' ? TONE_LIGHT : TONE_MEDIUM); const ext = [tone === 'light' ? '#EFEFEC' : '#D6D6D2', ...pal, tone === 'light' ? '#94948F' : '#333331'];
    const acc = ['#F5CF5E', '#EDB732', '#C8961F']; const paths = {}; const add = (col, d) => { paths[col] = (paths[col] || '') + d; };
    const f = n => n.toFixed(1);
    for (const [i, j, lv, yy] of cells) { const isA = yy || accentSet.has(i + ',' + j); const s = mode === 'tone' ? cell - gap : Math.max(cell * 0.3, cell * maxDot * (lv / levels)); const cx = i * cell + cell / 2, cy = j * cell + cell / 2; const w = s * 0.866 / 2, q = s / 4, h = s / 2;
      const T = 'M' + f(cx) + ' ' + f(cy - h) + 'L' + f(cx + w) + ' ' + f(cy - q) + 'L' + f(cx) + ' ' + f(cy) + 'L' + f(cx - w) + ' ' + f(cy - q) + 'Z';
      const Lf = 'M' + f(cx - w) + ' ' + f(cy - q) + 'L' + f(cx) + ' ' + f(cy) + 'L' + f(cx) + ' ' + f(cy + h) + 'L' + f(cx - w) + ' ' + f(cy + q) + 'Z';
      const R = 'M' + f(cx) + ' ' + f(cy) + 'L' + f(cx + w) + ' ' + f(cy - q) + 'L' + f(cx + w) + ' ' + f(cy + q) + 'L' + f(cx) + ' ' + f(cy + h) + 'Z';
      const k = Math.min(pal.length, Math.max(1, mode === 'tone' ? lv : 3));
      if (isA) { add(acc[0], T); add(acc[1], Lf); add(acc[2], R); } else if (mode === 'tone') { add(ext[k - 1], T); add(ext[k], Lf); add(ext[k + 1], R); } else { add('#E6E6E2', T); add('#8A8A85', Lf); add(ink === 'var(--illo-ink-100)' ? '#111111' : ink, R); } }
    return <g transform={'translate(' + x + ' ' + y + ')'}>{Object.entries(paths).map(([col, d]) => <path key={col} d={d} fill={col} />)}</g>;
  }
  return (
    <g transform={'translate(' + x + ' ' + y + ')'}>
      {cells.map(([i, j, lv, y]) => { const cx = i * cell + cell / 2, cy = j * cell + cell / 2; const isA = y || accentSet.has(i + ',' + j); const pal = palette || (tone === 'light' ? TONE_LIGHT : TONE_MEDIUM);
        if (mode === 'tone') { const sz = cell - gap; return <rect key={i + '-' + j} x={cx - sz / 2} y={cy - sz / 2} width={sz} height={sz} fill={isA ? accentColor : pal[Math.min(pal.length - 1, lv - 1)]} fillOpacity={isA && tone === 'light' ? 0.7 : 1} />; }
        const s = cell * maxDot * (lv / levels); const fill = isA ? accentColor : ink; const sz = isA ? Math.max(s, cell * maxDot * 0.6) : s;
        return dot === 'circle' ? <circle key={i + '-' + j} cx={cx} cy={cy} r={sz / 2} fill={fill} /> : <rect key={i + '-' + j} x={cx - sz / 2} y={cy - sz / 2} width={sz} height={sz} fill={fill} />; })}
    </g>
  );
}

const RAMP = ' .·:-=+*#%@';
export function GlyphField({ x = 0, y = 0, width = 400, height = 400, cell = 10, shape = 'sphere', shapeOptions, src, threshold = 0.08, ramp = RAMP, grain = 0.08, ink = 'var(--illo-ink-100)', accent = 0, accentColor = 'var(--illo-accent)', seed = 11 }) {
  const cols = Math.floor(width / cell), rows = Math.floor(height / cell);
  const imgGrid = useImageTone(src, cols, rows, threshold);
  const glyphs = React.useMemo(() => {
    const out = []; const r = rng(seed); const m = Math.min(cols, rows); const fn = !src ? (typeof shape === 'function' ? shape : (tones[shape] || tones.sphere)(shapeOptions || {})) : null;
    if (src && !imgGrid) return out;
    for (let j = 0; j < rows; j++) for (let i = 0; i < cols; i++) { let v = src ? imgGrid[j * cols + i] : fn(((i + 0.5) - cols / 2) / (m / 2), ((j + 0.5) - rows / 2) / (m / 2)); if (v == null) continue; v = clamp(Math.abs(v) + (r() - 0.5) * grain * 2); const k = Math.round(v * (ramp.length - 1)); if (k <= 0) continue; out.push([i, j, ramp[k], false]); }
    if (accent > 0) { const ra = rng(seed * 17 + 5); const pool = out.filter(g => ramp.indexOf(g[2]) >= ramp.length * 0.4); for (let k = 0; k < accent && pool.length; k++) pool.splice(Math.floor(ra() * pool.length), 1)[0][3] = true; }
    return out;
  }, [cols, rows, shape, shapeOptions, src, imgGrid, ramp, grain, seed, accent]);
  return (
    <g transform={'translate(' + x + ' ' + y + ')'} fontFamily="'Roboto Mono', monospace" fontSize={cell * 1.05} fontWeight="500" textAnchor="middle">
      {glyphs.map(([i, j, ch, a]) => <text key={i + '-' + j} x={i * cell + cell / 2} y={j * cell + cell * 0.82} fill={a ? accentColor : ink}>{ch}</text>)}
    </g>
  );
}

export function DotGrid({ x = 0, y = 0, width = 400, height = 400, cell = 16, size = 1.2, color = 'var(--illo-grid)' }) {
  const id = React.useMemo(() => 'dg' + Math.random().toString(36).slice(2, 8), []);
  return (
    <g>
      <defs><pattern id={id} x={x} y={y} width={cell} height={cell} patternUnits="userSpaceOnUse"><rect x={cell / 2 - size / 2} y={cell / 2 - size / 2} width={size} height={size} fill={color} /></pattern></defs>
      <rect x={x} y={y} width={width} height={height} fill={'url(#' + id + ')'} />
    </g>
  );
}
