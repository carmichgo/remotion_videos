# Omnisight — Videos personalizados para Secretarios de Seguridad

Proyecto [Remotion](https://www.remotion.dev/) que genera videos verticales
**1080×1920, 60 s, 30 fps** personalizados para los Secretarios de Seguridad de
los 32 estados de México.

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

Los placeholders son `.wav` silenciosos. Para usar voiceover real:

1. Genera los MP3 (p. ej. con ElevenLabs — ver más abajo) y colócalos en:

   - `public/audio/master_body.mp3` — narración compartida (~48 s).
   - `public/audio/personalized/intro_{slug}.mp3` — intro por destinatario (~5 s).
   - `public/audio/personalized/outro_{slug}.mp3` — cierre por destinatario (~7 s).

2. Cambia la constante `AUDIO_EXT` en `src/types.ts` de `'wav'` a `'mp3'`
   (y el mismo valor en `scripts/render-lib.mjs`).

### Guiones de voiceover

- **Intro** (`intro_{slug}`): *"{Tratamiento} {Nombre}. Sesenta segundos."*
- **Cierre** (`outro_{slug}`): *"Quince minutos. Le muestro cómo se vería
  desplegado en {Estado}. {Fecha_1} o {Fecha_2}."*
- **Master** (`master_body`): narración compartida de los Beats 2–5
  (ver guion completo en el prompt del proyecto / comentarios de las escenas).

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
  compositions/            # FinalVideo + Intro/MasterBody/Outro/Logo
  scenes/                  # Beats 2–5 (Beat4a–4d)
  components/              # piezas reutilizables (logo, search, grid, …)
  theme/                   # colores, tipografía, fuentes
  data/secretarios.json    # destinatarios
public/audio/              # voiceovers (placeholders .wav)
scripts/                   # generación de placeholders y render batch
out/                       # MP4 renderizados
```

## Timeline (30 fps, 1800 frames)

| Beat | Frames    | Tiempo    | Contenido                              |
|------|-----------|-----------|----------------------------------------|
| 1    | 0–150     | 0:00–0:05 | Intro personalizada                    |
| 2    | 150–360   | 0:05–0:12 | Pared de cámaras                       |
| 3    | 360–600   | 0:12–0:20 | Búsqueda con resultados                |
| 4a   | 600–750   | 0:20–0:25 | Reconocimiento facial                  |
| 4b   | 750–930   | 0:25–0:31 | Lectura de placas + ruta               |
| 4c   | 930–1080  | 0:31–0:36 | Detección de acciones                  |
| 4d   | 1080–1260 | 0:36–0:42 | Reglas + búsquedas en lenguaje natural |
| 5    | 1260–1590 | 0:42–0:53 | Neutralizador (infraestructura)        |
| 6    | 1590–1770 | 0:53–0:59 | Cierre personalizado                   |
| 7    | 1770–1800 | 0:59–1:00 | Logo Omnisight                         |

## Notas de diseño

- **Sin rostros reales**: todas las personas son siluetas/avatares genéricos.
- **Visuales procedurales**: el mosaico de cámaras y las demos de capacidades
  se generan con React/SVG (no requieren archivos MP4). *TODO: si se quieren
  screen recordings reales, sustituir las escenas por `<OffthreadVideo>`.*
- **Sin música**: solo voiceover.
- Tipografía **Inter** + **JetBrains Mono** vía `@remotion/google-fonts`.
- Tailwind está habilitado (`@remotion/tailwind`); las animaciones usan
  interpolación por frame con `spring()` / `interpolate()`.
```
