import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { colors } from '../theme/colors';
import { fonts } from '../theme/fonts';
import { CapabilityBlock } from '../components/CapabilityBlock';
import { SearchBar } from '../components/SearchBar';
import { ResultsGrid, ResultItem } from '../components/ResultsGrid';
import { SystemMedia } from '../components/SystemMedia';

const SearchIcon: React.FC = () => (
  <svg width="52" height="52" viewBox="0 0 24 24" fill="none">
    <circle cx="11" cy="11" r="7" stroke={colors.accent} strokeWidth="1.8" />
    <line
      x1="16.5"
      y1="16.5"
      x2="21"
      y2="21"
      stroke={colors.accent}
      strokeWidth="1.8"
      strokeLinecap="round"
    />
  </svg>
);

const QUERY = 'Una SUV blanca cargando pinos en el techo, últimas 2 horas';

const RESULTS: ResultItem[] = [
  { label: 'Cámara 47 — 14:32' },
  { label: 'Cámara 52 — 14:38' },
  { label: 'Cámara 61 — 14:45' },
  { label: 'Cámara 73 — 14:51' },
];

const CLICK_FRAME = 100;

// Mockup procedural (fallback cuando no hay footage real en el slot).
// Pensado para llenar el cuadro derecho del CapabilityBlock (~1170×760).
const PromiseMock: React.FC = () => {
  const frame = useCurrentFrame();
  const showResults = frame >= CLICK_FRAME;
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        gap: 36,
        padding: 40,
      }}
    >
      <div
        style={{
          fontFamily: fonts.mono,
          fontSize: 18,
          color: colors.textMuted,
          letterSpacing: 1,
        }}
      >
        OMNISIGHT · BÚSQUEDA
      </div>

      <SearchBar
        query={QUERY}
        startFrame={6}
        charsPerFrame={3}
        clickFrame={CLICK_FRAME}
        width="100%"
      />

      {showResults ? (
        <ResultsGrid items={RESULTS} startFrame={CLICK_FRAME + 6} cols={2} />
      ) : null}
    </div>
  );
};

// Beat 3 — Promesa (0:14–0:20, 180 frames).
export const Beat3_Promise: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: colors.bg }}>
      <CapabilityBlock
        icon={<SearchIcon />}
        title="Encuentra lo que necesita"
        subtitle="Le habla a Omnisight en español. Le entrega los videos en segundos."
      >
        <SystemMedia
          slot="beat3_busqueda"
          style={{ width: '100%', height: '100%' }}
          slotFrames={180}
          fallback={<PromiseMock />}
        />
      </CapabilityBlock>
    </AbsoluteFill>
  );
};
