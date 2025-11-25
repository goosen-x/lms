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
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { PlayCircle } from "lucide-react";
import { notFound } from "next/navigation";

const coursesData = {
  "1": {
    id: "1",
    title: "Основы программирования",
    description: "Изучите основы программирования с нуля",
    lessons: [
      {
        id: "1",
        title: "Введение в программирование",
        description: "Что такое программирование и зачем оно нужно",
        videoId: "3BStvUEDbuDobFBXhb2Fyf",
      },
      {
        id: "2",
        title: "Переменные и типы данных",
        description: "Изучаем основные типы данных",
        videoId: "3BStvUEDbuDobFBXhb2Fyf",
      },
      {
        id: "3",
        title: "Условные операторы",
        description: "Учимся использовать if/else",
        videoId: "3BStvUEDbuDobFBXhb2Fyf",
      },
      {
        id: "4",
        title: "Циклы",
        description: "Как повторять действия в коде",
        videoId: "3BStvUEDbuDobFBXhb2Fyf",
      },
      {
        id: "5",
        title: "Функции",
        description: "Создание переиспользуемого кода",
        videoId: "3BStvUEDbuDobFBXhb2Fyf",
      },
    ],
  },
  "2": {
    id: "2",
    title: "Веб-разработка",
    description: "Создание современных веб-приложений",
    lessons: [
      {
        id: "1",
        title: "HTML основы",
        description: "Структура веб-страницы",
        videoId: "3BStvUEDbuDobFBXhb2Fyf",
      },
      {
        id: "2",
        title: "CSS стилизация",
        description: "Оформление веб-страниц",
        videoId: "3BStvUEDbuDobFBXhb2Fyf",
      },
      {
        id: "3",
        title: "JavaScript основы",
        description: "Интерактивность на странице",
        videoId: "3BStvUEDbuDobFBXhb2Fyf",
      },
      {
        id: "4",
        title: "React введение",
        description: "Современная библиотека для UI",
        videoId: "3BStvUEDbuDobFBXhb2Fyf",
      },
      {
        id: "5",
        title: "Деплой приложения",
        description: "Публикация проекта в интернет",
        videoId: "3BStvUEDbuDobFBXhb2Fyf",
      },
    ],
  },
};

interface CoursePageProps {
  params: Promise<{ courseId: string }>;
}

export default async function CoursePage({ params }: CoursePageProps) {
  const { courseId } = await params;
  const course = coursesData[courseId as keyof typeof coursesData];

  if (!course) {
    notFound();
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
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
                  <BreadcrumbPage>{course.title}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div>
            <h1 className="text-3xl font-bold mb-2">{course.title}</h1>
            <p className="text-muted-foreground">{course.description}</p>
          </div>

          <div className="grid gap-4">
            <h2 className="text-xl font-semibold">Занятия</h2>
            {course.lessons.map((lesson, index) => (
              <Link
                key={lesson.id}
                href={`/courses/${courseId}/lessons/${lesson.id}`}
              >
                <Card className="hover:border-primary transition-colors cursor-pointer">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                        <PlayCircle className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-lg">
                          {index + 1}. {lesson.title}
                        </CardTitle>
                        <CardDescription>{lesson.description}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
