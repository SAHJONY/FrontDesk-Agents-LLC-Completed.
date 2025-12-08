// app/components/PremiumImage.tsx
"use client";

import Image from "next/image";
import React from "react";

export type PremiumImageKey =
  | "hero"
  | "pricing"
  | "dashboard"
  | "feature1"
  | "feature2"
  | "team"
  | "demo"
  | "contact"
  | "bg";

export interface PremiumImageConfig {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  priority?: boolean;
}

/**
 * Lista de imágenes premium que el frontend espera.
 * Asegúrate de que los archivos existen en /public/images/premium/
 * y que los nombres coinciden exactamente (case-sensitive).
 */
const premiumImages: Record<PremiumImageKey, PremiumImageConfig> = {
  hero: { src: "/images/premium/hero.jpg", alt: "Premium hero image", width: 2400, height: 1400, priority: true },
  pricing: { src: "/images/premium/pricing.jpg", alt: "Pricing hero", width: 1600, height: 900 },
  dashboard: { src: "/images/premium/dashboard.jpg", alt: "Dashboard preview", width: 1600, height: 900 },
  feature1: { src: "/images/premium/feature1.jpg", alt: "Feature 1", width: 1200, height: 800 },
  feature2: { src: "/images/premium/feature2.jpg", alt: "Feature 2", width: 1200, height: 800 },
  team: { src: "/images/premium/team.jpg", alt: "Team photo", width: 1200, height: 800 },
  demo: { src: "/images/premium/demo.jpg", alt: "Demo screenshot", width: 1200, height: 800 },
  contact: { src: "/images/premium/contact.jpg", alt: "Contact background", width: 1600, height: 900 },
  bg: { src: "/images/premium/bg.jpg", alt: "Background texture", width: 2400, height: 1400 },
};

export function getPremiumImage(key: PremiumImageKey): PremiumImageConfig {
  return premiumImages[key];
}

/**
 * Componente que renderiza la imagen premium.
 * Uso: <PremiumImage imageKey="hero" className="rounded-lg" />
 */
export default function PremiumImage({
  imageKey,
  className,
  layout = "responsive",
}: {
  imageKey: PremiumImageKey;
  className?: string;
  layout?: "responsive" | "intrinsic" | "fill" | "fixed";
}) {
  const img = getPremiumImage(imageKey);

  // Next/Image props básicos
  // Si prefieres <img> simple, cámbialo aquí.
  return (
    <div className={className ?? ""} style={{ position: "relative", width: "100%", height: "auto" }}>
      <Image
        src={img.src}
        alt={img.alt}
        width={img.width ?? 1200}
        height={img.height ?? 800}
        priority={!!img.priority}
        // 'fill' layout requires parent with position relative and fixed height; por eso usamos width/height pred.
        style={{ width: "100%", height: "auto", objectFit: "cover" }}
      />
    </div>
  );
}
