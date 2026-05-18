import React from 'react';
import { interpolate, useCurrentFrame } from 'remotion';
import { colors } from '../theme/colors';
import { fonts } from '../theme/fonts';

type Props = {
  query: string;
  startFrame?: number; // frame local en que empieza a teclearse
  charsPerFrame?: number;
  ctaLabel?: string; // texto del botón (default "Buscar")
  clickFrame?: number | null; // frame en que se "presiona" el botón
  placeholder?: string;
  width?: number | string;
};

// Barra de búsqueda estilo Spotlight con efecto typewriter.
export const SearchBar: React.FC<Props> = ({
  query,
  startFrame = 0,
  charsPerFrame = 3,
  ctaLabel = 'Buscar',
  clickFrame = null,
  placeholder = 'Describe a quién o qué buscas…',
  width = 880,
}) => {
  const frame = useCurrentFrame();
  const typed = Math.max(0, Math.floor((frame - startFrame) * charsPerFrame));
  const visible = query.slice(0, Math.min(typed, query.length));
  const done = typed >= query.length;
  const showCursor = !done && Math.floor(frame / 8) % 2 === 0;

  const pressed =
    clickFrame != null && frame >= clickFrame && frame < clickFrame + 6;
  const ctaScale = pressed ? 0.94 : 1;
  const glow = interpolate(frame % 60, [0, 30, 60], [0.25, 0.5, 0.25]);

  return (
    <div
      style={{
        width,
        display: 'flex',
        alignItems: 'flex-start',
        gap: 22,
        padding: '34px 38px',
        borderRadius: 26,
        background: 'rgba(13,19,33,0.92)',
        border: `2px solid ${colors.border}`,
        boxShadow: `0 0 60px rgba(0,212,255,${glow * 0.4})`,
        backdropFilter: 'blur(8px)',
      }}
    >
      <svg
        width="40"
        height="40"
        viewBox="0 0 24 24"
        fill="none"
        style={{ flexShrink: 0, marginTop: 4 }}
      >
        <circle
          cx="11"
          cy="11"
          r="7"
          stroke={colors.accent}
          strokeWidth="2.4"
        />
        <line
          x1="16.5"
          y1="16.5"
          x2="21"
          y2="21"
          stroke={colors.accent}
          strokeWidth="2.4"
          strokeLinecap="round"
        />
      </svg>
      <div
        style={{
          flex: 1,
          minWidth: 0,
          fontFamily: fonts.body,
          fontSize: 34,
          fontWeight: 500,
          lineHeight: 1.32,
          color: visible ? colors.text : colors.textMuted,
          wordBreak: 'break-word',
        }}
      >
        {visible || placeholder}
        <span
          style={{
            opacity: showCursor ? 1 : 0,
            color: colors.accent,
            fontWeight: 700,
          }}
        >
          |
        </span>
      </div>
      <div
        style={{
          flexShrink: 0,
          alignSelf: 'flex-start',
          fontFamily: fonts.display,
          fontSize: 26,
          fontWeight: 700,
          color: colors.bgDark,
          background: colors.accent,
          padding: '16px 30px',
          borderRadius: 14,
          transform: `scale(${ctaScale})`,
          whiteSpace: 'nowrap',
        }}
      >
        {ctaLabel}
      </div>
    </div>
  );
};
