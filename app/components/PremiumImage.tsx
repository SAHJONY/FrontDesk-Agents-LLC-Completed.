// app/components/PremiumImage.tsx
import Image from 'next/image';
import React from 'react';
import { getPremiumImage, PremiumImageKey } from '../../lib/siteImages';

export type PremiumImageProps = {
  keyName: PremiumImageKey;
  alt?: string;
  className?: string;
  width?: number;
  height?: number;
};

export default function PremiumImage({ keyName, alt, className, width = 1600, height = 900 }: PremiumImageProps) {
  const img = getPremiumImage(keyName);
  // fallback if missing
  const src = img?.src ?? '/images/hero-cinematic.jpg';
  const altText = alt ?? img?.alt ?? 'FrontDesk Agents premium image';
  return (
    <Image
      src={src}
      alt={altText}
      width={width}
      height={height}
      className={className ?? 'h-auto w-full rounded-xl object-cover'}
      priority={false}
    />
  );
}
