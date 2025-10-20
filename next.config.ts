import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // Don't fail the build on ESLint warnings
    ignoreDuringBuilds: true,
  },
  images: {
    unoptimized: false,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  // Optimize bundle size
  experimental: {
    optimizePackageImports: ['framer-motion', '@heroicons/react'],
  },
  // Reduce build output
  compress: true,
  poweredByHeader: false,
};

export default nextConfig;
