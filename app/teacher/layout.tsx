import { AuthGuard } from "@/components/auth/auth-guard";
import { UserRole } from "@prisma/client";

export default function TeacherLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard allowedRoles={[UserRole.TEACHER, UserRole.ADMIN]}>
      {children}
    </AuthGuard>
  );
}
