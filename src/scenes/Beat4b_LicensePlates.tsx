import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { colors } from '../theme/colors';
import { fonts } from '../theme/fonts';
import { CapabilityBlock } from '../components/CapabilityBlock';

const PlateIcon: React.FC = () => (
  <svg width="46" height="46" viewBox="0 0 24 24" fill="none">
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

// Beat 4b — Placas y trazabilidad (0:25–0:31, 180 frames).
export const Beat4b_LicensePlates: React.FC = () => {
  const frame = useCurrentFrame();

  // Fase 1 (0–90): vehículo + OCR de placa.
  const carX = interpolate(frame, [0, 80], [-30, 60], {
    extrapolateRight: 'clamp',
  });
  const ocrChars = Math.max(
    0,
    Math.min(PLATE.length, Math.floor((frame - 40) / 4)),
  );

  // Fase 2 (90–180): mapa con la ruta.
  const phase2 = frame >= 88;
  const routeProgress = interpolate(frame, [96, 168], [0, ROUTE.length], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill style={{ background: colors.bg }}>
      <CapabilityBlock
        icon={<PlateIcon />}
        title="Lectura de placas y trazabilidad"
      >
        <div
          style={{
            width: '100%',
            height: 620,
            borderRadius: 22,
            overflow: 'hidden',
            border: `2px solid ${colors.border}`,
            background: colors.bgDark,
            position: 'relative',
          }}
        >
          {!phase2 ? (
            <>
              {/* Vía */}
              <div
                style={{
                  position: 'absolute',
                  bottom: 120,
                  left: 0,
                  right: 0,
                  height: 4,
                  background: colors.border,
                }}
              />
              {/* Vehículo abstracto */}
              <div
                style={{
                  position: 'absolute',
                  bottom: 124,
                  left: `${carX}%`,
                  width: 150,
                  height: 64,
                  borderRadius: 12,
                  background: '#d8e6ee',
                }}
              />
              {/* Recuadro OCR + placa */}
              <div
                style={{
                  position: 'absolute',
                  top: 60,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  textAlign: 'center',
                }}
              >
                <div
                  style={{
                    fontFamily: fonts.mono,
                    fontSize: 18,
                    color: colors.textMuted,
                    marginBottom: 10,
                  }}
                >
                  LECTURA OCR
                </div>
                <div
                  style={{
                    fontFamily: fonts.mono,
                    fontSize: 64,
                    fontWeight: 700,
                    letterSpacing: 6,
                    color: colors.accent,
                    border: `3px solid ${colors.accent}`,
                    borderRadius: 12,
                    padding: '14px 30px',
                    minWidth: 360,
                  }}
                >
                  {PLATE.slice(0, ocrChars) || '—'}
                </div>
              </div>
            </>
          ) : (
            <>
              {/* Mapa simplificado con cuadrícula */}
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
                {/* Línea de ruta */}
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
                      r="2"
                      fill={i === 0 ? colors.accentSecondary : colors.accent}
                    />
                  ) : null,
                )}
              </svg>
              <div
                style={{
                  position: 'absolute',
                  top: 18,
                  left: 22,
                  fontFamily: fonts.mono,
                  fontSize: 22,
                  color: colors.accent,
                }}
              >
                {PLATE} · ruta reconstruida
              </div>
            </>
          )}
        </div>
      </CapabilityBlock>
    </AbsoluteFill>
  );
};
