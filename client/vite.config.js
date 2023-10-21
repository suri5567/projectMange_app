import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  backendBaseUrl: 'https://mern-app-cv74.onrender.com',
  build: {
    chunkSizeWarningLimit: 1000, 
  },

})

