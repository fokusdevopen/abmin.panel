# Финальное решение проблем

## Проблема 1: 404 для main.tsx

**Причина:** После сборки Vite создает файлы в `assets/` с хешами, но пути в index.html могут быть неправильными.

**Решение:** Vite автоматически обновляет пути в index.html при сборке. Убедитесь что:
1. В `index.html` используется правильный путь для dev режима: `/src/main.tsx`
2. После `npm run build` Vite автоматически заменит пути на правильные

## Проблема 2: Ошибка GitHub Actions - нет package-lock.json

**Исправлено:** Изменен workflow с `npm ci` на `npm install`

## Пошаговая инструкция:

### 1. Убедитесь что настройки правильные:

**vite.config.ts:**
```ts
const base = '/ВАШЕ_НАЗВАНИЕ_РЕПОЗИТОРИЯ/'
```

**package.json:**
```json
"homepage": "https://ВАШ_USERNAME.github.io/ВАШЕ_НАЗВАНИЕ"
```

### 2. Создайте package-lock.json (опционально, но рекомендуется):

```bash
npm install
```

Это создаст `package-lock.json` который можно закоммитить.

### 3. Пересоберите проект:

```bash
npm run build
```

### 4. Проверьте dist/index.html:

После сборки откройте `dist/index.html` и проверьте что пути к скриптам правильные. Они должны быть вида:
```html
<script type="module" crossorigin src="/admin.panel/assets/index-xxxxx.js"></script>
```

**Важно:** Пути должны начинаться с вашего base path!

### 5. Задеплойте:

```bash
npm run deploy
```

Или используйте GitHub Actions (уже исправлен).

### 6. Проверьте GitHub Pages настройки:

- Settings → Pages
- Source: `gh-pages` branch (или GitHub Actions)
- Folder: `/ (root)`

## Если 404 остаётся:

1. **Проверьте base path** - должен точно совпадать с названием репозитория
2. **Проверьте dist/index.html** - пути должны начинаться с base path
3. **Проверьте что файлы в dist/assets/** существуют
4. **Откройте Network tab** - посмотрите какие именно файлы не загружаются

## Альтернативное решение (если base path не работает):

Попробуйте использовать относительные пути:

В `vite.config.ts`:
```ts
const base = './'
```

Но это может вызвать проблемы с роутингом. Лучше использовать правильный base path.

