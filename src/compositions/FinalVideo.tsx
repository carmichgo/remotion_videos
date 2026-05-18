import React from 'react';
import { AbsoluteFill, Audio, Sequence, staticFile } from 'remotion';
import { PersonalizedIntro } from './PersonalizedIntro';
import { MasterBody } from './MasterBody';
import { PersonalizedOutro } from './PersonalizedOutro';
import { ClosingLogo } from './ClosingLogo';
import { SecretarioProps } from '../types';

// Composición principal. 1800 frames @30fps = 60s.
//   Beat 1 (intro pers.)   0    +150
//   Beats 2–5 (master)     150  +1440
//   Beat 6 (outro pers.)   1590 +180
//   Beat 7 (logo)          1770 +30
export const FinalVideo: React.FC<SecretarioProps> = (props) => {
  const { audio_intro_url, audio_master_url, audio_outro_url } = props;

  return (
    <AbsoluteFill>
      {/* Video */}
      <Sequence durationInFrames={150} name="Beat 1 · Intro">
        <PersonalizedIntro {...props} />
      </Sequence>
      <Sequence from={150} durationInFrames={1440} name="Beats 2–5 · Master">
        <MasterBody />
      </Sequence>
      <Sequence from={1590} durationInFrames={180} name="Beat 6 · Cierre">
        <PersonalizedOutro {...props} />
      </Sequence>
      <Sequence from={1770} durationInFrames={30} name="Beat 7 · Logo">
        <ClosingLogo />
      </Sequence>

      {/* Audio: tres pistas apiladas, sin solapamiento */}
      <Sequence durationInFrames={150} name="Audio intro">
        <Audio src={staticFile(audio_intro_url)} />
      </Sequence>
      <Sequence from={150} durationInFrames={1440} name="Audio master">
        <Audio src={staticFile(audio_master_url)} />
      </Sequence>
      <Sequence from={1590} durationInFrames={180} name="Audio cierre">
        <Audio src={staticFile(audio_outro_url)} />
      </Sequence>
    </AbsoluteFill>
  );
};
