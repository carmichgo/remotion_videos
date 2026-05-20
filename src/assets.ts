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
//      Forma extendida (recortar / acelerar):
//        { src: 'video/beat3_busqueda.mp4', startFrom: 4, playbackRate: 7 }
//        - startFrom:   segundo en el clip fuente donde empezar a reproducir
//        - playbackRate: 1 = velocidad normal, 2 = 2x, 7 = 7x (timelapse)
//   3. Vuelve a renderizar. El componente detecta video vs imagen por la
//      extensión (.mp4/.webm/.mov = video; resto = imagen).

export type MediaEntry =
  | string
  | {
      src: string;
      startFrom?: number; // segundos desde el inicio del clip fuente
      playbackRate?: number; // 1 = normal, >1 = más rápido
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
  beat2_camaras: null, // ej. 'video/beat2_camaras.mp4'
  beat3_busqueda: null, // ej. 'video/beat3_busqueda.mp4'
  beat4a_facial: {
    src: 'video/beat4a_facial.mp4',
    startFrom: 4, // arranca en el segundo 4 del clip fuente
    playbackRate: 6.4, // 5.5s × 6.4 = 35.2s de fuente; fin más relajado
  },
  beat4b_placas: null,
  beat4c_nueve: null,
  beat4d_trazabilidad: null,
  beat4e_instrucciones: null,
  beat4f_obstrucciones: null,
  beat5_infra: null,
};
