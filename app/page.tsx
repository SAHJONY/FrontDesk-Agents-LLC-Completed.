import React from "react";
import MainNav from "./components/MainNav";
import Footer from "./components/Footer";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-50">
      {/* NAV */}
      <MainNav />

      {/* MAIN CONTENT */}
      <main className="flex-1">
        <section className="mx-auto flex max-w-5xl flex-col gap-6 px-4 pb-16 pt-10 md:flex-row md:items-center md:justify-between md:pt-16">
          <div className="max-w-xl space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary/80">
              AI RECEPTIONISTS · 24/7 · MULTILINGUAL
            </p>
            <h1 className="text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
              Turn every missed call into a booked appointment.
            </h1>
            <p className="text-sm text-slate-300 md:text-base">
              FrontDesk Agents responde todas tus llamadas, agenda citas,
              califica leads y envía resúmenes por SMS y email. Funciona con
              tus números actuales y se integra con tu CRM.
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="/signup"
                className="inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-sm hover:bg-primary/90"
              >
                Start free onboarding
              </a>
              <a
                href="/demo"
                className="inline-flex items-center rounded-md border border-slate-700 px-4 py-2 text-sm font-semibold text-slate-50 hover:bg-slate-900/60"
              >
                Watch live demo
              </a>
              <span className="text-xs text-slate-400">
                No engineers needed · You control the script.
              </span>
            </div>
          </div>

          <div className="mt-8 w-full max-w-md md:mt-0">
            <div className="rounded-2xl border border-slate-800/80 bg-slate-900/70 p-4 shadow-xl shadow-slate-950/60">
              <div className="mb-3 flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                  LIVE CALL SNAPSHOT
                </span>
                <span className="inline-flex items-center rounded-full bg-emerald-500/15 px-2 py-0.5 text-[10px] font-semibold text-emerald-300">
                  ● AI Agent ALEX · Online
                </span>
              </div>
              <div className="space-y-3 text-xs text-slate-200">
                <div className="rounded-lg bg-slate-800/80 p-2">
                  <p className="text-[11px] text-slate-400">Caller</p>
                  <p className="font-semibold">New patient — Houston, TX</p>
                </div>
                <div className="rounded-lg bg-slate-800/80 p-2">
                  <p className="text-[11px] text-slate-400">Intent</p>
                  <p className="font-semibold">
                    Book an appointment · Tooth pain · Spanish
                  </p>
                </div>
                <div className="rounded-lg bg-slate-800/80 p-2">
                  <p className="text-[11px] text-slate-400">Action</p>
                  <p className="font-semibold">
                    Slot reserved · SMS confirmation sent · Lead pushed to CRM.
                  </p>
                </div>
              </div>
            </div>
            <p className="mt-3 text-[11px] text-slate-500">
              Designed for clinics, law firms, real estate teams and any
              business that can’t afford to miss calls.
            </p>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <Footer />
    </div>
  );
}
