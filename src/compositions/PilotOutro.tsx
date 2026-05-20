import React from 'react';
import { AbsoluteFill } from 'remotion';
import { colors } from '../theme/colors';
import { fonts } from '../theme/fonts';
import { AnimatedText } from '../components/AnimatedText';
import { OmnisightLogo } from '../components/OmnisightLogo';

// Beat 6 — Cierre con piloto (0:54–0:59, 150 frames).
// v4: ya no es personalizado. Mismo cierre para los 32 videos.
export const PilotOutro: React.FC = () => {
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
      <AnimatedText delay={6} fontSize={140} fontWeight={900}>
        Piloto sin costo.
      </AnimatedText>

      <AnimatedText
        delay={28}
        fontSize={42}
        fontWeight={500}
        color={colors.textMuted}
        style={{ marginTop: 32, maxWidth: 1200, lineHeight: 1.35 }}
      >
        Conectamos a un par de cámaras de su C5.
      </AnimatedText>

      <AnimatedText
        delay={48}
        fontSize={42}
        fontWeight={500}
        color={colors.accent}
        style={{ marginTop: 6, maxWidth: 1200, lineHeight: 1.35 }}
      >
        Véalo corriendo, en vivo.
      </AnimatedText>

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
          Carlos Gotlib · Axentra Solutions
        </div>
        <div>WhatsApp · correo</div>
      </div>

      <div style={{ position: 'absolute', top: 56, right: 56 }}>
        <OmnisightLogo size={40} withWordmark />
      </div>
    </AbsoluteFill>
  );
};
