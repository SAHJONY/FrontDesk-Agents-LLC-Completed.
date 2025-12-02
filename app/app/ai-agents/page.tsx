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
            AI RECEPTIONISTS · MULTI-AGENT MODE
          </p>
          <h1 className="text-3xl font-bold text-slate-50 sm:text-4xl">
            Meet the AI agents that run your front desk 24/7.
          </h1>
          <p className="max-w-2xl text-sm text-slate-300 sm:text-base">
            FrontDesk Agents is a team of specialized AI receptionists:
            inbound, outbound, retention and collections — all coordinated
            from one Command Center.
          </p>
        </header>

        <div className="mb-10 overflow-hidden rounded-2xl border border-sky-900/40 bg-slate-900/60">
          <Image
            src={hero.src}
            alt={hero.alt}
            width={1600}
            height={900}
            className
