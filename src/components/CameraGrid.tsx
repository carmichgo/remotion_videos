import React from 'react';
import {
  interpolate,
  random,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import { colors } from '../theme/colors';
import { fonts } from '../theme/fonts';

type Props = {
  cols?: number;
  rows?: number;
  // frame (local) en el que los cuadros bajan a 20% y el focusIndex queda al 100%
  focusAtFrame?: number | null;
  focusIndex?: number;
  // color del borde/glow del cuadro destacado (default cyan accent)
  focusColor?: string;
};

// Mosaico de cámaras generado proceduralmente (sin video real).
// Cada cuadro tiene una "escena" abstracta con leve movimiento interno.
const CameraTile: React.FC<{
  index: number;
  dim: number; // 0..1 -> opacidad de la imagen
  highlight: boolean;
  highlightColor: string;
}> = ({ index, dim, highlight, highlightColor }) => {
  const frame = useCurrentFrame();
  const seed = index + 1;

  // Movimiento interno pseudo-aleatorio pero determinista.
  const driftX = Math.sin(frame / 24 + random(`x${seed}`) * 10) * 14;
  const driftY = Math.cos(frame / 30 + random(`y${seed}`) * 10) * 10;
  const blobHue = 190 + random(`h${seed}`) * 60;

  return (
    <div
      style={{
        position: 'relative',
        overflow: 'hidden',
        borderRadius: 10,
        border: `2px solid ${highlight ? highlightColor : colors.border}`,
        background: colors.bgDark,
        opacity: dim,
        boxShadow: highlight
          ? `0 0 32px ${highlightColor}66`
          : 'none',
      }}
    >
      {/* "Escena" abstracta de la cámara */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `radial-gradient(circle at ${50 + driftX}% ${
            50 + driftY
          }%, hsl(${blobHue} 80% 30%) 0%, ${colors.bgDark} 70%)`,
        }}
      />
      {/* Siluetas en movimiento (rectángulos, nunca rostros reales) */}
      {[0, 1, 2].map((s) => {
        const sx =
          ((frame * (0.6 + random(`s${seed}${s}`)) +
            random(`o${seed}${s}`) * 200) %
            120) -
          10;
        return (
          <div
            key={s}
            style={{
              position: 'absolute',
              bottom: '14%',
              left: `${sx}%`,
              width: 8,
              height: 22,
              borderRadius: 3,
              background: '#cfe9f5',
              opacity: 0.5,
            }}
          />
        );
      })}
      {/* Overlay UI estilo CCTV */}
      <div
        style={{
          position: 'absolute',
          top: 6,
          left: 8,
          fontFamily: fonts.mono,
          fontSize: 12,
          color: colors.textMuted,
          letterSpacing: 0.5,
        }}
      >
        CAM {String(index + 1).padStart(2, '0')}
      </div>
      <div
        style={{
          position: 'absolute',
          top: 6,
          right: 8,
          fontFamily: fonts.mono,
          fontSize: 11,
          color: highlight ? colors.alert : colors.textMuted,
        }}
      >
        ● REC
      </div>
    </div>
  );
};

export const CameraGrid: React.FC<Props> = ({
  cols = 4,
  rows = 4,
  focusAtFrame = null,
  focusIndex = 6,
  focusColor = colors.accent,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  void fps;

  const total = cols * rows;

  const focusProgress =
    focusAtFrame == null
      ? 0
      : interpolate(frame, [focusAtFrame, focusAtFrame + 18], [0, 1], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        });

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${cols}, 1fr)`,
        gridTemplateRows: `repeat(${rows}, 1fr)`,
        gap: 14,
        width: '100%',
        height: '100%',
      }}
    >
      {Array.from({ length: total }).map((_, i) => {
        const isFocus = i === focusIndex;
        const dim = isFocus
          ? 1
          : interpolate(focusProgress, [0, 1], [1, 0.2]);
        return (
          <CameraTile
            key={i}
            index={i}
            dim={dim}
            highlight={isFocus && focusProgress > 0.5}
            highlightColor={focusColor}
          />
        );
      })}
    </div>
  );
};
