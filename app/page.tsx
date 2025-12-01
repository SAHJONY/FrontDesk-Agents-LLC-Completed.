// app/page.tsx
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import SiteHeader from "./components/SiteHeader";

export const metadata: Metadata = {
  title: "FrontDesk Agents – AI Receptionist Command Center",
  description:
    "24/7 AI Receptionist for calls, SMS, WhatsApp and more. One Command Center to capture, qualify and schedule every lead.",
};

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-50 dark:bg-slate-950">
      {/* Header */}
      <SiteHeader />

      {/* Hero */}
      <section className="border-b border-slate-900 bg-gradient-to-b from-slate-950 via-slate-950 to-slate-900">
        <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 py-10 md:flex-row md:items-center">
          {/* Copy */}
          <div className="flex-1 space-y-5">
            <span className="inline-flex items-center rounded-full border border-emerald-400/30 bg-emerald-500/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-emerald-300">
              Live • AI Receptionist + Call Command Center
            </span>

            <h1 className="text-balance text-3xl font-semibold leading-tight text-slate-50 md:text-4xl lg:text-5xl">
              Turn every missed call into{" "}
              <span className="bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-500 bg-clip-text text-transparent">
                booked revenue
              </span>{" "}
              with your AI Front Desk.
            </h1>

            <p className="max-w-xl text-sm text-slate-300 md:text-base">
              FrontDesk Agents listens, answers and routes every call, SMS and
              WhatsApp 24/7. Watch everything in one{" "}
              <strong>Command Center</strong>: live calls, follow-ups,
              appointments and conversion KPIs.
            </p>

            <div className="flex flex-wrap gap-3 pt-1">
              <Link
                href="/setup"
                className="inline-flex items-center justify-center rounded-lg bg-cyan-500 px-4 py-2.5 text-sm font-semibold text-slate-950 shadow-lg shadow-cyan-500/30 hover:bg-cyan-400"
              >
                Launch my AI Receptionist
              </Link>
              <Link
                href="/dashboard"
                className="inline-flex items-center justify-center rounded-lg border border-slate-700 px-4 py-2.5 text-sm font-semibold text-slate-100 hover:border-cyan-400 hover:text-cyan-300"
              >
                View Command Center
              </Link>
            </div>

            {/* Highlights */}
            <div className="grid max-w-xl grid-cols-2 gap-3 pt-4 text-xs text-slate-300 md:text-sm">
              <div className="rounded-lg border border-slate-800 bg-slate-900/40 p-3">
                <div className="text-[11px] font-semibold text-slate-400">
                  Call Capture
                </div>
                <div className="text-sm font-semibold text-emerald-300">
                  +38% more answered calls
                </div>
                <p className="mt-1 text-[11px] text-slate-400">
                  No more voicemails. Every call gets an AI agent.
                </p>
              </div>
              <div className="rounded-lg border border-slate-800 bg-slate-900/40 p-3">
                <div className="text-[11px] font-semibold text-slate-400">
                  Scheduling
                </div>
                <div className="text-sm font-semibold text-cyan-300">
                  Autopilot booking 24/7
                </div>
                <p className="mt-1 text-[11px] text-slate-400">
                  Syncs with your calendar and sends confirmations.
                </p>
              </div>
            </div>
          </div>

          {/* Cinematic hero image */}
          <div className="flex-1">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 shadow-2xl shadow-cyan-500/20">
              <Image
                src="/images/hero-cinematic.jpg"
                alt="AI Receptionist Command Center – cinematic 4K dashboard"
                fill
                className="object-cover"
                priority
              />
              {/* Glow overlay */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/10 to-transparent" />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-center justify-between px-4 pb-3 text-[11px]">
                <span className="rounded-full bg-slate-950/70 px-3 py-1 font-medium text-emerald-300 backdrop-blur">
                  Live Agent • ALEX
                </span>
                <span className="rounded-full bg-slate-950/70 px-3 py-1 font-medium text-cyan-300 backdrop-blur">
                  24/7 Command Center
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mini preview Command Center */}
      <section className="border-t border-slate-900 bg-slate-950 py-8">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 md:flex-row md:items-center">
          <div className="flex-1 space-y-2 text-sm text-slate-300">
            <h2 className="text-base font-semibold text-slate-50">
              One Command Center for every channel
            </h2>
            <p className="text-xs text-slate-400 md:text-sm">
              Monitor live calls, outbound campaigns, retention follow-ups and
              no-shows in a single view. Designed for clinics, law firms, real
              estate and service businesses that can’t afford to miss leads.
            </p>
            <ul className="mt-2 space-y-1 text-xs text-slate-400">
              <li>• Live call cards with outcomes and sentiment.</li>
              <li>• Outbound sequences with conversion KPIs.</li>
              <li>• Retention panel for recalls, renewals and no-shows.</li>
            </ul>
          </div>
          <div className="flex-1">
            <div className="relative aspect-[16/9] overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 shadow-xl shadow-cyan-500/20">
              <Image
                src="/images/command-center-dark.jpg"
                alt="FrontDesk Agents – Command Center dashboard"
                fill
                className="hidden object-cover dark:block"
              />
              <Image
                src="/images/command-center-light.jpg"
                alt="FrontDesk Agents – Command Center dashboard light mode"
                fill
                className="object-cover dark:hidden"
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
