import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { colors } from '../theme/colors';
import { fonts } from '../theme/fonts';
import { CapabilityBlock } from '../components/CapabilityBlock';

const FaceIcon: React.FC = () => (
  <svg width="46" height="46" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="9" stroke={colors.accent} strokeWidth="1.8" />
    <circle cx="9" cy="10" r="1.1" fill={colors.accent} />
    <circle cx="15" cy="10" r="1.1" fill={colors.accent} />
    <path
      d="M9.5 15c1.5 1.2 3.5 1.2 5 0"
      stroke={colors.accent}
      strokeWidth="1.6"
      strokeLinecap="round"
    />
    <path
      d="M4 9V5h4M20 9V5h-4M4 15v4h4M20 15v4h-4"
      stroke={colors.accent}
      strokeWidth="1.6"
      strokeLinecap="round"
    />
  </svg>
);

// Avatar genérico: silueta, NUNCA un rostro real.
const Silhouette: React.FC = () => (
  <svg
    viewBox="0 0 220 300"
    style={{
      position: 'absolute',
      bottom: 0,
      left: '50%',
      transform: 'translateX(-50%)',
      width: '74%',
      height: 'auto',
    }}
  >
    <circle cx="110" cy="72" r="56" fill={colors.border} />
    <path d="M18 300c0-66 41-108 92-108s92 42 92 108z" fill={colors.border} />
  </svg>
);

// Beat 4a — Reconocimiento facial (0:20–0:25, 150 frames).
export const Beat4a_FacialRecognition: React.FC = () => {
  const frame = useCurrentFrame();
  const scan = interpolate(frame, [20, 70], [0, 100], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const matchOpacity = interpolate(frame, [72, 84], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill style={{ background: colors.bg }}>
      <CapabilityBlock icon={<FaceIcon />} title="Reconocimiento facial">
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              position: 'relative',
              width: 600,
              height: 760,
              borderRadius: 22,
              overflow: 'hidden',
              background: colors.bgDark,
              border: `2px solid ${colors.border}`,
            }}
          >
            <Silhouette />

            {/* Recuadro de detección sobre la cabeza */}
            <div
              style={{
                position: 'absolute',
                top: '20%',
                left: '50%',
                transform: 'translateX(-50%)',
                width: 260,
                height: 260,
                border: `3px solid ${colors.accent}`,
                borderRadius: 8,
                boxShadow: `0 0 24px ${colors.accent}55`,
              }}
            />
            {/* Línea de escaneo */}
            <div
              style={{
                position: 'absolute',
                top: `${10 + scan * 0.8}%`,
                left: 0,
                right: 0,
                height: 3,
                background: colors.accent,
                opacity: scan < 100 ? 0.9 : 0,
                boxShadow: `0 0 16px ${colors.accent}`,
              }}
            />
            {/* Etiqueta de coincidencia */}
            <div
              style={{
                position: 'absolute',
                bottom: 24,
                left: 24,
                right: 24,
                opacity: matchOpacity,
                fontFamily: fonts.mono,
                fontSize: 24,
                fontWeight: 600,
                color: colors.bgDark,
                background: colors.accentSecondary,
                padding: '16px 18px',
                borderRadius: 10,
                textAlign: 'center',
              }}
            >
              Coincidencia: Registro #4471 — Confianza 94%
            </div>
          </div>
        </div>
      </CapabilityBlock>
    </AbsoluteFill>
  );
};
