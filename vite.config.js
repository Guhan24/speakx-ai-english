import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/speakx-ai-english/', // Required for GitHub Pages repository deployment https://guhan24.github.io/speakx-ai-english/
  plugins: [react()],
  server: {
    port: 3000,
    open: false
  }
});
