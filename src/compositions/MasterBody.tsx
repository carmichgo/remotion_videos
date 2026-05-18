import React from 'react';
import { AbsoluteFill, Sequence } from 'remotion';
import { Beat2_Pain } from '../scenes/Beat2_Pain';
import { Beat3_Promise } from '../scenes/Beat3_Promise';
import { Beat4a_FacialRecognition } from '../scenes/Beat4a_FacialRecognition';
import { Beat4b_LicensePlates } from '../scenes/Beat4b_LicensePlates';
import { Beat4c_ActionDetection } from '../scenes/Beat4c_ActionDetection';
import { Beat4d_NLPRules } from '../scenes/Beat4d_NLPRules';
import { Beat5_Neutralizer } from '../scenes/Beat5_Neutralizer';

// Cuerpo compartido (Beats 2–5). 1440 frames @30fps (0:05–0:53 del video final).
// Offsets relativos al inicio de MasterBody:
//   Beat2  0    +210
//   Beat3  210  +240
//   Beat4a 450  +150
//   Beat4b 600  +180
//   Beat4c 780  +150
//   Beat4d 930  +180
//   Beat5  1110 +330  -> 1440
export const MasterBody: React.FC = () => {
  return (
    <AbsoluteFill>
      <Sequence durationInFrames={210} name="Beat 2 · Dolor">
        <Beat2_Pain />
      </Sequence>
      <Sequence from={210} durationInFrames={240} name="Beat 3 · Promesa">
        <Beat3_Promise />
      </Sequence>
      <Sequence from={450} durationInFrames={150} name="Beat 4a · Facial">
        <Beat4a_FacialRecognition />
      </Sequence>
      <Sequence from={600} durationInFrames={180} name="Beat 4b · Placas">
        <Beat4b_LicensePlates />
      </Sequence>
      <Sequence from={780} durationInFrames={150} name="Beat 4c · Acciones">
        <Beat4c_ActionDetection />
      </Sequence>
      <Sequence from={930} durationInFrames={180} name="Beat 4d · NLP">
        <Beat4d_NLPRules />
      </Sequence>
      <Sequence from={1110} durationInFrames={330} name="Beat 5 · Neutralizador">
        <Beat5_Neutralizer />
      </Sequence>
    </AbsoluteFill>
  );
};
