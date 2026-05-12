import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // If it's top level in Next.js 16.2.4:
  // allowedDevOrigins is actually experimental or top level. Next 15 had it in experimental.
  // Next.js 16.2 error message says it's top-level.
  allowedDevOrigins: ['10.8.1.2', 'localhost'],
  devIndicators: false,
};

export default nextConfig;
