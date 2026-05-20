# Omnisight — Videos personalizados para Secretarios de Seguridad

Proyecto [Remotion](https://www.remotion.dev/) que genera videos horizontales
**1920×1080 (16:9), 60 s, 30 fps** personalizados para los Secretarios de
Seguridad de los 32 estados de México.

La personalización ocurre solo en los **primeros 5 s** (intro) y los
**últimos 7 s** (cierre). El cuerpo (~48 s) es compartido entre todos los
renders.

## Setup

Requiere **Node 20+**.

```bash
npm install
npm run setup   # genera placeholders de audio silenciosos (.wav)
```

`npm run setup` crea audios silenciosos en `public/audio/` para que el
proyecto renderice de extremo a extremo aun sin los voiceovers definitivos.
Los scripts de render lo ejecutan automáticamente si faltan.

## Desarrollo

```bash
npm run dev
```

Abre Remotion Studio. La composición principal es **`FinalVideo`** (con el
destinatario de ejemplo *Tamaulipas*). También hay sub-composiciones aisladas
para depurar: `PersonalizedIntro`, `MasterBody`, `PersonalizedOutro`,
`ClosingLogo`.

## Render

Un destinatario:

```bash
npm run render:secretario -- --secretario=tamaulipas
# -> out/tamaylipas.mp4
```

Todos los destinatarios de `src/data/secretarios.json` (en serie):

```bash
npm run render:all
```

Render directo vía CLI de Remotion (usa los defaultProps de ejemplo):

```bash
npm run render -- out/ejemplo.mp4
```

## Añadir un nuevo destinatario

1. Agrega una entrada a `src/data/secretarios.json`:

   ```json
   {
     "slug": "nuevo-leon",
     "tratamiento": "Secretario",
     "nombre": "Nombre Apellido",
     "estado": "Nuevo León",
     "fecha_1": "Lunes 2 de junio",
     "fecha_2": "Martes 3 de junio"
   }
   ```

   - `tratamiento`: `"Secretario"` o `"Secretaria"`.
   - `slug`: identificador en minúsculas, sin espacios (se usa en nombres de
     archivo de audio y del MP4 de salida).

2. Genera (o regenera) los placeholders de audio:

   ```bash
   npm run setup
   ```

3. Renderiza:

   ```bash
   npm run render:secretario -- --secretario=nuevo-leon
   ```

## Audios personalizados (voiceover real)

v4: solo el **intro** es variable por destinatario. El cierre ya no se
personaliza, así que se necesita **1 audio variable por Secretario** (32 en
total) en vez de 2. Los placeholders son `.wav` silenciosos.

Para usar voiceover real:

1. Genera los MP3 (p. ej. con ElevenLabs) y colócalos en:

   - `public/audio/master_body.mp3` — narración compartida (~52 s, cubre 0:05–0:59).
   - `public/audio/personalized/intro_{slug}.mp3` — intro por destinatario (~5 s).

2. Cambia la constante `AUDIO_EXT` en `src/types.ts` de `'wav'` a `'mp3'`
   (y el mismo valor en `scripts/render-lib.mjs`).

### Guiones de voiceover

- **Intro** (`intro_{slug}`): *"{Tratamiento} {Nombre}. Sesenta segundos."*
- **Master** (`master_body`): narración compartida de los Beats 2–6
  (dolor → promesa → 6 capacidades → neutralizador → cierre con piloto).
  Ver el guion completo en los comentarios de las escenas o en el script v4.

### Conexión con ElevenLabs (pendiente)

`scripts/generate-placeholders.mjs` solo crea silencios. Para automatizar la
generación real, sustituir/extender ese script para llamar a la API de
ElevenLabs con los guiones de arriba y escribir los MP3 en las mismas rutas.
*TODO: implementar el cliente de ElevenLabs.*

## Estructura

```
src/
  Root.tsx                 # registro de composiciones
  index.ts                 # registerRoot
  assets.ts                # slots de medios reales (drop-in)
  compositions/            # FinalVideo + Intro/MasterBody/Outro/Logo
  scenes/                  # Beats 2–5 (Beat4a–4d)
  components/              # piezas reutilizables (SystemMedia, logo, search, …)
  theme/                   # colores, tipografía, fuentes
  data/secretarios.json    # destinatarios
public/audio/              # voiceovers (placeholders .wav)
scripts/                   # generación de placeholders y render batch
out/                       # MP4 renderizados
```

## Timeline (30 fps, 1800 frames) — v4

| Beat | Frames     | Tiempo    | Contenido                              |
|------|------------|-----------|----------------------------------------|
| 1    | 0–150      | 0:00–0:05 | Intro personalizada (Axentra + nombre) |
| 2    | 150–420    | 0:05–0:14 | El dolor — pared de cámaras            |
| 3    | 420–600    | 0:14–0:20 | Promesa — búsqueda en lenguaje natural |
| 4a   | 600–750    | 0:20–0:25 | Reconocimiento facial                  |
| 4b   | 750–900    | 0:25–0:30 | Lectura de placas y rótulos            |
| 4c   | 900–1080   | 0:30–0:36 | Nueve modelos de IA en paralelo        |
| 4d   | 1080–1200  | 0:36–0:40 | Trazabilidad entre cámaras             |
| 4e   | 1200–1350  | 0:40–0:45 | Instrucciones al operador IA           |
| 4f   | 1350–1410  | 0:45–0:47 | Detección de obstrucciones             |
| 5    | 1410–1620  | 0:47–0:54 | Neutralizador (infraestructura)        |
| 6    | 1620–1770  | 0:54–0:59 | Cierre con piloto (no personalizado)   |
| 7    | 1770–1800  | 0:59–1:00 | Logo (*"Ve todo. No pierde nada."*)    |

## Imagen real del sistema (drop-in)

Cada área de demo tiene un **slot** de medios. Por defecto se muestra el
mockup procedural; al aportar footage/captura real del sistema Omnisight se
sustituye sin tocar las escenas.

Pasos:

1. Suelta el archivo en `public/` — por ejemplo:
   - `public/video/beat3_busqueda.mp4` (grabación de pantalla), o
   - `public/screens/beat4d_reglas.png` (captura).
2. Abre `src/assets.ts` y pon la ruta (relativa a `public/`) en el slot:

   ```ts
   beat3_busqueda: 'video/beat3_busqueda.mp4',
   beat4d_reglas:  'screens/beat4d_reglas.png',
   ```

3. Re-renderiza. `<SystemMedia>` detecta video vs imagen por la extensión
   (`.mp4/.webm/.mov` = video; resto = imagen) y lo encaja con `objectFit: cover`.

Slots disponibles: `beat2_camaras`, `beat3_busqueda`, `beat4a_facial`,
`beat4b_placas`, `beat4c_acciones`, `beat4d_reglas`, `beat4d_busqueda`,
`beat5_infra`. Recomendación: para video usa clips 16:9; el área de demo de los
Beats 4 es ~1170×760 px, las de Beats 2/3 son a sangre completa (1920×1080).

## Notas de diseño

- **Formato**: 1920×1080 (16:9). Beats de capacidad con layout a dos columnas
  (texto a la izquierda, demo a la derecha).
- **Sin rostros reales**: en los mockups, las personas son siluetas genéricas.
- **Visuales procedurales como fallback**: si un slot no tiene asset real, se
  usa el mockup React/SVG (el proyecto siempre renderiza de extremo a extremo).
- **Sin música**: solo voiceover.
- Tipografía **Inter** + **JetBrains Mono** vía `@remotion/google-fonts`.
- Tailwind está habilitado (`@remotion/tailwind`); las animaciones usan
  interpolación por frame con `spring()` / `interpolate()`.
```
