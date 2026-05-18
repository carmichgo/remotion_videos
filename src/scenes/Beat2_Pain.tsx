import React from 'react';
import { AbsoluteFill } from 'remotion';
import { colors } from '../theme/colors';
import { fonts } from '../theme/fonts';
import { CameraGrid } from '../components/CameraGrid';
import { AnimatedText } from '../components/AnimatedText';

// Beat 2 — El dolor (0:05–0:12, 210 frames @30fps).
// Grid 4x4; a los ~3s (frame local 90) 15 cuadros bajan a 20% y uno queda 100%.
export const Beat2_Pain: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: colors.bg }}>
      <AbsoluteFill style={{ padding: 70 }}>
        <CameraGrid focusAtFrame={90} focusIndex={6} />
      </AbsoluteFill>

      {/* Velo para legibilidad del texto */}
      <AbsoluteFill
        style={{
          background:
            'linear-gradient(180deg, rgba(10,14,26,0.2) 0%, rgba(10,14,26,0.72) 55%, rgba(10,14,26,0.2) 100%)',
        }}
      />

      <AbsoluteFill
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          padding: 80,
        }}
      >
        <AnimatedText
          delay={10}
          fontSize={92}
          fontWeight={900}
          fontFamily={fonts.display}
          style={{ textShadow: '0 6px 30px rgba(0,0,0,0.8)' }}
        >
          Cientos de cámaras.
        </AnimatedText>
        <AnimatedText
          delay={28}
          fontSize={92}
          fontWeight={900}
          color={colors.accent}
          fontFamily={fonts.display}
          style={{ marginTop: 8, textShadow: '0 6px 30px rgba(0,0,0,0.8)' }}
        >
          Pocos ojos.
        </AnimatedText>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
