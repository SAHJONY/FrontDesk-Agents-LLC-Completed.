import Link from "next/link";
import Image from "next/image";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-950 to-slate-900 text-slate-50">
      {/* Top nav */}
      <header className="w-full border-b border-slate-800/80 bg-slate-950/80 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-8">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-xl bg-sky-500/20 ring-1 ring-sky-500/40 flex items-center justify-center text-sky-300 text-sm font-bold">
              FA
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-semibold leading-tight">
                FrontDesk <span className="text-sky-400">Agents</span>
              </span>
              <span className="text-[11px] uppercase tracking-[0.22em] text-slate-500">
                AI Voice Receptionist • 24/7
              </span>
            </div>
          </div>

          <nav className="hidden items-center gap-6 text-xs font-medium text-slate-300 md:flex">
            <Link href="/industries" className="hover:text-white">
              Industries
            </Link>
            <Link href="/pricing" className="hover:text-white">
              Pricing
            </Link>
            <Link href="/support" className="hover:text-white">
              Support
            </Link>
            <Link href="/login" className="text-slate-300 hover:text-white">
              Log in
            </Link>
            <Link
              href="/setup"
              className="rounded-full bg-sky-500 px-4 py-1.5 text-xs font-semibold text-slate-950 hover:bg-sky-400"
            >
              Get started
            </Link>
          </nav>

          <div className="flex items-center gap-2 md:hidden">
            <Link
              href="/login"
              className="rounded-full border border-slate-700 px-3 py-1 text-[11px]"
            >
              Log in
            </Link>
          </div>
        </div>
      </header>

      {/* Hero section */}
      <section className="mx-auto flex max-w-7xl flex-col gap-10 px-4 pb-20 pt-10 md:flex-row md:items-center md:justify-between md:px-8 md:pt-16">
        {/* Left column */}
        <div className="max-w-xl space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-sky-500/40 bg-sky-500/10 px-3 py-1 text-[11px] font-medium text-sky-200">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            Live 24/7 AI Receptionist • Phone, SMS & WhatsApp
          </div>

          <h1 className="text-balance text-3xl font-semibold tracking-tight text-slate-50 md:text-4xl lg:text-5xl">
            Turn every missed call into{" "}
            <span className="text-sky-400">revenue</span>, not lost business.
          </h1>

          <p className="text-sm leading-relaxed text-slate-300 md:text-base">
            FrontDesk Agents answers, qualifies and schedules every lead{" "}
            <span className="text-sky-200 font-medium">in real time</span>.
            Your clients speak with a natural AI receptionist that never sleeps,
            never forgets, and speaks their language.
          </p>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link
              href="/setup"
              className="inline-flex items-center justify-center rounded-full bg-sky-500 px-6 py-2 text-sm font-semibold text-slate-950 shadow-lg shadow-sky-500/30 hover:bg-sky-400"
            >
              Launch my AI receptionist
            </Link>
            <Link
              href="/demo"
              className="inline-flex items-center justify-center rounded-full border border-slate-600 bg-slate-900/60 px-5 py-2 text-sm text-slate-100 hover:border-sky-500 hover:text-sky-200"
            >
              Watch 2-minute demo →
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-4 text-xs text-slate-400 md:grid-cols-3">
            <div>
              <div className="text-sm font-semibold text-sky-200">
                24/7 coverage
              </div>
              <div>Never miss another lead, even at 2:00 AM.</div>
            </div>
            <div>
              <div className="text-sm font-semibold text-sky-200">
                Multilingual
              </div>
              <div>English & Spanish out of the box.</div>
            </div>
            <div>
              <div className="text-sm font-semibold text-sky-200">
                Plug & play
              </div>
              <div>Connect your number and start in minutes.</div>
            </div>
          </div>
        </div>

        {/* Right column – premium visual */}
        <div className="relative mt-8 w-full max-w-md md:mt-0 md:max-w-lg">
          <div className="absolute -inset-8 -z-10 rounded-3xl bg-sky-500/20 blur-3xl" />
          <div className="overflow-hidden rounded-3xl border border-slate-800 bg-slate-950/80 shadow-2xl shadow-sky-900/40">
            <div className="border-b border-slate-800 bg-slate-900/80 px-4 py-3 text-xs text-slate-300">
              Live call dashboard • ALEX (AI Agent) is active
            </div>
            <div className="relative aspect-[4/3]">
              <Image
                src="/images/premium/frontdesk-dashboard-hero.jpg"
                alt="FrontDesk Agents AI call dashboard"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-3 text-[11px] text-slate-300">
            <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-3">
              <div className="text-[10px] uppercase tracking-[0.16em] text-slate-500">
                Sample call
              </div>
              <div className="mt-1 text-slate-100">
                “Hi, this is ALEX from FrontDesk Agents. I can help you book an
                appointment right now…”
              </div>
            </div>
            <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-3">
              <div className="text-[10px] uppercase tracking-[0.16em] text-slate-500">
                Owner console
              </div>
              <div className="mt-1 text-slate-100">
                See every call, every transcript and every booked appointment in
                one place.
              </div>
              <div className="mt-2 text-[10px] text-sky-300">
                Your login: <span className="font-mono">/owner</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust strip */}
      <section className="border-t border-slate-800/80 bg-slate-950/90">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-5 text-[11px] text-slate-500 md:flex-row md:items-center md:justify-between md:px-8">
          <div className="uppercase tracking-[0.22em] text-slate-500">
            BUILT FOR SERVICE BUSINESSES THAT LIVE ON THE PHONE
          </div>
          <div className="flex flex-wrap gap-3 text-[11px] text-slate-400">
            <span>Law firms</span>
            <span className="h-3 w-px bg-slate-700" />
            <span>Medical & dental clinics</span>
            <span className="h-3 w-px bg-slate-700" />
            <span>Home services & contractors</span>
            <span className="h-3 w-px bg-slate-700" />
            <span>Real estate & property management</span>
          </div>
        </div>
      </section>
    </main>
  );
}
