// Genera audios placeholder SILENCIOSOS (.wav) para que el proyecto
// renderice de extremo a extremo sin los voiceovers definitivos.
//
// Reemplaza estos archivos por los MP3 reales (ej. ElevenLabs) cuando estén
// listos y cambia AUDIO_EXT a 'mp3' en src/types.ts.
//
// Uso: node scripts/generate-placeholders.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');

const SAMPLE_RATE = 8000; // suficiente para silencio; archivos pequeños
const CHANNELS = 1;
const BITS = 16;

function writeSilentWav(filePath, seconds) {
  const numSamples = Math.round(SAMPLE_RATE * seconds);
  const blockAlign = (CHANNELS * BITS) / 8;
  const dataSize = numSamples * blockAlign;
  const buffer = Buffer.alloc(44 + dataSize); // datos en 0 = silencio

  buffer.write('RIFF', 0);
  buffer.writeUInt32LE(36 + dataSize, 4);
  buffer.write('WAVE', 8);
  buffer.write('fmt ', 12);
  buffer.writeUInt32LE(16, 16);
  buffer.writeUInt16LE(1, 20); // PCM
  buffer.writeUInt16LE(CHANNELS, 22);
  buffer.writeUInt32LE(SAMPLE_RATE, 24);
  buffer.writeUInt32LE(SAMPLE_RATE * blockAlign, 28);
  buffer.writeUInt16LE(blockAlign, 32);
  buffer.writeUInt16LE(BITS, 34);
  buffer.write('data', 36);
  buffer.writeUInt32LE(dataSize, 40);

  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, buffer);
  console.log(
    `  ✓ ${path.relative(root, filePath)} (${seconds}s, silencio)`,
  );
}

const audioDir = path.join(root, 'public', 'audio');
const personalizedDir = path.join(audioDir, 'personalized');

const secretarios = JSON.parse(
  fs.readFileSync(path.join(root, 'src', 'data', 'secretarios.json'), 'utf8'),
);

console.log('Generando placeholders de audio (silenciosos)…');

// Master compartido: ~48s (0:05–0:53).
writeSilentWav(path.join(audioDir, 'master_body.wav'), 48);

// Personalizados por destinatario: intro 5s, outro 7s.
for (const s of secretarios) {
  writeSilentWav(
    path.join(personalizedDir, `intro_${s.slug}.wav`),
    5,
  );
  writeSilentWav(
    path.join(personalizedDir, `outro_${s.slug}.wav`),
    7,
  );
}

console.log('Listo.');
