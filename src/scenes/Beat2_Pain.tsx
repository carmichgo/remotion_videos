import React from 'react';
import { AbsoluteFill } from 'remotion';
import { colors } from '../theme/colors';
import { fonts } from '../theme/fonts';
import { CameraGrid } from '../components/CameraGrid';
import { AnimatedText } from '../components/AnimatedText';
import { SystemMedia } from '../components/SystemMedia';

// Beat 2 — El dolor (0:05–0:14, 270 frames @30fps).
// Mosaico 4×4 de 16 cámaras; a los ~2s (frame local 60) 15 cuadros bajan al
// 20% y uno queda al 100% con borde verde. Tres líneas en cascada.
export const Beat2_Pain: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: colors.bg }}>
      <AbsoluteFill style={{ padding: 56 }}>
        <SystemMedia
          slot="beat2_camaras"
          framed={false}
          style={{ width: '100%', height: '100%' }}
          fallback={
            <CameraGrid
              cols={4}
              rows={4}
              focusAtFrame={60}
              focusIndex={6}
              focusColor={colors.accentSecondary}
            />
          }
        />
      </AbsoluteFill>

      {/* Velo para legibilidad del texto */}
      <AbsoluteFill
        style={{
          background:
            'linear-gradient(90deg, rgba(10,14,26,0.88) 0%, rgba(10,14,26,0.55) 45%, rgba(10,14,26,0.25) 100%)',
        }}
      />

      <AbsoluteFill
        style={{
          justifyContent: 'center',
          alignItems: 'flex-start',
          padding: '0 130px',
          gap: 14,
        }}
      >
        <AnimatedText
          delay={10}
          fontSize={88}
          fontWeight={900}
          align="left"
          fontFamily={fonts.display}
          style={{ textShadow: '0 6px 30px rgba(0,0,0,0.85)' }}
        >
          Su ciudad tiene miles de cámaras.
        </AnimatedText>
        <AnimatedText
          delay={70}
          fontSize={88}
          fontWeight={900}
          align="left"
          color={colors.accent}
          fontFamily={fonts.display}
          style={{ textShadow: '0 6px 30px rgba(0,0,0,0.85)' }}
        >
          Menos del 5% son supervisadas.
        </AnimatedText>
        <AnimatedText
          delay={150}
          fontSize={70}
          fontWeight={700}
          align="left"
          color={colors.textMuted}
          fontFamily={fonts.display}
          style={{ textShadow: '0 6px 30px rgba(0,0,0,0.85)' }}
        >
          El resto, es solo video.
        </AnimatedText>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
