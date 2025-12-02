"use client";

import Image from "next/image";
import { getPageHero } from "@/lib/siteImages";

export default function PricingPage() {
  const hero = getPageHero("pricing");

  return (
    <main className="min-h-screen w-full px-4 md:px-10 py-10">
      <section className="max-w-5xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-white text-center">
          Simple pricing that scales with{" "}
          <span className="text-sky-400">every booked call.</span>
        </h1>
        <p className="text-slate-300 text-center mt-4 max-w-2xl mx-auto">
          No hardware. No long-term contracts. FrontDesk Agents turns your
          phone into a revenue channel from day one.
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

        <div className="grid md:grid-cols-3 gap-6 mt-12">
          <div className="rounded-xl border border-slate-700 bg-slate-900/40 p-6">
            <h2 className="text-xl font-semibold text-white">Starter</h2>
            <p className="mt-2 text-slate-300">
              For solo providers and small clinics.
            </p>
            <p className="mt-4 text-3xl font-bold text-sky-400">$399/mo</p>
            <ul className="mt-4 space-y-2 text-sm text-slate-300">
              <li>• 1 AI receptionist</li>
              <li>• 1 inbox / phone line</li>
              <li>• 24/7 call handling</li>
            </ul>
          </div>

          <div className="rounded-xl border-2 border-sky-500 bg-slate-900 p-6 shadow-xl">
            <h2 className="text-xl font-semibold text-white">
              Professional
            </h2>
            <p className="mt-2 text-slate-300">
              For law firms, agencies and multi-location businesses.
            </p>
            <p className="mt-4 text-3xl font-bold text-sky-400">$899/mo</p>
            <ul className="mt-4 space-y-2 text-sm text-slate-300">
              <li>• 3 AI agents</li>
              <li>• Multilingual support</li>
              <li>• CRM integration & call routing</li>
            </ul>
          </div>

          <div className="rounded-xl border border-slate-700 bg-slate-900/40 p-6">
            <h2 className="text-xl font-semibold text-white">Enterprise</h2>
            <p className="mt-2 text-slate-300">
              For large groups and high-volume call centers.
            </p>
            <p className="mt-4 text-3xl font-bold text-sky-400">$1,799/mo</p>
            <ul className="mt-4 space-y-2 text-sm text-slate-300">
              <li>• Unlimited agents & inboxes</li>
              <li>• SSO, SLA and custom workflows</li>
              <li>• Dedicated success manager</li>
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
}
