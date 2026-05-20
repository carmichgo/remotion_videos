// Capa de medios reales del sistema Omnisight.
//
// Cada "slot" corresponde al área de demo de una escena. Por defecto todos
// son `null` y se muestra el mockup procedural (React/SVG) como fallback.
//
// CUANDO TENGAS EL FOOTAGE/CAPTURA REAL:
//   1. Suelta el archivo en `public/`.
//   2. Pon su ruta relativa a `public/` en el slot correspondiente abajo.
//      Forma corta: `'video/x.mp4'`
//      Forma extendida (recortar / acelerar / saltar / congelar):
//        {
//          src: 'video/x.mp4',
//          startFrom: 4,                   // segundo donde empezar
//          playbackRate: 7,                // 1 = normal, >1 = más rápido
//          holdLastMs: 500,                // freeze de última frame al final
//          segments: [                     // saltar partes del clip
//            { from: 0,  to: 18 },         //   ej. cortar el loading 18–41
//            { from: 41, to: 83.6 },
//          ],
//        }
//      Si usas `segments`, ignora `startFrom`. Cada segmento corre al
//      mismo `playbackRate`.
//   3. Vuelve a renderizar. El componente detecta video vs imagen por la
//      extensión (.mp4/.webm/.mov = video; resto = imagen).

export type MediaSegment = {
  from: number; // segundo donde empieza este segmento en el clip fuente
  to: number; // segundo donde termina este segmento en el clip fuente
};

export type MediaEntry =
  | string
  | {
      src: string;
      startFrom?: number;
      playbackRate?: number;
      holdLastMs?: number;
      segments?: MediaSegment[];
    }
  | null;

export type MediaSlot =
  | 'beat2_camaras'
  | 'beat3_busqueda'
  | 'beat4a_facial'
  | 'beat4b_placas'
  | 'beat4c_nueve'
  | 'beat4d_trazabilidad'
  | 'beat4e_instrucciones'
  | 'beat4f_obstrucciones'
  | 'beat5_infra';

export const MEDIA: Record<MediaSlot, MediaEntry> = {
  beat2_camaras: null,
  beat3_busqueda: {
    src: 'video/beat3_busqueda.mp4',
    // Saltar el loading muerto entre 18–41s del clip fuente (83.6s total).
    segments: [
      { from: 0, to: 18 },
      { from: 41, to: 83.6 },
    ],
    playbackRate: 11, // 60.6s útiles ÷ 11 ≈ 5.5s de slot
    holdLastMs: 500, // freeze de la última frame antes del corte
  },
  beat4a_facial: {
    src: 'video/beat4a_facial.mp4',
    startFrom: 4,
    playbackRate: 7.1,
    holdLastMs: 500,
  },
  beat4b_placas: null,
  beat4c_nueve: null,
  beat4d_trazabilidad: null,
  beat4e_instrucciones: null,
  beat4f_obstrucciones: null,
  beat5_infra: null,
};
