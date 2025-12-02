"use client";

import Image from "next/image";
import { getPageHero } from "@/lib/siteImages";

export default function IndustriesPage() {
  const hero = getPageHero("industries");

  return (
    <main className="min-h-screen w-full px-4 md:px-10 py-10">
      <section className="max-w-6xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-white text-center">
          Built for businesses that <span className="text-sky-400">live</span>{" "}
          on the phone.
        </h1>
        <p className="text-slate-300 text-center mt-4 max-w-3xl mx-auto">
          FrontDesk Agents works out of the box for clinics, law firms, home
          services, insurance, real estate, and any operation where every call
          could be a new client.
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

        <div className="grid md:grid-cols-3 gap-6 mt-12 text-slate-200 text-sm">
          <div className="rounded-xl border border-slate-700 bg-slate-900/40 p-5">
            <h2 className="font-semibold text-white mb-2">Clinics</h2>
            <p>Schedule visits, handle refills, confirm insurance and reduce no-shows.</p>
          </div>
          <div className="rounded-xl border border-slate-700 bg-slate-900/40 p-5">
            <h2 className="font-semibold text-white mb-2">Law firms</h2>
            <p>Intake new matters, qualify leads and route urgent calls to partners.</p>
          </div>
          <div className="rounded-xl border border-slate-700 bg-slate-900/40 p-5">
            <h2 className="font-semibold text-white mb-2">Agencies & services</h2>
            <p>Capture every inbound lead, book consultations and track campaign ROI.</p>
          </div>
        </div>
      </section>
    </main>
  );
}
