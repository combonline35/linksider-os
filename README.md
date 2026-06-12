# Linksider OS

Linksider OS — модульная SaaS-платформа для бизнеса на Next.js App Router, TypeScript, Tailwind CSS, shadcn/ui-подходе и Supabase.

## Реализовано в TASK 001

- Supabase Auth: login, register, forgot password.
- Core-модель: profiles, organizations, roles, permissions, memberships, organization modules, invitations, audit logs.
- Dashboard layout с sidebar/header, organization switcher и user menu.
- Страницы `/dashboard`, `/users`, `/modules`, `/settings`.
- Placeholder routes для будущих модулей: CRM, leads, finance, warehouse, learning, analytics, AI, client portal.
- SQL migrations для core schema, RLS и seed ролей/прав.

CRM, финансы, склад, обучение и AI намеренно не реализованы: они представлены только как future modules.

## Запуск локально

```bash
npm install
cp .env.example .env.local
npm run dev
```

Откройте http://localhost:3000.

## Переменные окружения

Заполните `.env.local` значениями проекта Supabase:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

`SUPABASE_SERVICE_ROLE_KEY` зарезервирован только для server-side кода и не должен попадать в клиентские компоненты.

## SQL migrations

В Supabase SQL Editor выполните по порядку:

1. `db/migrations/001_core_schema.sql`
2. `db/migrations/002_core_rls.sql`
3. `db/migrations/003_core_seed.sql`

После этого можно зарегистрировать первого пользователя через `/register`.

## TODO

- Permission-aware write policies/RPC для сложных операций вместо owner-only write policies.
- Email delivery для invitations.
- Выбор текущей организации через cookie/localStorage.
- Reset password callback page.
- Реализация бизнес-модулей отдельными задачами.
