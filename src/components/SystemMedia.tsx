import React from 'react';
import {
  Freeze,
  Img,
  OffthreadVideo,
  Sequence,
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
  // Cuántas frames dura el slot que contiene este SystemMedia. Solo es
  // necesario si la entry usa `holdLastMs` (para saber cuándo congelar).
  slotFrames?: number;
};

const isVideo = (src: string) => /\.(mp4|webm|mov|m4v)$/i.test(src);

const resolveEntry = (entry: MediaEntry) => {
  if (entry == null) return null;
  if (typeof entry === 'string') {
    return { src: entry, startFrom: 0, playbackRate: 1, holdLastMs: 0 };
  }
  return {
    src: entry.src,
    startFrom: entry.startFrom ?? 0,
    playbackRate: entry.playbackRate ?? 1,
    holdLastMs: entry.holdLastMs ?? 0,
  };
};

export const SystemMedia: React.FC<Props> = ({
  slot,
  fallback,
  framed = true,
  style,
  slotFrames,
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

  // Imagen estática: sin freeze ni rate.
  if (!isVideo(entry.src)) {
    return (
      <div style={{ ...frameStyle, ...style }}>
        <Img src={staticFile(entry.src)} style={full} />
      </div>
    );
  }

  const startFromFrames = Math.round(entry.startFrom * fps);
  const holdFrames = Math.round((entry.holdLastMs * fps) / 1000);
  const hasHold = holdFrames > 0 && slotFrames && slotFrames > holdFrames;
  const playFrames = hasHold ? slotFrames - holdFrames : 0;

  // Sin freeze: reproducción normal.
  if (!hasHold) {
    return (
      <div style={{ ...frameStyle, ...style }}>
        <OffthreadVideo
          src={staticFile(entry.src)}
          style={full}
          muted
          startFrom={startFromFrames}
          playbackRate={entry.playbackRate}
        />
      </div>
    );
  }

  // Con freeze: dos sub-sequences. La segunda usa <Freeze> + un OffthreadVideo
  // cuyo startFrom apunta a la frame donde terminó la reproducción.
  const freezeSourceFrame =
    startFromFrames + Math.round(playFrames * entry.playbackRate);

  return (
    <div style={{ ...frameStyle, ...style }}>
      <Sequence durationInFrames={playFrames} layout="none">
        <OffthreadVideo
          src={staticFile(entry.src)}
          style={full}
          muted
          startFrom={startFromFrames}
          playbackRate={entry.playbackRate}
        />
      </Sequence>
      <Sequence from={playFrames} durationInFrames={holdFrames} layout="none">
        <Freeze frame={playFrames}>
          <OffthreadVideo
            src={staticFile(entry.src)}
            style={full}
            muted
            startFrom={freezeSourceFrame}
            playbackRate={entry.playbackRate}
          />
        </Freeze>
      </Sequence>
    </div>
  );
};
