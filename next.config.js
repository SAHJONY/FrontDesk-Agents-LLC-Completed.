/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
  images: {
    formats: ["image/avif", "image/webp"],
    // Permitimos dominios de PMS y Storage para fotos de hoteles/habitaciones
    remotePatterns: [
      { protocol: "https", hostname: "**" },
      { protocol: "https", hostname: "images.mews.com" },
      { protocol: "https", hostname: "cloudbeds.com" }
    ]
  },
  // Añadimos dependencias de visualización de datos de hospitalidad
  transpilePackages: ["@tremor/react", "lucide-react", "recharts"],
  
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          // CEO Fix: Microphone (self) + Cámara para check-in por video si es necesario
          { key: "Permissions-Policy", value: "camera=(self), microphone=(self), geolocation=(self)" },
          { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
          { key: "Content-Security-Policy", value: "upgrade-insecure-requests" }
        ]
      }
    ];
  }
};

module.exports = nextConfig;
