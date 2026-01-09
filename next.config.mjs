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
  
  // Output standalone for better performance
  output: 'standalone',
  
  // Optimize images
  images: {
    domains: ['localhost'],
    unoptimized: process.env.NODE_ENV === 'development',
  },

  webpack: (config, { isServer, webpack }) => {
    // Fix for "self is not defined" error during build
    if (isServer) {
      // Add polyfills for browser globals that client-side libraries expect
      config.plugins = config.plugins || [];
      config.plugins.push(
        new webpack.DefinePlugin({
          'self': 'globalThis',
        })
      );
      
      // Externalize problematic client-side packages during SSR
      config.externals = config.externals || [];
      config.externals.push({
        'mic-recorder-to-mp3': 'commonjs mic-recorder-to-mp3',
        'socket.io-client': 'commonjs socket.io-client',
      });
    }
    
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
