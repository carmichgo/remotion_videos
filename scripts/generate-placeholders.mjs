// Genera audios placeholder SILENCIOSOS (.wav) para que el proyecto
// renderice de extremo a extremo sin los voiceovers definitivos.
//
// v4: el cierre ya NO es personalizado. Solo el intro lo es.
//   - master_body.wav   -> 54 s, compartido entre los 32 videos (0:05–0:59)
//   - intro_{slug}.wav  -> 5 s, variable por destinatario (0:00–0:05)
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

const SAMPLE_RATE = 8000;
const CHANNELS = 1;
const BITS = 16;

function writeSilentWav(filePath, seconds) {
  const numSamples = Math.round(SAMPLE_RATE * seconds);
  const blockAlign = (CHANNELS * BITS) / 8;
  const dataSize = numSamples * blockAlign;
  const buffer = Buffer.alloc(44 + dataSize);

  buffer.write('RIFF', 0);
  buffer.writeUInt32LE(36 + dataSize, 4);
  buffer.write('WAVE', 8);
  buffer.write('fmt ', 12);
  buffer.writeUInt32LE(16, 16);
  buffer.writeUInt16LE(1, 20);
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

// Master compartido: 54.5 s (0:05–0:59.5, Beats 2–6). v4.1: +0.5s en Beat 4a.
writeSilentWav(path.join(audioDir, 'master_body.wav'), 54.5);

// Personalizado por destinatario: solo intro (5 s). El cierre ya no se personaliza.
for (const s of secretarios) {
  writeSilentWav(
    path.join(personalizedDir, `intro_${s.slug}.wav`),
    5,
  );
}

console.log('Listo.');
