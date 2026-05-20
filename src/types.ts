// Datos crudos por destinatario (lo que vive en data/secretarios.json).
// v4: el cierre ya no es personalizado, así que solo se personaliza Beat 1.
export type SecretarioRecord = {
  slug: string;
  tratamiento: 'Secretario' | 'Secretaria';
  nombre: string;
  estado: string;
};

// Props que recibe la composición FinalVideo (incluye rutas de audio resueltas).
export type SecretarioProps = {
  tratamiento: 'Secretario' | 'Secretaria';
  nombre: string;
  estado: string;
  audio_intro_url: string;
  audio_master_url: string;
};

// Extensión de los assets de audio.
// Los placeholders generados por scripts/generate-placeholders.mjs son .wav silenciosos.
// Para usar voiceover real (ej. ElevenLabs), genera los MP3 y cambia AUDIO_EXT a 'mp3'.
// TODO: cambiar a 'mp3' cuando existan los audios definitivos en public/audio.
export const AUDIO_EXT: 'wav' | 'mp3' = 'wav';

export const buildAudioPaths = (slug: string) => ({
  audio_intro_url: `audio/personalized/intro_${slug}.${AUDIO_EXT}`,
  audio_master_url: `audio/master_body.${AUDIO_EXT}`,
});

export const recordToProps = (r: SecretarioRecord): SecretarioProps => ({
  tratamiento: r.tratamiento,
  nombre: r.nombre,
  estado: r.estado,
  ...buildAudioPaths(r.slug),
});
