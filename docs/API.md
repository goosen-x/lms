# 🔌 API Documentation

## Текущие API Endpoints

### NextAuth API

**Base URL:** `/api/auth`

#### GET /api/auth/session
Получить текущую сессию пользователя.

**Response:**
```json
{
  "user": {
    "id": "clxxx",
    "name": "Иван Петров",
    "email": "teacher@lms.ru",
    "role": "TEACHER",
    "image": null
  },
  "expires": "2025-12-25T10:00:00.000Z"
}
```

#### POST /api/auth/signin
Авторизация пользователя.

**Request Body:**
```json
{
  "email": "admin@lms.ru",
  "password": "admin123",
  "callbackUrl": "/dashboard"
}
```

**Response:**
```json
{
  "url": "/dashboard",
  "ok": true,
  "status": 200
}
```

#### POST /api/auth/signout
Выход из системы.

**Response:**
```json
{
  "url": "/",
  "ok": true
}
```

---

## Планируемые API (Этап 2)

### Courses API

#### GET /api/courses
Получить список курсов.

**Query Parameters:**
- `status` - фильтр по статусу (DRAFT, PUBLISHED, ARCHIVED)
- `category` - фильтр по категории
- `page` - номер страницы (default: 1)
- `limit` - кол-во на странице (default: 10)

**Response:**
```json
{
  "courses": [
    {
      "id": "clxxx",
      "title": "Основы веб-разработки",
      "slug": "web-development-basics",
      "description": "Изучите HTML, CSS и JavaScript",
      "thumbnail": "/thumbnails/course-1.jpg",
      "category": "Программирование",
      "status": "PUBLISHED",
      "teacher": {
        "id": "clyyy",
        "name": "Иван Петров"
      },
      "lessonsCount": 10,
      "studentsCount": 45
    }
  ],
  "total": 100,
  "page": 1,
  "totalPages": 10
}
```

#### GET /api/courses/:id
Получить курс по ID.

#### POST /api/courses
Создать новый курс (только TEACHER/ADMIN).

**Request Body:**
```json
{
  "title": "Новый курс",
  "description": "Описание курса",
  "category": "Программирование",
  "status": "DRAFT"
}
```

#### PATCH /api/courses/:id
Обновить курс.

#### DELETE /api/courses/:id
Удалить курс.

---

### Lessons API

#### GET /api/courses/:courseId/lessons
Получить уроки курса.

#### POST /api/courses/:courseId/lessons
Создать урок.

#### PATCH /api/lessons/:id
Обновить урок.

#### DELETE /api/lessons/:id
Удалить урок.

---

### Videos API

#### POST /api/videos/upload
Загрузить видео (multipart/form-data).

**Request:**
```
Content-Type: multipart/form-data
Body: video file
```

**Response:**
```json
{
  "videoId": "clxxx",
  "status": "UPLOADING",
  "originalPath": "videos-raw/xxx.mp4"
}
```

#### GET /api/videos/:id/signed-url
Получить подписанный URL для просмотра.

**Response:**
```json
{
  "url": "https://minio:9000/videos-processed/xxx/playlist.m3u8?X-Amz-...",
  "expiresIn": 3600
}
```

#### POST /api/videos/:id/progress
Сохранить прогресс просмотра.

**Request Body:**
```json
{
  "position": 120,
  "completed": false
}
```

---

### Enrollments API

#### POST /api/courses/:courseId/enroll
Записаться на курс.

#### DELETE /api/courses/:courseId/enroll
Отписаться от курса.

#### GET /api/my/enrollments
Получить мои курсы.

---

### Assignments API

#### GET /api/lessons/:lessonId/assignments
Получить задания урока.

#### POST /api/assignments/:id/submit
Сдать задание.

**Request Body:**
```json
{
  "content": "Мой ответ",
  "attachments": ["/uploads/file1.pdf"]
}
```

#### PATCH /api/submissions/:id/grade
Поставить оценку (только TEACHER).

**Request Body:**
```json
{
  "score": 85,
  "feedback": "Хорошая работа!"
}
```

---

### Tests API

#### GET /api/courses/:courseId/tests
Получить тесты курса.

#### POST /api/tests/:id/submit
Отправить ответы на тест.

**Request Body:**
```json
{
  "answers": [0, 2, 1]
}
```

**Response:**
```json
{
  "score": 20,
  "maxScore": 30,
  "percentage": 66.67,
  "passed": false
}
```

---

## Error Responses

### 400 Bad Request
```json
{
  "error": "Invalid request",
  "message": "Missing required field: title"
}
```

### 401 Unauthorized
```json
{
  "error": "Unauthorized",
  "message": "Please sign in to access this resource"
}
```

### 403 Forbidden
```json
{
  "error": "Forbidden",
  "message": "You don't have permission to access this resource"
}
```

### 404 Not Found
```json
{
  "error": "Not Found",
  "message": "Course not found"
}
```

### 500 Internal Server Error
```json
{
  "error": "Internal Server Error",
  "message": "Something went wrong"
}
```

---

## Rate Limiting

**Планируется** (не реализовано):
- 100 requests per minute per IP
- 1000 requests per hour per user

---

**Дата обновления:** 25 ноября 2025
