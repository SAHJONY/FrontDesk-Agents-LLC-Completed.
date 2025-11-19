/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    appDir: true, // enables /app directory for Next.js 14+
  },
  output: "standalone", // required for optimal Vercel deployment
};

export default nextConfig;
