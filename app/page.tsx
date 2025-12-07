import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="max-w-6xl mx-auto px-4 pb-16 pt-10 space-y-16">
        {/* Hero */}
        <section className="grid gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] items-center">
          <div className="space-y-6">
            <p className="inline-flex items-center rounded-full border border-sky-500/40 bg-sky-500/10 px-4 py-1 text-xs font-semibold tracking-[0.25em] uppercase text-sky-400">
              24/7 AI Reception · FrontDesk Agents
            </p>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold leading-tight">
              Turn every phone call
              <br />
              into booked revenue —{" "}
              <span className="text-sky-400">automatically.</span>
            </h1>

            <p className="text-base sm:text-lg text-slate-300 max-w-xl">
              FrontDesk Agents answers, qualifies, and books your best leads
              24/7 so your team only talks to people ready to buy. No missed
              calls, no lost cases, no “sorry, we&apos;re closed”.
            </p>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/demo"
                className="inline-flex items-center justify-center rounded-xl bg-sky-500 px-6 py-3 text-sm font-semibold text-slate-950 hover:bg-sky-400 transition"
              >
                Book a live demo
              </Link>
              <a
                href="tel:+12164804413"
                className="inline-flex items-center justify-center rounded-xl border border-slate-700 bg-slate-900 px-6 py-3 text-sm font-semibold text-slate-100 hover:border-sky-500 transition"
              >
                Call sales · +1 (216) 480-4413
              </a>
            </div>

            <p className="text-xs text-slate-400 max-w-md">
              Trusted by busy law firms, clinics, and service businesses that
              can&apos;t afford missed calls.
            </p>
          </div>

          {/* Hero image */}
          <div className="relative w-full max-w-xl mx-auto aspect-[16/10] rounded-3xl border border-slate-800 bg-slate-900/60 overflow-hidden">
            <Image
              src="/images/premium/hero-dashboard.png"
              alt="FrontDesk Agents live AI reception dashboard"
              fill
              className="object-cover"
              priority
            />
          </div>
        </section>

        {/* Live dashboard teaser */}
        <section className="rounded-3xl border border-slate-800 bg-slate-900/60 px-4 py-5 sm:px-6 sm:py-6 space-y-4">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-xs font-semibold tracking-[0.25em] uppercase text-sky-400">
                Live AI Reception Dashboard
              </p>
              <p className="text-sm text-slate-300">
                See calls, bookings, and missed-call savings in real time.
              </p>
            </div>
            <span className="inline-flex items-center rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-400">
              ● Online · 24/7
            </span>
          </div>
        </section>
      </div>
    </main>
  );
}
