import React from 'react';
import { AbsoluteFill, Sequence } from 'remotion';
import { Beat4a_FacialRecognition } from './Beat4a_FacialRecognition';
import { Beat4b_LicensePlates } from './Beat4b_LicensePlates';
import { Beat4c_NineModels } from './Beat4c_NineModels';
import { Beat4d_Traceability } from './Beat4d_Traceability';
import { Beat4e_NLPInstructions } from './Beat4e_NLPInstructions';
import { Beat4f_Obstructions } from './Beat4f_Obstructions';

// Agregador del Beat 4 completo (útil para depurar el bloque aislado en Studio).
// Duraciones: 4a=150, 4b=150, 4c=180, 4d=120, 4e=150, 4f=60  -> 810 frames (27s).
export const Beat4_Capabilities: React.FC = () => {
  return (
    <AbsoluteFill>
      <Sequence durationInFrames={150} name="4a Facial">
        <Beat4a_FacialRecognition />
      </Sequence>
      <Sequence from={150} durationInFrames={150} name="4b Placas y rótulos">
        <Beat4b_LicensePlates />
      </Sequence>
      <Sequence from={300} durationInFrames={180} name="4c Nueve modelos">
        <Beat4c_NineModels />
      </Sequence>
      <Sequence from={480} durationInFrames={120} name="4d Trazabilidad">
        <Beat4d_Traceability />
      </Sequence>
      <Sequence from={600} durationInFrames={150} name="4e Instrucciones IA">
        <Beat4e_NLPInstructions />
      </Sequence>
      <Sequence from={750} durationInFrames={60} name="4f Obstrucciones">
        <Beat4f_Obstructions />
      </Sequence>
    </AbsoluteFill>
  );
};
