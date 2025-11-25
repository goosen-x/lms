import { AuthGuard } from "@/components/auth/auth-guard";

export default function CoursesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AuthGuard>{children}</AuthGuard>;
}
