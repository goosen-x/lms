import Link from "next/link";
import { AppSidebar } from "@/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { VideoPlayer } from "@/components/video-player";
import { LessonsSidebar } from "@/components/lessons-sidebar";
import { ChevronLeft, ChevronRight, Download, FileText } from "lucide-react";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";

const coursesData = {
  "1": {
    id: "1",
    title: "Основы программирования",
    lessons: [
      {
        id: "1",
        title: "Введение в программирование",
        description: "Что такое программирование и зачем оно нужно",
        videoId: "3BStvUEDbuDobFBXhb2Fyf",
        summary: `
# Конспект урока

## Что такое программирование?

Программирование - это процесс создания программ (наборов инструкций) для компьютеров. Программы управляют работой компьютера и позволяют решать различные задачи.

## Основные понятия

- **Алгоритм** - последовательность шагов для решения задачи
- **Код** - текст программы, написанный на языке программирования
- **Синтаксис** - правила написания кода

## Зачем учить программирование?

1. Автоматизация рутинных задач
2. Создание веб-сайтов и приложений
3. Анализ данных
4. Развитие логического мышления
        `,
        materials: [
          { name: "Презентация урока.pdf", url: "#", size: "2.5 MB" },
          { name: "Практические задания.pdf", url: "#", size: "1.2 MB" },
        ],
      },
      {
        id: "2",
        title: "Переменные и типы данных",
        description: "Изучаем основные типы данных",
        videoId: "3BStvUEDbuDobFBXhb2Fyf",
        summary: `
# Конспект урока

## Переменные

Переменная - это именованная область памяти для хранения данных.

## Типы данных

- **Number** - числа (1, 2.5, -10)
- **String** - строки ("привет", 'мир')
- **Boolean** - логические значения (true, false)
- **Array** - массивы [1, 2, 3]
- **Object** - объекты {name: "John"}

## Примеры

\`\`\`javascript
let name = "Иван";
let age = 25;
let isStudent = true;
\`\`\`
        `,
        materials: [
          { name: "Шпаргалка по типам данных.pdf", url: "#", size: "850 KB" },
          { name: "Примеры кода.zip", url: "#", size: "500 KB" },
        ],
      },
      {
        id: "3",
        title: "Условные операторы",
        description: "Учимся использовать if/else",
        videoId: "3BStvUEDbuDobFBXhb2Fyf",
        summary: `
# Конспект урока

## Условные операторы

Позволяют выполнять разный код в зависимости от условий.

## Синтаксис if/else

\`\`\`javascript
if (условие) {
  // код, если условие истинно
} else {
  // код, если условие ложно
}
\`\`\`

## Операторы сравнения

- \`===\` - строгое равенство
- \`!==\` - строгое неравенство
- \`>\` - больше
- \`<\` - меньше
- \`>=\` - больше или равно
- \`<=\` - меньше или равно
        `,
        materials: [
          { name: "Практика с условиями.pdf", url: "#", size: "1.8 MB" },
          { name: "Решения задач.pdf", url: "#", size: "1.1 MB" },
        ],
      },
      {
        id: "4",
        title: "Циклы",
        description: "Как повторять действия в коде",
        videoId: "3BStvUEDbuDobFBXhb2Fyf",
        summary: `
# Конспект урока

## Циклы

Циклы позволяют выполнять код многократно.

## Типы циклов

### for
\`\`\`javascript
for (let i = 0; i < 10; i++) {
  console.log(i);
}
\`\`\`

### while
\`\`\`javascript
while (условие) {
  // код
}
\`\`\`

### forEach
\`\`\`javascript
array.forEach(item => {
  console.log(item);
});
\`\`\`
        `,
        materials: [
          { name: "Задачи на циклы.pdf", url: "#", size: "2.0 MB" },
          { name: "Шпаргалка по циклам.pdf", url: "#", size: "750 KB" },
        ],
      },
      {
        id: "5",
        title: "Функции",
        description: "Создание переиспользуемого кода",
        videoId: "3BStvUEDbuDobFBXhb2Fyf",
        summary: `
# Конспект урока

## Функции

Функция - это блок кода, который можно использовать многократно.

## Объявление функций

\`\`\`javascript
function имяФункции(параметры) {
  // код функции
  return результат;
}
\`\`\`

## Стрелочные функции

\`\`\`javascript
const add = (a, b) => a + b;
\`\`\`

## Примеры

\`\`\`javascript
function greet(name) {
  return "Привет, " + name;
}

console.log(greet("Иван"));
\`\`\`
        `,
        materials: [
          { name: "Библиотека полезных функций.pdf", url: "#", size: "3.2 MB" },
          { name: "Задачи на функции.pdf", url: "#", size: "1.5 MB" },
        ],
      },
    ],
  },
  "2": {
    id: "2",
    title: "Веб-разработка",
    lessons: [
      {
        id: "1",
        title: "HTML основы",
        description: "Структура веб-страницы",
        videoId: "3BStvUEDbuDobFBXhb2Fyf",
        summary: `
# Конспект урока

## HTML (HyperText Markup Language)

HTML - язык разметки для создания веб-страниц.

## Основные теги

- \`<html>\` - корневой элемент
- \`<head>\` - метаданные страницы
- \`<body>\` - содержимое страницы
- \`<h1>-<h6>\` - заголовки
- \`<p>\` - параграфы
- \`<a>\` - ссылки
- \`<img>\` - изображения
- \`<div>\` - контейнер

## Пример структуры

\`\`\`html
<!DOCTYPE html>
<html>
  <head>
    <title>Заголовок страницы</title>
  </head>
  <body>
    <h1>Привет, мир!</h1>
    <p>Это мой первый сайт</p>
  </body>
</html>
\`\`\`
        `,
        materials: [
          { name: "Справочник HTML тегов.pdf", url: "#", size: "3.5 MB" },
          { name: "Примеры страниц.zip", url: "#", size: "2.8 MB" },
        ],
      },
      {
        id: "2",
        title: "CSS стилизация",
        description: "Оформление веб-страниц",
        videoId: "3BStvUEDbuDobFBXhb2Fyf",
        summary: `
# Конспект урока

## CSS (Cascading Style Sheets)

CSS используется для стилизации HTML элементов.

## Способы подключения

1. Inline стили: \`<p style="color: red;">\`
2. Internal стили: \`<style>\` в \`<head>\`
3. External файл: \`<link rel="stylesheet" href="style.css">\`

## Основные свойства

- \`color\` - цвет текста
- \`background-color\` - цвет фона
- \`font-size\` - размер шрифта
- \`margin\` - внешние отступы
- \`padding\` - внутренние отступы

## Пример

\`\`\`css
h1 {
  color: blue;
  font-size: 32px;
  text-align: center;
}
\`\`\`
        `,
        materials: [
          { name: "Шпаргалка CSS свойств.pdf", url: "#", size: "2.2 MB" },
          { name: "Готовые стили.css", url: "#", size: "450 KB" },
        ],
      },
      {
        id: "3",
        title: "JavaScript основы",
        description: "Интерактивность на странице",
        videoId: "3BStvUEDbuDobFBXhb2Fyf",
        summary: `
# Конспект урока

## JavaScript для веб-страниц

JavaScript добавляет интерактивность на веб-страницы.

## Работа с DOM

\`\`\`javascript
// Получение элемента
const element = document.getElementById('myId');

// Изменение содержимого
element.textContent = 'Новый текст';

// Добавление обработчика события
element.addEventListener('click', () => {
  alert('Кликнули!');
});
\`\`\`

## События

- \`click\` - клик мыши
- \`input\` - ввод текста
- \`submit\` - отправка формы
- \`load\` - загрузка страницы
        `,
        materials: [
          { name: "JavaScript паттерны.pdf", url: "#", size: "4.1 MB" },
          { name: "Примеры интерактивности.zip", url: "#", size: "1.9 MB" },
        ],
      },
      {
        id: "4",
        title: "React введение",
        description: "Современная библиотека для UI",
        videoId: "3BStvUEDbuDobFBXhb2Fyf",
        summary: `
# Конспект урока

## React

React - библиотека для создания пользовательских интерфейсов.

## Компоненты

\`\`\`jsx
function Welcome(props) {
  return <h1>Привет, {props.name}</h1>;
}
\`\`\`

## Хуки

- \`useState\` - состояние компонента
- \`useEffect\` - побочные эффекты
- \`useContext\` - контекст
- \`useRef\` - ссылки на элементы

## Пример useState

\`\`\`jsx
const [count, setCount] = useState(0);

<button onClick={() => setCount(count + 1)}>
  Счет: {count}
</button>
\`\`\`
        `,
        materials: [
          { name: "React документация.pdf", url: "#", size: "5.5 MB" },
          { name: "Проект на React.zip", url: "#", size: "12 MB" },
        ],
      },
      {
        id: "5",
        title: "Деплой приложения",
        description: "Публикация проекта в интернет",
        videoId: "3BStvUEDbuDobFBXhb2Fyf",
        summary: `
# Конспект урока

## Деплой веб-приложений

Процесс публикации вашего проекта в интернет.

## Популярные платформы

1. **Vercel** - для Next.js, React
2. **Netlify** - для статических сайтов
3. **GitHub Pages** - бесплатный хостинг
4. **Heroku** - для full-stack приложений

## Этапы деплоя

1. Подготовка проекта
2. Создание production build
3. Загрузка на хостинг
4. Настройка домена
5. SSL сертификат

## Git деплой

\`\`\`bash
git add .
git commit -m "Deploy"
git push origin main
\`\`\`
        `,
        materials: [
          { name: "Руководство по деплою.pdf", url: "#", size: "2.8 MB" },
          { name: "CI/CD конфигурация.zip", url: "#", size: "650 KB" },
        ],
      },
    ],
  },
};

interface LessonPageProps {
  params: Promise<{ courseId: string; lessonId: string }>;
}

export default async function LessonPage({ params }: LessonPageProps) {
  const { courseId, lessonId } = await params;
  const course = coursesData[courseId as keyof typeof coursesData];

  if (!course) {
    notFound();
  }

  const lesson = course.lessons.find((l) => l.id === lessonId);

  if (!lesson) {
    notFound();
  }

  const currentIndex = course.lessons.findIndex((l) => l.id === lessonId);
  const prevLesson = currentIndex > 0 ? course.lessons[currentIndex - 1] : null;
  const nextLesson =
    currentIndex < course.lessons.length - 1
      ? course.lessons[currentIndex + 1]
      : null;

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="flex-row">
        <div className="flex-1 flex flex-col">
          <header className="flex h-16 shrink-0 items-center gap-2">
            <div className="flex items-center gap-2 px-4">
              <SidebarTrigger className="-ml-1" />
              <Separator
                orientation="vertical"
                className="mr-2 data-[orientation=vertical]:h-4"
              />
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbLink href="/courses">Курсы</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbLink href={`/courses/${courseId}`}>
                      {course.title}
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbPage>{lesson.title}</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
          </header>
          <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
            <div>
              <h1 className="text-3xl font-bold mb-2">{lesson.title}</h1>
              <p className="text-muted-foreground">{lesson.description}</p>
            </div>

            <VideoPlayer videoId={lesson.videoId} />

            <Tabs defaultValue="summary" className="mt-6">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="summary">
                  <FileText className="mr-2 h-4 w-4" />
                  Конспект
                </TabsTrigger>
                <TabsTrigger value="materials">
                  <Download className="mr-2 h-4 w-4" />
                  Материалы
                </TabsTrigger>
              </TabsList>
              <TabsContent value="summary">
                <Card>
                  <CardContent className="pt-6 prose prose-sm max-w-none dark:prose-invert">
                    <ReactMarkdown>{lesson.summary}</ReactMarkdown>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="materials">
                <Card>
                  <CardHeader>
                    <CardTitle>Материалы для скачивания</CardTitle>
                    <CardDescription>
                      Дополнительные материалы к уроку
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {lesson.materials?.map((material, index) => (
                      <a
                        key={index}
                        href={material.url}
                        className="flex items-center justify-between p-3 border rounded-lg hover:bg-accent transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                            <Download className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium">{material.name}</p>
                            <p className="text-sm text-muted-foreground">
                              {material.size}
                            </p>
                          </div>
                        </div>
                        <ChevronRight className="h-5 w-5 text-muted-foreground" />
                      </a>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            <div className="flex justify-between items-center mt-4">
              {prevLesson ? (
                <Button variant="outline" asChild>
                  <Link href={`/courses/${courseId}/lessons/${prevLesson.id}`}>
                    <ChevronLeft className="mr-2 h-4 w-4" />
                    Предыдущее занятие
                  </Link>
                </Button>
              ) : (
                <div />
              )}

              {nextLesson ? (
                <Button asChild>
                  <Link href={`/courses/${courseId}/lessons/${nextLesson.id}`}>
                    Следующее занятие
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              ) : (
                <Button variant="outline" asChild>
                  <Link href={`/courses/${courseId}`}>Вернуться к курсу</Link>
                </Button>
              )}
            </div>
          </div>
        </div>
        <LessonsSidebar
          courseId={courseId}
          lessons={course.lessons}
          currentLessonId={lessonId}
          courseTitle={course.title}
        />
      </SidebarInset>
    </SidebarProvider>
  );
}
