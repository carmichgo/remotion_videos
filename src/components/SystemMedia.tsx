import React from 'react';
import {
  Freeze,
  Img,
  OffthreadVideo,
  Sequence,
  staticFile,
  useVideoConfig,
} from 'remotion';
import { MEDIA, MediaEntry, MediaSegment, MediaSlot } from '../assets';
import { colors } from '../theme/colors';

type Props = {
  slot: MediaSlot;
  fallback: React.ReactNode;
  framed?: boolean;
  style?: React.CSSProperties;
  // Frames totales del slot. Requerido si usas holdLastMs y segments
  // sin durar exactamente lo que el slot.
  slotFrames?: number;
};

const isVideo = (src: string) => /\.(mp4|webm|mov|m4v)$/i.test(src);

type Resolved = {
  src: string;
  startFrom: number;
  playbackRate: number;
  holdLastMs: number;
  segments: MediaSegment[] | null;
};

const resolveEntry = (entry: MediaEntry): Resolved | null => {
  if (entry == null) return null;
  if (typeof entry === 'string') {
    return {
      src: entry,
      startFrom: 0,
      playbackRate: 1,
      holdLastMs: 0,
      segments: null,
    };
  }
  return {
    src: entry.src,
    startFrom: entry.startFrom ?? 0,
    playbackRate: entry.playbackRate ?? 1,
    holdLastMs: entry.holdLastMs ?? 0,
    segments: entry.segments && entry.segments.length > 0 ? entry.segments : null,
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

  if (!isVideo(entry.src)) {
    return (
      <div style={{ ...frameStyle, ...style }}>
        <Img src={staticFile(entry.src)} style={full} />
      </div>
    );
  }

  const holdFrames = Math.round((entry.holdLastMs * fps) / 1000);

  // Caso multi-segmento: cada segmento es una sub-sequence; freeze opcional.
  if (entry.segments) {
    let cum = 0;
    const segs = entry.segments.map((s) => {
      const sourceSeconds = s.to - s.from;
      const segFrames = Math.max(
        1,
        Math.round((sourceSeconds * fps) / entry.playbackRate),
      );
      const from = cum;
      cum += segFrames;
      return {
        from,
        durationInFrames: segFrames,
        sourceStartFrame: Math.round(s.from * fps),
      };
    });
    const totalPlayFrames = cum;
    const lastSeg = entry.segments[entry.segments.length - 1];
    const freezeSourceFrame = Math.round(lastSeg.to * fps) - 1;

    return (
      <div style={{ ...frameStyle, ...style }}>
        {segs.map((s, i) => (
          <Sequence
            key={i}
            from={s.from}
            durationInFrames={s.durationInFrames}
            layout="none"
          >
            <OffthreadVideo
              src={staticFile(entry.src)}
              style={full}
              muted
              startFrom={s.sourceStartFrame}
              playbackRate={entry.playbackRate}
            />
          </Sequence>
        ))}
        {holdFrames > 0 ? (
          <Sequence
            from={totalPlayFrames}
            durationInFrames={holdFrames}
            layout="none"
          >
            <Freeze frame={totalPlayFrames}>
              <OffthreadVideo
                src={staticFile(entry.src)}
                style={full}
                muted
                startFrom={freezeSourceFrame}
                playbackRate={entry.playbackRate}
              />
            </Freeze>
          </Sequence>
        ) : null}
      </div>
    );
  }

  // Caso simple (un solo segmento por startFrom).
  const startFromFrames = Math.round(entry.startFrom * fps);
  const hasHold = holdFrames > 0 && slotFrames && slotFrames > holdFrames;
  const playFrames = hasHold ? slotFrames - holdFrames : 0;

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
