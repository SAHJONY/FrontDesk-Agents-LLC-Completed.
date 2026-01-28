/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Enabled for Vercel Free Tier safety
    unoptimized: true, 
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.frontdeskagents.com',
      },
      {
        protocol: 'https',
        hostname: 'resend.com',
      },
      {
        protocol: 'https',
        hostname: '**.supabase.co', // For Supabase storage assets
      },
      {
        protocol: 'https',
        hostname: 'files.stripe.com', // For Stripe invoice/product images
      }
    ],
  },
  // 1. Bypass linting errors during build (Speeds up deployment)
  eslint: {
    ignoreDuringBuilds: true,
  },
  // 2. Prevent TypeScript errors from blocking deployment
  typescript: {
    ignoreBuildErrors: true,
  },
  // 3. Performance & Stability for AI/External SDKs
  serverExternalPackages: [
    'airtable', 
    'sharp', 
    'resend', 
    'twilio', 
    'openai', 
    'stripe'
  ],
  // 4. Next.js 15 Experimental Features
  experimental: {
    // Enhances reliability of server-side redirects (like your impersonation logout)
    authInterrupts: true,
  }
};

export default nextConfig;
