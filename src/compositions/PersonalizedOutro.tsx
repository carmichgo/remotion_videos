import React from 'react';
import { AbsoluteFill, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { colors } from '../theme/colors';
import { fonts } from '../theme/fonts';
import { AnimatedText } from '../components/AnimatedText';
import { OmnisightLogo } from '../components/OmnisightLogo';
import { SecretarioProps } from '../types';

const DateBox: React.FC<{ label: string; delay: number }> = ({
  label,
  delay,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({
    frame: frame - delay,
    fps,
    config: { damping: 200 },
    durationInFrames: 18,
  });
  return (
    <div
      style={{
        opacity: s,
        transform: `translateY(${(1 - s) * 22}px)`,
        fontFamily: fonts.display,
        fontSize: 38,
        fontWeight: 700,
        color: colors.text,
        background: 'rgba(0,212,255,0.12)',
        border: `2px solid ${colors.accent}`,
        borderRadius: 16,
        padding: '24px 40px',
        textAlign: 'center',
      }}
    >
      {label}
    </div>
  );
};

// Beat 6 — Cierre personalizado (0:53–0:59, 180 frames).
export const PersonalizedOutro: React.FC<SecretarioProps> = ({
  estado,
  fecha_1,
  fecha_2,
}) => {
  return (
    <AbsoluteFill
      style={{
        background: colors.bg,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 90,
      }}
    >
      <AnimatedText delay={6} fontSize={128} fontWeight={900}>
        Quince minutos.
      </AnimatedText>
      <AnimatedText
        delay={26}
        fontSize={54}
        fontWeight={500}
        color={colors.textMuted}
        style={{ marginTop: 24, maxWidth: 1100 }}
      >
        Le muestro cómo se vería en {estado}.
      </AnimatedText>

      <div
        style={{
          display: 'flex',
          gap: 36,
          marginTop: 70,
        }}
      >
        <DateBox label={fecha_1} delay={48} />
        <div
          style={{
            alignSelf: 'center',
            color: colors.textMuted,
            fontSize: 36,
            fontFamily: fonts.body,
          }}
        >
          |
        </div>
        <DateBox label={fecha_2} delay={58} />
      </div>

      <div
        style={{
          position: 'absolute',
          bottom: 64,
          left: 0,
          right: 0,
          textAlign: 'center',
          fontFamily: fonts.body,
          color: colors.textMuted,
          fontSize: 28,
          lineHeight: 1.5,
        }}
      >
        <div style={{ color: colors.text, fontWeight: 600 }}>
          Carlos Gotlib · Omnisight
        </div>
        <div>WhatsApp · correo</div>
      </div>

      <div style={{ position: 'absolute', top: 56, right: 56 }}>
        <OmnisightLogo size={40} withWordmark />
      </div>
    </AbsoluteFill>
  );
};
