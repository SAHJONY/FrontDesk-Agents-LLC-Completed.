import Image from "next/image";
import Link from "next/link";
import AISetupForm from "./components/AISetupForm";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-50">
      {/* Top gradient / background */}
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[420px] bg-gradient-to-b from-cyan-500/20 via-slate-950 to-slate-950 blur-3xl" />

      {/* Page container */}
      <div className="mx-auto flex min-h-screen max-w-6xl flex-col px-4 pb-16 pt-6">
        {/* Header */}
        <header className="mb-10 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500/10 ring-1 ring-cyan-400/40">
              <span className="text-xl font-bold text-cyan-300">FD</span>
            </div>
            <div>
              <p className="text-sm font-semibold tracking-tight">
                FrontDesk Agents
              </p>
              <p className="text-xs text-slate-400">AI PHONE OS</p>
            </div>
          </div>

          <nav className="hidden items-center gap-6 text-xs text-slate-300 sm:flex">
            <a href="#features" className="hover:text-cyan-300">
              Features
            </a>
            <a href="#industries" className="hover:text-cyan-300">
              Industries
            </a>
            <a href="#pricing" className="hover:text-cyan-300">
              Pricing
            </a>
            <Link
              href="#get-started"
              className="rounded-full bg-cyan-500 px-4 py-1.5 text-xs font-semibold text-slate-950 shadow-lg shadow-cyan-500/30 hover:bg-cyan-400"
            >
              Start Free Trial
            </Link>
          </nav>
        </header>

        {/* Hero section */}
        <section className="grid flex-1 gap-10 md:grid-cols-[1.1fr,1fr] md:items-center">
          {/* Hero text */}
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-slate-900/60 px-3 py-1 text-[11px] text-cyan-200">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              Live • AI PHONE OS for businesses worldwide
            </div>

            <h1 className="mt-4 text-balance text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
              Turn every call into{" "}
              <span className="bg-gradient-to-r from-cyan-300 to-sky-500 bg-clip-text text-transparent">
                booked revenue
              </span>{" "}
              in under 60 seconds.
            </h1>

            <p className="mt-3 max-w-xl text-sm text-slate-300 sm:text-[15px]">
              FrontDesk Agents is your{" "}
              <span className="font-semibold text-cyan-200">
                AI PHONE OS
              </span>
              : it answers, qualifies, books, and follows up with your
              customers 24/7, in their own language, on every channel.
            </p>

            {/* CTA buttons (tu bloque) */}
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="#pricing"
                className="rounded-full bg-cyan-500 px-5 py-2 text-sm font-semibold text-slate-950 shadow-lg shadow-cyan-500/30 hover:bg-cyan-400"
              >
                Start Free Trial
              </a>
              <a
                href="/enterprise"
                className="rounded-full border border-slate-700 px-5 py-2 text-sm font-semibold text-slate-100 hover:border-cyan-400 hover:text-cyan-200"
              >
                Request Enterprise Demo
              </a>
            </div>

            {/* Worldwide + trust badges */}
            <div className="mt-6 flex flex-wrap items-center gap-4 text-[11px] text-slate-400">
              <span>🌍 Multilingual • North & Latin America, Europe & beyond</span>
              <span className="h-1 w-px bg-slate-700" />
              <span>✓ Missed-call recovery</span>
              <span className="h-1 w-px bg-slate-700" />
              <span>✓ Calendar & CRM integration</span>
            </div>
          </div>

          {/* Hero image */}
          <div className="relative h-[260px] w-full overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/60 shadow-2xl shadow-cyan-500/20 sm:h-[320px]">
            <Image
              src="/premium/hero-office.jpg"
              alt="AI reception team managing global customer calls in real time"
              fill
              className="object-cover"
              priority
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-900/10 to-transparent" />
            <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-[11px] text-slate-200">
              <p>Real people. Real calls. AI handling the heavy lifting.</p>
              <span className="rounded-full bg-slate-900/70 px-3 py-1 text-[10px] text-cyan-200">
                24/7 Autonomous Reception
              </span>
            </div>
          </div>
        </section>

        {/* Features */}
        <section id="features" className="mt-10 grid gap-4 md:grid-cols-3">
          <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-4">
            <h2 className="text-sm font-semibold text-cyan-300">
              Voice-first intelligence
            </h2>
            <p className="mt-2 text-xs text-slate-300">
              Natural, low-latency conversations that sound like a real human
              receptionist, with turn-taking optimized for business calls.
            </p>
          </div>
          <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-4">
            <h2 className="text-sm font-semibold text-cyan-300">
              Cross-channel memory
            </h2>
            <p className="mt-2 text-xs text-slate-300">
              The system remembers every interaction—call, WhatsApp, SMS,
              email—so customers never need to repeat themselves.
            </p>
          </div>
          <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-4">
            <h2 className="text-sm font-semibold text-cyan-300">
              Built for revenue, not just support
            </h2>
            <p className="mt-2 text-xs text-slate-300">
              Qualifies leads, books appointments, and routes high-intent
              callers directly to your team when it matters most.
            </p>
          </div>
        </section>

        {/* Industries */}
        <section id="industries" className="mt-12">
          <h2 className="text-sm font-semibold text-slate-100">
            Designed for high-value service businesses
          </h2>
          <p className="mt-1 text-xs text-slate-400">
            From solo practices to multi-location enterprises.
          </p>

          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            {/* Medical */}
            <div className="overflow-hidden rounded-xl border border-slate-800 bg-slate-900/70">
              <div className="relative h-28 w-full">
                <Image
                  src="/premium/medical-team.jpg"
                  alt="Medical and dental staff supported by AI receptionist"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-3">
                <p className="text-xs font-semibold text-slate-100">
                  Medical & Dental
                </p>
                <p className="mt-1 text-[11px] text-slate-400">
                  Capture every new patient call, pre-qualify, and book into
                  your calendar automatically.
                </p>
              </div>
            </div>

            {/* Law Firms */}
            <div className="overflow-hidden rounded-xl border border-slate-800 bg-slate-900/70">
              <div className="relative h-28 w-full">
                <Image
                  src="/premium/law-firm.jpg"
                  alt="Law firm team supported by AI PHONE OS"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-3">
                <p className="text-xs font-semibold text-slate-100">Law Firms</p>
                <p className="mt-1 text-[11px] text-slate-400">
                  Intake callers, qualify cases, and route emergencies without
                  missing critical opportunities.
                </p>
              </div>
            </div>

            {/* Real Estate */}
            <div className="overflow-hidden rounded-xl border border-slate-800 bg-slate-900/70">
              <div className="relative h-28 w-full">
                <Image
                  src="/premium/real-estate.jpg"
                  alt="Real estate agents on calls powered by AI"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-3">
                <p className="text-xs font-semibold text-slate-100">
                  Real Estate & Investment
                </p>
                <p className="mt-1 text-[11px] text-slate-400">
                  Never lose a motivated seller or buyer because of a missed
                  call again.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Setup + AISetupForm */}
        <section id="get-started" className="mt-12 grid gap-6 md:grid-cols-[1.1fr,1fr]">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
            <h2 className="text-sm font-semibold text-slate-100">
              Get your AI PHONE OS online in days, not months
            </h2>
            <p className="mt-2 text-xs text-slate-300">
              Tell us about your business, call volume, and goals. The system
              will design your ideal call flows, greeting scripts, and routing
              rules—ready for deployment.
            </p>
            <ul className="mt-3 space-y-1 text-[11px] text-slate-400">
              <li>• 24/7 coverage with human-quality conversations.</li>
              <li>• Multilingual support for your customer base worldwide.</li>
              <li>• Integrations with calendars, CRMs, and messaging.</li>
            </ul>
          </div>

          <div className="rounded-2xl border border-cyan-500/40 bg-slate-900/80 p-5 shadow-lg shadow-cyan-500/20">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-cyan-300">
              Quick Setup Form
            </p>
            <p className="mt-1 text-xs text-slate-300">
              Share a few details and the platform will propose your ideal AI
              receptionist configuration.
            </p>

            <div className="mt-3 text-[11px] text-slate-400">
              {/* Aquí usamos correctamente el prop lang */}
              <AISetupForm lang="en" />
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section id="pricing" className="mt-14">
          <h2 className="text-sm font-semibold text-slate-100">
            Pricing that follows your communication volume
          </h2>
          <p className="mt-1 text-xs text-slate-400">
            Value-based plans for small teams, growing operations, and
            enterprise deployments.
          </p>

          <div className="mt-4 grid gap-4 md:grid-cols-3">
            {/* Starter */}
            <div className="flex flex-col rounded-xl border border-slate-800 bg-slate-900/70 p-4">
              <p className="text-xs font-semibold text-slate-100">Starter</p>
              <p className="mt-1 text-lg font-semibold text-cyan-300">
                $249–$349
                <span className="text-xs text-slate-400"> /month</span>
              </p>
              <p className="text-[11px] text-slate-400">Setup: $399–$599</p>
              <ul className="mt-2 space-y-1 text-[11px] text-slate-300">
                <li>• 1 main phone line</li>
                <li>• Core automation & booking</li>
                <li>• Basic lead capture</li>
              </ul>
            </div>

            {/* Pro */}
            <div className="flex flex-col rounded-xl border border-cyan-400/50 bg-slate-900 p-4 shadow-lg shadow-cyan-500/20">
              <p className="text-xs font-semibold text-cyan-200">Pro</p>
              <p className="mt-1 text-lg font-semibold text-cyan-300">
                $699–$999
                <span className="text-xs text-slate-400"> /month</span>
              </p>
              <p className="text-[11px] text-slate-400">
                Setup: $1,299–$1,999
              </p>
              <ul className="mt-2 space-y-1 text-[11px] text-slate-200">
                <li>• Multi-channel (voice, SMS, WhatsApp)</li>
                <li>• CRM sync & persona shifting</li>
                <li>• Advanced workflows & routing</li>
              </ul>
              <button className="mt-3 rounded-full bg-cyan-500 px-4 py-1.5 text-xs font-semibold text-slate-950 hover:bg-cyan-400">
                Talk to sales
              </button>
            </div>

            {/* Enterprise */}
            <div className="flex flex-col rounded-xl border border-slate-800 bg-slate-900/70 p-4">
              <p className="text-xs font-semibold text-slate-100">
                Enterprise
              </p>
              <p className="mt-1 text-lg font-semibold text-cyan-300">
                $1,999–$4,999+
                <span className="text-xs text-slate-400"> /month</span>
              </p>
              <p className="text-[11px] text-slate-400">
                Setup: $3,500–$7,500+
              </p>
              <ul className="mt-2 space-y-1 text-[11px] text-slate-300">
                <li>• High-volume, multi-location operations</li>
                <li>• Full autonomous task execution</li>
                <li>• Human-in-the-loop and custom models</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-10 border-t border-slate-800 pt-4 text-[11px] text-slate-500">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p>© {new Date().getFullYear()} FrontDesk Agents · AI PHONE OS</p>
            <p>www.frontdeskagents.com</p>
          </div>
        </footer>
      </div>
    </main>
  );
}
