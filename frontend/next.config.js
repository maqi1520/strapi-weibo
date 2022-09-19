/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://localhost:1337/api/:path*",
      },
      {
        source: "/uploads/:path*",
        destination: "http://localhost:1337/uploads/:path*",
      },
    ];
  },
};

module.exports = nextConfig;
