import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import SiteHeader from "./components/SiteHeader";

export const metadata: Metadata = {
  title: "FrontDesk Agents – AI Receptionist Command Center",
  description:
    "24/7 AI Receptionist that answers, qualifies and books revenue for your business. One command center for calls, messages and clients.",
};

export default function HomePage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      {/* Header con toggles */}
      <SiteHeader />

      {/* Hero */}
      <main className="relative mx-auto flex max-w-6xl flex-col gap-10 px-4 pb-20 pt-10 sm:px-6 lg:px-8 lg:flex-row lg:items-center">
        {/* Fondo cinemático */}
        <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute -left-32 top-10 h-72 w-72 rounded-full bg-cyan-500/15 blur-3xl" />
          <div className="absolute bottom-0 right-[-120px] h-80 w-80 rounded-full bg-blue-500/15 blur-3xl" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_#1f2937_0,_#020617_55%,_#020617_100%)]" />
        </div>

        {/* Columna texto */}
        <section className="relative z-10 flex-1 space-y-6">
          <p className="inline-flex items-center gap-2 rounded-full border border-emerald-400/40 bg-emerald-500/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-emerald-200 shadow-sm">
            24/7 AI Receptionist · Command Center Edition
          </p>

          <h1 className="text-balance text-3xl font-semibold tracking-tight text-slate-50 sm:text-4xl md:text-5xl">
            Turn every{" "}
            <span className="bg-gradient-to-r from-cyan-300 via-sky-300 to-blue-400 bg-clip-text text-transparent">
              missed call
            </span>{" "}
            into booked revenue.
          </h1>

          <p className="max-w-xl text-sm text-slate-300/90 sm:text-base">
            FrontDesk Agents answers the phone, qualifies leads, books
            appointments and sends follow-ups automatically. One{" "}
            <span className="font-semibold text-cyan-200">
              AI Receptionist Command Center
            </span>{" "}
            for calls, SMS, WhatsApp and email — in English and Spanish.
          </p>

          {/* Bullets */}
          <div className="grid gap-3 text-xs text-slate-200/90 sm:grid-cols-2 sm:text-sm">
            <div className="flex items-start gap-2">
              <span className="mt-0.5 text-emerald-400">●</span>
              <p>
                <span className="font-semibold text-slate-50">
                  Never lose a lead:
                </span>{" "}
                24/7 instant answer, even after hours & weekends.
              </p>
            </div>
            <div className="flex items-start gap-2">
              <span className="mt-0.5 text-cyan-400">●</span>
              <p>
                <span className="font-semibold text-slate-50">
                  Built-in qualification:
                </span>{" "}
                your script, your questions, your rules.
              </p>
            </div>
            <div className="flex items-start gap-2">
              <span className="mt-0.5 text-blue-400">●</span>
              <p>
                <span className="font-semibold text-slate-50">
                  Command Center:
                </span>{" "}
                see every call, recording and deal in one dashboard.
              </p>
            </div>
            <div className="flex items-start gap-2">
              <span className="mt-0.5 text-violet-400">●</span>
              <p>
                <span className="font-semibold text-slate-50">
                  Multilingual:
                </span>{" "}
                English & Spanish today, more languages on demand.
              </p>
            </div>
          </div>

          {/* CTA principal */}
          <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:items-center">
            <Link
              href="/setup"
              className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 px-5 py-2.5 text-sm font-semibold uppercase tracking-[0.2em] text-slate-950 shadow-lg shadow-cyan-500/30 transition hover:brightness-110"
            >
              Launch Command Center
            </Link>

            <div className="flex flex-wrap items-center gap-2 text-[11px] text-slate-300">
              <span className="rounded-full border border-slate-600/80 px-2 py-1">
                14-Day Pilot · No Engineer Needed
              </span>
              <span className="rounded-full border border-slate-700/80 px-2 py-1">
                Works with Twilio, WhatsApp & SMS
              </span>
            </div>
          </div>
        </section>

        {/* Columna imagen / cinematic card */}
        <section className="relative z-10 mt-8 flex flex-1 justify-center lg:mt-0">
          <div className="relative w-full max-w-md">
            {/* Marco de “pantalla de comando” */}
            <div className="relative overflow-hidden rounded-3xl border border-slate-700/80 bg-slate-900/60 p-3 shadow-2xl shadow-cyan-900/40 backdrop-blur-lg">
              {/* Imagen principal (cámbiala por tus 4K premium) */}
              <div className="relative h-56 w-full overflow-hidden rounded-2xl border border-slate-700/70">
                <Image
                  src="/images/command-center-hero.jpg" // pon aquí tu imagen real
                  alt="FrontDesk Agents – AI Command Center"
                  fill
                  priority
                  sizes="(min-width: 1024px) 380px, 100vw"
                  className="object-cover object-center"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/10 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[11px] text-slate-100">
                  <div className="flex flex-col">
                    <span className="font-semibold uppercase tracking-[0.18em] text-cyan-200">
                      Live Calls
                    </span>
                    <span className="text-slate-300">
                      3 active · 14 waiting · 97% answer rate
                    </span>
                  </div>
                  <span className="rounded-full bg-emerald-500/90 px-3 py-1 text-[10px] font-semibold text-emerald-950">
                    Online · 24/7
                  </span>
                </div>
              </div>

              {/* Mini widgets debajo */}
              <div className="mt-3 grid grid-cols-2 gap-3 text-[11px]">
                <div className="rounded-2xl border border-slate-700/80 bg-slate-900/80 p-3">
                  <p className="text-xs font-semibold text-slate-100">
                    Today&apos;s Revenue Wheel
                  </p>
                  <p className="mt-1 text-2xl font-bold text-emerald-400">
                    +$12,840
                  </p>
                  <p className="mt-1 text-[10px] text-slate-400">
                    From AI-booked calls & follow-ups.
                  </p>
                </div>
                <div className="rounded-2xl border border-slate-700/80 bg-slate-900/80 p-3">
                  <p className="text-xs font-semibold text-slate-100">
                    Call Outcomes
                  </p>
                  <ul className="mt-1 space-y-1 text-[10px] text-slate-300">
                    <li>• 47 booked appointments</li>
                    <li>• 19 qualified leads</li>
                    <li>• 6 VIP callbacks</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Badge flotante */}
            <div className="pointer-events-none absolute -right-2 -top-4 hidden rounded-full border border-emerald-400/40 bg-emerald-500/15 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-emerald-100 shadow-lg shadow-emerald-500/30 sm:block">
              Live Command Center View
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
