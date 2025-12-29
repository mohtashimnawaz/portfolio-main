
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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

// Force turbopack root to repo directory to avoid root inference
// @ts-ignore - NextConfig typings don't include turbopack root
;(nextConfig as any).turbopack = { root: __dirname };

export default nextConfig;
