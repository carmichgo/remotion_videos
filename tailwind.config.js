/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#0A0E1A',
        bgDark: '#050810',
        accent: '#00D4FF',
        accentSecondary: '#3FE0A0',
        alert: '#FF3B30',
        textMuted: '#8A9BAE',
        border: '#1F2A3D',
      },
      fontFamily: {
        display: ['Inter', 'system-ui', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [],
};
