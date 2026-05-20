import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { colors } from '../theme/colors';
import { fonts } from '../theme/fonts';
import { OmnisightLogo } from '../components/OmnisightLogo';

// Beat 7 — Logo de cierre (0:59–1:00, 30 frames). Sin audio.
export const ClosingLogo: React.FC = () => {
  const frame = useCurrentFrame();
  const fade = interpolate(frame, [0, 8], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill
      style={{
        background: '#000000',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 22,
        opacity: fade,
      }}
    >
      <OmnisightLogo size={150} withWordmark />
      <div
        style={{
          fontFamily: fonts.body,
          fontSize: 34,
          fontWeight: 400,
          color: colors.textMuted,
          fontStyle: 'italic',
        }}
      >
        Ve todo. No pierde nada.
      </div>
      <div
        style={{
          marginTop: 14,
          width: 220,
          height: 1,
          background: colors.border,
        }}
      />
      <div
        style={{
          fontFamily: fonts.body,
          fontSize: 22,
          fontWeight: 500,
          color: colors.textMuted,
          letterSpacing: 1.5,
        }}
      >
        by Axentra Solutions
      </div>
    </AbsoluteFill>
  );
};
