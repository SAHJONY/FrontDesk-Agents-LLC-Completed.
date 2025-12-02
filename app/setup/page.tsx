"use client";

import Image from "next/image";
import { getPageHero } from "@/lib/siteImages";

export default function SetupPage() {
  const hero = getPageHero("setup");

  return (
    <main className="min-h-screen w-full px-4 md:px-10 py-10">
      <section className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-white text-center">
          Go live in <span className="text-sky-400">48 hours</span>.
        </h1>
        <p className="text-slate-300 text-center mt-4">
          We configure your phone numbers, call flows, FAQs and revenue
          dashboards so your AI Receptionist starts taking calls in days, not months.
        </p>

        <div className="w-full mt-10">
          <Image
            src={hero.src}
            alt={hero.alt}
            width={1600}
            height={900}
            className="rounded-xl w-full h-auto object-cover border border-slate-800 shadow-xl"
          />
        </div>

        <ol className="mt-10 space-y-3 text-slate-200 text-sm">
          <li>1. Connect your main phone line.</li>
          <li>2. Import your client list and calendar.</li>
          <li>3. Configure call scripts and FAQs.</li>
          <li>4. Turn on Command Center live metrics.</li>
        </ol>
      </section>
    </main>
  );
}
