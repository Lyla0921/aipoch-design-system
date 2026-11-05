import React from 'react';

const C30 = Math.cos(Math.PI / 6), S30 = 0.5;
/* Isometric projection: world (x, y, z) → screen. x runs down-right, y down-left, z up. */
export function iso(x, y, z = 0) { return [(x - y) * C30, (x + y) * S30 - z]; }
const pt = p => p[0].toFixed(2) + ',' + p[1].toFixed(2);

export function IlloCanvas({ width = 800, height = 500, ground = 'var(--illo-ground)', grid = true, gridCell = 16, gridColor = 'var(--illo-grid)', title, children, style }) {
  const id = React.useMemo(() => 'ic' + Math.random().toString(36).slice(2, 8), []);
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox={'0 0 ' + width + ' ' + height} width={width} height={height} role="img" aria-label={title} style={{ display: 'block', maxWidth: '100%', height: 'auto', background: ground, ...style }}>
      {grid ? <g><defs><pattern id={id} width={gridCell} height={gridCell} patternUnits="userSpaceOnUse"><rect x={gridCell / 2 - 0.6} y={gridCell / 2 - 0.6} width="1.2" height="1.2" fill={gridColor} /></pattern></defs><rect width={width} height={height} fill={'url(#' + id + ')'} /></g> : null}
      {children}
    </svg>
  );
}

export function IsoBox({ x = 0, y = 0, size = 40, height, fill = 'var(--illo-ground-white)', hidden = false, core = false, coreAccent = true, stroke = 'var(--illo-ink-100)', weight = 1.25 }) {
  const h = height ?? size; const P = (a, b, c) => { const p = iso(a, b, c); return [x + p[0], y + p[1]]; };
  const s = size; const A = P(0, 0, h), B = P(s, 0, h), Cc = P(s, s, h), D = P(0, s, h), E = P(s, 0, 0), F = P(s, s, 0), G = P(0, s, 0), O = P(0, 0, 0);
  const top = [A, B, Cc, D].map(pt).join(' '), right = [B, Cc, F, E].map(pt).join(' '), left = [D, Cc, F, G].map(pt).join(' ');
  const cc = P(s / 2, s / 2, h / 2);
  return (
    <g strokeLinejoin="round">
      {hidden ? <g stroke="var(--illo-ink-40)" strokeWidth="0.75" strokeDasharray="2 3" fill="none"><line x1={O[0]} y1={O[1]} x2={A[0]} y2={A[1]} /><line x1={O[0]} y1={O[1]} x2={E[0]} y2={E[1]} /><line x1={O[0]} y1={O[1]} x2={G[0]} y2={G[1]} /></g> : null}
      <polygon points={left} fill={fill} stroke={stroke} strokeWidth={weight} fillOpacity={hidden ? 0.55 : 1} />
      <polygon points={right} fill={fill} stroke={stroke} strokeWidth={weight} fillOpacity={hidden ? 0.4 : 1} />
      <polygon points={top} fill={fill} stroke={stroke} strokeWidth={weight} fillOpacity={hidden ? 0.7 : 1} />
      {core ? <rect x={cc[0] - 3} y={cc[1] - 3} width="6" height="6" fill={coreAccent ? 'var(--illo-accent)' : 'var(--illo-ink-100)'} /> : null}
    </g>
  );
}

export function FlowPath({ points = [], accent = true, dashed = true, endNodes = true, weight = 1 }) {
  const color = accent ? 'var(--illo-accent)' : 'var(--illo-ink-60)';
  if (points.length < 2) return null;
  const d = 'M' + points.map(p => p[0] + ' ' + p[1]).join('L');
  const a = points[0], b = points[points.length - 1];
  return (
    <g>
      <path d={d} fill="none" stroke={color} strokeWidth={weight} strokeDasharray={dashed ? '3 3' : undefined} strokeLinejoin="round" />
      {endNodes ? [a, b].map((p, i) => <rect key={i} x={p[0] - 3} y={p[1] - 3} width="6" height="6" fill={i ? color : '#fff'} stroke={color} strokeWidth="1" />) : null}
    </g>
  );
}

export function Callout({ x = 0, y = 0, dx = 0, dy = -60, label, index, align, color = 'var(--illo-ink-100)', line = 'var(--illo-ink-60)', size = 12 }) {
  const ex = x + dx, ey = y + dy; const anchor = align || (dx > 0 ? 'start' : dx < 0 ? 'end' : 'middle');
  const tx = ex + (anchor === 'start' ? 6 : anchor === 'end' ? -6 : 0), ty = dy < 0 && dx === 0 ? ey - 8 : dy > 0 && dx === 0 ? ey + size + 6 : ey + size * 0.35;
  return (
    <g>
      <line x1={x} y1={y} x2={ex} y2={ey} stroke={line} strokeWidth="0.75" />
      <rect x={x - 2} y={y - 2} width="4" height="4" fill={color} />
      <text x={tx} y={ty} textAnchor={anchor} fontFamily="'Roboto Mono', monospace" fontSize={size} fontWeight="500" letterSpacing="0.08em" fill={color} style={{ textTransform: 'uppercase' }}>{index ? <tspan fill="var(--illo-ink-60)">{index + '  '}</tspan> : null}{label}</text>
    </g>
  );
}
