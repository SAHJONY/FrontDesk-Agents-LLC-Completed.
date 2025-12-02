"use client";

import Image from "next/image";
import { getPageHero } from "@/lib/siteImages";

export default function DashboardPage() {
  const hero = getPageHero("dashboard");

  return (
    <main className="min-h-screen w-full px-4 md:px-10 py-8">
      <section className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-white">
              Executive view
            </h1>
            <p className="text-slate-300 mt-2">
              Real-time metrics for calls, leads, appointments and estimated
              revenue. One screen to control your front desk.
            </p>
          </div>
        </div>

        <div className="w-full mt-8">
          <Image
            src={hero.src}
            alt={hero.alt}
            width={1600}
            height={900}
            className="rounded-xl w-full h-auto object-cover border border-slate-800 shadow-xl"
          />
        </div>

        {/* Aquí se mantiene tu grid real de métricas / charts cuando ya esté conectado a Supabase */}
      </section>
    </main>
  );
}
