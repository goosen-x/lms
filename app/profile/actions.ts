"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";

export async function updateProfile(formData: FormData) {
  const session = await auth();

  if (!session?.user?.id) {
    return { error: "Не авторизован" };
  }

  const name = formData.get("name") as string;

  if (!name || name.trim().length === 0) {
    return { error: "Имя не может быть пустым" };
  }

  try {
    await prisma.user.update({
      where: { id: session.user.id },
      data: { name: name.trim() },
    });

    revalidatePath("/profile");
    return { success: "Профиль обновлен" };
  } catch (error) {
    console.error("Error updating profile:", error);
    return { error: "Ошибка при обновлении профиля" };
  }
}

export async function changePassword(formData: FormData) {
  const session = await auth();

  if (!session?.user?.id) {
    return { error: "Не авторизован" };
  }

  const currentPassword = formData.get("currentPassword") as string;
  const newPassword = formData.get("newPassword") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  if (!currentPassword || !newPassword || !confirmPassword) {
    return { error: "Все поля обязательны" };
  }

  if (newPassword !== confirmPassword) {
    return { error: "Новые пароли не совпадают" };
  }

  if (newPassword.length < 6) {
    return { error: "Пароль должен быть минимум 6 символов" };
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { password: true },
    });

    if (!user?.password) {
      return { error: "Пользователь не найден или использует OAuth" };
    }

    const isCorrectPassword = await bcrypt.compare(
      currentPassword,
      user.password
    );

    if (!isCorrectPassword) {
      return { error: "Неверный текущий пароль" };
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await prisma.user.update({
      where: { id: session.user.id },
      data: { password: hashedPassword },
    });

    return { success: "Пароль успешно изменен" };
  } catch (error) {
    console.error("Error changing password:", error);
    return { error: "Ошибка при смене пароля" };
  }
}

export async function deleteAccount() {
  const session = await auth();

  if (!session?.user?.id) {
    return { error: "Не авторизован" };
  }

  try {
    // Удаляем пользователя (каскадное удаление настроено в Prisma)
    await prisma.user.delete({
      where: { id: session.user.id },
    });

    return { success: "Аккаунт удален", redirect: "/" };
  } catch (error) {
    console.error("Error deleting account:", error);
    return { error: "Ошибка при удалении аккаунта" };
  }
}
