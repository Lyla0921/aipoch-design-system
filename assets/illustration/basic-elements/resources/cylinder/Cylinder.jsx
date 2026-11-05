import React from 'react';
import { DotField } from './components/illustration/DotField.jsx';
import { IlloCanvas } from './components/illustration/IlloCanvas.jsx';
import './tokens/illustration.css';

export default function Cylinder() {
  return (
    <IlloCanvas
      width={400} height={400}
      ground="var(--illo-ground)"
      gridCell={20} title="cylinder"
    >
      <DotField
        x={60} y={60}
        width={280} height={280}
        shape="cylinder" mode="size" dot="square"
        cell={8} levels={5} maxDot={0.86}
        grain={0.12} seed={7} accent={0}
      />
    </IlloCanvas>
  );
}
