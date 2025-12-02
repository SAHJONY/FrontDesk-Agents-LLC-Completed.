// app/ai-agents/page.tsx
import Image from "next/image";
import { getPageHero } from "@/lib/siteImages";

export default function AIAgentsPage() {
  const hero = getPageHero("ai-agents");

  return (
    <main className="min-h-screen bg-slate-950 text-slate-50">
      <section className="mx-auto max-w-5xl px-4 pb-16 pt-10 lg:px-8">
        <p className="text-xs font-semibold tracking-[0.3em] text-sky-400 uppercase mb-4">
          AI RECEPTIONIST · AUTONOMOUS AGENTS
        </p>

        <h1 className="text-3xl font-bold sm:text-4xl">
          Your AI agents, working as a 24/7 front desk team.
        </h1>

        <p className="mt-4 max-w-2xl text-sm text-slate-300 sm:text-base">
          FrontDesk Agents runs multiple specialized AI agents: intake, triage,
          outbound follow-up and retention. All synchronized with your live
          dashboard so every call and lead is tracked.
        </p>

        <div className="mt-8 overflow-hidden rounded-xl border border-slate-800 bg-slate-900/60">
          <Image
            src={hero.src}
            alt={hero.alt}
            width={1600}
            height={900}
            className="h-auto w-full object-cover"
          />
        </div>
      </section>
    </main>
  );
}
