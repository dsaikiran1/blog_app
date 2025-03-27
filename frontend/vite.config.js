import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server:{
    port: 3000, // Change to your preferred port
    proxy: {
      "/api": {
        target: "http://localhost:5000", // Change to your backend server URL
        changeOrigin:true,
      },
    },
  },
  build:{
    outDir:'dist',
  },
  base:"/",
})
