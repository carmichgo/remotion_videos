import React from 'react';
import { spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { colors } from '../theme/colors';
import { fonts } from '../theme/fonts';

type Props = {
  icon: React.ReactNode;
  title: string;
  subtitle?: string;
  children: React.ReactNode; // área de demo (derecha)
};

// Layout horizontal 16:9: columna izquierda (ícono + título), columna
// derecha (demo grande).
export const CapabilityBlock: React.FC<Props> = ({
  icon,
  title,
  subtitle,
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
        alignItems: 'center',
        gap: 80,
        padding: '0 110px',
      }}
    >
      <div
        style={{
          width: 560,
          flexShrink: 0,
          display: 'flex',
          flexDirection: 'column',
          gap: 30,
          opacity: enter,
          transform: `translateX(${(1 - enter) * -28}px)`,
        }}
      >
        <div
          style={{
            width: 104,
            height: 104,
            borderRadius: 24,
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
            fontSize: 76,
            color: colors.text,
            lineHeight: 1.04,
          }}
        >
          {title}
        </div>
        {subtitle ? (
          <div
            style={{
              fontFamily: fonts.body,
              fontWeight: 500,
              fontSize: 30,
              color: colors.textMuted,
              lineHeight: 1.35,
            }}
          >
            {subtitle}
          </div>
        ) : null}
      </div>

      <div
        style={{
          flex: 1,
          height: 760,
          opacity: enter,
          transform: `scale(${0.97 + enter * 0.03})`,
        }}
      >
        {children}
      </div>
    </div>
  );
};
