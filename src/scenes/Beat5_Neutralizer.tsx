import React from 'react';
import { AbsoluteFill } from 'remotion';
import { colors } from '../theme/colors';
import { InfrastructureDiagram } from '../components/InfrastructureDiagram';
import { AnimatedText } from '../components/AnimatedText';
import { SystemMedia } from '../components/SystemMedia';

const LINES = [
  'Funciona con sus cámaras IP actuales.',
  'Análisis en tiempo real.',
  'En la nube o en su propio C5.',
];

// Beat 5 — Neutralizador (0:47–0:54, 210 frames).
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
          maxWidth: 1600,
        }}
      >
        {LINES.map((line, i) => (
          <AnimatedText
            key={i}
            delay={70 + i * 36}
            fontSize={40}
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
