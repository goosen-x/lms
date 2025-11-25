"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { CheckCircle2, Circle, PlayCircle } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Lesson {
  id: string;
  title: string;
  description: string;
  videoId: string;
}

interface LessonsSidebarProps {
  courseId: string;
  lessons: Lesson[];
  currentLessonId: string;
  courseTitle: string;
}

export function LessonsSidebar({
  courseId,
  lessons,
  currentLessonId,
  courseTitle,
}: LessonsSidebarProps) {
  const [completedLessons, setCompletedLessons] = useState<Set<string>>(
    new Set()
  );

  // Загружаем прогресс из localStorage
  useEffect(() => {
    const saved = localStorage.getItem(`course-${courseId}-progress`);
    if (saved) {
      setCompletedLessons(new Set(JSON.parse(saved)));
    }
  }, [courseId]);

  // Автоматически отмечаем текущий урок как завершенный через 5 секунд
  useEffect(() => {
    const timer = setTimeout(() => {
      const newCompleted = new Set(completedLessons);
      newCompleted.add(currentLessonId);
      setCompletedLessons(newCompleted);
      localStorage.setItem(
        `course-${courseId}-progress`,
        JSON.stringify(Array.from(newCompleted))
      );
    }, 5000);

    return () => clearTimeout(timer);
  }, [currentLessonId, courseId, completedLessons]);

  const completedCount = completedLessons.size;
  const totalCount = lessons.length;
  const progress = Math.round((completedCount / totalCount) * 100);

  return (
    <div className="flex h-full w-80 flex-col border-l bg-background">
      <div className="border-b p-4">
        <h3 className="font-semibold mb-2">{courseTitle}</h3>
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Прогресс курса</span>
            <span>
              {completedCount} / {totalCount}
            </span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
            <div
              className="h-full bg-primary transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-4 space-y-2">
          {lessons.map((lesson, index) => {
            const isCompleted = completedLessons.has(lesson.id);
            const isCurrent = lesson.id === currentLessonId;

            return (
              <Link
                key={lesson.id}
                href={`/courses/${courseId}/lessons/${lesson.id}`}
                className={cn(
                  "flex items-start gap-3 rounded-lg p-3 transition-colors hover:bg-accent",
                  isCurrent && "bg-accent"
                )}
              >
                <div className="mt-0.5">
                  {isCompleted ? (
                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                  ) : isCurrent ? (
                    <PlayCircle className="h-5 w-5 text-primary" />
                  ) : (
                    <Circle className="h-5 w-5 text-muted-foreground" />
                  )}
                </div>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">
                      {index + 1}
                    </span>
                    <h4
                      className={cn(
                        "text-sm font-medium leading-none",
                        isCurrent && "text-primary"
                      )}
                    >
                      {lesson.title}
                    </h4>
                  </div>
                  <p className="text-xs text-muted-foreground line-clamp-2">
                    {lesson.description}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </ScrollArea>
    </div>
  );
}
