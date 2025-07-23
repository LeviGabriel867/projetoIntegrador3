// frontEnd/chefControl/vite.config.js (VERSÃO VERIFICADA)

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 5173,
    proxy: {
      '/api': {
        // O alvo aponta para o serviço backend na porta 3000
        target: 'http://backend:3000', 
        changeOrigin: true,
        secure: false,
      },
    },
  },
})