// app/app/ai-agents/page.tsx

import Image from "next/image";
import { getPageHero } from "@/lib/siteImages";

export default function AIAgentsPage() {
  const hero = getPageHero("ai-agents");

  return (
    <main className="min-h-screen px-4 py-10 lg:px-8">
      <section className="mx-auto max-w-6xl">
        <header className="mb-8 space-y-3">
          <p className="text-xs font-semibold tracking-[0.3em] text-sky-400 uppercase">
            AI RECEPTIONIST · AUTONOMOUS AGENTS
          </p>
          <h1 className="text-3xl font-bold text-slate-50 sm:text-4xl lg:text-5xl">
            AI Agents Command Center
          </h1>
          <p className="max-w-2xl text-sm text-slate-300 sm:text-base">
            Deploy specialized AI receptionists, schedulers and follow-up agents
            that work 24/7 across phone, SMS, WhatsApp and email.
          </p>
        </header>

        <div className="overflow-hidden rounded-2xl bg-slate-900/60 ring-1 ring-slate-700/60">
          <Image
            src={hero.src}
            alt={hero.alt}
            width={1600}
            height={900}
            className="h-auto w-full object-cover"
            priority
          />
          <div className="border-t border-slate-700/60 px-6 py-4 text-xs text-slate-300 sm:text-sm">
            FrontDesk Command Center · AI Agents View
          </div>
        </div>
      </section>
    </main>
  );
}
