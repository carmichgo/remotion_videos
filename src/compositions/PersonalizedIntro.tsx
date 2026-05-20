import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { colors } from '../theme/colors';
import { fonts } from '../theme/fonts';
import { AnimatedText } from '../components/AnimatedText';
import { OmnisightLogo } from '../components/OmnisightLogo';
import { SecretarioProps } from '../types';

// Beat 1 — Intro personalizada (0:00–0:05, 150 frames).
// 0–30 frames: plate sutil "Axentra Solutions presenta" (fade in/out).
// 30–150:     {tratamiento} {nombre} + Secretaría de Seguridad de {estado}.
export const PersonalizedIntro: React.FC<SecretarioProps> = ({
  tratamiento,
  nombre,
  estado,
}) => {
  const frame = useCurrentFrame();

  // Plate "Axentra Solutions presenta" aparece y se va en el primer segundo.
  const plateOpacity = interpolate(
    frame,
    [0, 8, 22, 30],
    [0, 1, 1, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' },
  );

  return (
    <AbsoluteFill
      style={{
        background: colors.bg,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 90,
      }}
    >
      <div
        style={{
          position: 'absolute',
          opacity: plateOpacity,
          fontFamily: fonts.body,
          fontWeight: 500,
          fontSize: 38,
          color: colors.textMuted,
          letterSpacing: 1.5,
        }}
      >
        Axentra Solutions presenta
      </div>

      <AnimatedText
        delay={36}
        duration={22}
        fontSize={136}
        fontWeight={900}
        fontFamily={fonts.display}
      >
        {tratamiento} {nombre}
      </AnimatedText>

      <AnimatedText
        delay={62}
        duration={22}
        fontSize={54}
        fontWeight={500}
        color={colors.textMuted}
        style={{ marginTop: 30 }}
      >
        Secretaría de Seguridad de {estado}
      </AnimatedText>

      <div
        style={{
          position: 'absolute',
          right: 56,
          bottom: 56,
        }}
      >
        <OmnisightLogo size={44} withWordmark />
      </div>
    </AbsoluteFill>
  );
};
