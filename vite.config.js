import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  base: './', // Fixes white blank screen issue on GitHub Pages & subpath deployments
  plugins: [react()],
  server: {
    port: 3000,
    open: false
  }
});
