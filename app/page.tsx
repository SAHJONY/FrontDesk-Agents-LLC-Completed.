import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import SiteHeader from "./components/SiteHeader";

export const metadata: Metadata = {
  title: "FrontDesk Agents – AI Receptionist Command Center",
  description:
    "24/7 AI receptionists that answer, qualify and book calls for your business. One command center for voice, SMS, and WhatsApp.",
};

const stats = [
  { label: "Calls handled today", value: "326" },
  { label: "Booked appointments", value: "48" },
  { label: "Missed calls recovered", value: "91%" },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      <SiteHeader />

      <main className="mx-auto flex max-w-6xl flex-col gap-12 px-4 pb-16 pt-10 lg:flex-row lg:items-center">
        {/* Left: copy */}
        <section className="flex-1 space-y-6">
          <p className="inline-flex items-center gap-2 rounded-full border border-cyan-400/40 bg-slate-900/60 px-3 py-1 text-[11px] font-semibold text-cyan-200">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            Live • AI receptionist command center
          </p>

          <h1 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl lg:text-[2.6rem]">
            Turn every missed call into{" "}
            <span className="bg-gradient-to-r from-cyan-300 via-sky-400 to-blue-500 bg-clip-text text-transparent">
              booked revenue
            </span>{" "}
            with 24/7 AI receptionists.
          </h1>

          <p className="max-w-xl text-sm text-slate-300">
            FrontDesk Agents listens, speaks and types in real-time for your
            clinic, law firm or service business. One AI command center handles
            calls, SMS and WhatsApp while you focus on closing.
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/setup"
              className="rounded-full bg-cyan-400 px-4 py-2 text-xs font-semibold text-slate-950 shadow-lg shadow-cyan-400/40 hover:bg-cyan-300"
            >
              Launch my AI receptionist
            </Link>
            <Link
              href="/dashboard"
              className="text-xs font-semibold text-slate-300 hover:text-white"
            >
              View Command Center demo →
            </Link>
          </div>

          <dl className="mt-4 grid max-w-md grid-cols-3 gap-3 text-[11px] text-slate-300">
            {stats.map((s) => (
              <div
                key={s.label}
                className="rounded-xl border border-slate-800 bg-slate-900/60 px-3 py-2"
              >
                <dt className="text-[10px] text-slate-400">{s.label}</dt>
                <dd className="mt-1 text-sm font-semibold text-slate-50">
                  {s.value}
                </dd>
              </div>
            ))}
          </dl>
        </section>

        {/* Right: cinematic image + overlay */}
        <section className="flex-1">
          <div className="relative h-[320px] w-full overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/80 shadow-[0_0_80px_rgba(56,189,248,0.35)]">
            <Image
              src="/images/fda-command-center-hero.jpg"
              alt="FrontDesk Agents AI Command Center"
              fill
              priority
              className="object-cover object-center"
            />

            {/* Gradient overlay */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-slate-950/80 via-slate-900/10 to-sky-500/20" />

            {/* Overlay mini dashboard */}
            <div className="absolute inset-0 flex flex-col justify-between p-4">
              <div className="flex items-center justify-between text-[11px] text-slate-200">
                <span className="inline-flex items-center gap-1 rounded-full bg-slate-950/60 px-2 py-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  Live calls: 12
                </span>
                <span className="rounded-full bg-slate-950/60 px-2 py-1 text-[10px] text-emerald-300">
                  Missed calls recovered: 91%
                </span>
              </div>

              <div className="grid grid-cols-3 gap-3 text-[11px]">
                <div className="rounded-xl bg-slate-950/70 p-3">
                  <p className="text-[10px] text-slate-400">Today</p>
                  <p className="mt-1 text-lg font-semibold text-slate-50">
                    326
                  </p>
                  <p className="mt-1 text-[10px] text-emerald-300">
                    +38% vs last week
                  </p>
                </div>
                <div className="rounded-xl bg-slate-950/70 p-3">
                  <p className="text-[10px] text-slate-400">
                    Qualified leads
                  </p>
                  <p className="mt-1 text-lg font-semibold text-slate-50">
                    74
                  </p>
                  <p className="mt-1 text-[10px] text-sky-300">
                    8 countries • 3 langs
                  </p>
                </div>
                <div className="rounded-xl bg-slate-950/70 p-3">
                  <p className="text-[10px] text-slate-400">
                    Auto follow-ups
                  </p>
                  <p className="mt-1 text-lg font-semibold text-slate-50">
                    129
                  </p>
                  <p className="mt-1 text-[10px] text-violet-300">
                    SMS • WhatsApp
                  </p>
                </div>
              </div>
            </div>
          </div>

          <p className="mt-3 text-[11px] text-slate-400">
            *Demo data for illustration. Your command center muestra métricas en
            tiempo real.
          </p>
        </section>
      </main>
    </div>
  );
}
