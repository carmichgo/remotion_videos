import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { colors } from '../theme/colors';
import { fonts } from '../theme/fonts';
import { CapabilityBlock } from '../components/CapabilityBlock';
import { SystemMedia } from '../components/SystemMedia';

const PlateIcon: React.FC = () => (
  <svg width="52" height="52" viewBox="0 0 24 24" fill="none">
    <rect
      x="3"
      y="7"
      width="18"
      height="10"
      rx="2"
      stroke={colors.accent}
      strokeWidth="1.8"
    />
    <path
      d="M7 11h2M11 11h2M15 11h2M7 14h10"
      stroke={colors.accent}
      strokeWidth="1.6"
      strokeLinecap="round"
    />
  </svg>
);

const PLATE = 'ABC-1234';
const ROUTE = [
  { x: 12, y: 78 },
  { x: 34, y: 60 },
  { x: 52, y: 70 },
  { x: 70, y: 42 },
  { x: 88, y: 30 },
];

const PlatesMock: React.FC = () => {
  const frame = useCurrentFrame();

  const carX = interpolate(frame, [0, 80], [-25, 70], {
    extrapolateRight: 'clamp',
  });
  const ocrChars = Math.max(
    0,
    Math.min(PLATE.length, Math.floor((frame - 40) / 4)),
  );

  const phase2 = frame >= 88;
  const routeProgress = interpolate(frame, [96, 168], [0, ROUTE.length], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  if (!phase2) {
    return (
      <div style={{ position: 'absolute', inset: 0 }}>
        <div
          style={{
            position: 'absolute',
            bottom: 160,
            left: 0,
            right: 0,
            height: 4,
            background: colors.border,
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: 164,
            left: `${carX}%`,
            width: 200,
            height: 86,
            borderRadius: 14,
            background: '#d8e6ee',
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: 90,
            left: '50%',
            transform: 'translateX(-50%)',
            textAlign: 'center',
          }}
        >
          <div
            style={{
              fontFamily: fonts.mono,
              fontSize: 22,
              color: colors.textMuted,
              marginBottom: 14,
            }}
          >
            LECTURA OCR
          </div>
          <div
            style={{
              fontFamily: fonts.mono,
              fontSize: 86,
              fontWeight: 700,
              letterSpacing: 8,
              color: colors.accent,
              border: `3px solid ${colors.accent}`,
              borderRadius: 14,
              padding: '18px 40px',
              minWidth: 480,
            }}
          >
            {PLATE.slice(0, ocrChars) || '—'}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
      >
        {Array.from({ length: 9 }).map((_, i) => (
          <line
            key={`v${i}`}
            x1={(i + 1) * 10}
            y1="0"
            x2={(i + 1) * 10}
            y2="100"
            stroke={colors.border}
            strokeWidth="0.3"
          />
        ))}
        {Array.from({ length: 9 }).map((_, i) => (
          <line
            key={`h${i}`}
            x1="0"
            y1={(i + 1) * 10}
            x2="100"
            y2={(i + 1) * 10}
            stroke={colors.border}
            strokeWidth="0.3"
          />
        ))}
        <polyline
          points={ROUTE.slice(0, Math.ceil(routeProgress))
            .map((p) => `${p.x},${p.y}`)
            .join(' ')}
          fill="none"
          stroke={colors.accent}
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {ROUTE.map((p, i) =>
          i < routeProgress ? (
            <circle
              key={i}
              cx={p.x}
              cy={p.y}
              r="1.8"
              fill={i === 0 ? colors.accentSecondary : colors.accent}
            />
          ) : null,
        )}
      </svg>
      <div
        style={{
          position: 'absolute',
          top: 24,
          left: 28,
          fontFamily: fonts.mono,
          fontSize: 26,
          color: colors.accent,
        }}
      >
        {PLATE} · ruta reconstruida
      </div>
    </div>
  );
};

// Beat 4b — Placas y trazabilidad (0:25–0:31, 180 frames).
export const Beat4b_LicensePlates: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: colors.bg }}>
      <CapabilityBlock
        icon={<PlateIcon />}
        title="Lectura de placas y trazabilidad"
        subtitle="Reconstrucción completa de la ruta de un vehículo a través de su ciudad."
      >
        <SystemMedia
          slot="beat4b_placas"
          style={{ width: '100%', height: '100%' }}
          fallback={<PlatesMock />}
        />
      </CapabilityBlock>
    </AbsoluteFill>
  );
};
