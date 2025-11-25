import { getCurrentUser } from "@/lib/auth-helpers";

export default async function TeacherPage() {
  const user = await getCurrentUser();

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="mx-auto max-w-7xl">
        <h1 className="text-4xl font-bold mb-4">Кабинет преподавателя</h1>
        <p className="text-muted-foreground mb-8">
          Добро пожаловать, {user?.name}!
        </p>

        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-lg border bg-card p-6">
            <h3 className="text-lg font-semibold mb-2">Мои курсы</h3>
            <p className="text-sm text-muted-foreground">
              Управление вашими курсами
            </p>
          </div>

          <div className="rounded-lg border bg-card p-6">
            <h3 className="text-lg font-semibold mb-2">Студенты</h3>
            <p className="text-sm text-muted-foreground">
              Список студентов и их прогресс
            </p>
          </div>

          <div className="rounded-lg border bg-card p-6">
            <h3 className="text-lg font-semibold mb-2">Задания</h3>
            <p className="text-sm text-muted-foreground">
              Проверка домашних заданий
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
