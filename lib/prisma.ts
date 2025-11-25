import { PrismaClient } from "@prisma/client";

const prismaClientSingleton = () => {
  // Используем dummy URL если DATABASE_URL не установлен (для build time)
  const databaseUrl = process.env.DATABASE_URL || "postgresql://dummy:dummy@localhost:5432/dummy?schema=public";

  return new PrismaClient({
    datasources: {
      db: {
        url: databaseUrl,
      },
    },
    log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  });
};

declare const globalThis: {
  prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== "production") globalThis.prismaGlobal = prisma;
