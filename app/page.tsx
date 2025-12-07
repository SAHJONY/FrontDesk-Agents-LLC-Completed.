export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-50">
      {/* Hero */}
      <section className="border-b border-slate-800 bg-gradient-to-b from-slate-950 to-slate-900">
        <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-16 md:flex-row md:items-center md:justify-between">
          <div className="max-w-xl space-y-6">
            <p className="inline-flex items-center rounded-full border border-sky-500/30 bg-sky-500/10 px-3 py-1 text-xs font-medium text-sky-300">
              24/7 AI Reception • FrontDesk Agents
            </p>
            <h1 className="text-3xl font-bold tracking-tight text-slate-50 sm:text-4xl md:text-5xl">
              Turn every phone call into booked revenue — automatically.
            </h1>
            <p className="text-sm text-slate-300 sm:text-base">
              FrontDesk Agents answers, qualifies, and books your best leads
              24/7 so your team only talks to people ready to buy. No missed
              calls, no lost cases, no “sorry, we’re closed”.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <a
                href="/demo"
                className="inline-flex items-center justify-center rounded-lg bg-sky-500 px-5 py-2.5 text-sm font-semibold text-slate-950 shadow-md shadow-sky-500/30 hover:bg-sky-400 transition"
              >
                Book a live demo
              </a>
              <a
                href="tel:+12164804413"
                className="inline-flex items-center justify-center rounded-lg border border-slate-700 bg-slate-900 px-5 py-2.5 text-sm font-semibold text-slate-100 hover:bg-slate-800 transition"
              >
                Call sales · +1 (216) 480-4413
              </a>
            </div>
            <p className="text-xs text-slate-500">
              Trusted by busy law firms, clinics, and service businesses that
              can&apos;t afford missed calls.
            </p>
          </div>

          <div className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900/60 p-4 shadow-xl shadow-slate-900/60">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-xs font-medium text-slate-400">
                Live AI Reception Dashboard
              </span>
              <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-semibold text-emerald-300 border border-emerald-500/30">
                ONLINE · 24/7
              </span>
            </div>
            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between rounded-lg bg-slate-950/60 px-3 py-2 border border-slate-800">
                <span className="text-slate-300">Calls today</span>
                <span className="font-semibold text-sky-300">37</span>
              </div>
              <div className="flex items-center justify-between rounded-lg bg-slate-950/60 px-3 py-2 border border-slate-800">
                <span className="text-slate-300">Booked appointments</span>
                <span className="font-semibold text-emerald-300">19</span>
              </div>
              <div className="flex items-center justify-between rounded-lg bg-slate-950/60 px-3 py-2 border border-slate-800">
                <span className="text-slate-300">Missed calls</span>
                <span className="font-semibold text-rose-300">0</span>
              </div>
            </div>
            <p className="mt-4 text-[11px] text-slate-500">
              FrontDesk Agents integrates with your existing phone numbers and
              calendars. No hardware, no long-term contracts.
            </p>
          </div>
        </div>
      </section>

      {/* Plans teaser */}
      <section className="border-b border-slate-800 bg-slate-950">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 md:flex-row md:items-center md:justify-between">
          <div className="space-y-2">
            <h2 className="text-xl font-semibold text-slate-50">
              Revenue-ready in days, not months.
            </h2>
            <p className="text-sm text-slate-400">
              Choose a simple plan, connect your calendars and numbers, and let
              the AI reception start booking for you.
            </p>
          </div>
          <div className="grid gap-3 text-xs text-slate-300 sm:grid-cols-3">
            <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-3">
              <div className="text-[11px] font-semibold uppercase text-sky-300">
                Starter
              </div>
              <div className="mt-1 text-lg font-bold text-slate-50">
                $399<span className="text-xs font-normal text-slate-400">
                  /mo
                </span>
              </div>
              <p className="mt-1 text-[11px] text-slate-400">
                Solo owners & single-location clinics.
              </p>
            </div>
            <div className="rounded-xl border border-sky-500/60 bg-sky-950/40 p-3">
              <div className="text-[11px] font-semibold uppercase text-sky-300">
                Professional
              </div>
              <div className="mt-1 text-lg font-bold text-slate-50">
                $899<span className="text-xs font-normal text-slate-400">
                  /mo
                </span>
              </div>
              <p className="mt-1 text-[11px] text-slate-400">
                Law firms, multi-location practices & agencies.
              </p>
            </div>
            <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-3">
              <div className="text-[11px] font-semibold uppercase text-sky-300">
                Enterprise
              </div>
              <div className="mt-1 text-lg font-bold text-slate-50">
                $1,799<span className="text-xs font-normal text-slate-400">
                  /mo
                </span>
              </div>
              <p className="mt-1 text-[11px] text-slate-400">
                Large groups & national brands with complex routing.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer mini */}
      <footer className="border-t border-slate-900 bg-slate-950">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 text-[11px] text-slate-500">
          <span>© {new Date().getFullYear()} FrontDesk Agents. All rights reserved.</span>
          <div className="flex gap-4">
            <a href="/legal/privacy" className="hover:text-slate-300">
              Privacy
            </a>
            <a href="/legal/terms" className="hover:text-slate-300">
              Terms
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
