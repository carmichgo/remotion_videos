import React from 'react';
import { Img, OffthreadVideo, staticFile } from 'remotion';
import { MEDIA, MediaSlot } from '../assets';
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

// Renderiza el asset real del sistema si está definido en src/assets.ts;
// si no, muestra el mockup procedural.
export const SystemMedia: React.FC<Props> = ({
  slot,
  fallback,
  framed = true,
  style,
}) => {
  const src = MEDIA[slot];

  const frameStyle: React.CSSProperties = framed
    ? {
        borderRadius: 22,
        overflow: 'hidden',
        border: `2px solid ${colors.border}`,
        background: colors.bgDark,
      }
    : {};

  if (!src) {
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
      {isVideo(src) ? (
        <OffthreadVideo src={staticFile(src)} style={full} muted />
      ) : (
        <Img src={staticFile(src)} style={full} />
      )}
    </div>
  );
};
