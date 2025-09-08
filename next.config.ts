import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  typescript: { ignoreBuildErrors: true },
  eslint: { ignoreDuringBuilds: true },
  env: {
    baseUrl: process.env.BASE_URL,
  },
  /* config options here */
};

export default nextConfig;
