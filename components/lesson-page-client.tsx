"use client";

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
import { ChevronLeft, ChevronRight, Download, FileText, PanelRightClose, PanelRightOpen } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { useState, useEffect } from "react";

interface Lesson {
  id: string;
  title: string;
  description: string;
  videoId: string;
  summary: string;
  materials?: Array<{
    name: string;
    url: string;
    size: string;
  }>;
}

interface Course {
  id: string;
  title: string;
  lessons: Lesson[];
}

interface LessonPageClientProps {
  courseId: string;
  lessonId: string;
  course: Course;
  lesson: Lesson;
  prevLesson: Lesson | null;
  nextLesson: Lesson | null;
}

export function LessonPageClient({
  courseId,
  lessonId,
  course,
  lesson,
  prevLesson,
  nextLesson,
}: LessonPageClientProps) {
  const [isRightSidebarOpen, setIsRightSidebarOpen] = useState(false);

  // Открываем сайдбар на больших экранах при монтировании
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsRightSidebarOpen(true);
      } else {
        setIsRightSidebarOpen(false);
      }
    };

    // Устанавливаем начальное состояние
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="flex-row">
        <div className="flex-1 flex flex-col">
          <header className="flex h-16 shrink-0 items-center gap-2">
            <div className="flex items-center justify-between gap-2 px-4 w-full">
              <div className="flex items-center gap-2">
                <SidebarTrigger className="-ml-1" />
                <Separator
                  orientation="vertical"
                  className="mr-2 data-[orientation=vertical]:h-4"
                />
                <Breadcrumb>
                  <BreadcrumbList>
                    <BreadcrumbItem className="hidden md:block">
                      <BreadcrumbLink href="/courses">Курсы</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator className="hidden md:block" />
                    <BreadcrumbItem className="hidden md:block">
                      <BreadcrumbLink href={`/courses/${courseId}`}>
                        {course.title}
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator className="hidden md:block" />
                    <BreadcrumbItem>
                      <BreadcrumbPage>{lesson.title}</BreadcrumbPage>
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsRightSidebarOpen(!isRightSidebarOpen)}
                className="ml-auto"
              >
                {isRightSidebarOpen ? (
                  <PanelRightClose className="h-4 w-4" />
                ) : (
                  <PanelRightOpen className="h-4 w-4" />
                )}
              </Button>
            </div>
          </header>
          <div className="flex flex-1 flex-col gap-4 p-2 sm:p-4 pt-0">
            <div className="max-w-7xl mx-auto w-full">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold mb-2">{lesson.title}</h1>
                <p className="text-sm md:text-base text-muted-foreground">{lesson.description}</p>
              </div>

              <VideoPlayer videoId={lesson.videoId} />

              <Tabs defaultValue="summary" className="mt-6">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="summary" className="gap-2">
                    <FileText className="h-4 w-4" />
                    <span className="hidden sm:inline">Конспект</span>
                  </TabsTrigger>
                  <TabsTrigger value="materials" className="gap-2">
                    <Download className="h-4 w-4" />
                    <span className="hidden sm:inline">Материалы</span>
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

              <div className="flex justify-between items-center mt-4 gap-2">
                {prevLesson ? (
                  <Button variant="outline" asChild className="gap-2">
                    <Link href={`/courses/${courseId}/lessons/${prevLesson.id}`}>
                      <ChevronLeft className="h-4 w-4" />
                      <span className="hidden sm:inline">Предыдущее</span>
                    </Link>
                  </Button>
                ) : (
                  <div />
                )}

                {nextLesson ? (
                  <Button asChild className="gap-2">
                    <Link href={`/courses/${courseId}/lessons/${nextLesson.id}`}>
                      <span className="hidden sm:inline">Следующее</span>
                      <ChevronRight className="h-4 w-4" />
                    </Link>
                  </Button>
                ) : (
                  <Button variant="outline" asChild>
                    <Link href={`/courses/${courseId}`}>
                      <span className="hidden sm:inline">Вернуться к курсу</span>
                      <span className="sm:hidden">К курсу</span>
                    </Link>
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
        {isRightSidebarOpen && (
          <div className="hidden lg:block">
            <LessonsSidebar
              courseId={courseId}
              lessons={course.lessons}
              currentLessonId={lessonId}
              courseTitle={course.title}
            />
          </div>
        )}
      </SidebarInset>
      {isRightSidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 z-50 bg-background/80 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setIsRightSidebarOpen(false)}
        >
          <div
            className="fixed right-0 top-0 h-full w-80 max-w-[85vw] bg-background shadow-lg border-l animate-in slide-in-from-right duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="font-semibold">Уроки</h3>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsRightSidebarOpen(false)}
              >
                <PanelRightClose className="h-4 w-4" />
              </Button>
            </div>
            <LessonsSidebar
              courseId={courseId}
              lessons={course.lessons}
              currentLessonId={lessonId}
              courseTitle={course.title}
            />
          </div>
        </div>
      )}
    </SidebarProvider>
  );
}
