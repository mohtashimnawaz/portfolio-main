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

export default nextConfig;
