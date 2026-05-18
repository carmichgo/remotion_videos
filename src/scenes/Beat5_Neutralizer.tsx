import React from 'react';
import { AbsoluteFill } from 'remotion';
import { colors } from '../theme/colors';
import { InfrastructureDiagram } from '../components/InfrastructureDiagram';
import { AnimatedText } from '../components/AnimatedText';
import { SystemMedia } from '../components/SystemMedia';

const LINES = [
  'No reemplaza sus cámaras.',
  'No sale su información.',
  'Bitácora completa de cada búsqueda.',
];

// Beat 5 — Neutralizador (0:42–0:53, 330 frames).
// Diagrama centrado arriba + 3 líneas debajo, sincronizadas con el audio.
export const Beat5_Neutralizer: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        background: colors.bg,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 24,
      }}
    >
      <div style={{ transform: 'scale(0.78)' }}>
        <SystemMedia
          slot="beat5_infra"
          framed={false}
          style={{ width: 980, height: 560 }}
          fallback={<InfrastructureDiagram />}
        />
      </div>

      <div
        style={{
          display: 'flex',
          gap: 48,
          alignItems: 'center',
          flexWrap: 'wrap',
          justifyContent: 'center',
          maxWidth: 1500,
        }}
      >
        {LINES.map((line, i) => (
          <AnimatedText
            key={i}
            delay={150 + i * 55}
            fontSize={44}
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
