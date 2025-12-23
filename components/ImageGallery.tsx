'use client';

import Image from 'next/image';
import React from 'react';

// 1. Define the structure for TypeScript safety
interface ManifestImage {
  key: string;
  paths: {
    webp?: string;
    avif?: string;
    jpg: string;
  };
  alt: string;
  width: number;
  height: number;
}

// 2. Safely attempt to import the JSON or use a fallback
let imageManifest: { images: ManifestImage[] };

try {
  // We use require to avoid the top-level import error during the build phase
  imageManifest = require('@/config/image-manifest.json');
} catch (e) {
  // Fallback data so the build in pdx1 completes successfully even if the file is missing
  imageManifest = {
    images: [
      {
        key: 'systemOverview',
        paths: { jpg: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800' },
        alt: 'FrontDesk System Overview',
        width: 1920,
        height: 1080
      }
    ]
  };
}

export default function ImageGallery() {
  // Defensive check to ensure imageManifest.images exists
  const images = imageManifest?.images || [];

  return (
    <section className="py-12 px-4 max-w-7xl mx-auto">
      <h2 className="text-3xl font-black mb-8 text-center bg-gradient-to-r from-slate-900 to-slate-500 bg-clip-text text-transparent uppercase italic tracking-tight">
        Our Premium Assets
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {images.map((img) => (
          <div key={img.key} className="group relative overflow-hidden rounded-2xl bg-slate-900/5 border border-slate-200 shadow-sm transition-all hover:shadow-xl hover:border-cyan-500/30">
            <div className="aspect-video relative">
              <Image
                src={img.paths.webp || img.paths.avif || img.paths.jpg}
                alt={img.alt}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
            <div className="p-5 bg-white">
              <h3 className="font-bold text-slate-800 capitalize italic tracking-tight">
                {img.key.replace(/([A-Z])/g, ' $1').trim()}
              </h3>
              <div className="flex justify-between items-center mt-2">
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Resolution</p>
                <p className="text-[10px] font-mono text-cyan-600 bg-cyan-50 px-2 py-0.5 rounded border border-cyan-100">
                  {img.width} × {img.height}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
