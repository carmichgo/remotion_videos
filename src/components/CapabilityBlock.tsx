import React from 'react';
import { spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { colors } from '../theme/colors';
import { fonts } from '../theme/fonts';

type Props = {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode; // área de demo
};

export const CapabilityBlock: React.FC<Props> = ({
  icon,
  title,
  children,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const enter = spring({
    frame,
    fps,
    config: { damping: 200 },
    durationInFrames: 18,
  });

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 56,
        padding: '0 64px',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 26,
          opacity: enter,
          transform: `translateY(${(1 - enter) * 26}px)`,
        }}
      >
        <div
          style={{
            width: 88,
            height: 88,
            borderRadius: 20,
            background: 'rgba(0,212,255,0.12)',
            border: `2px solid ${colors.accent}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {icon}
        </div>
        <div
          style={{
            fontFamily: fonts.display,
            fontWeight: 900,
            fontSize: 56,
            color: colors.text,
            maxWidth: 680,
            lineHeight: 1.05,
          }}
        >
          {title}
        </div>
      </div>

      <div
        style={{
          width: '100%',
          opacity: enter,
          transform: `scale(${0.97 + enter * 0.03})`,
        }}
      >
        {children}
      </div>
    </div>
  );
};
