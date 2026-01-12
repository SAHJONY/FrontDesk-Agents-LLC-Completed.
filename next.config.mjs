/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  
  // Increase build timeout to prevent 34-38s failures
  staticPageGenerationTimeout: 300,
  
  // Disable source maps in production to reduce build time and memory
  productionBrowserSourceMaps: false,
  
  // Output standalone disabled due to webpack runtime errors
  // output: 'standalone',
  
  // Optimize images
  images: {
    domains: ['localhost'],
    unoptimized: process.env.NODE_ENV === 'development',
  },

  webpack: (config, { isServer }) => {
    // Externalize problematic client-side packages during SSR
    if (isServer) {
      config.externals = config.externals || [];
      config.externals.push({
        'mic-recorder-to-mp3': 'commonjs mic-recorder-to-mp3',
      });
    }
    
    // Client-side fallbacks for Node.js modules
    if (!isServer) {
      config.resolve.fallback = { 
        ...config.resolve.fallback, 
        fs: false, 
        net: false, 
        tls: false,
        crypto: false,
        stream: false,
        http: false,
        https: false,
        zlib: false,
        path: false,
        os: false,
      };
    }
    
    return config;
  }
};

export default nextConfig;
