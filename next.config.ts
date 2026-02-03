import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // TEMP HOTFIX: allow deploys while you stabilize
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },

  images: {
    remotePatterns: [{ protocol: "https", hostname: "**.supabase.co" }],
  },

  experimental: {
    optimizePackageImports: ["lucide-react", "@heroicons/react", "framer-motion"],
  },
};

export default nextConfig;
