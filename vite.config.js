import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Dashboard currently deploys at the domain root.
  // Change this if it ever moves to a subdirectory.
  base: '/',
})
