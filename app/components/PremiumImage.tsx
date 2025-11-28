"use client";

import Image from "next/image";
import { premiumImages } from "@/lib/premiumImages";

interface Props {
  name: keyof typeof premiumImages;
  alt?: string;
  className?: string;
  priority?: boolean;
}

export default function PremiumImage({ name, alt, className, priority }: Props) {
  const src = premiumImages[name];

  if (!src) return <p>Image not found: {name}</p>;

  return (
    <Image
      src={src}
      alt={alt || name}
      width={1920}
      height={1080}
      className={className}
      priority={priority}
    />
  );
}
