/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["https://via.placeholder.com/150"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*",
      },
      {
        protocol: "http",
        hostname: "*",
      },
      {
        protocol: "http",
        hostname: "*",
      },
    ],
  },
};

module.exports = nextConfig;
