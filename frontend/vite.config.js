import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  server: {
    port: 3000,  // Imposta la porta a 3000
    host: true,  // Permetti l'accesso dalla rete locale
    proxy: {
      '/api': 'http://backend-1:8080'  // Indirizza le API al backend
    }
  }
});
