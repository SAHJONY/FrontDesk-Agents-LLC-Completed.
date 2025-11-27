// app/page.tsx
import Link from "next/link";
import { IndustriesGrid } from "@/components/IndustriesGrid";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-50">
      {/* HERO SECTION */}
      <section className="border-b border-slate-900 bg-gradient-to-b from-slate-950 via-slate-950 to-slate-900/70">
        <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 py-16 lg:flex-row lg:items-center">
          {/* LEFT: COPY */}
          <div className="flex-1">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-cyan-400">
              AI PHONE OS · FRONTDESK AGENTS
            </p>
            <h1 className="mt-4 text-3xl font-semibold leading-tight text-slate-50 sm:text-4xl lg:text-5xl">
              Turn every call into booked revenue{" "}
              <span className="text-cyan-400">in under 60 seconds.</span>
            </h1>
            <p className="mt-4 text-sm text-slate-300 sm:text-base">
              FrontDesk Agents is your always-on AI PHONE OS that answers,
              qualifies and books calls across phone, WhatsApp and SMS — with
              human-like voice, cross-channel memory and revenue-first logic.
            </p>

            <ul className="mt-4 space-y-2 text-sm text-slate-300">
              <li>• 24/7 AI receptionist trained on your business.</li>
              <li>• Low-latency, human-like turn-taking on every call.</li>
              <li>• Unified customer profile across calls, SMS, and WhatsApp.</li>
            </ul>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="#pricing"
                className="inline-flex items-center justify-center rounded-lg bg-cyan-500 px-5 py-2.5 text-sm font-semibold text-slate-950 shadow-lg shadow-cyan-500/30 hover:bg-cyan-400"
              >
                Start Free Trial
              </a>
              <a
                href="#setup"
                className="inline-flex items-center justify-center rounded-lg border border-slate-600 px-5 py-2.5 text-sm font-semibold text-slate-50 hover:border-cyan-400 hover:text-cyan-300"
              >
                Request Enterprise Demo
              </a>
            </div>

            <p className="mt-3 text-xs text-slate-400">
              Built for medical, legal, real-estate and high-velocity B2B teams
              that can’t afford to miss a call.
            </p>
          </div>

          {/* RIGHT: HERO IMAGE */}
          <div className="flex-1">
            <div className="relative h-64 w-full max-w-md overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/60 lg:h-80 lg:max-w-lg">
              <img
                src="/08E6E2CC-933F-448F-96AA-E2CAC6AC7598.png"
                alt="FrontDesk Agents AI PHONE OS in action"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* TRUST & COMPLIANCE SECTION */}
      <section
        id="trust"
        className="border-y border-slate-800 bg-slate-950/60 py-16"
      >
        <div className="mx-auto max-w-5xl px-4">
          <h2 className="text-center text-xs font-semibold uppercase tracking-[0.25em] text-cyan-400">
            Trust & Compliance
          </h2>
          <p className="mt-4 text-center text-2xl font-semibold text-slate-50">
            Enterprise-grade security for regulated industries.
          </p>
          <p className="mt-3 text-center text-slate-300">
            FrontDesk Agents is designed for medical, legal, real-estate and
            high-velocity B2B teams that require strict privacy, auditability
            and compliance-ready infrastructure.
          </p>

          <div className="mt-8 grid gap-6 md:grid-cols-3">
            <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5">
              <h3 className="text-sm font-semibold text-slate-50">
                SOC 2 Type II–Ready Architecture
              </h3>
              <p className="mt-2 text-sm text-slate-300">
                Built following SOC 2 Type II best practices for access control,
                encryption and audit logs to support your compliance journey.
              </p>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5">
              <h3 className="text-sm font-semibold text-slate-50">
                GDPR / CCPA–Ready
              </h3>
              <p className="mt-2 text-sm text-slate-300">
                Data-minimization, regional routing and right-to-be-forgotten
                workflows to help you stay aligned with GDPR and CCPA.
              </p>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5">
              <h3 className="text-sm font-semibold text-slate-50">
                Human-in-the-Loop (HIL) as a Service
              </h3>
              <p className="mt-2 text-sm text-slate-300">
                Optional human escalation layer for sensitive flows, providing a
                safety net and quality guarantee for high-stakes conversations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* INDUSTRIES SECTION */}
      <IndustriesGrid />

      {/* PRICING SECTION */}
      <section
        id="pricing"
        className="border-y border-slate-800 bg-slate-950/40 py-16"
      >
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-center text-xs font-semibold uppercase tracking-[0.25em] text-cyan-400">
            Pricing
          </h2>
          <p className="mt-3 text-center text-2xl font-semibold text-slate-50">
            Price based on value, not minutes.
          </p>
          <p className="mt-3 text-center text-sm text-slate-300">
            Start with a focused pilot, then scale to a full AI PHONE OS across
            locations and channels.
          </p>

          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {/* Starter */}
            <div className="flex flex-col rounded-2xl border border-slate-800 bg-slate-900/70 p-6">
              <p className="text-xs font-semibold uppercase tracking-wide text-cyan-400">
                Starter
              </p>
              <p className="mt-2 text-2xl font-semibold text-slate-50">
                $399<span className="text-sm text-slate-400"> /month</span>
              </p>
              <p className="text-xs text-slate-400">+ $399 one-time setup</p>
              <p className="mt-3 text-sm text-slate-300">
                For solo and small clinics. 1 AI receptionist, 1 inbox, 24/7 in
                one language.
              </p>
              <ul className="mt-4 space-y-2 text-xs text-slate-300">
                <li>• 1 AI phone agent</li>
                <li>• Basic call handling & booking</li>
                <li>• Call summaries by email</li>
              </ul>
            </div>

            {/* Professional */}
            <div className="flex flex-col rounded-2xl border border-cyan-500 bg-slate-900 p-6 shadow-lg shadow-cyan-500/30">
              <p className="text-xs font-semibold uppercase tracking-wide text-cyan-400">
                Professional
              </p>
              <p className="mt-2 text-2xl font-semibold text-slate-50">
                $899<span className="text-sm text-slate-400"> /month</span>
              </p>
              <p className="text-xs text-slate-400">+ $1,299 setup</p>
              <p className="mt-3 text-sm text-slate-300">
                For multi-location clinics, law firms and growing B2B teams.
                Multilingual, CRM sync and advanced automations.
              </p>
              <ul className="mt-4 space-y-2 text-xs text-slate-300">
                <li>• Up to 3 AI agents and inboxes</li>
                <li>• CRM integration (HubSpot, etc.)</li>
                <li>• Advanced routing & qualification</li>
              </ul>
            </div>

            {/* Enterprise */}
            <div className="flex flex-col rounded-2xl border border-slate-800 bg-slate-900/70 p-6">
              <p className="text-xs font-semibold uppercase tracking-wide text-cyan-400">
                Enterprise
              </p>
              <p className="mt-2 text-2xl font-semibold text-slate-50">
                $1,799<span className="text-sm text-slate-400"> /month</span>
              </p>
              <p className="text-xs text-slate-400">+ from $3,500 setup</p>
              <p className="mt-3 text-sm text-slate-300">
                For large groups, DSOs, MSOs and national brands that need
                complex workflows and guarantees.
              </p>
              <ul className="mt-4 space-y-2 text-xs text-slate-300">
                <li>• Unlimited agents and inboxes</li>
                <li>• Custom workflows & SLAs</li>
                <li>• Dedicated success + HIL options</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* SETUP / LEAD CAPTURE SECTION */}
      <section
        id="setup"
        className="border-t border-slate-800 bg-slate-950 py-16"
      >
        <div className="mx-auto max-w-3xl px-4">
          <h2 className="text-center text-xs font-semibold uppercase tracking-[0.25em] text-cyan-400">
            Design Your AI PHONE OS
          </h2>
          <p className="mt-3 text-center text-2xl font-semibold text-slate-50">
            Get your custom AI agent blueprint in 24 hours.
          </p>
          <p className="mt-3 text-center text-sm text-slate-300">
            Tell us about your business and call volume. We’ll design a
            deployment that fits your workflows, compliance and revenue goals.
          </p>

          <form className="mt-8 space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="block text-xs font-semibold text-slate-200">
                  Business Name
                </label>
                <input
                  type="text"
                  className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-50 outline-none focus:border-cyan-400"
                  placeholder="Clinic / Firm / Agency"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-200">
                  Website
                </label>
                <input
                  type="url"
                  className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-50 outline-none focus:border-cyan-400"
                  placeholder="https://example.com"
                />
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="block text-xs font-semibold text-slate-200">
                  Main Contact Email
                </label>
                <input
                  type="email"
                  className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-50 outline-none focus:border-cyan-400"
                  placeholder="you@company.com"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-200">
                  Estimated Monthly Call Volume
                </label>
                <input
                  type="number"
                  className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-50 outline-none focus:border-cyan-400"
                  placeholder="e.g. 300"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-200">
                Industry
              </label>
              <select className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-50 outline-none focus:border-cyan-400">
                <option value="">Select one</option>
                <option value="medical">Medical / Dental</option>
                <option value="legal">Law Firm</option>
                <option value="real-estate">Real Estate / Investors</option>
                <option value="b2b-saas">B2B SaaS / Services</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-200">
                What should your AI receptionist do?
              </label>
              <textarea
                rows={4}
                className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-50 outline-none focus:border-cyan-400"
                placeholder="Example: Answer all new patient calls, pre-qualify, send forms by SMS, and book directly into our calendar."
              />
            </div>

            <button
              type="submit"
              className="mt-2 inline-flex w-full items-center justify-center rounded-lg bg-cyan-500 px-4 py-2.5 text-sm font-semibold text-slate-950 shadow-lg shadow-cyan-500/30 hover:bg-cyan-400 md:w-auto"
            >
              Get My AI Blueprint
            </button>

            <p className="mt-2 text-xs text-slate-400">
              By submitting this form you agree to be contacted about a demo and
              rollout plan. No spam, no resale of your data.
            </p>
          </form>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-slate-900 bg-slate-950 py-6">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-4 text-xs text-slate-500 sm:flex-row">
          <p>© {new Date().getFullYear()} FrontDesk Agents · AI PHONE OS</p>
          <div className="flex gap-4">
            <Link href="#trust" className="hover:text-cyan-300">
              Trust & Compliance
            </Link>
            <a
              href="mailto:info@frontdeskagents.com"
              className="hover:text-cyan-300"
            >
              Contact Us
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
