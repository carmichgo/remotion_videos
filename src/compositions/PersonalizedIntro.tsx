import React from 'react';
import { AbsoluteFill } from 'remotion';
import { colors } from '../theme/colors';
import { fonts } from '../theme/fonts';
import { AnimatedText } from '../components/AnimatedText';
import { OmnisightLogo } from '../components/OmnisightLogo';
import { SecretarioProps } from '../types';

// Beat 1 — Intro personalizada (0:00–0:05, 150 frames).
export const PersonalizedIntro: React.FC<SecretarioProps> = ({
  tratamiento,
  nombre,
  estado,
}) => {
  return (
    <AbsoluteFill
      style={{
        background: colors.bg,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 90,
      }}
    >
      <AnimatedText
        delay={6}
        duration={22}
        fontSize={104}
        fontWeight={900}
        fontFamily={fonts.display}
      >
        {tratamiento} {nombre}
      </AnimatedText>

      <AnimatedText
        delay={36}
        duration={22}
        fontSize={46}
        fontWeight={500}
        color={colors.textMuted}
        style={{ marginTop: 28 }}
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
