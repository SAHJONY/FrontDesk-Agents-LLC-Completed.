import type { NextConfig } from "next";

const isCI = process.env.CI === "true";
const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  // Enforce correctness in CI/production
  eslint: {
    ignoreDuringBuilds: !(isCI || isProd),
  },
  typescript: {
    ignoreBuildErrors: !(isCI || isProd),
  },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.supabase.co",
      },
    ],
  },

  experimental: {
    optimizePackageImports: ["lucide-react", "@heroicons/react", "framer-motion"],
  },

  // Keep global security headers in vercel.json to avoid conflicts
};

export default nextConfig;
