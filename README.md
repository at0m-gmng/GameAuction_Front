# Nexus Exchange

## Постановка задачи

Фронтенд для GameAuction — платформы живых аукционов за игровые предметы: игроки регистрируются, получают приветственный предмет и стартовый баланс, просматривают витрину, заходят в лобби и делают ставки в реальном времени за право забрать предмет в свой инвентарь. Киберпанк-терминальный UI.

## Связанные репозитории

- [GameAuction_Backend](https://github.com/at0m-gmng/GameAuction_Backend) (локально — `GameBackend`) — бэкенд, единственный источник данных для этого фронтенда. Экраны и API-контракты должны рассматриваться вместе с этим репозиторием.

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

Базовые URL заданы в [`src/lib/config.ts`](src/lib/config.ts) (Identity.API, Catalog.API). CORS на бэкенде разрешает только `https://at0m-gmng.github.io` — локальный `pnpm dev` не сможет достучаться до задеплоенных сервисов напрямую из браузера.

Реально подключены к бэкенду: регистрация/вход и профиль ([`src/auth.tsx`](src/auth.tsx)), инвентарь на экране профиля ([`src/screens/Profile.tsx`](src/screens/Profile.tsx)). Экраны Catalog и Lobbies пока рисуют захардкоженные моковые данные — Lobby.API и генерация публичного каталога на бэкенде ещё не подключены (см. README бэкенда).
