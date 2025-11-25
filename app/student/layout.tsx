import { AuthGuard } from "@/components/auth/auth-guard";
import { UserRole } from "@prisma/client";

export default function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AuthGuard allowedRoles={[UserRole.STUDENT]}>{children}</AuthGuard>;
}
