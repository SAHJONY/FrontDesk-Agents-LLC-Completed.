"use client";

import Image from "next/image";
import { getPageHero } from "@/lib/siteImages";

export default function DemoPage() {
  const hero = getPageHero("demo");

  return (
    <main className="min-h-screen w-full px-4 md:px-10 py-10">
      <section className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-white">
          See FrontDesk Command Center <span className="text-sky-400">live</span>.
        </h1>
        <p className="text-slate-300 mt-4">
          In 15 minutes we’ll show you how your AI Receptionist answers calls,
          qualifies leads and updates your live dashboard.
        </p>

        <div className="mt-8 flex justify-center">
          <a
            href="https://calendly.com/frontdeskllc/30min"
            target="_blank"
            className="rounded-md bg-sky-400 px-6 py-3 text-lg font-semibold text-slate-900"
          >
            Book your live demo
          </a>
        </div>

        <div className="w-full mt-10">
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
