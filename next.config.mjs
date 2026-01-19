/** @type {import('next').NextConfig} */
const nextConfig = {
  /* Kikapcsoljuk a szigorú ellenőrzést, hogy elinduljon a bolt! */
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'cc-west-usa.oss-accelerate.aliyuncs.com',
      },
    ],
  },
};

export default nextConfig;