import React from 'react';
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import { colors } from '../theme/colors';
import { fonts } from '../theme/fonts';
import { CapabilityBlock } from '../components/CapabilityBlock';
import { SystemMedia } from '../components/SystemMedia';

const NetIcon: React.FC = () => (
  <svg width="52" height="52" viewBox="0 0 24 24" fill="none">
    <circle cx="6" cy="6" r="2" stroke={colors.accent} strokeWidth="1.8" />
    <circle cx="18" cy="6" r="2" stroke={colors.accent} strokeWidth="1.8" />
    <circle cx="12" cy="12" r="2" stroke={colors.accent} strokeWidth="1.8" />
    <circle cx="6" cy="18" r="2" stroke={colors.accent} strokeWidth="1.8" />
    <circle cx="18" cy="18" r="2" stroke={colors.accent} strokeWidth="1.8" />
    <path
      d="M7.5 7.5L10.6 10.6M16.5 7.5l-3.1 3.1M7.5 16.5l3.1-3.1M16.5 16.5l-3.1-3.1"
      stroke={colors.accent}
      strokeWidth="1.4"
    />
  </svg>
);

// Posiciones de las 4 cámaras (0..100, espacio del SVG).
const CAMS = [
  { x: 18, y: 70, id: 23 },
  { x: 38, y: 52, id: 47 },
  { x: 60, y: 64, id: 52 },
  { x: 82, y: 36, id: 61 },
];

const TraceMock: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Pulso desde la cámara 23 a las 22 frames.
  const pulseRadius = interpolate(frame, [20, 60], [0, 60], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const pulseOpacity = interpolate(frame, [20, 60], [0.7, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Cuántos segmentos de la ruta dibujados a este frame.
  const segmentProgress = interpolate(frame, [40, 110], [0, CAMS.length - 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const labelOp = interpolate(frame, [70, 90], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Para suavidad: spring en el zoom de las cámaras activas.
  const camActiveSpring = (i: number) =>
    spring({
      frame: frame - (40 + i * 18),
      fps,
      config: { damping: 200 },
      durationInFrames: 14,
    });

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        background:
          'radial-gradient(ellipse at 50% 60%, #142036 0%, #0a0e1a 70%)',
      }}
    >
      {/* Cuadrícula sutil tipo mapa */}
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
      >
        {Array.from({ length: 11 }).map((_, i) => (
          <line
            key={`v${i}`}
            x1={i * 10}
            y1={0}
            x2={i * 10}
            y2={100}
            stroke={colors.border}
            strokeWidth="0.2"
          />
        ))}
        {Array.from({ length: 11 }).map((_, i) => (
          <line
            key={`h${i}`}
            x1={0}
            y1={i * 10}
            x2={100}
            y2={i * 10}
            stroke={colors.border}
            strokeWidth="0.2"
          />
        ))}

        {/* Pulso desde la cámara 23 */}
        <circle
          cx={CAMS[0].x}
          cy={CAMS[0].y}
          r={pulseRadius / 4}
          fill="none"
          stroke={colors.accent}
          strokeWidth="0.4"
          opacity={pulseOpacity}
        />

        {/* Ruta entre cámaras */}
        {CAMS.slice(0, -1).map((c, i) => {
          const next = CAMS[i + 1];
          const t = Math.max(0, Math.min(1, segmentProgress - i));
          if (t <= 0) return null;
          const x2 = c.x + (next.x - c.x) * t;
          const y2 = c.y + (next.y - c.y) * t;
          return (
            <line
              key={i}
              x1={c.x}
              y1={c.y}
              x2={x2}
              y2={y2}
              stroke={colors.accent}
              strokeWidth="0.8"
              strokeLinecap="round"
            />
          );
        })}

        {/* Cámaras */}
        {CAMS.map((c, i) => {
          const isOrigin = i === 0;
          const reached = segmentProgress >= i;
          return (
            <g key={c.id}>
              <circle
                cx={c.x}
                cy={c.y}
                r={isOrigin ? 1.6 : 1.2}
                fill={reached ? colors.accent : colors.border}
              />
              {reached ? (
                <circle
                  cx={c.x}
                  cy={c.y}
                  r={2.6 + camActiveSpring(i) * 0.6}
                  fill="none"
                  stroke={colors.accent}
                  strokeWidth="0.3"
                  opacity={0.6}
                />
              ) : null}
            </g>
          );
        })}
      </svg>

      {/* Labels (posicionadas en %) */}
      {CAMS.map((c) => (
        <div
          key={c.id}
          style={{
            position: 'absolute',
            left: `${c.x}%`,
            top: `${c.y}%`,
            transform: 'translate(-50%, -160%)',
            fontFamily: fonts.mono,
            fontSize: 14,
            color: colors.text,
            background: 'rgba(10,14,26,0.8)',
            padding: '3px 8px',
            borderRadius: 5,
            border: `1px solid ${colors.accent}55`,
            whiteSpace: 'nowrap',
          }}
        >
          Cám {c.id}
        </div>
      ))}

      {/* Recap de ruta en la parte superior */}
      <div
        style={{
          position: 'absolute',
          top: 18,
          left: 0,
          right: 0,
          textAlign: 'center',
          opacity: labelOp,
          fontFamily: fonts.mono,
          fontSize: 22,
          color: colors.accent,
          letterSpacing: 1,
        }}
      >
        Cám 23 → Cám 47 → Cám 52 → Cám 61
      </div>
    </div>
  );
};

// Beat 4d — Trazabilidad entre cámaras (0:36–0:40, 120 frames).
export const Beat4d_Traceability: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: colors.bg }}>
      <CapabilityBlock
        icon={<NetIcon />}
        title="Trazabilidad entre cámaras"
        subtitle="Detecta a una persona o vehículo y reconstruye su ruta de cámara en cámara."
      >
        <SystemMedia
          slot="beat4d_trazabilidad"
          style={{ width: '100%', height: '100%' }}
          fallback={<TraceMock />}
        />
      </CapabilityBlock>
    </AbsoluteFill>
  );
};
