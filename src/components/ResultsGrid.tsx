import React from 'react';
import {
  interpolate,
  random,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import { colors } from '../theme/colors';
import { fonts } from '../theme/fonts';

export type ResultItem = {
  label: string; // "Cámara 47 — 14:32"
  tag?: string; // etiqueta opcional sobre el thumbnail
};

type Props = {
  items: ResultItem[];
  startFrame?: number; // frame local del primer thumbnail
  stagger?: number; // frames entre apariciones
  cols?: number;
};

const Thumb: React.FC<{ item: ResultItem; appearFrame: number; idx: number }> =
  ({ item, appearFrame, idx }) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const s = spring({
      frame: frame - appearFrame,
      fps,
      config: { damping: 200 },
      durationInFrames: 16,
    });

    const hue = 195 + random(`thumb${idx}`) * 50;
    const cx = 30 + random(`cx${idx}`) * 40;
    const cy = 35 + random(`cy${idx}`) * 30;

    return (
      <div
        style={{
          opacity: s,
          transform: `translateY(${(1 - s) * 24}px) scale(${0.96 + s * 0.04})`,
          borderRadius: 12,
          overflow: 'hidden',
          border: `2px solid ${colors.border}`,
          background: colors.bgDark,
        }}
      >
        <div
          style={{
            position: 'relative',
            width: '100%',
            aspectRatio: '16 / 10',
            background: `radial-gradient(circle at ${cx}% ${cy}%, hsl(${hue} 70% 32%) 0%, ${colors.bgDark} 72%)`,
          }}
        >
          {/* Silueta abstracta detectada (rectángulo, nunca rostro real) */}
          <div
            style={{
              position: 'absolute',
              left: `${cx}%`,
              top: `${cy}%`,
              width: 26,
              height: 54,
              transform: 'translate(-50%,-50%)',
              border: `2px solid ${colors.accent}`,
              borderRadius: 4,
              background: 'rgba(0,212,255,0.12)',
            }}
          />
          {item.tag ? (
            <div
              style={{
                position: 'absolute',
                top: 8,
                left: 8,
                fontFamily: fonts.mono,
                fontSize: 13,
                color: colors.bgDark,
                background: colors.accent,
                padding: '2px 8px',
                borderRadius: 6,
                fontWeight: 700,
              }}
            >
              {item.tag}
            </div>
          ) : null}
        </div>
        <div
          style={{
            fontFamily: fonts.mono,
            fontSize: 18,
            color: colors.textMuted,
            padding: '10px 12px',
          }}
        >
          {item.label}
        </div>
      </div>
    );
  };

export const ResultsGrid: React.FC<Props> = ({
  items,
  startFrame = 0,
  stagger = 4,
  cols = 3,
}) => {
  const frame = useCurrentFrame();
  const containerOpacity = interpolate(
    frame,
    [startFrame - 4, startFrame + 4],
    [0, 1],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' },
  );

  return (
    <div
      style={{
        opacity: containerOpacity,
        display: 'grid',
        gridTemplateColumns: `repeat(${cols}, 1fr)`,
        gap: 20,
        width: '100%',
      }}
    >
      {items.map((it, i) => (
        <Thumb
          key={i}
          idx={i}
          item={it}
          appearFrame={startFrame + i * stagger}
        />
      ))}
    </div>
  );
};
