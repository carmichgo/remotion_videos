import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';
import { bundle } from '@remotion/bundler';
import { renderMedia, selectComposition } from '@remotion/renderer';
import { enableTailwind } from '@remotion/tailwind';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
export const root = path.resolve(__dirname, '..');

export function loadSecretarios() {
  return JSON.parse(
    fs.readFileSync(
      path.join(root, 'src', 'data', 'secretarios.json'),
      'utf8',
    ),
  );
}

// Replica de buildAudioPaths/recordToProps de src/types.ts (lado Node).
const AUDIO_EXT = 'wav';
function recordToProps(r) {
  return {
    tratamiento: r.tratamiento,
    nombre: r.nombre,
    estado: r.estado,
    fecha_1: r.fecha_1,
    fecha_2: r.fecha_2,
    audio_intro_url: `audio/personalized/intro_${r.slug}.${AUDIO_EXT}`,
    audio_outro_url: `audio/personalized/outro_${r.slug}.${AUDIO_EXT}`,
    audio_master_url: `audio/master_body.${AUDIO_EXT}`,
  };
}

// Asegura que existan los placeholders de audio antes de renderizar.
function ensurePlaceholders() {
  const master = path.join(root, 'public', 'audio', 'master_body.wav');
  if (!fs.existsSync(master)) {
    console.log('Audio placeholder ausente; generándolo…');
    execFileSync(
      process.execPath,
      [path.join(__dirname, 'generate-placeholders.mjs')],
      { stdio: 'inherit' },
    );
  }
}

let cachedBundle = null;
async function getBundle() {
  if (cachedBundle) return cachedBundle;
  console.log('Empaquetando proyecto Remotion…');
  cachedBundle = await bundle({
    entryPoint: path.join(root, 'src', 'index.ts'),
    webpackOverride: (config) => enableTailwind(config),
  });
  return cachedBundle;
}

export async function renderSecretario(record) {
  ensurePlaceholders();
  const serveUrl = await getBundle();
  const inputProps = recordToProps(record);

  const chromiumOptions = { ignoreCertificateErrors: true };

  const composition = await selectComposition({
    serveUrl,
    id: 'FinalVideo',
    inputProps,
    chromiumOptions,
  });

  const outDir = path.join(root, 'out');
  fs.mkdirSync(outDir, { recursive: true });
  const outputLocation = path.join(outDir, `${record.slug}.mp4`);

  console.log(`Renderizando ${record.slug} -> out/${record.slug}.mp4`);
  await renderMedia({
    composition,
    serveUrl,
    codec: 'h264',
    outputLocation,
    inputProps,
    chromiumOptions,
    onProgress: ({ progress }) => {
      process.stdout.write(
        `\r  ${record.slug}: ${Math.round(progress * 100)}%   `,
      );
    },
  });
  process.stdout.write('\n');
  return outputLocation;
}
