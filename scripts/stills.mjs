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

// Frames representativos (uno por beat) para verificación visual rápida.
const frames = [
  30, 300, 520, 690, 870, 1000, 1045, 1160, 1245, 1540, 1680, 1790,
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
