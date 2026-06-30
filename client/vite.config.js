import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Proxy API + uploaded images to the Express server during dev so the client
// can use same-origin relative paths (/api, /uploads).
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api': 'http://localhost:5000',
      '/uploads': 'http://localhost:5000',
    },
  },
})
