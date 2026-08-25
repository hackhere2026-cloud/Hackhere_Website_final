import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  envPrefix: ['VITE_', 'NEXT_PUBLIC_'], // Expose NEXT_PUBLIC_ vars like Vercel's
  server: {
    host: 'localhost',
    port: 5173,
    allowedHosts: ['local.myapp.com'], // 👈 whitelist your fake local domain
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:3001',
        changeOrigin: true,
      },
    },
  }
})
