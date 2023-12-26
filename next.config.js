/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["www.southernliving.com"], // Add the hostname here
  },
  pageExtensions: ["page.tsx", "page.ts", "page.jsx", "page.js"],
};
module.exports = nextConfig;
