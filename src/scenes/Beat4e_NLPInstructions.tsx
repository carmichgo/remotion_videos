import React from 'react';
import {
  AbsoluteFill,
  random,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import { colors } from '../theme/colors';
import { fonts } from '../theme/fonts';
import { CapabilityBlock } from '../components/CapabilityBlock';
import { SearchBar } from '../components/SearchBar';
import { SystemMedia } from '../components/SystemMedia';

const ChatIcon: React.FC = () => (
  <svg width="52" height="52" viewBox="0 0 24 24" fill="none">
    <path
      d="M4 5h16v11H9l-4 4V5z"
      stroke={colors.accent}
      strokeWidth="1.8"
      strokeLinejoin="round"
    />
    <path
      d="M8 9h8M8 12h5"
      stroke={colors.accent}
      strokeWidth="1.6"
      strokeLinecap="round"
    />
    <path
      d="M9 14l1.5 1.5L14 12"
      stroke={colors.accentSecondary}
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const INSTRUCTION =
  'Avísame cuando veas motocicletas con dos personas a bordo en la zona centro';

const ConfirmBubble: React.FC<{ delay: number }> = ({ delay }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({
    frame: frame - delay,
    fps,
    config: { damping: 200 },
    durationInFrames: 16,
  });
  if (frame < delay) return null;
  return (
    <div
      style={{
        opacity: s,
        transform: `translateY(${(1 - s) * 14}px)`,
        alignSelf: 'flex-start',
        display: 'flex',
        alignItems: 'center',
        gap: 14,
        padding: '14px 20px',
        background: 'rgba(63,224,160,0.12)',
        border: `2px solid ${colors.accentSecondary}`,
        borderRadius: 14,
        maxWidth: '85%',
      }}
    >
      <div
        style={{
          width: 36,
          height: 36,
          borderRadius: '50%',
          background: colors.accentSecondary,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <path
            d="M5 13l4 4L19 7"
            stroke={colors.bgDark}
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <div
        style={{
          fontFamily: fonts.body,
          fontSize: 26,
          fontWeight: 500,
          color: colors.text,
        }}
      >
        Entendido. Vigilando 47 cámaras en zona centro.
      </div>
    </div>
  );
};

const DetectionNotification: React.FC<{ delay: number }> = ({ delay }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({
    frame: frame - delay,
    fps,
    config: { damping: 200 },
    durationInFrames: 18,
  });
  if (frame < delay) return null;

  // Thumbnail: "escena urbana nocturna" con moto detectada.
  const hue = 200 + random('moto') * 30;
  return (
    <div
      style={{
        opacity: s,
        transform: `translate(${(1 - s) * -16}px, ${(1 - s) * 14}px)`,
        alignSelf: 'flex-start',
        display: 'flex',
        gap: 16,
        padding: 14,
        background: 'rgba(10,14,26,0.92)',
        border: `2px solid ${colors.alert}`,
        borderRadius: 14,
        boxShadow: `0 0 22px ${colors.alert}33`,
        maxWidth: '85%',
      }}
    >
      <div
        style={{
          width: 150,
          height: 96,
          borderRadius: 8,
          background: `radial-gradient(circle at 45% 60%, hsl(${hue} 60% 28%) 0%, #0a0e1a 70%)`,
          position: 'relative',
          flexShrink: 0,
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: '38%',
            left: '36%',
            width: 38,
            height: 32,
            border: `2px solid ${colors.alert}`,
            borderRadius: 4,
          }}
        />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        <div
          style={{
            fontFamily: fonts.mono,
            fontSize: 16,
            color: colors.alert,
            letterSpacing: 1,
          }}
        >
          ● DETECCIÓN
        </div>
        <div
          style={{
            fontFamily: fonts.body,
            fontSize: 22,
            fontWeight: 700,
            color: colors.text,
          }}
        >
          Cámara 23 — 15:42
        </div>
        <div
          style={{
            fontFamily: fonts.body,
            fontSize: 20,
            color: colors.textMuted,
          }}
        >
          Motocicleta con 2 personas
        </div>
      </div>
    </div>
  );
};

const InstructionsMock: React.FC = () => {
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        gap: 22,
        padding: '0 56px',
      }}
    >
      <SearchBar
        query={INSTRUCTION}
        startFrame={4}
        charsPerFrame={3}
        ctaLabel="Enviar"
        clickFrame={62}
        placeholder="Habla con Omnisight…"
        width="100%"
      />
      <ConfirmBubble delay={70} />
      <DetectionNotification delay={110} />
    </div>
  );
};

// Beat 4e — Instrucciones al operador IA (0:40–0:45, 150 frames).
// (Antes Beat 4d en v3; renombrado por la nueva numeración de 6 bloques.)
export const Beat4e_NLPInstructions: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: colors.bg }}>
      <CapabilityBlock
        icon={<ChatIcon />}
        title="Instrucciones al operador IA"
        subtitle="Le habla a Omnisight en español. Le avisa al instante cuando aparece."
      >
        <SystemMedia
          slot="beat4e_instrucciones"
          style={{ width: '100%', height: '100%' }}
          fallback={<InstructionsMock />}
        />
      </CapabilityBlock>
    </AbsoluteFill>
  );
};
