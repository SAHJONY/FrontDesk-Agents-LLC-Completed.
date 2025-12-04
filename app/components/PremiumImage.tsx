// app/components/PremiumImage.tsx
"use client";

import Image from "next/image";

type PremiumImageProps = {
  name: string;
  alt?: string;
  className?: string;
  priority?: boolean;
};

// Mapa simple de nombre lógico → archivo en /public
const IMAGE_MAP: Record<
  string,
  { src: string; alt: string; width?: number; height?: number }
> = {
  "home-hero": {
    src: "/premium/home-hero.png",
    alt: "FrontDesk Agents home dashboard preview",
  },
  "pricing-hero": {
    src: "/premium/pricing-hero.png",
    alt: "FrontDesk Agents pricing overview",
  },
  "demo-hero": {
    src: "/premium/demo-hero.png",
    alt: "FrontDesk Agents live demo call",
  },
};

const DEFAULT_IMAGE = {
  src: "/premium/default-hero.png",
  alt: "FrontDesk Agents AI receptionist",
};

export default function PremiumImage(props: PremiumImageProps) {
  const { name, alt, className, priority } = props;

  const cfg = IMAGE_MAP[name] ?? DEFAULT_IMAGE;

  const width = (cfg as any).width ?? 1920;
  const height = (cfg as any).height ?? 1080;

  return (
    <Image
      src={cfg.src}
      alt={alt ?? cfg.alt}
      width={width}
      height={height}
      priority={priority}
      className={
        "w-full h-auto rounded-xl object-cover " + (className ?? "")
      }
    />
  );
}
