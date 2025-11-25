import { auth } from "./auth";
import { UserRole } from "@prisma/client";

export async function getCurrentUser() {
  const session = await auth();
  return session?.user;
}

export async function requireAuth() {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error("Необходима авторизация");
  }
  return user;
}

export async function requireRole(roles: UserRole | UserRole[]) {
  const user = await requireAuth();
  const allowedRoles = Array.isArray(roles) ? roles : [roles];

  if (!allowedRoles.includes(user.role)) {
    throw new Error("Недостаточно прав");
  }

  return user;
}

export async function isAdmin() {
  const user = await getCurrentUser();
  return user?.role === UserRole.ADMIN;
}

export async function isTeacher() {
  const user = await getCurrentUser();
  return user?.role === UserRole.TEACHER || user?.role === UserRole.ADMIN;
}

export async function isStudent() {
  const user = await getCurrentUser();
  return user?.role === UserRole.STUDENT;
}
