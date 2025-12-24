/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // Optimización de compilación para Dashboard de alta densidad
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      { protocol: "https", hostname: "**" }
    ]
  },
  // Habilitar optimizaciones de paquetes para Lucide y Tremor
  transpilePackages: ["@tremor/react", "lucide-react"],
  
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          // CEO Fix: Microphone (self) allows AI voice testing directly from dashboard
          { key: "Permissions-Policy", value: "camera=(), microphone=(self), geolocation=()" },
          { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
          // Protección contra XSS y ataques de inyección
          { key: "Content-Security-Policy", value: "upgrade-insecure-requests" }
        ]
      }
    ];
  }
};

module.exports = nextConfig;
