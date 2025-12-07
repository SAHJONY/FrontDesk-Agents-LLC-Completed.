// app/page.tsx
import Image from "next/image";
import MainNav from "./components/MainNav";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-50">
      <div className="mx-auto max-w-6xl px-4 pb-16 pt-4 sm:pt-6">
        {/* NAVBAR + HAMBURGER */}
        <MainNav />

        {/* HERO */}
        <section className="mt-10 grid gap-10 md:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] md:items-center">
          <div className="space-y-6">
            <p className="inline-flex rounded-full border border-sky-500/40 bg-sky-500/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.25em] text-sky-300">
              24/7 AI Reception • FrontDesk Agents
            </p>

            <h1 className="text-3xl font-semibold leading-tight sm:text-4xl lg:text-[2.7rem]">
              Turn every phone call into booked revenue — automatically.
            </h1>

            <p className="text-slate-300 text-sm sm:text-base max-w-xl">
              FrontDesk Agents answers, qualifies, and books your best leads 24/7
              so your team only talks to people ready to buy. No missed calls,
              no lost cases, no “sorry, we&apos;re closed”.
            </p>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href="https://calendly.com/sahjony/30min"
                className="inline-flex items-center justify-center rounded-full bg-sky-500 px-6 py-2.5 text-sm font-semibold text-slate-950 shadow-sm hover:bg-sky-400"
              >
                Book a live demo
              </a>
              <a
                href="tel:+12164804413"
                className="inline-flex items-center justify-center rounded-full border border-slate-600 px-6 py-2.5 text-sm font-semibold text-slate-100 hover:bg-slate-900"
              >
                Call sales · +1 (216) 480-4413
              </a>
            </div>

            <p className="text-xs text-slate-400 max-w-md">
              Trusted by busy law firms, clinics, and service businesses that
              can&apos;t afford missed calls.
            </p>
          </div>

          {/* LIVE DASHBOARD CARD WITH IMAGE BACKGROUND */}
          <div className="relative overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/60 p-4 shadow-[0_0_80px_rgba(15,23,42,0.8)]">
            <div className="pointer-events-none absolute inset-0">
              <Image
                src="/images/premium/hero-main.jpg"
                alt="FrontDesk live AI reception dashboard"
                fill
                className="object-cover opacity-50"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-slate-950/10" />
            </div>

            <div className="relative space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xs font-medium uppercase tracking-[0.25em] text-slate-400">
                  Live AI Reception Dashboard
                </h2>
                <span className="rounded-full bg-emerald-500/15 px-3 py-1 text-[11px] font-medium text-emerald-300">
                  Online · 24/7
                </span>
              </div>

              <div className="space-y-3 text-xs">
                <div className="flex items-center justify-between rounded-2xl bg-slate-900/70 px-3 py-2">
                  <span className="text-slate-300">Calls today</span>
                  <span className="font-semibold text-slate-50">37</span>
                </div>
                <div className="flex items-center justify-between rounded-2xl bg-slate-900/70 px-3 py-2">
                  <span className="text-slate-300">Booked appointments</span>
                  <span className="font-semibold text-slate-50">19</span>
                </div>
                <div className="flex items-center justify-between rounded-2xl bg-slate-900/70 px-3 py-2">
                  <span className="text-slate-300">Missed calls rescued</span>
                  <span className="font-semibold text-slate-50">12</span>
                </div>
              </div>

              <p className="text-[11px] text-slate-400">
                Data shown is a live-style demo. Your dashboard will reflect
                real inbound calls, booked appointments, and recovered revenue
                in real time.
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
