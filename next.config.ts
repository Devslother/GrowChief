import type { NextConfig } from "next";
import withSvgr from "next-svgr";
import createMDX from "@next/mdx";
import { copyFileSync, existsSync, mkdirSync } from "fs";
import { join } from "path";

const withMDX = createMDX({
  options: {
    providerImportSource: undefined,
  },
});

const nextConfig: NextConfig = {
  // Configure `pageExtensions` to include markdown and MDX files
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
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

    // Настраиваем resolve для поддержки алиаса @/ в динамических импортах
    config.resolve = config.resolve || {};
    config.resolve.alias = {
      ...config.resolve.alias,
      "@": join(process.cwd(), "src"),
    };

    return config;
  },
};

// Wrap MDX and SVGR configs together
export default withSvgr(withMDX(nextConfig));
