import React from 'react';
import {
  AbsoluteFill,
  Sequence,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import { colors } from '../theme/colors';
import { fonts } from '../theme/fonts';
import { CapabilityBlock } from '../components/CapabilityBlock';
import { SystemMedia } from '../components/SystemMedia';

const PlateIcon: React.FC = () => (
  <svg width="52" height="52" viewBox="0 0 24 24" fill="none">
    <rect
      x="3"
      y="7"
      width="18"
      height="10"
      rx="2"
      stroke={colors.accent}
      strokeWidth="1.8"
    />
    <path
      d="M7 11h2M11 11h2M15 11h2M7 14h10"
      stroke={colors.accent}
      strokeWidth="1.6"
      strokeLinecap="round"
    />
  </svg>
);

// Marco común "leído por OCR" para los 3 micro-cuts.
const OcrFrame: React.FC<{
  caption: string;
  text: string;
  charsPerFrame?: number;
  delay?: number;
  // Forma del bloque (placa vehicular, rótulo lateral, letrero comercial)
  variant: 'plate' | 'truck' | 'sign';
}> = ({ caption, text, charsPerFrame = 4, delay = 6, variant }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const typed = Math.max(
    0,
    Math.min(text.length, Math.floor((frame - delay) * charsPerFrame)),
  );
  const visible = text.slice(0, typed);
  const enter = spring({
    frame,
    fps,
    config: { damping: 200 },
    durationInFrames: 14,
  });

  const variantStyles: Record<typeof variant, React.CSSProperties> = {
    plate: {
      fontSize: 96,
      letterSpacing: 10,
      minWidth: 520,
    },
    truck: {
      fontSize: 56,
      letterSpacing: 1,
      minWidth: 720,
    },
    sign: {
      fontSize: 64,
      letterSpacing: 2,
      minWidth: 640,
    },
  };

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 26,
        padding: 40,
        opacity: enter,
        transform: `scale(${0.96 + enter * 0.04})`,
      }}
    >
      <div
        style={{
          fontFamily: fonts.mono,
          fontSize: 22,
          color: colors.textMuted,
          letterSpacing: 1.2,
        }}
      >
        {caption}
      </div>
      <div
        style={{
          fontFamily: fonts.mono,
          fontWeight: 700,
          color: colors.accent,
          border: `3px solid ${colors.accent}`,
          borderRadius: 14,
          padding: '20px 36px',
          textAlign: 'center',
          background: 'rgba(0,212,255,0.06)',
          boxShadow: '0 0 24px rgba(0,212,255,0.15)',
          ...variantStyles[variant],
        }}
      >
        {visible || '—'}
      </div>
    </div>
  );
};

const PlatesMock: React.FC = () => {
  // 3 micro-cuts en 150 frames (5s): 50 frames cada uno.
  return (
    <>
      <Sequence durationInFrames={50} name="Placa vehicular">
        <OcrFrame
          caption="LECTURA OCR · PLACA"
          text="ABC-598"
          variant="plate"
        />
      </Sequence>
      <Sequence from={50} durationInFrames={50} name="Rótulo lateral">
        <OcrFrame
          caption="LECTURA OCR · RÓTULO"
          text="Transportes del Norte — Unidad 47"
          variant="truck"
        />
      </Sequence>
      <Sequence from={100} durationInFrames={50} name="Letrero comercial">
        <OcrFrame
          caption="LECTURA OCR · LETRERO"
          text="Farmacia Guadalajara"
          variant="sign"
        />
      </Sequence>
    </>
  );
};

// Beat 4b — Lectura de placas y rótulos (0:25–0:30, 150 frames).
export const Beat4b_LicensePlates: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: colors.bg }}>
      <CapabilityBlock
        icon={<PlateIcon />}
        title="Lectura de placas y rótulos"
        subtitle="Placas, rótulos y cualquier texto que aparezca en cámara."
      >
        <SystemMedia
          slot="beat4b_placas"
          style={{ width: '100%', height: '100%' }}
          fallback={
            <div style={{ position: 'absolute', inset: 0 }}>
              <PlatesMock />
            </div>
          }
        />
      </CapabilityBlock>
    </AbsoluteFill>
  );
};
