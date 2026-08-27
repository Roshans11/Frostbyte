import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import cesium from 'vite-plugin-cesium';

export default defineConfig({
  plugins: [
    react(),
    cesium(),
  ],

  define: {
    'process.env': {},
  },

  server: {
    port: 5173,
  },
});