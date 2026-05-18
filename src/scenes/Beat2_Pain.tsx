import React from 'react';
import { AbsoluteFill } from 'remotion';
import { colors } from '../theme/colors';
import { fonts } from '../theme/fonts';
import { CameraGrid } from '../components/CameraGrid';
import { AnimatedText } from '../components/AnimatedText';
import { SystemMedia } from '../components/SystemMedia';

// Beat 2 — El dolor (0:05–0:12, 210 frames @30fps).
// Mosaico 6x3; a los ~3s (frame local 90) 17 cuadros bajan a 20%, uno 100%.
export const Beat2_Pain: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: colors.bg }}>
      <AbsoluteFill style={{ padding: 56 }}>
        <SystemMedia
          slot="beat2_camaras"
          framed={false}
          style={{ width: '100%', height: '100%' }}
          fallback={<CameraGrid focusAtFrame={90} focusIndex={8} />}
        />
      </AbsoluteFill>

      {/* Velo para legibilidad del texto */}
      <AbsoluteFill
        style={{
          background:
            'linear-gradient(90deg, rgba(10,14,26,0.85) 0%, rgba(10,14,26,0.45) 45%, rgba(10,14,26,0.2) 100%)',
        }}
      />

      <AbsoluteFill
        style={{
          justifyContent: 'center',
          alignItems: 'flex-start',
          padding: '0 130px',
        }}
      >
        <AnimatedText
          delay={10}
          fontSize={120}
          fontWeight={900}
          align="left"
          fontFamily={fonts.display}
          style={{ textShadow: '0 6px 30px rgba(0,0,0,0.85)' }}
        >
          Cientos de cámaras.
        </AnimatedText>
        <AnimatedText
          delay={28}
          fontSize={120}
          fontWeight={900}
          align="left"
          color={colors.accent}
          fontFamily={fonts.display}
          style={{ marginTop: 10, textShadow: '0 6px 30px rgba(0,0,0,0.85)' }}
        >
          Pocos ojos.
        </AnimatedText>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
