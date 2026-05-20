import React from 'react';
import {
  Img,
  OffthreadVideo,
  staticFile,
  useVideoConfig,
} from 'remotion';
import { MEDIA, MediaEntry, MediaSlot } from '../assets';
import { colors } from '../theme/colors';

type Props = {
  slot: MediaSlot;
  // Mockup procedural usado cuando el slot no tiene asset real.
  fallback: React.ReactNode;
  // Marco visual común (borde/fondo) para que el mockup y el footage
  // real se vean consistentes.
  framed?: boolean;
  style?: React.CSSProperties;
};

const isVideo = (src: string) => /\.(mp4|webm|mov|m4v)$/i.test(src);

// Normaliza MediaEntry (string | objeto | null) a una forma uniforme.
const resolveEntry = (entry: MediaEntry) => {
  if (entry == null) return null;
  if (typeof entry === 'string') return { src: entry, startFrom: 0, playbackRate: 1 };
  return {
    src: entry.src,
    startFrom: entry.startFrom ?? 0,
    playbackRate: entry.playbackRate ?? 1,
  };
};

// Renderiza el asset real del sistema si está definido en src/assets.ts;
// si no, muestra el mockup procedural.
export const SystemMedia: React.FC<Props> = ({
  slot,
  fallback,
  framed = true,
  style,
}) => {
  const { fps } = useVideoConfig();
  const entry = resolveEntry(MEDIA[slot]);

  const frameStyle: React.CSSProperties = framed
    ? {
        borderRadius: 22,
        overflow: 'hidden',
        border: `2px solid ${colors.border}`,
        background: colors.bgDark,
      }
    : {};

  if (!entry) {
    return <div style={{ ...frameStyle, ...style }}>{fallback}</div>;
  }

  const full: React.CSSProperties = {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    display: 'block',
  };

  return (
    <div style={{ ...frameStyle, ...style }}>
      {isVideo(entry.src) ? (
        <OffthreadVideo
          src={staticFile(entry.src)}
          style={full}
          muted
          startFrom={Math.round(entry.startFrom * fps)}
          playbackRate={entry.playbackRate}
        />
      ) : (
        <Img src={staticFile(entry.src)} style={full} />
      )}
    </div>
  );
};
