import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth-helpers";
import { UserRole } from "@prisma/client";

interface AuthGuardProps {
  children: React.ReactNode;
  allowedRoles?: UserRole[];
  redirectTo?: string;
}

export async function AuthGuard({
  children,
  allowedRoles,
  redirectTo = "/login",
}: AuthGuardProps) {
  const user = await getCurrentUser();

  // Если пользователь не авторизован
  if (!user) {
    redirect(redirectTo);
  }

  // Если указаны разрешённые роли, проверяем
  if (allowedRoles && allowedRoles.length > 0) {
    if (!allowedRoles.includes(user.role)) {
      // Перенаправляем в зависимости от роли
      if (user.role === UserRole.ADMIN) {
        redirect("/admin");
      } else if (user.role === UserRole.TEACHER) {
        redirect("/teacher");
      } else {
        redirect("/student");
      }
    }
  }

  return <>{children}</>;
}
