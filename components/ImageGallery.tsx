'use client';

import Image from 'next/image';
import imageManifest from '@/config/image-manifest.json'; // Adjust path to your JSON file

export default function ImageGallery() {
  return (
    <section className="py-12 px-4 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold mb-8 text-center text-slate-900">
        Our Premium Assets
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {imageManifest.images.map((img) => (
          <div key={img.key} className="group relative overflow-hidden rounded-xl bg-gray-100 shadow-md transition-all hover:shadow-xl">
            <div className="aspect-video relative">
              <Image
                // Prioritizes webp/avif if they exist, falls back to jpg
                src={img.paths.webp || img.paths.avif || img.paths.jpg}
                alt={img.alt}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
            <div className="p-4 bg-white">
              <h3 className="font-semibold text-slate-800 capitalize">
                {img.key.replace(/([A-Z])/g, ' $1').trim()}
              </h3>
              <p className="text-xs text-slate-500 mt-1">{img.width} × {img.height} px</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
