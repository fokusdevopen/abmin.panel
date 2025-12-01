<<<<<<< HEAD
// Скрипт для проверки собранного проекта
import { readFileSync, existsSync } from 'fs'
import { join } from 'path'

const distPath = join(process.cwd(), 'dist')
const indexPath = join(distPath, 'index.html')

console.log('🔍 Проверка собранного проекта...\n')

if (!existsSync(distPath)) {
  console.error('❌ Папка dist не найдена! Выполните: npm run build')
  process.exit(1)
}

if (!existsSync(indexPath)) {
  console.error('❌ dist/index.html не найден!')
  process.exit(1)
}

const indexContent = readFileSync(indexPath, 'utf-8')

// Проверяем что пути правильные
const scriptMatches = indexContent.match(/<script[^>]+src="([^"]+)"/g)

if (!scriptMatches || scriptMatches.length === 0) {
  console.error('❌ Не найдены script теги в index.html')
  process.exit(1)
}

console.log('✅ Найдены script теги:')
scriptMatches.forEach((match, i) => {
  const srcMatch = match.match(/src="([^"]+)"/)
  if (srcMatch) {
    const src = srcMatch[1]
    console.log(`   ${i + 1}. ${src}`)
    
    // Проверяем что путь правильный (начинается с base или относительный)
    if (src.startsWith('/admin.panel/') || src.startsWith('./') || src.startsWith('/assets/')) {
      console.log(`      ✅ Путь выглядит правильно`)
    } else {
      console.warn(`      ⚠️  Путь может быть неправильным: ${src}`)
      console.warn(`      Убедитесь что base в vite.config.ts правильный!`)
    }
  }
})

// Проверяем .nojekyll
const nojekyllPath = join(distPath, '.nojekyll')
if (existsSync(nojekyllPath)) {
  console.log('\n✅ .nojekyll файл найден')
} else {
  console.warn('\n⚠️  .nojekyll файл не найден!')
  console.warn('   Это может вызвать проблемы с MIME типами на GitHub Pages')
}

console.log('\n✅ Проверка завершена!')



=======
// Скрипт для проверки собранного проекта
import { readFileSync, existsSync } from 'fs'
import { join } from 'path'

const distPath = join(process.cwd(), 'dist')
const indexPath = join(distPath, 'index.html')

console.log('🔍 Проверка собранного проекта...\n')

if (!existsSync(distPath)) {
  console.error('❌ Папка dist не найдена! Выполните: npm run build')
  process.exit(1)
}

if (!existsSync(indexPath)) {
  console.error('❌ dist/index.html не найден!')
  process.exit(1)
}

const indexContent = readFileSync(indexPath, 'utf-8')

// Проверяем что пути правильные
const scriptMatches = indexContent.match(/<script[^>]+src="([^"]+)"/g)

if (!scriptMatches || scriptMatches.length === 0) {
  console.error('❌ Не найдены script теги в index.html')
  process.exit(1)
}

console.log('✅ Найдены script теги:')
scriptMatches.forEach((match, i) => {
  const srcMatch = match.match(/src="([^"]+)"/)
  if (srcMatch) {
    const src = srcMatch[1]
    console.log(`   ${i + 1}. ${src}`)
    
    // Проверяем что путь правильный (начинается с base или относительный)
    if (src.startsWith('/admin.panel/') || src.startsWith('./') || src.startsWith('/assets/')) {
      console.log(`      ✅ Путь выглядит правильно`)
    } else {
      console.warn(`      ⚠️  Путь может быть неправильным: ${src}`)
      console.warn(`      Убедитесь что base в vite.config.ts правильный!`)
    }
  }
})

// Проверяем .nojekyll
const nojekyllPath = join(distPath, '.nojekyll')
if (existsSync(nojekyllPath)) {
  console.log('\n✅ .nojekyll файл найден')
} else {
  console.warn('\n⚠️  .nojekyll файл не найден!')
  console.warn('   Это может вызвать проблемы с MIME типами на GitHub Pages')
}

console.log('\n✅ Проверка завершена!')



>>>>>>> f126881 (Initial commit)
