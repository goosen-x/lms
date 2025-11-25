"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { deleteAccount } from "./actions";
import { signOut } from "next-auth/react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export function DeleteAccount() {
  const [isPending, startTransition] = useTransition();
  const [message, setMessage] = useState<string | null>(null);

  const handleDelete = () => {
    startTransition(async () => {
      const result = await deleteAccount();

      if (result.error) {
        setMessage(result.error);
      } else if (result.success) {
        // Выходим из системы и редиректим
        await signOut({ callbackUrl: "/" });
      }
    });
  };

  return (
    <div className="flex items-center justify-between">
      <div>
        <p className="font-medium">Удалить аккаунт</p>
        <p className="text-sm text-muted-foreground">
          Все ваши данные будут безвозвратно удалены
        </p>
        {message && (
          <p className="mt-2 text-sm text-destructive">{message}</p>
        )}
      </div>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="destructive" disabled={isPending}>
            {isPending ? "Удаление..." : "Удалить аккаунт"}
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Вы уверены?</AlertDialogTitle>
            <AlertDialogDescription>
              Это действие нельзя отменить. Все ваши данные, включая курсы, задания,
              прогресс и сертификаты будут безвозвратно удалены.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Отмена</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Да, удалить аккаунт
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
