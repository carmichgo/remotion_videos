import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { colors } from '../theme/colors';
import { fonts } from '../theme/fonts';
import { CapabilityBlock } from '../components/CapabilityBlock';
import { SystemMedia } from '../components/SystemMedia';

const MotionIcon: React.FC = () => (
  <svg width="52" height="52" viewBox="0 0 24 24" fill="none">
    <circle cx="13" cy="5" r="2" fill={colors.accent} />
    <path
      d="M13 8l-3 5 3 2 1 5M10 13l-4 1M13 8l4 2"
      stroke={colors.accent}
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M3 7h3M2 11h3M3 15h3"
      stroke={colors.accent}
      strokeWidth="1.6"
      strokeLinecap="round"
    />
  </svg>
);

const Figure: React.FC<{ size?: number }> = ({ size = 1 }) => (
  <svg width={70 * size} height={140 * size} viewBox="0 0 70 140">
    <circle cx="35" cy="22" r="18" fill="#cfe4ee" />
    <rect x="18" y="44" width="34" height="76" rx="12" fill="#cfe4ee" />
  </svg>
);

const Detection: React.FC<{ label: string; cam: string }> = ({
  label,
  cam,
}) => {
  const frame = useCurrentFrame();
  const pulse = 0.6 + 0.4 * Math.abs(Math.sin(frame / 8));
  return (
    <div
      style={{
        position: 'absolute',
        top: 90,
        left: 70,
        right: 70,
        bottom: 70,
        border: `4px solid ${colors.alert}`,
        borderRadius: 10,
        boxShadow: `0 0 ${20 * pulse}px ${colors.alert}`,
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: -56,
          left: -4,
          fontFamily: fonts.mono,
          fontSize: 28,
          fontWeight: 700,
          color: colors.text,
          background: colors.alert,
          padding: '8px 18px',
          borderRadius: 6,
        }}
      >
        {label} — {cam}
      </div>
    </div>
  );
};

const ActionMock: React.FC = () => {
  const frame = useCurrentFrame();
  const phase2 = frame >= 78;
  const runX = interpolate(frame, [10, 70], [12, 72], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const bob = Math.sin(frame / 4) * 10;

  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      {!phase2 ? (
        <>
          <div
            style={{
              position: 'absolute',
              bottom: 110,
              left: `${runX}%`,
              transform: `translateY(${bob}px)`,
            }}
          >
            <Figure size={2.4} />
          </div>
          {frame > 36 ? (
            <Detection label="Carrera detectada" cam="Cámara 23" />
          ) : null}
        </>
      ) : (
        <>
          <div
            style={{
              position: 'absolute',
              bottom: 110,
              left: 0,
              right: 0,
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
              <div
                key={i}
                style={{
                  marginLeft: i === 0 ? 0 : -34,
                  transform: `translateY(${
                    Math.sin((frame + i * 6) / 6) * 6
                  }px)`,
                }}
              >
                <Figure size={1.9} />
              </div>
            ))}
          </div>
          <Detection label="Aglomeración inusual" cam="Cámara 41" />
        </>
      )}
    </div>
  );
};

// Beat 4c — Detección de acciones (0:31–0:36, 150 frames).
export const Beat4c_ActionDetection: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: colors.bg }}>
      <CapabilityBlock
        icon={<MotionIcon />}
        title="Detección de acciones"
        subtitle="Peleas, aglomeraciones, carreras, intrusiones — en automático."
      >
        <SystemMedia
          slot="beat4c_acciones"
          style={{ width: '100%', height: '100%' }}
          fallback={<ActionMock />}
        />
      </CapabilityBlock>
    </AbsoluteFill>
  );
};
