import { PrismaClient } from "@/generated/prisma/client";
import { join } from "path";
import { existsSync } from "fs";

const globalForPrisma = globalThis as typeof globalThis & {
  prisma?: PrismaClient;
};

// Set path to Query Engine for Netlify only if file exists
// This is needed so Prisma can find engine on Netlify
// Do NOT set during postinstall, only during runtime
if (
  process.env.NODE_ENV === "production" &&
  !process.env.PRISMA_QUERY_ENGINE_LIBRARY
) {
  const enginePath = join(
    process.cwd(),
    "src/generated/prisma/libquery_engine-rhel-openssl-3.0.x.so.node"
  );
  // Set environment variable only if file exists
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
