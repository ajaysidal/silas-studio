import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  typescript: {
    ignoreBuildErrors: true,
  },
  trails: [],
  // Add paths config
  paths: {
    '@/*': ['src/*'],
    '@/components/*': ['src/components/*'],
  },
  turbopack: {
    resolveAlias: {
      '@': './src',
      '@/components': './src/components',
    },
  },
};

export default nextConfig;
