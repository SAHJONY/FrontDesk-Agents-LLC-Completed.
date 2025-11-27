// app/page.tsx
import Link from "next/link";
import AISetupForm from "./components/AISetupForm";
import PricingTable from "./components/PricingTable";
import SystemStatusBar from "./components/SystemStatusBar";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-50">
      {/* TOP STATUS BAR */}
      <SystemStatusBar />

      {/* HERO */}
      <section className="mx-auto flex max-w-6xl flex-col gap-10 px-4 pb-16 pt-10 md:flex-row md:items-center">
        <div className="flex-1">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300">
            GLOBAL AI PHONE OS · 24/7 · MULTILINGUAL
          </p>

          <h1 className="mt-3 text-3xl font-bold leading-tight sm:text-4xl">
            Turn every call, WhatsApp, and email into{" "}
            <span className="text-cyan-300">booked revenue</span> in under 60
            seconds.
          </h1>

          <p className="mt-4 text-sm text-slate-300">
            FrontDesk Agents is the{" "}
            <span className="font-semibold">AI PHONE OS</span> that answers,
            qualifies, routes and books clients for you — 24/7, in multiple
            languages, with human-like voice and{" "}
            <span className="font-semibold">Cross-Channel Contextual Memory</span>.
          </p>

          <ul className="mt-4 space-y-1 text-sm text-slate-200">
            <li>• No more missed calls or voicemails.</li>
            <li>• Instant booking into your calendar and CRM.</li>
            <li>
              • Voice-first intelligence with{" "}
              <span className="font-semibold">
                low-latency, human-like turn-taking
              </span>
              .
            </li>
            <li>
              • <span className="font-semibold">Unified Customer Profile</span>{" "}
              across phone, SMS, WhatsApp, and email.
            </li>
          </ul>

          {/* MAIN CTAS – FIXED ROUTES */}
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/setup"
              className="btn-primary inline-flex items-center justify-center px-6 py-3 text-sm font-semibold"
            >
              Start Free Trial
            </Link>
            <Link
              href="/setup?plan=enterprise"
              className="btn-secondary inline-flex items-center justify-center px-6 py-3 text-sm font-semibold"
            >
              Request Enterprise Demo
            </Link>
          </div>

          <p className="mt-4 text-xs text-slate-400">
            Built for medical, legal, real estate, and high-velocity B2B teams.
          </p>
        </div>

        {/* QUICK PREVIEW / SETUP CARD */}
        <div className="flex-1">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5 shadow-xl">
            <h2 className="text-sm font-semibold text-slate-100">
              Design Your AI PHONE OS
            </h2>
            <p className="mt-1 text-xs text-slate-400">
              Get your custom AI receptionist blueprint in under 60 seconds.
            </p>

            <div className="mt-4">
              <AISetupForm lang="en" />
            </div>

            <p className="mt-3 text-[11px] text-slate-500">
              Tell us about your industry and call volume. We automatically map
              you to the right plan and onboarding flow.
            </p>
          </div>
        </div>
      </section>

      {/* TRUST & COMPLIANCE STRIP */}
      <section className="border-y border-slate-800 bg-slate-900/60">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-4 text-xs text-slate-300 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <span className="font-semibold text-slate-100">Trust & Compliance</span>{" "}
            · SOC 2 Type II–ready architecture, GDPR/CCPA-aware data handling,
            and audit-friendly logging for regulated teams.
          </div>
          <div className="flex flex-wrap gap-3 text-[11px] text-slate-400">
            <span>Healthcare · Law · Financial Services · Multi-location brands</span>
          </div>
        </div>
      </section>

      {/* INDUSTRIES */}
      <section className="mx-auto max-w-6xl px-4 py-12">
        <h2 className="text-lg font-semibold">
          Built for high-value, high-intent industries.
        </h2>
        <p className="mt-2 text-sm text-slate-300">
          FrontDesk Agents qualifies, routes, and books clients for medical,
          legal, real estate, SaaS, home services, and more — tuned by industry,
          geography, and language.
        </p>

        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-4">
            <h3 className="text-sm font-semibold text-cyan-300">
              Medical & Dental
            </h3>
            <p className="mt-2 text-xs text-slate-300">
              Fill the calendar, eliminate no-shows, and let the AI handle
              insurance pre-qualification and reminders.
            </p>
          </div>
          <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-4">
            <h3 className="text-sm font-semibold text-cyan-300">Law Firms</h3>
            <p className="mt-2 text-xs text-slate-300">
              Capture every inbound lead, route by practice area, and sync
              notes straight into your case management tools.
            </p>
          </div>
          <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-4">
            <h3 className="text-sm font-semibold text-cyan-300">
              Real Estate & High-velocity B2B
            </h3>
            <p className="mt-2 text-xs text-slate-300">
              Qualify buyers and sellers, book showings, and trigger outbound
              follow-ups from missed opportunities.
            </p>
          </div>
        </div>
      </section>

      {/* AI PHONE OS FEATURE BLOCK */}
      <section className="mx-auto max-w-6xl px-4 pb-12">
        <h2 className="text-lg font-semibold">Inside the AI PHONE OS.</h2>
        <p className="mt-2 text-sm text-slate-300">
          A full operating system for inbound and outbound conversations — not
          just another call bot.
        </p>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-4">
            <h3 className="text-sm font-semibold text-cyan-300">
              Voice-first Intelligence
            </h3>
            <p className="mt-2 text-xs text-slate-300">
              Low-latency, human-like turn-taking so clients speak naturally,
              without robotic pauses or talk-over.
            </p>
          </div>
          <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-4">
            <h3 className="text-sm font-semibold text-cyan-300">
              Cross-Channel Contextual Memory
            </h3>
            <p className="mt-2 text-xs text-slate-300">
              Every call, SMS, WhatsApp, and email feeds a{" "}
              <span className="font-semibold">Unified Customer Profile</span>,
              so the AI always knows who is calling and why.
            </p>
          </div>
          <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-4">
            <h3 className="text-sm font-semibold text-cyan-300">
              Autonomous Task Execution (ATE)
            </h3>
            <p className="mt-2 text-xs text-slate-300">
              The AI follows your rules: qualify, route, book directly into your
              calendar/CRM, or trigger workflows — without human hand-offs.
            </p>
          </div>
        </div>
      </section>

      {/* PRICING SECTION (ANCHOR) */}
      <section id="pricing" className="mx-auto max-w-6xl px-4 pb-16">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-lg font-semibold">Transparent, value-based pricing.</h2>
            <p className="mt-2 text-sm text-slate-300">
              Start with a free trial, then scale to Enterprise with setup fees,
              volume pricing, and premium routing options.
            </p>
          </div>
          <div className="flex gap-3 text-xs">
            <Link href="/setup" className="btn-primary px-4 py-2">
              Start Free Trial
            </Link>
            <Link
              href="/setup?plan=enterprise"
              className="btn-secondary px-4 py-2"
            >
              Talk to Sales
            </Link>
          </div>
        </div>

        <div className="mt-6">
          <PricingTable />
        </div>
      </section>
    </main>
  );
}
