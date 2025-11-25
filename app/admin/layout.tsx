import { AuthGuard } from "@/components/auth/auth-guard";
import { UserRole } from "@prisma/client";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AuthGuard allowedRoles={[UserRole.ADMIN]}>{children}</AuthGuard>;
}
