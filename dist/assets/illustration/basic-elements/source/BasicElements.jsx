import React from 'react';
import { DotField } from './components/illustration/DotField.jsx';
import { IlloCanvas } from './components/illustration/IlloCanvas.jsx';
import './tokens/illustration.css';

const elements = [
  { shape: 'cube',     seed: 5, accent: 0 },
  { shape: 'sphere',   seed: 6, accent: 3 },
  { shape: 'cylinder', seed: 7, accent: 0 },
];

export function BasicElement({ shape }) {
  const settings = elements.find(element => element.shape === shape);
  if (!settings) throw new Error(`Unknown basic element: ${shape}`);

  return (
    <IlloCanvas
      width={400} height={400}
      ground="var(--illo-ground)" gridCell={20}
      title={shape}
    >
      <DotField
        x={60} y={60} width={280} height={280}
        shape={shape} mode="size" dot="square"
        cell={8} levels={5} maxDot={0.86} grain={0.12}
        seed={settings.seed} accent={settings.accent}
      />
    </IlloCanvas>
  );
}

export default function BasicElements() {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
      background: '#F2F2F0',
    }}>
      {elements.map(({ shape }) => (
        <BasicElement key={shape} shape={shape} />
      ))}
    </div>
  );
}
