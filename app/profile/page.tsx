import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

export default async function ProfilePage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  const user = session.user;

  return (
    <div className="container mx-auto max-w-4xl py-8 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Профиль</h1>
        <p className="text-muted-foreground">
          Управляйте своим профилем и настройками
        </p>
      </div>

      <div className="grid gap-6">
        {/* Основная информация */}
        <Card>
          <CardHeader>
            <CardTitle>Основная информация</CardTitle>
            <CardDescription>
              Обновите свою личную информацию
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Аватар */}
            <div className="flex items-center gap-4">
              <Avatar className="h-20 w-20">
                <AvatarImage src={user.image || ""} />
                <AvatarFallback className="text-2xl">
                  {user.name?.charAt(0) || "U"}
                </AvatarFallback>
              </Avatar>
              <div>
                <Button variant="outline" size="sm">
                  Изменить фото
                </Button>
                <p className="mt-2 text-sm text-muted-foreground">
                  JPG, PNG. Макс 2MB
                </p>
              </div>
            </div>

            <Separator />

            {/* Форма */}
            <form className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Имя</Label>
                <Input
                  id="name"
                  defaultValue={user.name || ""}
                  placeholder="Введите ваше имя"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  defaultValue={user.email || ""}
                  placeholder="email@example.com"
                  disabled
                />
                <p className="text-sm text-muted-foreground">
                  Email нельзя изменить
                </p>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="role">Роль</Label>
                <Input
                  id="role"
                  defaultValue={user.role || "STUDENT"}
                  disabled
                />
                <p className="text-sm text-muted-foreground">
                  {user.role === "ADMIN" && "Администратор системы"}
                  {user.role === "TEACHER" && "Преподаватель"}
                  {user.role === "STUDENT" && "Студент"}
                </p>
              </div>

              <div className="flex gap-4">
                <Button type="submit">Сохранить изменения</Button>
                <Button type="button" variant="outline">
                  Отмена
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Смена пароля */}
        <Card>
          <CardHeader>
            <CardTitle>Безопасность</CardTitle>
            <CardDescription>
              Измените свой пароль для повышения безопасности
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="current-password">Текущий пароль</Label>
                <Input
                  id="current-password"
                  type="password"
                  placeholder="Введите текущий пароль"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="new-password">Новый пароль</Label>
                <Input
                  id="new-password"
                  type="password"
                  placeholder="Введите новый пароль"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="confirm-password">Подтвердите пароль</Label>
                <Input
                  id="confirm-password"
                  type="password"
                  placeholder="Повторите новый пароль"
                />
              </div>

              <Button type="submit">Изменить пароль</Button>
            </form>
          </CardContent>
        </Card>

        {/* Опасная зона */}
        <Card className="border-destructive">
          <CardHeader>
            <CardTitle className="text-destructive">Опасная зона</CardTitle>
            <CardDescription>
              Необратимые действия с вашим аккаунтом
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Удалить аккаунт</p>
                <p className="text-sm text-muted-foreground">
                  Все ваши данные будут безвозвратно удалены
                </p>
              </div>
              <Button variant="destructive">Удалить аккаунт</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
