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

const StackIcon: React.FC = () => (
  <svg width="52" height="52" viewBox="0 0 24 24" fill="none">
    <rect x="3" y="4" width="18" height="4" rx="1" stroke={colors.accent} strokeWidth="1.8" />
    <rect x="3" y="10" width="18" height="4" rx="1" stroke={colors.accent} strokeWidth="1.8" />
    <rect x="3" y="16" width="18" height="4" rx="1" stroke={colors.accent} strokeWidth="1.8" />
    <circle cx="6" cy="6" r="0.8" fill={colors.accent} />
    <circle cx="6" cy="12" r="0.8" fill={colors.accent} />
    <circle cx="6" cy="18" r="0.8" fill={colors.accent} />
  </svg>
);

// Una detección con recuadro de color sobre la "escena urbana" abstracta.
type Det = {
  // posición relativa al contenedor (0..1)
  x: number;
  y: number;
  w: number;
  h: number;
  label: string;
  color: string;
  delay: number;
  pulse?: boolean;
};

const DETECTIONS: Det[] = [
  { x: 0.18, y: 0.45, w: 0.10, h: 0.34, label: 'Persona',  color: colors.accent,           delay: 8 },
  { x: 0.40, y: 0.62, w: 0.26, h: 0.22, label: 'Vehículo — sedán gris', color: colors.accentSecondary, delay: 18 },
  { x: 0.22, y: 0.36, w: 0.06, h: 0.10, label: 'Mochila',  color: '#FFC857',               delay: 28 },
  { x: 0.70, y: 0.18, w: 0.22, h: 0.10, label: 'Texto: Pizza Express', color: '#FF7DD2',   delay: 38 },
  { x: 0.55, y: 0.42, w: 0.08, h: 0.18, label: 'Arma detectada',       color: colors.alert, delay: 60, pulse: true },
];

const MODEL_LABELS = [
  'Personas',
  'Vehículos',
  'Armas',
  'Objetos',
  'Rostros',
  'Acciones',
  'Texto',
  'Comportamiento',
  'Obstrucciones',
];

const DetectionBox: React.FC<{ det: Det }> = ({ det }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({
    frame: frame - det.delay,
    fps,
    config: { damping: 200 },
    durationInFrames: 14,
  });
  if (frame < det.delay) return null;

  const pulse = det.pulse ? 0.6 + 0.4 * Math.abs(Math.sin(frame / 6)) : 1;

  return (
    <div
      style={{
        position: 'absolute',
        left: `${det.x * 100}%`,
        top: `${det.y * 100}%`,
        width: `${det.w * 100}%`,
        height: `${det.h * 100}%`,
        border: `3px solid ${det.color}`,
        borderRadius: 6,
        boxShadow: det.pulse
          ? `0 0 ${20 * pulse}px ${det.color}`
          : `0 0 14px ${det.color}55`,
        opacity: s,
        transform: `scale(${0.92 + s * 0.08})`,
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: -34,
          left: -3,
          fontFamily: fonts.mono,
          fontSize: 16,
          fontWeight: 700,
          color: '#0A0E1A',
          background: det.color,
          padding: '4px 10px',
          borderRadius: 5,
          whiteSpace: 'nowrap',
        }}
      >
        {det.label}
      </div>
    </div>
  );
};

const StreetScene: React.FC = () => {
  // Escena urbana abstracta (cielo + suelo + manchas) — sin gente real.
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        background:
          'linear-gradient(180deg, #1a2235 0%, #0d1320 55%, #1c1e1a 100%)',
      }}
    >
      {/* "Edificios" */}
      <div style={{ position: 'absolute', left: '5%', top: '15%', width: '24%', height: '50%', background: '#0a1020' }} />
      <div style={{ position: 'absolute', left: '32%', top: '20%', width: '20%', height: '45%', background: '#0e1428' }} />
      <div style={{ position: 'absolute', left: '54%', top: '12%', width: '18%', height: '52%', background: '#0a1020' }} />
      <div style={{ position: 'absolute', left: '76%', top: '22%', width: '20%', height: '42%', background: '#0e1428' }} />
      {/* "Calle" */}
      <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: '20%', background: '#13160e' }} />
    </div>
  );
};

const ModelsColumn: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <div
      style={{
        position: 'absolute',
        top: 24,
        right: 24,
        padding: '14px 16px',
        background: 'rgba(10,14,26,0.78)',
        border: `1px solid ${colors.border}`,
        borderRadius: 10,
        display: 'flex',
        flexDirection: 'column',
        gap: 8,
        minWidth: 200,
      }}
    >
      <div
        style={{
          fontFamily: fonts.mono,
          fontSize: 14,
          color: colors.textMuted,
          letterSpacing: 1,
        }}
      >
        9 MODELOS ACTIVOS
      </div>
      <div style={{ display: 'flex', gap: 6 }}>
        {Array.from({ length: 9 }).map((_, i) => {
          const opacity = 0.4 + 0.6 * Math.abs(Math.sin((frame + i * 7) / 9));
          return (
            <div
              key={i}
              style={{
                width: 10,
                height: 10,
                borderRadius: '50%',
                background: colors.accentSecondary,
                opacity,
                boxShadow: `0 0 6px ${colors.accentSecondary}`,
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

const CascadeLabels: React.FC<{ startFrame: number }> = ({ startFrame }) => {
  const frame = useCurrentFrame();
  return (
    <div
      style={{
        position: 'absolute',
        left: 24,
        right: 24,
        bottom: 24,
        display: 'flex',
        flexWrap: 'wrap',
        gap: 10,
      }}
    >
      {MODEL_LABELS.map((m, i) => {
        const op = interpolate(
          frame,
          [startFrame + i * 4, startFrame + i * 4 + 12],
          [0, 1],
          { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' },
        );
        return (
          <div
            key={m}
            style={{
              opacity: op,
              fontFamily: fonts.mono,
              fontSize: 16,
              color: colors.text,
              background: 'rgba(0,212,255,0.12)',
              border: `1px solid ${colors.accent}55`,
              padding: '5px 10px',
              borderRadius: 999,
            }}
          >
            {m}
          </div>
        );
      })}
    </div>
  );
};

const NineModelsMock: React.FC = () => {
  const frame = useCurrentFrame();
  const finalTextOpacity = interpolate(frame, [140, 156], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      <StreetScene />
      {DETECTIONS.map((d, i) => (
        <DetectionBox key={i} det={d} />
      ))}
      <ModelsColumn />
      <CascadeLabels startFrame={70} />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          opacity: finalTextOpacity,
          pointerEvents: 'none',
        }}
      >
        <div
          style={{
            fontFamily: fonts.display,
            fontSize: 56,
            fontWeight: 900,
            color: colors.text,
            textAlign: 'center',
            textShadow: '0 4px 24px rgba(0,0,0,0.85)',
          }}
        >
          Nueve especialistas.
          <br />
          Una sola escena.
        </div>
      </div>
    </div>
  );
};

// Beat 4c — Nueve modelos de IA en paralelo (0:30–0:36, 180 frames).
export const Beat4c_NineModels: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: colors.bg }}>
      <CapabilityBlock
        icon={<StackIcon />}
        title="Nueve modelos de IA en paralelo"
        subtitle="Sobre cada cámara. Cada uno experto en lo suyo. Todo en simultáneo."
      >
        <SystemMedia
          slot="beat4c_nueve"
          style={{ width: '100%', height: '100%' }}
          fallback={<NineModelsMock />}
        />
      </CapabilityBlock>
    </AbsoluteFill>
  );
};
