# Инструкция по деплою на GitHub Pages

## Проблема: Белая страница

Если при открытии сайта видна белая страница, это обычно связано с неправильной настройкой путей.

## Решение

### Шаг 1: Проверьте название репозитория

Если ваш репозиторий называется **не** `admin.panel`, измените в `vite.config.ts`:

```ts
base: '/ВАШЕ_НАЗВАНИЕ_РЕПОЗИТОРИЯ/',
```

Например, если репозиторий `my-admin-panel`, то:
```ts
base: '/my-admin-panel/',
```

### Шаг 2: Обновите package.json

В `package.json` замените `YOUR_USERNAME` на ваш GitHub username:

```json
"homepage": "https://YOUR_USERNAME.github.io/admin.panel"
```

### Шаг 3: Пересоберите и задеплойте

```bash
npm install
npm run build
npm run deploy
```

### Шаг 4: Настройте GitHub Pages

1. Перейдите в Settings → Pages
2. Source: выберите `gh-pages` branch
3. Folder: `/ (root)`
4. Сохраните

### Альтернатива: Использовать GitHub Actions

Если используете GitHub Actions (файл `.github/workflows/deploy.yml`):

1. Перейдите в Settings → Pages
2. Source: выберите `GitHub Actions`
3. GitHub Actions автоматически задеплоит проект

## Важно!

- ✅ Используется `HashRouter` - это правильно для GitHub Pages
- ✅ Создан `404.html` для SPA роутинга
- ✅ Настроен `base` в vite.config.ts

После деплоя подождите 1-2 минуты, пока GitHub обновит страницу.

