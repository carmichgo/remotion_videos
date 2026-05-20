// Capa de medios reales del sistema Omnisight.
//
// Cada "slot" corresponde al área de demo de una escena. Por defecto todos
// son `null` y se muestra el mockup procedural (React/SVG) como fallback.
//
// CUANDO TENGAS EL FOOTAGE/CAPTURA REAL:
//   1. Suelta el archivo en `public/` (ej. public/video/beat3_busqueda.mp4
//      o public/screens/beat4d_trazabilidad.png).
//   2. Pon su ruta relativa a `public/` en el slot correspondiente abajo.
//   3. Vuelve a renderizar. El componente detecta video vs imagen por la
//      extensión (.mp4/.webm/.mov = video; resto = imagen).

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

export const MEDIA: Record<MediaSlot, string | null> = {
  beat2_camaras: null, // ej. 'video/beat2_camaras.mp4'
  beat3_busqueda: null, // ej. 'video/beat3_busqueda.mp4'
  beat4a_facial: null, // ej. 'video/beat4a_facial.mp4'
  beat4b_placas: null, // ej. 'video/beat4b_placas.mp4'
  beat4c_nueve: null, // ej. 'video/beat4c_nueve_modelos.mp4'
  beat4d_trazabilidad: null, // ej. 'video/beat4d_trazabilidad.mp4'
  beat4e_instrucciones: null, // ej. 'screens/beat4e_instrucciones.png'
  beat4f_obstrucciones: null, // ej. 'video/beat4f_obstrucciones.mp4'
  beat5_infra: null, // normalmente se deja el diagrama animado
};
