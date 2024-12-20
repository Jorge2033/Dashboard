import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: "/Dashboard/", // Asegúrate de incluir la barra al final
  plugins: [react()],
})
