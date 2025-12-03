// app/components/PremiumImage.tsx

"use client";

import Image from "next/image";
import { PREMIUM_IMAGES, PremiumImageKey } from "@/lib/premiumImages";

interface Props {
  name: PremiumImageKey;
  className?: string;
  priority?: boolean;
}

export function PremiumImage({ name, className, priority }: Props) {
  const img = PREMIUM_IMAGES[name];

  // Fallback de seguridad: si el nombre no existe, usamos el hero de home
  const fallback =
    img ??
    PREMIUM_IMAGES["home-hero" as PremiumImageKey] ??
    Object.values(PREMIUM_IMAGES)[0];

  return (
    <Image
      src={fallback.src}
      alt={fallback.alt}
      width={1920}
      height={1080}
      className={className ?? "w-full h-auto rounded-xl object-cover"}
      priority={priority}
    />
  );
}
