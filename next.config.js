/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: "standalone", // required for Vercel optimized deployment
  images: {
    domains: ["frontdeskagents.com", "vercel.app"],
  },
};

export default nextConfig;
