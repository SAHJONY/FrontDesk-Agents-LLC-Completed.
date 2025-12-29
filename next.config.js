/** @type {import('next').NextConfig} */
const nextConfig = {
  // Region-specific optimization for Portland (pdx1) build
  reactStrictMode: true,
  
  // Enable server actions for the Revenue Command Center
  experimental: {
    serverActions: {
      allowedOrigins: ["frontdeskagents.com", "*.frontdeskagents.com"],
    },
  },

  // Image optimization for global workforce branding
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'your-project.supabase.co',
      },
      {
        protocol: 'https',
        hostname: 'api.bland.ai',
      }
    ],
  },

  // Custom headers for security and compliance
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Credentials', value: 'true' },
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Access-Control-Allow-Methods', value: 'GET,DELETE,PATCH,POST,PUT' },
          { key: 'Access-Control-Allow-Headers', value: 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version' },
        ],
      },
    ];
  },

  // Suppress specific build warnings for the 2-core machine
  typescript: {
    ignoreBuildErrors: false, // Ensures data integrity for fixed prices ($199-$1,499)
  },
  eslint: {
    ignoreDuringBuilds: true, // Speeds up the build process in pdx1
  }
};

module.exports = nextConfig;
