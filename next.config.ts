import type { NextConfig } from "next";
import withSvgr from "next-svgr";

const nextConfig: NextConfig = {
  turbopack: {},
  images: {
    domains: [],
  },
  // Оптимизация для production
  compress: true,
  poweredByHeader: false,
};

export default withSvgr(nextConfig);
