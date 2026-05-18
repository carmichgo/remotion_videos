import { loadFont as loadInter } from '@remotion/google-fonts/Inter';
import { loadFont as loadMono } from '@remotion/google-fonts/JetBrainsMono';

const inter = loadInter('normal', {
  weights: ['400', '500', '700', '900'],
  subsets: ['latin'],
});

const mono = loadMono('normal', {
  weights: ['400', '500'],
  subsets: ['latin'],
});

export const fonts = {
  display: inter.fontFamily,
  body: inter.fontFamily,
  mono: mono.fontFamily,
} as const;
