import { PrismaClient } from "@/generated/prisma/client";
import { join } from "path";

const globalForPrisma = globalThis as typeof globalThis & {
  prisma?: PrismaClient;
};

// Устанавливаем путь к Query Engine для Netlify через переменную окружения
// Это нужно для того, чтобы Prisma мог найти engine на Netlify
if (
  process.env.NODE_ENV === "production" &&
  !process.env.PRISMA_QUERY_ENGINE_LIBRARY
) {
  const enginePath = join(
    process.cwd(),
    "src/generated/prisma/libquery_engine-rhel-openssl-3.0.x.so.node"
  );
  // Устанавливаем переменную окружения для Prisma
  process.env.PRISMA_QUERY_ENGINE_LIBRARY = enginePath;
}

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
