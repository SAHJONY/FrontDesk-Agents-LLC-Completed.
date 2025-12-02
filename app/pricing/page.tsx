"use client";

import Image from "next/image";
import { getPageHero } from "@/lib/siteImages";

export default function InternalPricingPage() {
  const hero = getPageHero("pricing");

  return (
    <main className="min-h-screen w-full px-4 md:px-10 py-10">
      <section className="max-w-5xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-white">
          Internal pricing view
        </h1>
        <p className="text-slate-300 mt-2">
          Use this screen for internal quotes, pilots and custom deals.
        </p>

        <div className="w-full mt-8">
          <Image
            src={hero.src}
            alt={hero.alt}
            width={1600}
            height={900}
            className="rounded-xl w-full h-auto object-cover border border-slate-800 shadow-xl"
          />
        </div>
      </section>
    </main>
  );
}
