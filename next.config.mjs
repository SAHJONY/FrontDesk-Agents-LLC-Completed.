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
          'self': 'undefined',
        })
      );
      
      // Externalize problematic client-side packages during SSR
      config.externals = config.externals || [];
      config.externals.push({
        'mic-recorder-to-mp3': 'commonjs mic-recorder-to-mp3',
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
    
    // Optimize bundle splitting to reduce memory usage
    config.optimization = {
      ...config.optimization,
      moduleIds: 'deterministic',
      splitChunks: {
        chunks: 'all',
        cacheGroups: {
          default: false,
          vendors: false,
          vendor: {
            name: 'vendor',
            chunks: 'all',
            test: /node_modules/,
            priority: 20,
          },
          common: {
            name: 'common',
            minChunks: 2,
            chunks: 'all',
            priority: 10,
            reuseExistingChunk: true,
          },
        },
      },
    };
    
    return config;
  }
};

export default nextConfig;
