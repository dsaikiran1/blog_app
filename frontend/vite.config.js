import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server:{
    // Change to your preferred port
    port:5173,
    proxy: {
      
      "/api": {
        target: "http://localhost:5000", // Change to your backend server URL
        changeOrigin:true,
        secure:false,
      },
    },
  },
})
