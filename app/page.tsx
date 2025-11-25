import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { auth } from "@/lib/auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut } from "lucide-react";
import { SignOutButton } from "@/components/sign-out-button";

export default async function Home() {
  const session = await auth();

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link href="/" className="text-xl font-bold">
            LMS
          </Link>
          <div className="flex items-center gap-4">
            {session?.user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={session.user.image || ""} />
                      <AvatarFallback>
                        {session.user.name?.charAt(0) || "U"}
                      </AvatarFallback>
                    </Avatar>
                    <span>{session.user.name}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>
                    {session.user.email}
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/courses">Панель управления</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <SignOutButton />
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Button variant="outline" asChild>
                  <Link href="/login">Вход</Link>
                </Button>
                <Button asChild>
                  <Link href="/signup">Регистрация</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-24">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="mb-6 text-5xl font-bold tracking-tight">
            Платформа для онлайн обучения
          </h1>
          <p className="mb-8 text-xl text-muted-foreground">
            Создавайте курсы, проводите уроки с видео, проверяйте задания и отслеживайте прогресс студентов
          </p>
          <div className="flex justify-center gap-4">
            <Button size="lg" asChild>
              <Link href="/signup">Начать обучение</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/login">Войти</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="border-t bg-muted/50 py-24">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-3xl font-bold">
            Возможности платформы
          </h2>
          <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-3">
            <Card className="p-6">
              <h3 className="mb-2 text-xl font-semibold">Видео уроки</h3>
              <p className="text-muted-foreground">
                Загружайте и стримьте видео уроки с отслеживанием прогресса просмотра
              </p>
            </Card>
            <Card className="p-6">
              <h3 className="mb-2 text-xl font-semibold">Домашние задания</h3>
              <p className="text-muted-foreground">
                Создавайте задания, проверяйте работы студентов и выставляйте оценки
              </p>
            </Card>
            <Card className="p-6">
              <h3 className="mb-2 text-xl font-semibold">Тесты и сертификаты</h3>
              <p className="text-muted-foreground">
                Проводите тестирование и выдавайте сертификаты об окончании курсов
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>&copy; 2025 LMS. Все права защищены.</p>
        </div>
      </footer>
    </div>
  );
}
