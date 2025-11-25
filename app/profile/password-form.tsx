"use client";

import { useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { changePassword } from "./actions";
import { toast } from "sonner";

export function PasswordForm() {
  const [isPending, startTransition] = useTransition();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    startTransition(async () => {
      const result = await changePassword(formData);

      if (result.error) {
        toast.error(result.error);
      } else if (result.success) {
        toast.success(result.success);
        e.currentTarget.reset();
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-2">
        <Label htmlFor="currentPassword">Текущий пароль</Label>
        <Input
          id="currentPassword"
          name="currentPassword"
          type="password"
          placeholder="Введите текущий пароль"
          disabled={isPending}
          required
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="newPassword">Новый пароль</Label>
        <Input
          id="newPassword"
          name="newPassword"
          type="password"
          placeholder="Введите новый пароль"
          disabled={isPending}
          required
          minLength={6}
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="confirmPassword">Подтвердите пароль</Label>
        <Input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          placeholder="Повторите новый пароль"
          disabled={isPending}
          required
          minLength={6}
        />
      </div>

      <Button type="submit" disabled={isPending}>
        {isPending ? "Изменение..." : "Изменить пароль"}
      </Button>
    </form>
  );
}
