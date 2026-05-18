import React from 'react';
import { interpolate, useCurrentFrame } from 'remotion';
import { colors } from '../theme/colors';
import { fonts } from '../theme/fonts';
import { OmnisightLogo } from './OmnisightLogo';

const CameraIcon: React.FC = () => (
  <svg width="64" height="64" viewBox="0 0 24 24" fill="none">
    <rect
      x="3"
      y="7"
      width="13"
      height="10"
      rx="2"
      stroke={colors.accent}
      strokeWidth="1.8"
    />
    <path
      d="M16 10l5-3v10l-5-3"
      stroke={colors.accent}
      strokeWidth="1.8"
      strokeLinejoin="round"
    />
  </svg>
);

const ScreenIcon: React.FC = () => (
  <svg width="64" height="64" viewBox="0 0 24 24" fill="none">
    <rect
      x="3"
      y="4"
      width="18"
      height="12"
      rx="2"
      stroke={colors.accent}
      strokeWidth="1.8"
    />
    <path
      d="M9 20h6M12 16v4"
      stroke={colors.accent}
      strokeWidth="1.8"
      strokeLinecap="round"
    />
  </svg>
);

const Node: React.FC<{ label: string; children: React.ReactNode }> = ({
  label,
  children,
}) => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 14,
    }}
  >
    <div
      style={{
        width: 130,
        height: 130,
        borderRadius: 24,
        background: 'rgba(0,212,255,0.08)',
        border: `2px solid ${colors.border}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {children}
    </div>
    <div
      style={{
        fontFamily: fonts.body,
        fontSize: 26,
        fontWeight: 600,
        color: colors.textMuted,
      }}
    >
      {label}
    </div>
  </div>
);

// Flecha con dash animado (flujo cámaras -> Omnisight -> C5).
const Flow: React.FC<{ delay: number }> = ({ delay }) => {
  const frame = useCurrentFrame();
  const appear = interpolate(frame, [delay, delay + 16], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const dash = -(frame * 1.6) % 24;

  return (
    <svg width="150" height="40" viewBox="0 0 150 40" style={{ opacity: appear }}>
      <line
        x1="6"
        y1="20"
        x2="128"
        y2="20"
        stroke={colors.accent}
        strokeWidth="3"
        strokeDasharray="10 6"
        strokeDashoffset={dash}
      />
      <path
        d="M128 12l16 8-16 8z"
        fill={colors.accent}
      />
    </svg>
  );
};

export const InfrastructureDiagram: React.FC = () => {
  const frame = useCurrentFrame();
  const ring = interpolate(frame, [0, 24], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <div
      style={{
        position: 'relative',
        width: 980,
        height: 560,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Círculo contenedor */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: '50%',
          border: `2px dashed ${colors.accent}`,
          opacity: ring * 0.5,
          transform: `scale(${0.9 + ring * 0.1})`,
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: 26,
          width: '100%',
          textAlign: 'center',
          fontFamily: fonts.display,
          fontSize: 30,
          fontWeight: 700,
          color: colors.accent,
          opacity: ring,
        }}
      >
        Su infraestructura. Su data. Su control.
      </div>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 6,
        }}
      >
        <Node label="Sus cámaras">
          <CameraIcon />
        </Node>
        <Flow delay={10} />
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 14,
          }}
        >
          <div
            style={{
              width: 170,
              height: 130,
              borderRadius: 24,
              background: 'rgba(0,212,255,0.14)',
              border: `2px solid ${colors.accent}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <OmnisightLogo size={54} withWordmark={false} />
          </div>
          <div
            style={{
              fontFamily: fonts.body,
              fontSize: 26,
              fontWeight: 600,
              color: colors.textMuted,
            }}
          >
            Omnisight
          </div>
        </div>
        <Flow delay={22} />
        <Node label="Su C5">
          <ScreenIcon />
        </Node>
      </div>
    </div>
  );
};
