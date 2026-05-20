import { Composition } from 'remotion';
import './style.css';
import { FinalVideo } from './compositions/FinalVideo';
import { PersonalizedIntro } from './compositions/PersonalizedIntro';
import { MasterBody } from './compositions/MasterBody';
import { PilotOutro } from './compositions/PilotOutro';
import { ClosingLogo } from './compositions/ClosingLogo';
import { recordToProps, SecretarioRecord } from './types';
import secretariosData from './data/secretarios.json';

const secretarios = secretariosData as SecretarioRecord[];

const FPS = 30;
const WIDTH = 1920;
const HEIGHT = 1080;
const TOTAL_FRAMES = 1815; // 60.5s @ 30fps (v4.1: +0.5s en Beat 4a)

// Destinatario de ejemplo para Remotion Studio (Tamaulipas).
const exampleProps = recordToProps(secretarios[0]);

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="FinalVideo"
        component={FinalVideo}
        durationInFrames={TOTAL_FRAMES}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
        defaultProps={exampleProps}
      />

      {/* Sub-composiciones para depuración aislada en Studio */}
      <Composition
        id="PersonalizedIntro"
        component={PersonalizedIntro}
        durationInFrames={150}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
        defaultProps={exampleProps}
      />
      <Composition
        id="MasterBody"
        component={MasterBody}
        durationInFrames={1635}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
      />
      <Composition
        id="PilotOutro"
        component={PilotOutro}
        durationInFrames={150}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
      />
      <Composition
        id="ClosingLogo"
        component={ClosingLogo}
        durationInFrames={30}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
      />
    </>
  );
};
