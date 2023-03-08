/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    appDir: true,
  },
  fontLoaders: [
    { loader: '@next/font/google', options: { subsets: ['latin'] } },
  ],
  images: {
    domains: [
      'localhost',
      'localhost:3000',
      'localhost:3001',
      'avatars.githubusercontent.com',
      'lh3.googleusercontent.com',
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/dashboard',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
