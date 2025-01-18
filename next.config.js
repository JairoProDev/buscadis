/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["localhost"],
  },
  experimental: {
    // Server actions are now enabled by default
  },
};

module.exports = nextConfig;
