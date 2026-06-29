// vite.config.js

// Import the defineConfig helper from Vite
import { defineConfig } from 'vite'

// Import the React plugin so Vite understands JSX
import react from '@vitejs/plugin-react'

// Import Tailwind plugin for Vite
import tailwindcss from '@tailwindcss/vite'

// Export the configuration
export default defineConfig({
  plugins: [
    react(),        // enables React/JSX support
    tailwindcss(),  // enables Tailwind CSS
  ],
})