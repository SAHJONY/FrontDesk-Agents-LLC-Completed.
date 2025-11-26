// app/page.tsx
import Image from "next/image";
import Link from "next/link";
import ThemeToggle from "./components/ThemeToggle";

export default function MarketingHomePage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-50 dark:bg-slate-950">
      {/* Top gradient background */}
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.24),_transparent_55%),radial-gradient(circle_at_bottom,_rgba(15,23,42,1),_rgba(15,23,42,1))]" />

      {/* NAVBAR */}
      <header className="border-b border-slate-800/80 bg-slate-950/70 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-cyan-400/10 ring-1 ring-cyan-400/50">
              <span className="text-lg font-bold text-cyan-300">F</span>
            </div>
            <div className="flex flex-col leading-tight">
              <span className="text-sm font-semibold tracking-wide">
                FrontDesk Agents
              </span>
              <span className="text-[10px] uppercase tracking-[0.14em] text-slate-400">
                AI PHONE OS
              </span>
            </div>
          </Link>

          <div className="flex items-center gap-4">
            <nav className="hidden items-center gap-4 text-xs text-slate-300 md:flex">
              <Link href="#industries" className="hover:text-cyan-300">
                Industries
              </Link>
              <Link href="#how-it-works" className="hover:text-cyan-300">
                How it works
              </Link>
              <Link href="#pricing" className="hover:text-cyan-300">
                Pricing
              </Link>
              <Link href="#global" className="hover:text-cyan-300">
                Global
              </Link>
            </nav>
            <ThemeToggle />
            <Link
              href="/dashboard"
              className="hidden rounded-full bg-slate-100 px-4 py-1.5 text-xs font-semibold text-slate-900 shadow-sm hover:bg-cyan-400 hover:text-slate-900 md:inline-flex"
            >
              Go to App
            </Link>
          </div>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="border-b border-slate-800/70">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-10 md:grid-cols-2 md:py-16">
          {/* Left: copy */}
          <div className="flex flex-col justify-center space-y-5">
            <span className="inline-flex max-w-fit items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-cyan-200">
              GLOBAL AI PHONE OS · 24/7 · MULTILINGUAL
            </span>

            <h1 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
              Turn every call, WhatsApp, and email into{" "}
              <span className="bg-gradient-to-r from-cyan-300 to-sky-400 bg-clip-text text-transparent">
                booked revenue
              </span>{" "}
              in under 60 seconds.
            </h1>

            <p className="max-w-xl text-sm text-slate-300 sm:text-base">
              FrontDesk Agents is the{" "}
              <span className="font-semibold text-slate-100">
                AI PHONE OS
              </span>{" "}
              that answers, qualifies, and books clients for you — in any
              language, any country, across voice, WhatsApp, SMS, and email.
              Human-level reception, autonomous intelligence.
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="/setup"
                className="inline-flex items-center justify-center rounded-full bg-cyan-400 px-5 py-2 text-xs font-semibold text-slate-950 shadow-lg shadow-cyan-500/30 hover:bg-cyan-300"
              >
                Start 14-Day Trial
              </Link>
              <Link
                href="#demo"
                className="inline-flex items-center justify-center rounded-full border border-slate-600 bg-slate-900/60 px-4 py-2 text-xs font-medium text-slate-100 hover:border-cyan-400 hover:text-cyan-200"
              >
                Call Live Demo
              </Link>
              <span className="text-[11px] text-slate-400">
                No engineers needed. Keep your current phone numbers.
              </span>
            </div>

            <div className="mt-2 grid gap-3 text-[11px] text-slate-400 sm:grid-cols-3">
              <div>
                <p className="font-semibold text-slate-100">
                  +40% more booked leads
                </p>
                <p>From calls that used to go to voicemail.</p>
              </div>
              <div>
                <p className="font-semibold text-slate-100">
                  24/7 in 100+ languages
                </p>
                <p>Local voice + dialect for every region.</p>
              </div>
              <div>
                <p className="font-semibold text-slate-100">
                  Under 1s response
                </p>
                <p>Voice tuned for natural, human-like timing.</p>
              </div>
            </div>
          </div>

          {/* Right: hero image */}
          <div className="relative">
            <div className="absolute -inset-6 -z-10 rounded-3xl bg-cyan-500/10 blur-3xl" />
            <div className="overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/70 shadow-2xl shadow-cyan-500/20">
              <Image
                src="/premium/hero-office-global.jpg"
                alt="AI receptionist handling global calls in a modern office"
                width={1200}
                height={900}
                className="h-64 w-full object-cover sm:h-80 md:h-96"
                priority
              />
              <div className="border-t border-slate-800 bg-slate-900/90 px-4 py-3 text-xs text-slate-200">
                <div className="flex items-center justify-between">
                  <span className="font-semibold">Global AI Reception</span>
                  <span className="text-[10px] text-cyan-300">
                    Live in North America · LATAM · Europe
                  </span>
                </div>
                <p className="mt-1 text-[11px] text-slate-400">
                  Realistic voices, multilingual support, and business-grade
                  workflows. Every inquiry becomes a next step.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* INDUSTRIES SECTION */}
      <section id="industries" className="border-b border-slate-800/70">
        <div className="mx-auto max-w-6xl px-4 py-10 md:py-14">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="text-xl font-semibold text-slate-50">
                Built for high-value, high-intent industries.
              </h2>
              <p className="mt-1 max-w-xl text-sm text-slate-300">
                FrontDesk Agents qualifies, routes, and books clients for
                medical, legal, real estate, SaaS, home services, and more —
                tuned by industry, geography, and language.
              </p>
            </div>
            <div className="text-[11px] text-slate-400">
              <p>Vertical-optimized scripts, compliance, and routing.</p>
              <p>From solo office to global multi-location operations.</p>
            </div>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {/* Medical */}
            <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/70">
              <Image
                src="/premium/industries/medical-office.jpg"
                alt="Medical office staff assisted by AI receptionist"
                width={600}
                height={400}
                className="h-32 w-full object-cover"
              />
              <div className="px-4 py-3 text-xs">
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-cyan-300">
                  Medical & Dental
                </p>
                <p className="mt-1 text-slate-100">
                  Fill the calendar, eliminate no-shows.
                </p>
                <p className="mt-1 text-[11px] text-slate-400">
                  Appointment booking, insurance pre-qualification, and
                  reminders — 24/7, in your patients’ preferred language.
                </p>
              </div>
            </div>

            {/* Legal */}
            <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/70">
              <Image
                src="/premium/industries/legal-office.jpg"
                alt="Law firm team with AI receptionist managing calls"
                width={600}
                height={400}
                className="h-32 w-full object-cover"
              />
              <div className="px-4 py-3 text-xs">
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-cyan-300">
                  Law Firms
                </p>
                <p className="mt-1 text-slate-100">
                  Every intake call becomes a consultation.
                </p>
                <p className="mt-1 text-[11px] text-slate-400">
                  Triage cases, qualify leads, and capture full contact details
                  with compliance-aware workflows.
                </p>
              </div>
            </div>

            {/* Real Estate */}
            <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/70">
              <Image
                src="/premium/industries/real-estate-office.jpg"
                alt="Real estate agents supported by AI phone OS"
                width={600}
                height={400}
                className="h-32 w-full object-cover"
              />
              <div className="px-4 py-3 text-xs">
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-cyan-300">
                  Real Estate & Investing
                </p>
                <p className="mt-1 text-slate-100">
                  Never miss a motivated seller again.
                </p>
                <p className="mt-1 text-[11px] text-slate-400">
                  Handles inbound signs, PPC, and referrals. Qualifies,
                  schedules, and sends summaries to your CRM in seconds.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" className="border-b border-slate-800/70">
        <div className="mx-auto max-w-6xl px-4 py-10 md:py-14">
          <div className="grid gap-8 md:grid-cols-[1.4fr_1fr]">
            <div>
              <h2 className="text-xl font-semibold text-slate-50">
                From first ring to booked client — all in one OS.
              </h2>
              <p className="mt-1 max-w-xl text-sm text-slate-300">
                FrontDesk Agents doesn’t just answer calls. It runs the entire
                workflow: answer, understand, qualify, book, and sync — across
                all channels.
              </p>

              <ol className="mt-5 space-y-3 text-sm text-slate-200">
                <li>
                  <span className="mr-2 rounded-full bg-cyan-500/20 px-2 py-0.5 text-[10px] font-semibold text-cyan-300">
                    1
                  </span>
                  Incoming call, WhatsApp, SMS, or email hits the AI PHONE OS.
                </li>
                <li>
                  <span className="mr-2 rounded-full bg-cyan-500/20 px-2 py-0.5 text-[10px] font-semibold text-cyan-300">
                    2
                  </span>
                  The system detects language, intent, and urgency in real time.
                </li>
                <li>
                  <span className="mr-2 rounded-full bg-cyan-500/20 px-2 py-0.5 text-[10px] font-semibold text-cyan-300">
                    3
                  </span>
                  It follows your rules: qualify, route, or book directly into
                  your calendar/CRM.
                </li>
                <li>
                  <span className="mr-2 rounded-full bg-cyan-500/20 px-2 py-0.5 text-[10px] font-semibold text-cyan-300">
                    4
                  </span>
                  Summary and next steps are logged instantly for your team.
                </li>
              </ol>

              <div className="mt-4 rounded-xl border border-slate-800 bg-slate-900/70 p-4 text-[11px] text-slate-300">
                <p className="font-semibold text-slate-100">
                  Human-in-the-Loop when needed.
                </p>
                <p className="mt-1">
                  For sensitive or complex scenarios, the system can escalate to
                  your team in one click or warm-transfer the call — combining
                  AI speed with human judgment.
                </p>
              </div>
            </div>

            {/* Dashboard preview */}
            <div className="relative">
              <div className="absolute -inset-4 -z-10 rounded-3xl bg-cyan-500/10 blur-2xl" />
              <div className="overflow-hidden rounded-3xl border border-slate-800 bg-slate-950/80">
                <Image
                  src="/premium/dashboard-global-dark.jpg"
                  alt="FrontDesk Agents dashboard with global metrics"
                  width={900}
                  height={700}
                  className="h-56 w-full object-cover sm:h-64 md:h-72"
                />
                <div className="border-t border-slate-800 bg-slate-950/90 px-4 py-3 text-[11px] text-slate-300">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-slate-100">
                      System Metrics · Today
                    </span>
                    <span className="text-cyan-300">
                      42% contact rate · 19 booked · 3 escalations
                    </span>
                  </div>
                  <p className="mt-1">
                    Monitor calls, bookings, conversions, and revenue impact in
                    real time — per office, per country, per language.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PRICING PREVIEW */}
      <section id="pricing" className="border-b border-slate-800/70">
        <div className="mx-auto max-w-6xl px-4 py-10 md:py-14">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="text-xl font-semibold text-slate-50">
                Pricing that follows your volume — not your ambition.
              </h2>
              <p className="mt-1 max-w-xl text-sm text-slate-300">
                Start small, expand worldwide. All plans include 24/7 AI
                reception, multi-language handling, and access to the AI PHONE
                OS.
              </p>
            </div>
            <div className="text-[11px] text-slate-400">
              <p>Billed monthly or annually. Setup fee for custom workflows.</p>
              <p>Enterprise plans available for global call centers.</p>
            </div>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {/* Starter */}
            <div className="flex flex-col rounded-2xl border border-slate-800 bg-slate-900/70 p-5 text-sm">
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400">
                Starter
              </p>
              <p className="mt-1 text-lg font-semibold text-slate-50">
                $249 – $349 /month
              </p>
              <p className="text-[11px] text-slate-400">Setup: $399 – $599</p>
              <p className="mt-2 text-xs text-slate-300">
                For solo offices and small businesses needing 24/7 reception and
                basic automation.
              </p>
            </div>

            {/* Pro */}
            <div className="flex flex-col rounded-2xl border border-cyan-500/60 bg-slate-900/80 p-5 text-sm shadow-lg shadow-cyan-500/30">
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-cyan-300">
                Pro
              </p>
              <p className="mt-1 text-lg font-semibold text-slate-50">
                $699 – $999 /month
              </p>
              <p className="text-[11px] text-slate-400">
                Setup: $1,299 – $1,999
              </p>
              <p className="mt-2 text-xs text-slate-300">
                For growing teams with multi-channel needs, CRM sync, and
                advanced routing by language and region.
              </p>
            </div>

            {/* Enterprise */}
            <div className="flex flex-col rounded-2xl border border-slate-800 bg-slate-900/70 p-5 text-sm">
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400">
                Enterprise
              </p>
              <p className="mt-1 text-lg font-semibold text-slate-50">
                $1,999 – $4,999+ /month
              </p>
              <p className="text-[11px] text-slate-400">
                Setup: $3,500 – $7,500+
              </p>
              <p className="mt-2 text-xs text-slate-300">
                For multi-country, high-volume operations requiring autonomous
                task execution, HIL coverage, and custom model tuning.
              </p>
            </div>
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-3 text-[11px] text-slate-400">
            <span>Overage: $0.10–$0.15 per minute beyond included usage.</span>
            <span className="text-cyan-300">
              Vertical multipliers for Legal, Medical, and B2B SaaS apply.
            </span>
          </div>
        </div>
      </section>

      {/* GLOBAL SECTION */}
      <section id="global" className="border-b border-slate-800/70">
        <div className="mx-auto max-w-6xl px-4 py-10 md:py-14">
          <div className="grid gap-8 md:grid-cols-[1.4fr_1fr]">
            <div>
              <h2 className="text-xl font-semibold text-slate-50">
                Ready for worldwide expansion — languages, accents, and all.
              </h2>
              <p className="mt-1 max-w-xl text-sm text-slate-300">
                FrontDesk Agents is designed for global operations: multiple
                time zones, currencies, and dialects. Spanish from Mexico is
                not the same as Spanish from Madrid — and the system respects
                that.
              </p>
              <ul className="mt-4 space-y-2 text-xs text-slate-300">
                <li>• Multi-language handling across voice, chat, and email.</li>
                <li>• Region-aware greetings, tone, and cultural norms.</li>
                <li>• Configurable per-location rules and schedules.</li>
              </ul>
            </div>
            <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4 text-[11px] text-slate-300">
              <p className="font-semibold text-slate-100" id="demo">
                Live Demo
              </p>
              <p className="mt-1">
                Call your dedicated demo number to experience the AI PHONE OS:
              </p>
              <p className="mt-2 text-sm font-mono text-cyan-300">
                +1 (216) 480-4413
              </p>
              <p className="mt-2">
                Ask in English, Spanish, or a mix. Let the system qualify you as
                if you were a real lead.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-slate-800 bg-slate-950/90">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-5 text-[11px] text-slate-500 md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} FrontDesk Agents. AI PHONE OS for
            global customer communication.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <span>Worldwide · EN · ES · + more coming</span>
            <Link href="/dashboard" className="text-cyan-300 hover:text-cyan-200">
              Login to App
            </Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
