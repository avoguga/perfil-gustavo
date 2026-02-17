import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: ['e15a-2804-14d-128a-97c4-2836-e0af-6217-9d19.ngrok-free.app'],
  },
})
