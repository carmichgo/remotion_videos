// Genera stills PNG de frames clave para verificación visual.
// Uso: node scripts/stills.mjs
import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import { bundle } from '@remotion/bundler';
import { renderStill, selectComposition } from '@remotion/renderer';
import { enableTailwind } from '@remotion/tailwind';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');

const AUDIO_EXT = 'wav';
const r = JSON.parse(
  fs.readFileSync(path.join(root, 'src/data/secretarios.json'), 'utf8'),
)[0];
const inputProps = {
  tratamiento: r.tratamiento,
  nombre: r.nombre,
  estado: r.estado,
  fecha_1: r.fecha_1,
  fecha_2: r.fecha_2,
  audio_intro_url: `audio/personalized/intro_${r.slug}.${AUDIO_EXT}`,
  audio_outro_url: `audio/personalized/outro_${r.slug}.${AUDIO_EXT}`,
  audio_master_url: `audio/master_body.${AUDIO_EXT}`,
};

const chromiumOptions = { ignoreCertificateErrors: true };
const serveUrl = await bundle({
  entryPoint: path.join(root, 'src/index.ts'),
  webpackOverride: (c) => enableTailwind(c),
});
const composition = await selectComposition({
  serveUrl,
  id: 'FinalVideo',
  inputProps,
  chromiumOptions,
});

// Frames representativos para verificación visual de v4.
const frames = [
  16,   // Beat 1 - "Axentra Solutions presenta" plate
  310,  // Beat 2 - 3 líneas dolor
  540,  // Beat 3 - resultados de búsqueda
  690,  // Beat 4a - facial
  800,  // Beat 4b - placa vehicular
  850,  // Beat 4b - rótulo lateral
  890,  // Beat 4b - letrero comercial
  1000, // Beat 4c - 9 modelos con detecciones
  1070, // Beat 4c - texto final "Nueve especialistas"
  1150, // Beat 4d - trazabilidad (ruta dibujada)
  1280, // Beat 4e - chat + confirmación
  1340, // Beat 4e - notificación de detección
  1390, // Beat 4f - obstrucciones
  1530, // Beat 5 - infra + texto
  1700, // Beat 6 - piloto sin costo
  1790, // Beat 7 - logo "Ve todo. No pierde nada."
];
const dir = path.join(root, 'out', 'stills');
fs.mkdirSync(dir, { recursive: true });

for (const frame of frames) {
  const output = path.join(dir, `frame_${frame}.png`);
  await renderStill({
    composition,
    serveUrl,
    output,
    frame,
    inputProps,
    chromiumOptions,
  });
  console.log(`  ✓ frame ${frame}`);
}
console.log('Stills en out/stills/');
process.exit(0);
