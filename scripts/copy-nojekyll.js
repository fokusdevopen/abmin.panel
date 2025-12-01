<<<<<<< HEAD
// Скрипт для копирования .nojekyll в dist
import { copyFileSync, existsSync, writeFileSync } from 'fs'
import { join } from 'path'

const distPath = join(process.cwd(), 'dist')
const nojekyllPath = join(distPath, '.nojekyll')

// Создаём .nojekyll файл в dist
try {
  writeFileSync(nojekyllPath, '')
  console.log('✅ .nojekyll файл создан в dist/')
} catch (error) {
  console.error('❌ Ошибка при создании .nojekyll:', error.message)
  process.exit(1)
}



=======
// Скрипт для копирования .nojekyll в dist
import { copyFileSync, existsSync, writeFileSync } from 'fs'
import { join } from 'path'

const distPath = join(process.cwd(), 'dist')
const nojekyllPath = join(distPath, '.nojekyll')

// Создаём .nojekyll файл в dist
try {
  writeFileSync(nojekyllPath, '')
  console.log('✅ .nojekyll файл создан в dist/')
} catch (error) {
  console.error('❌ Ошибка при создании .nojekyll:', error.message)
  process.exit(1)
}



>>>>>>> f126881 (Initial commit)
