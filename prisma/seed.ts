import { PrismaClient, UserRole, CourseStatus } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Начало заполнения базы данных...");

  // Создание админа
  const adminPassword = await bcrypt.hash("admin123", 10);
  const admin = await prisma.user.upsert({
    where: { email: "admin@lms.ru" },
    update: {},
    create: {
      email: "admin@lms.ru",
      name: "Администратор",
      password: adminPassword,
      role: UserRole.ADMIN,
    },
  });
  console.log("✅ Админ создан:", admin.email);

  // Создание преподавателя
  const teacherPassword = await bcrypt.hash("teacher123", 10);
  const teacher = await prisma.user.upsert({
    where: { email: "teacher@lms.ru" },
    update: {},
    create: {
      email: "teacher@lms.ru",
      name: "Иван Петров",
      password: teacherPassword,
      role: UserRole.TEACHER,
    },
  });
  console.log("✅ Преподаватель создан:", teacher.email);

  // Создание студента
  const studentPassword = await bcrypt.hash("student123", 10);
  const student = await prisma.user.upsert({
    where: { email: "student@lms.ru" },
    update: {},
    create: {
      email: "student@lms.ru",
      name: "Мария Иванова",
      password: studentPassword,
      role: UserRole.STUDENT,
    },
  });
  console.log("✅ Студент создан:", student.email);

  // Создание тестового курса
  const course = await prisma.course.upsert({
    where: { slug: "web-development-basics" },
    update: {},
    create: {
      title: "Основы веб-разработки",
      slug: "web-development-basics",
      description:
        "Изучите основы HTML, CSS и JavaScript с нуля. Этот курс подходит для начинающих разработчиков.",
      category: "Программирование",
      status: CourseStatus.PUBLISHED,
      teacherId: teacher.id,
    },
  });
  console.log("✅ Курс создан:", course.title);

  // Создание уроков
  const lesson1 = await prisma.lesson.create({
    data: {
      courseId: course.id,
      title: "Введение в HTML",
      slug: "introduction-to-html",
      description: "Узнайте что такое HTML и как создавать структуру веб-страницы",
      order: 1,
      content: `
# Введение в HTML

HTML (HyperText Markup Language) - это язык разметки, используемый для создания структуры веб-страниц.

## Основные теги

- \`<html>\` - корневой элемент
- \`<head>\` - метаданные страницы
- \`<body>\` - видимое содержимое
- \`<h1>-<h6>\` - заголовки
- \`<p>\` - параграфы
- \`<a>\` - ссылки
- \`<div>\` - контейнеры

## Пример простой HTML страницы

\`\`\`html
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <title>Моя первая страница</title>
</head>
<body>
    <h1>Привет, мир!</h1>
    <p>Это моя первая HTML страница.</p>
</body>
</html>
\`\`\`
      `,
    },
  });

  const lesson2 = await prisma.lesson.create({
    data: {
      courseId: course.id,
      title: "Основы CSS",
      slug: "css-basics",
      description: "Научитесь стилизовать HTML элементы с помощью CSS",
      order: 2,
      content: `
# Основы CSS

CSS (Cascading Style Sheets) - это язык стилей, используемый для оформления HTML документов.

## Способы подключения CSS

1. Inline стили
2. Internal CSS (в теге <style>)
3. External CSS (отдельный файл)

## Основные свойства

- \`color\` - цвет текста
- \`background-color\` - цвет фона
- \`font-size\` - размер шрифта
- \`margin\` - внешние отступы
- \`padding\` - внутренние отступы

## Пример

\`\`\`css
body {
    font-family: Arial, sans-serif;
    background-color: #f0f0f0;
}

h1 {
    color: #333;
    text-align: center;
}
\`\`\`
      `,
    },
  });

  const lesson3 = await prisma.lesson.create({
    data: {
      courseId: course.id,
      title: "JavaScript для начинающих",
      slug: "javascript-for-beginners",
      description: "Познакомьтесь с основами программирования на JavaScript",
      order: 3,
      content: `
# JavaScript для начинающих

JavaScript - это язык программирования, который делает веб-страницы интерактивными.

## Переменные

\`\`\`javascript
let name = "Иван";
const age = 25;
var city = "Москва"; // старый способ
\`\`\`

## Функции

\`\`\`javascript
function greet(name) {
    return "Привет, " + name + "!";
}

console.log(greet("Мария"));
\`\`\`

## Работа с DOM

\`\`\`javascript
// Получение элемента
const button = document.querySelector('#myButton');

// Добавление обработчика события
button.addEventListener('click', function() {
    alert('Кнопка нажата!');
});
\`\`\`
      `,
    },
  });

  console.log("✅ Уроки созданы:", lesson1.title, lesson2.title, lesson3.title);

  // Запись студента на курс
  await prisma.courseEnrollment.create({
    data: {
      courseId: course.id,
      studentId: student.id,
      progress: 0,
    },
  });
  console.log("✅ Студент записан на курс");

  // Создание теста
  const test = await prisma.test.create({
    data: {
      courseId: course.id,
      title: "Итоговый тест по основам веб-разработки",
      description: "Проверьте свои знания HTML, CSS и JavaScript",
      timeLimit: 30,
      passingScore: 70,
      questions: {
        create: [
          {
            question: "Что означает аббревиатура HTML?",
            options: JSON.stringify([
              "HyperText Markup Language",
              "High Tech Modern Language",
              "Home Tool Markup Language",
              "Hyperlinks and Text Markup Language",
            ]),
            correctAnswer: JSON.stringify(0),
            points: 10,
            order: 1,
          },
          {
            question: "Какой тег используется для создания ссылки?",
            options: JSON.stringify(["<link>", "<a>", "<href>", "<url>"]),
            correctAnswer: JSON.stringify(1),
            points: 10,
            order: 2,
          },
          {
            question: "Какое свойство CSS используется для изменения цвета текста?",
            options: JSON.stringify([
              "text-color",
              "font-color",
              "color",
              "text-style",
            ]),
            correctAnswer: JSON.stringify(2),
            points: 10,
            order: 3,
          },
        ],
      },
    },
  });
  console.log("✅ Тест создан:", test.title);

  console.log("\n🎉 База данных успешно заполнена!");
  console.log("\n📝 Тестовые учетные данные:");
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log("Администратор:");
  console.log("  Email: admin@lms.ru");
  console.log("  Пароль: admin123");
  console.log("\nПреподаватель:");
  console.log("  Email: teacher@lms.ru");
  console.log("  Пароль: teacher123");
  console.log("\nСтудент:");
  console.log("  Email: student@lms.ru");
  console.log("  Пароль: student123");
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");
}

main()
  .catch((e) => {
    console.error("❌ Ошибка при заполнении базы данных:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
