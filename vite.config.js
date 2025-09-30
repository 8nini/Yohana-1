import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/',
  build: {
    outDir: 'dist',
    assetsInlineLimit: 0, // No inlinea assets pequeños
  },
  publicDir: 'public', // Asegura que la carpeta public se copie
});