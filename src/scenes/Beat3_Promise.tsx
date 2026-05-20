import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { colors } from '../theme/colors';
import { fonts } from '../theme/fonts';
import { SearchBar } from '../components/SearchBar';
import { ResultsGrid, ResultItem } from '../components/ResultsGrid';
import { SystemMedia } from '../components/SystemMedia';

const QUERY = 'Una SUV blanca cargando pinos en el techo, últimas 2 horas';

const RESULTS: ResultItem[] = [
  { label: 'Cámara 47 — 14:32' },
  { label: 'Cámara 52 — 14:38' },
  { label: 'Cámara 61 — 14:45' },
  { label: 'Cámara 73 — 14:51' },
];

// Beat 3 — Promesa (0:14–0:20, 180 frames).
// Click + resultados a partir de ~3.3s (local 100).
const CLICK_FRAME = 100;

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
        gap: 56,
        padding: '0 130px',
      }}
    >
      <div
        style={{
          fontFamily: fonts.mono,
          fontSize: 26,
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
        <ResultsGrid items={RESULTS} startFrame={CLICK_FRAME + 6} cols={4} />
      ) : null}
    </div>
  );
};

export const Beat3_Promise: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: colors.bg }}>
      <SystemMedia
        slot="beat3_busqueda"
        framed={false}
        style={{ width: '100%', height: '100%' }}
        slotFrames={180}
        fallback={<PromiseMock />}
      />
    </AbsoluteFill>
  );
};
