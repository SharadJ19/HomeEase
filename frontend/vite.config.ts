import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite';


export default defineConfig({
  plugins: [react(),tailwindcss(),],
  server: {
    host: true,
    allowedHosts: true,
    proxy: {
      "/api": "https://homeease-backend.onrender.com",
    },
  }
  
})
