import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

console.log('🔥 VITE CONFIG LOADED: vaultx-admin')

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 5174,
    strictPort: true,
  },
})
