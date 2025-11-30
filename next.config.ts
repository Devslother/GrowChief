import type { NextConfig } from "next";
import withSvgr from "next-svgr";
import { copyFileSync, existsSync, mkdirSync } from "fs";
import { join } from "path";

const nextConfig: NextConfig = {
  turbopack: {},
  images: {
    domains: [],
  },
  // Оптимизация для production
  compress: true,
  poweredByHeader: false,
  // Включаем Prisma Query Engine в сборку для Netlify
  webpack: (config, { isServer }) => {
    if (isServer) {
      // Копируем Prisma Query Engine после сборки
      const originalEntry = config.entry;
      config.entry = async () => {
        const entries = await originalEntry();

        // Копируем engine после того, как webpack соберет все
        if (process.env.NODE_ENV === "production") {
          const enginePath = join(
            process.cwd(),
            "src/generated/prisma/libquery_engine-rhel-openssl-3.0.x.so.node"
          );
          const outputPath = join(process.cwd(), ".next/server/chunks");

          if (existsSync(enginePath)) {
            if (!existsSync(outputPath)) {
              mkdirSync(outputPath, { recursive: true });
            }
            try {
              copyFileSync(
                enginePath,
                join(outputPath, "libquery_engine-rhel-openssl-3.0.x.so.node")
              );
            } catch (error) {
              console.error("Failed to copy Prisma engine in webpack:", error);
            }
          }
        }

        return entries;
      };
    }
    return config;
  },
};

export default withSvgr(nextConfig);
