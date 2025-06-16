import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  transpilePackages: ['@shadow-network/shared'],
  devIndicators: false,
};

export default nextConfig;
