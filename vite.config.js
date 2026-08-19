import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  base: mode === 'production' ? '/speakx-ai-english/' : '/',
  plugins: [react()],
  server: {
    port: 3000,
    open: false
  }
}));
