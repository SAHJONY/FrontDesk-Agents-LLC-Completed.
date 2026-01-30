/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true, 
    remotePatterns: [
      { protocol: 'https', hostname: '**.frontdeskagents.com' },
      { protocol: 'https', hostname: 'resend.com' },
      { protocol: 'https', hostname: '**.supabase.co' },
      { protocol: 'https', hostname: 'files.stripe.com' }
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  serverExternalPackages: [
    'airtable', 
    'sharp', 
    'resend', 
    'twilio', 
    'openai', 
    'stripe'
  ],
  experimental: {
    authInterrupts: true,
  }
};

export default nextConfig;
