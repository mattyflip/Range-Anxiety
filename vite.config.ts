import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('@react-google-maps')) {
              return 'vendor-google';
            }
            if (id.includes('firebase')) {
              return 'vendor-firebase';
            }
            return 'vendor-libs';
          }
        }
      }
    }
  }
})
