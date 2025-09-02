import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  typescript: { ignoreBuildErrors: true },
  env: {
    baseUrl: process.env.BASE_URL,
  },
  /* config options here */
};

export default nextConfig;
