import React from 'react';
import {
  AbsoluteFill,
  random,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import { colors } from '../theme/colors';
import { fonts } from '../theme/fonts';
import { CapabilityBlock } from '../components/CapabilityBlock';
import { SystemMedia } from '../components/SystemMedia';

const AlertIcon: React.FC = () => (
  <svg width="52" height="52" viewBox="0 0 24 24" fill="none">
    <path
      d="M12 2L2 21h20L12 2z"
      stroke={colors.accent}
      strokeWidth="1.8"
      strokeLinejoin="round"
    />
    <path d="M12 10v5" stroke={colors.accent} strokeWidth="2" strokeLinecap="round" />
    <circle cx="12" cy="18" r="1" fill={colors.accent} />
  </svg>
);

type Variant = 'ok' | 'blur' | 'covered';

const CamTile: React.FC<{
  id: number;
  caption: string;
  variant: Variant;
  delay: number;
}> = ({ id, caption, variant, delay }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({
    frame: frame - delay,
    fps,
    config: { damping: 200 },
    durationInFrames: 16,
  });

  const isOk = variant === 'ok';
  const accent = isOk ? colors.accentSecondary : colors.alert;

  // Movimiento "vivo" en la cámara OK
  const driftX = Math.sin(frame / 18 + random(`x${id}`) * 10) * 12;
  const driftY = Math.cos(frame / 22 + random(`y${id}`) * 10) * 8;

  return (
    <div
      style={{
        position: 'relative',
        flex: 1,
        opacity: s,
        transform: `translateY(${(1 - s) * 16}px)`,
        display: 'flex',
        flexDirection: 'column',
        gap: 14,
      }}
    >
      <div
        style={{
          position: 'relative',
          width: '100%',
          aspectRatio: '4 / 3',
          borderRadius: 14,
          overflow: 'hidden',
          border: `2px solid ${accent}`,
          background: colors.bgDark,
          boxShadow: `0 0 ${isOk ? 14 : 24}px ${accent}55`,
        }}
      >
        {/* "Escena" base */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: `radial-gradient(circle at ${50 + driftX}% ${
              50 + driftY
            }%, hsl(200 70% 28%) 0%, ${colors.bgDark} 70%)`,
            filter: variant === 'blur' ? 'blur(14px)' : 'none',
          }}
        />
        {/* Silueta (solo OK y blur) */}
        {variant !== 'covered' ? (
          <div
            style={{
              position: 'absolute',
              left: `${42 + driftX * 0.4}%`,
              top: '38%',
              width: 36,
              height: 86,
              borderRadius: 8,
              background: '#cfe4ee',
              opacity: variant === 'blur' ? 0.7 : 0.85,
              filter: variant === 'blur' ? 'blur(12px)' : 'none',
            }}
          />
        ) : null}
        {/* Tapada: cuadro negro/gris */}
        {variant === 'covered' ? (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background:
                'linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 50%, #1a1a1a 100%)',
            }}
          />
        ) : null}
        {/* Overlay UI */}
        <div
          style={{
            position: 'absolute',
            top: 8,
            left: 12,
            fontFamily: fonts.mono,
            fontSize: 14,
            color: colors.textMuted,
          }}
        >
          CAM {String(id).padStart(2, '0')}
        </div>
        <div
          style={{
            position: 'absolute',
            top: 8,
            right: 12,
            fontFamily: fonts.mono,
            fontSize: 13,
            color: isOk ? colors.textMuted : colors.alert,
          }}
        >
          ● REC
        </div>
      </div>
      <div
        style={{
          alignSelf: 'flex-start',
          fontFamily: fonts.mono,
          fontSize: 20,
          fontWeight: 700,
          color: isOk ? colors.bgDark : colors.text,
          background: accent,
          padding: '8px 14px',
          borderRadius: 8,
        }}
      >
        {caption}
      </div>
    </div>
  );
};

const ObstructionsMock: React.FC = () => (
  <div
    style={{
      position: 'absolute',
      inset: 0,
      display: 'flex',
      gap: 22,
      padding: 32,
      alignItems: 'center',
    }}
  >
    <CamTile id={11} caption="OK" variant="ok" delay={4} />
    <CamTile id={18} caption="Obstrucción detectada" variant="blur" delay={14} />
    <CamTile id={29} caption="Cámara obstruida — 14:32" variant="covered" delay={24} />
  </div>
);

// Beat 4f — Detección de obstrucciones (0:45–0:47, 60 frames).
export const Beat4f_Obstructions: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: colors.bg }}>
      <CapabilityBlock
        icon={<AlertIcon />}
        title="Detección de obstrucciones"
        subtitle="Su red de cámaras, siempre operativa."
      >
        <SystemMedia
          slot="beat4f_obstrucciones"
          style={{ width: '100%', height: '100%' }}
          fallback={<ObstructionsMock />}
        />
      </CapabilityBlock>
    </AbsoluteFill>
  );
};
