// app/page.tsx
import Link from "next/link";
import AISetupForm from "./components/AISetupForm";
import PricingTable from "./components/PricingTable";
import SystemStatusBar from "./components/SystemStatusBar";
import ThemeToggle from "./components/ThemeToggle";

const lang: "en" = "en";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      {/* Top status / theme */}
      <div className="border-b border-slate-800 bg-slate-950/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <span className="text-sm font-semibold text-cyan-400">
              FrontDesk Agents
            </span>
            <span className="rounded-full bg-cyan-500/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-cyan-300">
              AI PHONE OS
            </span>
          </div>
          <div className="flex items-center gap-4">
            <SystemStatusBar />
            <ThemeToggle />
          </div>
        </div>
      </div>

      {/* Hero */}
      <section className="border-b border-slate-800 bg-gradient-to-b from-slate-950 via-slate-950 to-slate-950/90">
        <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 py-14 lg:flex-row lg:items-center">
          <div className="flex-1">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-cyan-400">
              AI PHONE OS • INBOUND & OUTBOUND
            </p>
            <h1 className="mt-4 text-3xl font-semibold leading-tight text-slate-50 sm:text-4xl lg:text-5xl">
              Turn every call into booked revenue
              <span className="text-cyan-400"> in under 60 seconds.</span>
            </h1>
            <p className="mt-4 max-w-xl text-sm text-slate-300 sm:text-base">
              FrontDesk Agents is the AI PHONE OS that answers, qualifies,
              routes and books clients for you — 24/7, in multiple languages,
              with human-like voice and memory.
            </p>

            <ul className="mt-5 space-y-1 text-sm text-slate-200">
              <li>• No more missed calls or voicemails.</li>
              <li>• Instant booking into your calendar and CRM.</li>
              <li>
                • Voice-first intelligence with low-latency, human-like
                turn-taking.
              </li>
              <li>
                • Unified customer profile across phone, SMS, WhatsApp, and
                email.
              </li>
            </ul>

            {/* CTAs with anchors */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href="#pricing" className="btn-primary">
                Start Free Trial
              </a>
              <a href="#setup" className="btn-secondary">
                Request Enterprise Demo
              </a>
            </div>

            <p className="mt-3 text-xs text-slate-400">
              Built for medical, legal, real estate, and high-velocity B2B
              teams.
            </p>
          </div>

          {/* Simple hero visual placeholder (kept minimal) */}
          <div className="flex-1">
            <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-400">
                AI Receptionist Live View
              </p>
              <div className="mt-3 rounded-2xl bg-slate-950/80 p-3 text-xs text-slate-200">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-slate-50">
                    New inbound call
                  </span>
                  <span className="rounded-full bg-emerald-500/15 px-2 py-0.5 text-[10px] font-medium text-emerald-300">
                    Qualified Lead
                  </span>
                </div>
                <p className="mt-2 text-[11px] text-slate-300">
                  “Hi Ana, this is your AI receptionist. I can book your
                  consultation for tomorrow at 3:00 PM or Thursday at 10:30 AM.
                  Which works better for you?”
                </p>
                <p className="mt-3 text-[11px] text-slate-400">
                  • Low-latency, human-like turn-taking  
                  • Context carried across calls, SMS and email  
                  • Automatic booking into your calendar
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust & Compliance section */}
      <section
        id="trust"
        className="border-y border-slate-800 bg-slate-950/60 py-16"
      >
        <div className="mx-auto max-w-5xl px-4">
          <h2 className="text-center text-xs font-semibold uppercase tracking-[0.25em] text-cyan-400">
            Trust &amp; Compliance
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
                Built following SOC 2 Type II best practices for access
                control, encryption and audit logs to support your compliance
                journey.
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

      {/* Industries section (simple) */}
      <section className="bg-slate-950 py-14">
        <div className="mx-auto max-w-5xl px-4">
          <h2 className="text-center text-xs font-semibold uppercase tracking-[0.25em] text-cyan-400">
            Built for High-ROI Verticals
          </h2>
          <p className="mt-4 text-center text-xl font-semibold text-slate-50">
            Medical, legal, real estate, and high-velocity B2B teams.
          </p>

          <div className="mt-8 grid gap-6 md:grid-cols-3">
            <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5 text-sm">
              <p className="font-semibold text-slate-50">Medical</p>
              <p className="mt-2 text-slate-300">
                New patient intake, recalls, treatment plan follow-ups and
                no-show winback.
              </p>
            </div>
            <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5 text-sm">
              <p className="font-semibold text-slate-50">Legal</p>
              <p className="mt-2 text-slate-300">
                Case screening, qualification and calendar booking for
                high-value consults.
              </p>
            </div>
            <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5 text-sm">
              <p className="font-semibold text-slate-50">Real Estate &amp; B2B</p>
              <p className="mt-2 text-slate-300">
                Lead qualification, showings, pipeline follow-up and outbound
                campaigns.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing section */}
      <section
        id="pricing"
        className="border-y border-slate-800 bg-slate-950 py-16"
      >
        <div className="mx-auto max-w-5xl px-4">
          <h2 className="text-center text-xs font-semibold uppercase tracking-[0.25em] text-cyan-400">
            Pricing
          </h2>
          <p className="mt-4 text-center text-2xl font-semibold text-slate-50">
            Value-based pricing with scalable setup fees.
          </p>
          <p className="mt-3 text-center text-sm text-slate-300">
            Start small, then scale into full AI PHONE OS with Cross-Channel
            Memory, ATE and HIL as you grow.
          </p>

          <div className="mt-8">
            <PricingTable />
          </div>
        </div>
      </section>

      {/* Setup section */}
      <section
        id="setup"
        className="bg-slate-950 py-16"
      >
        <div className="mx-auto max-w-5xl px-4">
          <h2 className="text-center text-xs font-semibold uppercase tracking-[0.25em] text-cyan-400">
            Setup
          </h2>
          <p className="mt-4 text-center text-2xl font-semibold text-slate-50">
            Get your custom AI PHONE OS blueprint.
          </p>
          <p className="mt-3 text-center text-sm text-slate-300">
            Share a few details about your business and call volume. We&apos;ll
            map you to the right tier and design an AI playbook tailored to
            your workflow.
          </p>

          <div className="mt-8">
            <AISetupForm lang={lang} />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-slate-950 py-6">
        <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-3 px-4 text-xs text-slate-500 sm:flex-row">
          <span>© {new Date().getFullYear()} FrontDesk Agents, LLC.</span>
          <div className="flex gap-4">
            <Link href="#trust" className="hover:text-cyan-300">
              Trust &amp; Compliance
            </Link>
            <Link href="#pricing" className="hover:text-cyan-300">
              Pricing
            </Link>
            <a
              href="mailto:sales@frontdeskagents.com"
              className="hover:text-cyan-300"
            >
              Contact Sales
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
