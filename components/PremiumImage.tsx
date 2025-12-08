// components/PremiumImage.tsx
"use client";

import Image from "next/image";
import React from "react";
import { PremiumImageKey, getPremiumImage } from "@/lib/premiumImages"; 

export default function PremiumImage({
  imageKey,
  className,
}: {
  imageKey: PremiumImageKey;
  className?: string;
}) {
  const img = getPremiumImage(imageKey);

  return (
    <div className={className ?? ""} style={{ position: "relative", width: "100%", height: "100%" }}>
      <Image
        src={img.src}
        alt={img.alt}
        fill
        priority={!!img.priority}
        style={{ objectFit: "cover" }}
      />
    </div>
  );
}
