/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [ {
      protocol: 'https',
      hostname: '"res.cloudinary.com"',
      port: '',
    }],
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:5000/api/v1/:path*', // Proxy to Backend
      },
    ];
  },
};

export default nextConfig;
