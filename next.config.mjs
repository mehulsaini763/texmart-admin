const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '', // Optional, only if your URLs use a non-standard port
        pathname: '/**', // Allows all paths, adjust if needed
      },
      {
        protocol: 'http',
        hostname: 'res.cloudinary.com',
        port: '', // Optional, only if your URLs use a non-standard port
        pathname: '/**', // Allows all paths, adjust if needed
      },
    ],
  },
};

export default nextConfig;
