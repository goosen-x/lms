"use client";

import { useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { updateProfile } from "./actions";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface ProfileFormProps {
  defaultName: string;
  email: string;
  role: string;
}

export function ProfileForm({ defaultName, email, role }: ProfileFormProps) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    startTransition(async () => {
      const result = await updateProfile(formData);

      if (result.error) {
        toast.error(result.error);
      } else if (result.success) {
        toast.success(result.success);
        router.refresh();
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-2">
        <Label htmlFor="name">Имя</Label>
        <Input
          id="name"
          name="name"
          defaultValue={defaultName}
          placeholder="Введите ваше имя"
          disabled={isPending}
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          value={email}
          disabled
        />
        <p className="text-sm text-muted-foreground">
          Email нельзя изменить
        </p>
      </div>

      <div className="grid gap-2">
        <Label htmlFor="role">Роль</Label>
        <Input
          id="role"
          value={role}
          disabled
        />
        <p className="text-sm text-muted-foreground">
          {role === "ADMIN" && "Администратор системы"}
          {role === "TEACHER" && "Преподаватель"}
          {role === "STUDENT" && "Студент"}
        </p>
      </div>

      <div className="flex gap-4">
        <Button type="submit" disabled={isPending}>
          {isPending ? "Сохранение..." : "Сохранить изменения"}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => router.back()}
          disabled={isPending}
        >
          Отмена
        </Button>
      </div>
    </form>
  );
}
