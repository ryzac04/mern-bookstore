// Helper function provided by Vite to define config settings - ensures proper type inference in TypeScript projects but can also be used in JavaScript. 
import { defineConfig } from 'vite'
// Plugin provided by Vite for integrating React. Enables features like JSX/TSX transformation, fast refresh, and other React-specific optimizations. 
import react from '@vitejs/plugin-react'
// Vite-specific plugin for integrating Tailwind CSS. Helps optimize Tailwind's workflow and ensures its styles are properly processed during development and production builds. 
import tailwindcss from "@tailwindcss/vite"; 

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ]
});