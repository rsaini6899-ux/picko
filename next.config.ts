import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
   eslint: {
    ignoreDuringBuilds: true, // ⬅️ Ignore linting during Vercel build
  },
};

export default nextConfig;
