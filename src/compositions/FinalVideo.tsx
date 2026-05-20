import React from 'react';
import { AbsoluteFill, Audio, Sequence, staticFile } from 'remotion';
import { PersonalizedIntro } from './PersonalizedIntro';
import { MasterBody } from './MasterBody';
import { ClosingLogo } from './ClosingLogo';
import { SecretarioProps } from '../types';

// Composición principal. 1800 frames @30fps = 60s.
// v4:
//   Beat 1 (intro pers.)        0    +150   (0:00–0:05)
//   Beats 2–6 (master shared)   150  +1620  (0:05–0:59)
//   Beat 7 (logo, silencio)     1770 +30    (0:59–1:00)
export const FinalVideo: React.FC<SecretarioProps> = (props) => {
  const { audio_intro_url, audio_master_url } = props;

  return (
    <AbsoluteFill>
      {/* Video */}
      <Sequence durationInFrames={150} name="Beat 1 · Intro">
        <PersonalizedIntro {...props} />
      </Sequence>
      <Sequence from={150} durationInFrames={1620} name="Beats 2–6 · Master">
        <MasterBody />
      </Sequence>
      <Sequence from={1770} durationInFrames={30} name="Beat 7 · Logo">
        <ClosingLogo />
      </Sequence>

      {/* Audio: dos pistas (intro personalizada + master compartido) */}
      <Sequence durationInFrames={150} name="Audio intro">
        <Audio src={staticFile(audio_intro_url)} />
      </Sequence>
      <Sequence from={150} durationInFrames={1620} name="Audio master">
        <Audio src={staticFile(audio_master_url)} />
      </Sequence>
    </AbsoluteFill>
  );
};
