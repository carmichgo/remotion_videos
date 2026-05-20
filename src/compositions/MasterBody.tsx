import React from 'react';
import { AbsoluteFill, Sequence } from 'remotion';
import { Beat2_Pain } from '../scenes/Beat2_Pain';
import { Beat3_Promise } from '../scenes/Beat3_Promise';
import { Beat4a_FacialRecognition } from '../scenes/Beat4a_FacialRecognition';
import { Beat4b_LicensePlates } from '../scenes/Beat4b_LicensePlates';
import { Beat4c_NineModels } from '../scenes/Beat4c_NineModels';
import { Beat4d_Traceability } from '../scenes/Beat4d_Traceability';
import { Beat4e_NLPInstructions } from '../scenes/Beat4e_NLPInstructions';
import { Beat4f_Obstructions } from '../scenes/Beat4f_Obstructions';
import { Beat5_Neutralizer } from '../scenes/Beat5_Neutralizer';
import { PilotOutro } from './PilotOutro';

// Cuerpo compartido (Beats 2–6). 1635 frames @30fps (0:05–0:59.5).
// v4.1: Beat 4a extendido a 5.5s para que el momento final del footage
// real se vea bien (antes 5s, ahora 5.5s -> total video 60.5s).
//
// Offsets relativos al inicio de MasterBody:
//   Beat 2  Pain               0     +270   (0:05–0:14, 9s)
//   Beat 3  Promesa            270   +180   (0:14–0:20, 6s)
//   Beat 4a Facial             450   +165   (0:20–0:25.5, 5.5s)
//   Beat 4b Placas y rótulos   615   +150   (0:25.5–0:30.5, 5s)
//   Beat 4c Nueve modelos      765   +180   (0:30.5–0:36.5, 6s)
//   Beat 4d Trazabilidad       945   +120   (0:36.5–0:40.5, 4s)
//   Beat 4e Instrucciones IA   1065  +150   (0:40.5–0:45.5, 5s)
//   Beat 4f Obstrucciones      1215  +60    (0:45.5–0:47.5, 2s)
//   Beat 5  Neutralizador      1275  +210   (0:47.5–0:54.5, 7s)
//   Beat 6  Piloto             1485  +150   (0:54.5–0:59.5, 5s)  -> 1635
export const MasterBody: React.FC = () => {
  return (
    <AbsoluteFill>
      <Sequence durationInFrames={270} name="Beat 2 · Dolor">
        <Beat2_Pain />
      </Sequence>
      <Sequence from={270} durationInFrames={180} name="Beat 3 · Promesa">
        <Beat3_Promise />
      </Sequence>
      <Sequence from={450} durationInFrames={165} name="Beat 4a · Facial">
        <Beat4a_FacialRecognition />
      </Sequence>
      <Sequence from={615} durationInFrames={150} name="Beat 4b · Placas y rótulos">
        <Beat4b_LicensePlates />
      </Sequence>
      <Sequence from={765} durationInFrames={180} name="Beat 4c · Nueve modelos">
        <Beat4c_NineModels />
      </Sequence>
      <Sequence from={945} durationInFrames={120} name="Beat 4d · Trazabilidad">
        <Beat4d_Traceability />
      </Sequence>
      <Sequence from={1065} durationInFrames={150} name="Beat 4e · Instrucciones IA">
        <Beat4e_NLPInstructions />
      </Sequence>
      <Sequence from={1215} durationInFrames={60} name="Beat 4f · Obstrucciones">
        <Beat4f_Obstructions />
      </Sequence>
      <Sequence from={1275} durationInFrames={210} name="Beat 5 · Neutralizador">
        <Beat5_Neutralizer />
      </Sequence>
      <Sequence from={1485} durationInFrames={150} name="Beat 6 · Piloto">
        <PilotOutro />
      </Sequence>
    </AbsoluteFill>
  );
};
