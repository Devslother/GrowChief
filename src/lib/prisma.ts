import { PrismaClient } from "@/generated/prisma/client";
import { join } from "path";
import { existsSync } from "fs";

const globalForPrisma = globalThis as typeof globalThis & {
  prisma?: PrismaClient;
};

// Устанавливаем путь к Query Engine для Netlify только если файл существует
// Это нужно для того, чтобы Prisma мог найти engine на Netlify
// НЕ устанавливаем во время postinstall, только во время runtime
if (
  process.env.NODE_ENV === "production" &&
  !process.env.PRISMA_QUERY_ENGINE_LIBRARY
) {
  const enginePath = join(
    process.cwd(),
    "src/generated/prisma/libquery_engine-rhel-openssl-3.0.x.so.node"
  );
  // Устанавливаем переменную окружения только если файл существует
  if (existsSync(enginePath)) {
    process.env.PRISMA_QUERY_ENGINE_LIBRARY = enginePath;
  }
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
