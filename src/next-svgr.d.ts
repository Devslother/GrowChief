declare module "next-svgr" {
  import type { NextConfig } from "next";
  
  function withSvgr(nextConfig: NextConfig): NextConfig;
  
  export default withSvgr;
}

