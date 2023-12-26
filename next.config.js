/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["www.southernliving.com"], // Add the hostname here
  },
  pageExtensions: ["mdx", "md", "jsx", "js", "tsx", "ts"],
};
module.exports = nextConfig;
