import { getCurrentUser } from "@/lib/auth-helpers";

export default async function StudentPage() {
  const user = await getCurrentUser();

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="mx-auto max-w-7xl">
        <h1 className="text-4xl font-bold mb-4">Мои курсы</h1>
        <p className="text-muted-foreground mb-8">
          Добро пожаловать, {user?.name}!
        </p>

        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-lg border bg-card p-6">
            <h3 className="text-lg font-semibold mb-2">Активные курсы</h3>
            <p className="text-sm text-muted-foreground">
              Курсы, на которые вы записаны
            </p>
          </div>

          <div className="rounded-lg border bg-card p-6">
            <h3 className="text-lg font-semibold mb-2">Прогресс</h3>
            <p className="text-sm text-muted-foreground">
              Ваш прогресс обучения
            </p>
          </div>

          <div className="rounded-lg border bg-card p-6">
            <h3 className="text-lg font-semibold mb-2">Сертификаты</h3>
            <p className="text-sm text-muted-foreground">
              Полученные сертификаты
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
