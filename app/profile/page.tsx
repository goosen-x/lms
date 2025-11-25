import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ProfileForm } from "./profile-form";
import { PasswordForm } from "./password-form";
import { DeleteAccount } from "./delete-account";

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
            <ProfileForm
              defaultName={user.name || ""}
              email={user.email || ""}
              role={user.role || "STUDENT"}
            />
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
            <PasswordForm />
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
            <DeleteAccount />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
