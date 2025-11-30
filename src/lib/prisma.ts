import { PrismaClient } from "@/generated/prisma/client";

const globalForPrisma = globalThis as typeof globalThis & {
  prisma?: PrismaClient;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log:
      process.env.NODE_ENV === "development"
        ? ["query", "warn", "error"]
        : ["error"],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

// Проверка подключения к базе данных при инициализации
if (process.env.NODE_ENV === "development" && !process.env.DATABASE_URL) {
  console.warn("⚠️  DATABASE_URL is not set. Prisma will fail to connect.");
}
