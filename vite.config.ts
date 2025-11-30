import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// ⚠️ ВАЖНО: Замените 'admin.panel' на название ВАШЕГО репозитория на GitHub
// Например, если репозиторий называется 'my-admin', то: base: '/my-admin/'
// Если репозиторий в корне (username.github.io), то: base: '/'
const base = '/admin.panel/'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: base,
  build: {
    outDir: 'dist',
  },
})
