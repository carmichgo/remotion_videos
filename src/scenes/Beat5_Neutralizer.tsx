import React from 'react';
import { AbsoluteFill } from 'remotion';
import { colors } from '../theme/colors';
import { InfrastructureDiagram } from '../components/InfrastructureDiagram';
import { AnimatedText } from '../components/AnimatedText';

const LINES = [
  'No reemplaza sus cámaras.',
  'No sale su información.',
  'Bitácora completa de cada búsqueda.',
];

// Beat 5 — Neutralizador (0:42–0:53, 330 frames).
// Diagrama de infraestructura + 3 líneas que aparecen sincronizadas con el audio.
export const Beat5_Neutralizer: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        background: colors.bg,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 60,
        padding: 70,
      }}
    >
      <InfrastructureDiagram />

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 24,
          alignItems: 'center',
        }}
      >
        {LINES.map((line, i) => (
          <AnimatedText
            key={i}
            delay={150 + i * 55}
            fontSize={46}
            fontWeight={700}
            color={i === 2 ? colors.accent : colors.text}
          >
            {line}
          </AnimatedText>
        ))}
      </div>
    </AbsoluteFill>
  );
};
