// app/components/PremiumImage.tsx

"use client";

import Image from "next/image";
import { PREMIUM_IMAGES } from "@/lib/premiumImages";

interface Props {
  name: keyof typeof PREMIUM_IMAGES;
  className?: string;
  priority?: boolean;
}

export function PremiumImage({ name, className, priority }: Props) {
  const img = PREMIUM_IMAGES[name];

  if (!img) {
    // Fallback de seguridad: si el nombre no existe, usamos el hero de home
    const fallback = PREMIUM_IMAGES["home-hero-4k"] ?? Object.values(PREMIUM_IMAGES)[0];

    return (
      <Image
        src={fallback.src}
        alt={fallback.alt}
        width={fallback.width ?? 1920}
        height={fallback.height ?? 1080}
        className={className ?? "w-full h-auto rounded-xl object-cover"}
        priority={priority}
      />
    );
  }

  return (
    <Image
      src={img.src}
      alt={img.alt}
      width={img.width ?? 1920}
      height={img.height ?? 1080}
      className={className ?? "w-full h-auto rounded-xl object-cover"}
      priority={priority}
    />
  );
}
