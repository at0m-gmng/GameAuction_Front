# Nexus Exchange

Фронтенд для GameAuction — платформы живых аукционов за игровые предметы. Киберпанк-терминальный UI: регистрация/вход, каталог предметов, открытые лобби-аукционы, профиль игрока.

## Стек

- React 19 + TypeScript
- Vite 8
- Tailwind CSS v4
- pnpm

## Разработка

```bash
pnpm install
pnpm dev
```

## Сборка

```bash
pnpm build
```

## Деплой

Автоматический, через GitHub Actions на каждый push в `main` — см. [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml). Собирается статикой и публикуется на GitHub Pages.

## Бэкенд

Работает поверх отдельного ASP.NET Core Web API (аутентификация, профиль игрока) — весь слой интеграции в [`src/auth.tsx`](src/auth.tsx).

## Структура

- `src/App.tsx` — основное приложение, навигация между экранами
- `src/auth.tsx` — аутентификация (JWT), профиль игрока
- `src/imports/` — экраны, экспортированные из Figma Make
