// Capa de medios reales del sistema Omnisight.
//
// Cada "slot" corresponde al área de demo de una escena. Por defecto todos
// son `null` y se muestra el mockup procedural (React/SVG) como fallback.
//
// CUANDO TENGAS EL FOOTAGE/CAPTURA REAL:
//   1. Suelta el archivo en `public/` (ej. public/video/beat3_busqueda.mp4
//      o public/screens/beat4d_trazabilidad.png).
//   2. Pon su ruta relativa a `public/` en el slot correspondiente abajo.
//      Forma corta: `'video/beat3_busqueda.mp4'`
//      Forma extendida (recortar / acelerar / congelar última frame):
//        { src: 'video/x.mp4', startFrom: 4, playbackRate: 7, holdLastMs: 500 }
//        - startFrom:   segundo en el clip fuente donde empezar a reproducir
//        - playbackRate: 1 = velocidad normal, 2 = 2x, 7 = 7x (timelapse)
//        - holdLastMs:  ms al final del slot mostrando la última frame
//                       congelada (para que se vea bien antes del corte)
//   3. Vuelve a renderizar. El componente detecta video vs imagen por la
//      extensión (.mp4/.webm/.mov = video; resto = imagen).

export type MediaEntry =
  | string
  | {
      src: string;
      startFrom?: number; // segundos desde el inicio del clip fuente
      playbackRate?: number; // 1 = normal, >1 = más rápido
      holdLastMs?: number; // freeze de la última frame al final del slot
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
  beat3_busqueda: null,
  beat4a_facial: {
    src: 'video/beat4a_facial.mp4',
    startFrom: 4, // arranca en el segundo 4 del clip fuente
    playbackRate: 7.1, // 5s de playback × 7.1 = 35.5s; cubre 4–39.5s del clip
    holdLastMs: 500, // congela la última frame 500ms antes del corte
  },
  beat4b_placas: null,
  beat4c_nueve: null,
  beat4d_trazabilidad: null,
  beat4e_instrucciones: null,
  beat4f_obstrucciones: null,
  beat5_infra: null,
};
