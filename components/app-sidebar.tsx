"use client"

import * as React from "react"
import { useSession } from "next-auth/react"
import {
  Award,
  BarChart3,
  Bell,
  BookOpen,
  ClipboardCheck,
  ClipboardList,
  Command,
  FileQuestion,
  FileText,
  GraduationCap,
  HelpCircle,
  Home,
  LayoutDashboard,
  Library,
  LineChart,
  Settings,
  TrendingUp,
  User,
  Users,
  Video,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

const navigationByRole = {
  ADMIN: {
    navMain: [
      {
        title: "Панель управления",
        url: "/admin",
        icon: LayoutDashboard,
        isActive: true,
      },
      {
        title: "Пользователи",
        url: "/admin/users",
        icon: Users,
        items: [
          { title: "Все пользователи", url: "/admin/users" },
          { title: "Администраторы", url: "/admin/users/admins" },
          { title: "Преподаватели", url: "/admin/users/teachers" },
          { title: "Студенты", url: "/admin/users/students" },
        ],
      },
      {
        title: "Курсы",
        url: "/admin/courses",
        icon: BookOpen,
        items: [
          { title: "Все курсы", url: "/admin/courses" },
          { title: "Опубликованные", url: "/admin/courses/published" },
          { title: "Черновики", url: "/admin/courses/drafts" },
          { title: "Архивные", url: "/admin/courses/archived" },
        ],
      },
      {
        title: "Видеобиблиотека",
        url: "/admin/videos",
        icon: Video,
      },
      {
        title: "Сертификаты",
        url: "/admin/certificates",
        icon: Award,
      },
      {
        title: "Аналитика",
        url: "/admin/analytics",
        icon: BarChart3,
        items: [
          { title: "Общая статистика", url: "/admin/analytics" },
          { title: "События", url: "/admin/analytics/events" },
          { title: "Отчеты", url: "/admin/analytics/reports" },
        ],
      },
    ],
    navSecondary: [
      {
        title: "Настройки",
        url: "/admin/settings",
        icon: Settings,
      },
      {
        title: "Поддержка",
        url: "/support",
        icon: HelpCircle,
      },
    ],
  },
  TEACHER: {
    navMain: [
      {
        title: "Моя панель",
        url: "/teacher",
        icon: LayoutDashboard,
        isActive: true,
      },
      {
        title: "Мои курсы",
        url: "/teacher/courses",
        icon: BookOpen,
        items: [
          { title: "Все курсы", url: "/teacher/courses" },
          { title: "Создать курс", url: "/teacher/courses/new" },
          { title: "Опубликованные", url: "/teacher/courses/published" },
          { title: "Черновики", url: "/teacher/courses/drafts" },
        ],
      },
      {
        title: "Уроки",
        url: "/teacher/lessons",
        icon: GraduationCap,
      },
      {
        title: "Домашние задания",
        url: "/teacher/assignments",
        icon: ClipboardList,
        items: [
          { title: "Все задания", url: "/teacher/assignments" },
          { title: "На проверке", url: "/teacher/assignments/pending" },
          { title: "Проверенные", url: "/teacher/assignments/graded" },
        ],
      },
      {
        title: "Тесты",
        url: "/teacher/tests",
        icon: FileQuestion,
        items: [
          { title: "Все тесты", url: "/teacher/tests" },
          { title: "Создать тест", url: "/teacher/tests/new" },
          { title: "Результаты", url: "/teacher/tests/results" },
        ],
      },
      {
        title: "Студенты",
        url: "/teacher/students",
        icon: Users,
      },
      {
        title: "Мои видео",
        url: "/teacher/videos",
        icon: Video,
      },
      {
        title: "Аналитика",
        url: "/teacher/analytics",
        icon: LineChart,
      },
    ],
    navSecondary: [
      {
        title: "Поддержка",
        url: "/support",
        icon: HelpCircle,
      },
    ],
  },
  STUDENT: {
    navMain: [
      {
        title: "Главная",
        url: "/student",
        icon: Home,
        isActive: true,
      },
      {
        title: "Мои курсы",
        url: "/student/courses",
        icon: BookOpen,
        items: [
          { title: "Активные", url: "/student/courses" },
          { title: "Завершенные", url: "/student/courses/completed" },
          { title: "Прогресс", url: "/student/courses/progress" },
        ],
      },
      {
        title: "Каталог курсов",
        url: "/student/catalog",
        icon: Library,
      },
      {
        title: "Домашние задания",
        url: "/student/assignments",
        icon: ClipboardCheck,
        items: [
          { title: "Активные", url: "/student/assignments" },
          { title: "Сданные", url: "/student/assignments/submitted" },
          { title: "Оцененные", url: "/student/assignments/graded" },
        ],
      },
      {
        title: "Тесты",
        url: "/student/tests",
        icon: FileText,
        items: [
          { title: "Доступные", url: "/student/tests" },
          { title: "Результаты", url: "/student/tests/results" },
        ],
      },
      {
        title: "Сертификаты",
        url: "/student/certificates",
        icon: Award,
      },
      {
        title: "Мой прогресс",
        url: "/student/progress",
        icon: TrendingUp,
      },
    ],
    navSecondary: [
      {
        title: "Уведомления",
        url: "/notifications",
        icon: Bell,
      },
      {
        title: "Поддержка",
        url: "/support",
        icon: HelpCircle,
      },
    ],
  },
}

// Общие разделы для всех ролей
const commonNavigation = {
  navSecondary: [
    {
      title: "Профиль",
      url: "/profile",
      icon: User,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: session } = useSession()

  const user = session?.user ? {
    name: session.user.name || "Пользователь",
    email: session.user.email || "",
    avatar: session.user.image || "",
  } : {
    name: "Гость",
    email: "guest@example.com",
    avatar: "",
  }

  // Получаем роль пользователя
  const userRole = session?.user?.role || "STUDENT"

  // Выбираем навигацию в зависимости от роли
  const roleNavigation = navigationByRole[userRole] || navigationByRole.STUDENT

  // Объединяем специфичную и общую навигацию
  const navSecondary = [
    ...roleNavigation.navSecondary,
    ...commonNavigation.navSecondary,
  ]

  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="/">
                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <Command className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">LMS</span>
                  <span className="truncate text-xs">Платформа обучения</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={roleNavigation.navMain} />
        <NavSecondary items={navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
    </Sidebar>
  )
}
