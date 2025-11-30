import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// ⚠️ КРИТИЧЕСКИ ВАЖНО: 
// Замените 'admin.panel' на ТОЧНОЕ название вашего репозитория на GitHub
// Название должно совпадать БУКВА В БУКВУ, включая регистр!
// 
// Как узнать название: https://github.com/YOUR_USERNAME/НАЗВАНИЕ_РЕПОЗИТОРИЯ
// 
// Примеры:
// - Репозиторий 'admin-panel' → base: '/admin-panel/'
// - Репозиторий 'AdminPanel' → base: '/AdminPanel/'
// - Репозиторий в корне (username.github.io) → base: '/'
const base = '/admin.panel/'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: base,
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      output: {
        // Убеждаемся что JS файлы имеют правильные расширения
        entryFileNames: 'assets/[name].[hash].js',
        chunkFileNames: 'assets/[name].[hash].js',
        assetFileNames: 'assets/[name].[hash].[ext]'
      }
    }
  },
  // Для правильной работы на GitHub Pages
  server: {
    headers: {
      'Content-Type': 'application/javascript; charset=utf-8'
    }
  }
})
