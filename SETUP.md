# Инструкция по запуску LMS системы

## Что уже готово (Этап 1 - Фундамент)

✅ Docker Compose конфигурация (PostgreSQL, Redis, MinIO)
✅ Prisma ORM с полной схемой базы данных
✅ NextAuth.js v5 с поддержкой Google OAuth и Credentials
✅ Middleware для защиты роутов по ролям
✅ Типизация для NextAuth
✅ Helper функции для работы с аутентификацией

## Шаги для запуска

### 1. Запустить Docker контейнеры

```bash
# Запусти Docker Desktop, затем:
docker-compose up -d
```

Это запустит:
- **PostgreSQL** на порту 5432
- **Redis** на порту 6379
- **MinIO** на порту 9000 (API) и 9001 (Console)

### 2. Выполнить миграцию базы данных

```bash
# Генерация Prisma клиента
npx prisma generate

# Создание миграции
npx prisma migrate dev --name init
```

### 3. (Опционально) Заполнить БД тестовыми данными

```bash
npx prisma db seed
```

### 4. Запустить Next.js в dev режиме

```bash
npm run dev
```

Приложение будет доступно на http://localhost:3000

## Доступ к сервисам

- **Next.js приложение**: http://localhost:3000
- **MinIO Console**: http://localhost:9001 (admin: minioadmin / minioadmin123)
- **PostgreSQL**: localhost:5432 (user: lms_user, password: lms_password, db: lms_db)
- **Redis**: localhost:6379

## Структура базы данных

### Таблицы:

**Пользователи и аутентификация:**
- `users` - пользователи (admin, teacher, student)
- `accounts` - OAuth аккаунты
- `sessions` - сессии
- `verification_tokens` - токены для верификации

**Курсы и обучение:**
- `courses` - курсы
- `course_enrollments` - записи студентов на курсы
- `lessons` - уроки
- `videos` - видео файлы с метаданными
- `video_progress` - прогресс просмотра видео

**Задания и тесты:**
- `assignments` - домашние задания
- `assignment_submissions` - сдача заданий
- `tests` - тесты
- `test_questions` - вопросы тестов
- `test_results` - результаты тестов

**Дополнительно:**
- `comments` - комментарии к урокам
- `certificates` - сертификаты
- `analytics_events` - события для аналитики

## Переменные окружения (.env)

Все необходимые переменные уже настроены в `.env` файле.

Для продакшена обязательно измени:
- `NEXTAUTH_SECRET` - сгенерируй новый: `openssl rand -base64 32`
- `DATABASE_URL` - укажи реальный адрес БД
- `MINIO_*` - настрой реальное S3 хранилище

## Следующие шаги (Этап 2)

1. Создать CRUD API для курсов
2. Создать страницы для преподавателей
3. Создать страницы для студентов
4. Реализовать загрузку видео
5. Настроить видео процессинг worker

## Структура проекта

```
/app
  /api
    /auth/[...nextauth]     # NextAuth API route
  /dashboard                # Общий дашборд
    layout.tsx              # AuthGuard для всех пользователей
  /admin                    # Админ панель
    layout.tsx              # AuthGuard для ADMIN
    page.tsx                # Страница админа
  /teacher                  # Кабинет преподавателя
    layout.tsx              # AuthGuard для TEACHER/ADMIN
    page.tsx                # Страница преподавателя
  /student                  # Кабинет студента
    layout.tsx              # AuthGuard для STUDENT
    page.tsx                # Страница студента
  /login                    # Страница входа
  /signup                   # Страница регистрации

/components
  /auth
    auth-guard.tsx          # Компонент защиты роутов
  /providers
    session-provider.tsx    # SessionProvider для клиента
  /ui                       # shadcn компоненты

/lib
  auth.ts                   # Конфигурация NextAuth
  auth-helpers.ts           # Helper функции для auth
  prisma.ts                 # Prisma client singleton

/prisma
  schema.prisma             # Схема базы данных
  seed.ts                   # Seed скрипт

/types
  next-auth.d.ts            # TypeScript типы для NextAuth

docker-compose.yml          # Docker конфигурация
```

## Роли пользователей

- **ADMIN** - полный доступ ко всем функциям
- **TEACHER** - создание курсов, уроков, проверка заданий
- **STUDENT** - просмотр курсов, сдача заданий, прохождение тестов

## Защита роутов

Защита реализована через AuthGuard компонент в layouts (Next.js 16 не использует middleware):
- `/admin/*` - только ADMIN (через layout.tsx)
- `/teacher/*` - TEACHER или ADMIN (через layout.tsx)
- `/student/*` - STUDENT (через layout.tsx)
- `/dashboard/*` - все авторизованные пользователи (через layout.tsx)

AuthGuard автоматически перенаправляет неавторизованных пользователей на /login, а пользователей с неправильной ролью - на их соответствующие страницы.

## Команды для разработки

```bash
# Запуск dev сервера
npm run dev

# Сборка production
npm run build

# Старт production
npm start

# Prisma Studio (GUI для БД)
npx prisma studio

# Генерация Prisma клиента
npx prisma generate

# Создание миграции
npx prisma migrate dev --name <название>

# Применение миграций
npx prisma migrate deploy
```

## Troubleshooting

### Docker не запускается
- Проверь, что Docker Desktop запущен
- Выполни: `docker ps` чтобы убедиться что контейнеры работают

### Ошибка подключения к БД
- Убедись что PostgreSQL контейнер запущен: `docker ps | grep postgres`
- Проверь DATABASE_URL в .env

### Prisma ошибки
- Выполни: `npx prisma generate` для генерации клиента
- Выполни: `npx prisma db push` для синхронизации схемы с БД
