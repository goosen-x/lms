import { getCurrentUser } from "@/lib/auth-helpers";

export default async function AdminPage() {
  const user = await getCurrentUser();

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="mx-auto max-w-7xl">
        <h1 className="text-4xl font-bold mb-4">Панель администратора</h1>
        <p className="text-muted-foreground mb-8">
          Добро пожаловать, {user?.name}!
        </p>

        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-lg border bg-card p-6">
            <h3 className="text-lg font-semibold mb-2">Пользователи</h3>
            <p className="text-sm text-muted-foreground">
              Управление пользователями системы
            </p>
          </div>

          <div className="rounded-lg border bg-card p-6">
            <h3 className="text-lg font-semibold mb-2">Курсы</h3>
            <p className="text-sm text-muted-foreground">
              Просмотр всех курсов в системе
            </p>
          </div>

          <div className="rounded-lg border bg-card p-6">
            <h3 className="text-lg font-semibold mb-2">Аналитика</h3>
            <p className="text-sm text-muted-foreground">
              Статистика и отчёты
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
