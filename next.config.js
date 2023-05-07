/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["example.com", "t4.ftcdn.net", "firebasestorage.googleapis.com"], // Add your allowed image domains here
  },
};

module.exports = nextConfig;
