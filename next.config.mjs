/** @type {import('next').NextConfig} */
const nextConfig = {
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