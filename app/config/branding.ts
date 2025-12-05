// app/config/branding.ts

// Aquí centralizamos TODAS las imágenes premium de la marca.
// Cambia las rutas para que coincidan con los archivos reales
// que subas a /public/images/premium/...

export const premiumBranding = {
  hero: {
    main: "/images/premium/hero-main.jpg", // Landing principal
    overlay: "/images/premium/hero-overlay.jpg",
  },
  demo: {
    main: "/images/premium/demo-main.jpg",
  },
  auth: {
    login: "/images/premium/auth-login.jpg",
    signup: "/images/premium/auth-signup.jpg",
  },
  dashboard: {
    background: "/images/premium/dashboard-bg.jpg",
  },
  generic: {
    aiReceptionist: "/images/premium/ai-receptionist.jpg",
    globalOffices: "/images/premium/global-offices.jpg",
  },
} as const;
