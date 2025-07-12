import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // permite acesso externo (necessário em Docker)
    port: 5173, // garante que o Vite use a porta correta
    proxy: {
      '/api': {
        target: 'http://backend:3000', // nome do serviço no Docker Compose
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
