import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    allowedDevOrigins: ['10.8.1.2', 'localhost'],
  } as any, // fallback in case it's top-level or experimental
  // If it's top level in Next.js 16.2.4:
  // allowedDevOrigins is actually experimental or top level. Next 15 had it in experimental.
  // Next.js 16.2 error message says it's top-level.
  allowedDevOrigins: ['10.8.1.2', 'localhost'] as any,
};

export default nextConfig;
