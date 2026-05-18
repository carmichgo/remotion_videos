import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { colors } from '../theme/colors';
import { fonts } from '../theme/fonts';
import { SearchBar } from '../components/SearchBar';
import { ResultsGrid, ResultItem } from '../components/ResultsGrid';

const QUERY =
  'hombre con chamarra roja y mochila negra, últimas 4 horas';

const RESULTS: ResultItem[] = [
  { label: 'Cámara 47 — 14:32' },
  { label: 'Cámara 52 — 14:38' },
  { label: 'Cámara 61 — 14:45' },
  { label: 'Cámara 73 — 14:51' },
  { label: 'Cámara 81 — 14:58' },
  { label: 'Cámara 88 — 15:04' },
];

// Beat 3 — Promesa (0:12–0:20, 240 frames).
// Typewriter de la búsqueda; a los ~5s (frame 150) click y aparecen 6 resultados.
const CLICK_FRAME = 150;

export const Beat3_Promise: React.FC = () => {
  const frame = useCurrentFrame();
  const showResults = frame >= CLICK_FRAME;

  return (
    <AbsoluteFill
      style={{
        background: colors.bg,
        padding: '90px 70px',
        display: 'flex',
        flexDirection: 'column',
        gap: 50,
      }}
    >
      <div
        style={{
          fontFamily: fonts.mono,
          fontSize: 22,
          color: colors.textMuted,
          letterSpacing: 1,
        }}
      >
        OMNISIGHT · BÚSQUEDA
      </div>

      <SearchBar
        query={QUERY}
        startFrame={10}
        charsPerFrame={3}
        clickFrame={CLICK_FRAME}
        width="100%"
      />

      {showResults ? (
        <ResultsGrid items={RESULTS} startFrame={CLICK_FRAME + 6} cols={3} />
      ) : null}
    </AbsoluteFill>
  );
};
