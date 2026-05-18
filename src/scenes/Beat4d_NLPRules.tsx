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
import { SearchBar } from '../components/SearchBar';
import { ResultsGrid, ResultItem } from '../components/ResultsGrid';
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
  </svg>
);

const RULE_TEXT =
  'Avísame cuando un vehículo blanco se estacione más de 10 minutos frente a la sede';

const SEARCH_TEXT =
  'motocicleta negra, dos personas, sin casco, zona centro, ayer entre 8 y 11 de la noche';

const SEARCH_RESULTS: ResultItem[] = [
  { label: 'Cámara 12 — 21:14', tag: 'Coincidencia' },
  { label: 'Cámara 19 — 21:48', tag: 'Coincidencia' },
  { label: 'Cámara 27 — 22:35', tag: 'Coincidencia' },
];

const ConfirmCheck: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame: frame - 70, fps, config: { damping: 200 } });
  if (frame < 68) return null;
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 16,
        marginTop: 40,
        opacity: s,
        transform: `scale(${0.8 + s * 0.2})`,
      }}
    >
      <div
        style={{
          width: 56,
          height: 56,
          borderRadius: '50%',
          background: colors.accentSecondary,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
          <path
            d="M5 13l4 4L19 7"
            stroke={colors.bgDark}
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <span
        style={{
          fontFamily: fonts.display,
          fontSize: 32,
          fontWeight: 700,
          color: colors.accentSecondary,
        }}
      >
        Regla creada
      </span>
    </div>
  );
};

const centered: React.CSSProperties = {
  position: 'absolute',
  inset: 0,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: '0 56px',
};

const RuleMock: React.FC = () => (
  <div style={centered}>
    <SearchBar
      query={RULE_TEXT}
      startFrame={6}
      charsPerFrame={3}
      ctaLabel="Crear regla"
      clickFrame={64}
      placeholder="Describe la regla…"
      width="100%"
    />
    <ConfirmCheck />
  </div>
);

const SearchMock: React.FC = () => (
  <div style={{ ...centered, gap: 44 }}>
    <SearchBar
      query={SEARCH_TEXT}
      startFrame={4}
      charsPerFrame={3}
      clickFrame={52}
      width="100%"
    />
    <ResultsGrid items={SEARCH_RESULTS} startFrame={58} cols={3} />
  </div>
);

// Beat 4d — Reglas + búsquedas en lenguaje natural (0:36–0:42, 180 frames).
// Dos micro-clips de 90 frames (3s) cada uno.
export const Beat4d_NLPRules: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: colors.bg }}>
      <Sequence durationInFrames={90} name="Reglas NLP">
        <CapabilityBlock
          icon={<ChatIcon />}
          title="Reglas en lenguaje natural"
          subtitle="Usted le habla a Omnisight como a un operador. En español."
        >
          <SystemMedia
            slot="beat4d_reglas"
            style={{ width: '100%', height: '100%' }}
            fallback={<RuleMock />}
          />
        </CapabilityBlock>
      </Sequence>

      <Sequence from={90} durationInFrames={90} name="Búsquedas NLP">
        <CapabilityBlock
          icon={<ChatIcon />}
          title="Búsquedas en lenguaje natural"
          subtitle="Le dice qué buscar, qué vigilar, qué alertar. Sin tecnicismos."
        >
          <SystemMedia
            slot="beat4d_busqueda"
            style={{ width: '100%', height: '100%' }}
            fallback={<SearchMock />}
          />
        </CapabilityBlock>
      </Sequence>
    </AbsoluteFill>
  );
};
