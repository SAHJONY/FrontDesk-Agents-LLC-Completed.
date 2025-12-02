// app/page.tsx
import Image from "next/image";
import { getPageHero } from "@/lib/siteImages";
import { TopNav } from "@/components/top-nav";
import Link from "next/link";

export default function HomePage() {
  const hero = getPageHero("home");

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      <TopNav />

      <main className="mx-auto max-w-6xl px-4 pb-16 lg:px-0">
        <section className="grid gap-10 lg:grid-cols-[3fr,2fr] lg:items-center">
          <div className="space-y-6">
            <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
              24/7 AI Receptionists{" "}
              <span className="text-sky-400">for real businesses worldwide</span>
            </h1>
            <p className="text-sm md:text-base text-slate-300">
              English / Español. We answer every call, qualify every lead, and route every
              message to your command center – while you focus on closing deals and growing
              revenue.
            </p>

            <p className="text-xs text-slate-400">
              <span className="font-semibold text-sky-400">FrontDesk Agents</span> replaces
              missed calls, voicemail chaos and sticky notes with a single AI-powered
              command center for phone, SMS, WhatsApp and email.
            </p>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/demo"
                className="rounded-lg bg-sky-400 px-4 py-2 text-sm font-semibold text-slate-950 hover:bg-sky-300"
              >
                Book Live Demo (15 min)
              </Link>
              <Link
                href="/pricing"
                className="rounded-lg border border-slate-600 px-4 py-2 text-sm font-semibold text-slate-100 hover:border-sky-400"
              >
                View Pricing & Plans
              </Link>
              <Link
                href="/setup"
                className="text-xs font-medium text-slate-400 underline underline-offset-4 hover:text-sky-300"
              >
                Ya soy cliente · Ir a Setup
              </Link>
            </div>

            <div className="space-y-1 text-[11px] text-slate-500">
              <p className="uppercase tracking-[0.2em]">
                TWILIO · BLAND.AI · VERCEL · RAILWAY · SUPABASE
              </p>
              <p>
                Designed for: medical offices, law firms, real estate, contractors, call
                centers and more.
              </p>
            </div>
          </div>

          <div className="relative">
            <Image
              src={hero.src}
              alt={hero.alt}
              width={1600}
              height={900}
              className="h-auto w-full rounded-xl border border-slate-800 object-cover shadow-xl"
              priority
            />
          </div>
        </section>
      </main>
    </div>
  );
}
