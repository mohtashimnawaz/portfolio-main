import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // Don't fail the build on ESLint warnings
    ignoreDuringBuilds: true,
  },
  images: {
    unoptimized: false,
  },
};

export default nextConfig;
