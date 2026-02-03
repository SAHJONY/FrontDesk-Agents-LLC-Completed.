import type { NextConfig } from "next";

const isCI = process.env.CI === "true";
// Vercel sets NODE_ENV=production on builds
const isProd = process.env.NODE_ENV === "production";

/**
 * Production-safe strategy:
 * - Local dev can skip lint/type to move fast if needed
 * - CI/Prod can enforce (set CI=true in GitHub Actions)
 *
 * If you want Vercel to ALSO enforce, set CI=true in Vercel env vars.
 */
const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: !(isCI || isProd),
  },
  typescript: {
    ignoreBuildErrors: !(isCI || isProd),
  },

  images: {
    remotePatterns: [{ protocol: "https", hostname: "**.supabase.co" }],
  },

  experimental: {
    optimizePackageImports: ["lucide-react", "@heroicons/react", "framer-motion"],
  },
};

export default nextConfig;
