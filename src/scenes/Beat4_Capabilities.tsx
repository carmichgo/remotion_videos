import React from 'react';
import { AbsoluteFill, Sequence } from 'remotion';
import { Beat4a_FacialRecognition } from './Beat4a_FacialRecognition';
import { Beat4b_LicensePlates } from './Beat4b_LicensePlates';
import { Beat4c_ActionDetection } from './Beat4c_ActionDetection';
import { Beat4d_NLPRules } from './Beat4d_NLPRules';

// Agregador de las 4 capacidades (útil para depurar el bloque 4 aislado).
// Duraciones: 4a=150, 4b=180, 4c=150, 4d=180 -> total 660 frames.
export const Beat4_Capabilities: React.FC = () => {
  return (
    <AbsoluteFill>
      <Sequence durationInFrames={150} name="4a Facial">
        <Beat4a_FacialRecognition />
      </Sequence>
      <Sequence from={150} durationInFrames={180} name="4b Placas">
        <Beat4b_LicensePlates />
      </Sequence>
      <Sequence from={330} durationInFrames={150} name="4c Acciones">
        <Beat4c_ActionDetection />
      </Sequence>
      <Sequence from={480} durationInFrames={180} name="4d NLP">
        <Beat4d_NLPRules />
      </Sequence>
    </AbsoluteFill>
  );
};
