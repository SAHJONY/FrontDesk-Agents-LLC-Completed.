// app/page.tsx
import Image from "next/image";
import Link from "next/link";
import { IndustriesGrid } from "@/components/IndustriesGrid";
import { AISetupForm } from "@/components/AISetupForm";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-50">
      {/* HERO SECTION */}
      <section className="border-b border-slate-900 bg-gradient-to-b from-slate-950 via-slate-950 to-slate-900/60">
        <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 pb-16 pt-12 lg:flex-row lg:items-center lg:pt-16">
          {/* Copy */}
          <div className="max-w-xl">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-cyan-400">
              AI PHONE OS · FRONTDESK AGENTS
            </p>
            <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              Turn every call into booked revenue in under{" "}
              <span className="bg-gradient-to-r from-cyan-400 to-sky-300 bg-clip-text text-transparent">
                60 seconds
              </span>
              .
            </h1>
            <p className="mt-4 text-sm text-slate-300 sm:text-base">
              FrontDesk Agents is your autonomous AI Phone OS: answering,
              qualifying and booking clients 24/7 by voice, WhatsApp, SMS and
              email — in English and Spanish, for high-value industries
              worldwide.
            </p>

            <ul className="mt-4 space-y-1 text-sm text-slate-300">
              <li>• Medical, legal, real estate & high-velocity B2B.</li>
              <li>• Human-like voice, low-latency, natural turn-taking.</li>
              <li>• Cross-channel memory and CRM sync by design.</li>
            </ul>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href="#pricing" className="btn-primary">
                Start Free Trial
              </a>
              <a href="#setup" className="btn-secondary">
                Request Enterprise Demo
              </a>
            </div>

            <p className="mt-3 text-xs text-slate-400">
              No developers needed · Fully managed onboarding · Bilingual EN/ES
            </p>
          </div>

          {/* Hero image */}
          <div className="relative h-64 w-full sm:h-80 md:h-96 lg:w-[420px]">
            <Image
              src="/hero-office.jpg"
              alt="AI-powered global receptionist handling calls for modern businesses"
              fill
              priority
              sizes="(min-width: 1024px) 420px, 100vw"
              className="rounded-2xl border border-slate-800 object-cover shadow-[0_0_40px_rgba(56,189,248,0.25)]"
            />
          </div>
        </div>
      </section>

      {/* VALUE PILLARS */}
      <section className="border-b border-slate-900 bg-slate-950/80 py-10">
        <div className="mx-auto grid max-w-6xl gap-4 px-4 md:grid-cols-3">
          <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-4">
            <h2 className="text-sm font-semibold text-cyan-300">
              Voice-first intelligence
            </h2>
            <p className="mt-2 text-xs text-slate-300">
              Low-latency, human-like turn-taking tuned for medical, legal and
              sales conversations. ALEX sounds like a real receptionist, not a
              bot.
            </p>
          </div>
          <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-4">
            <h2 className="text-sm font-semibold text-cyan-300">
              Unified customer profile
            </h2>
            <p className="mt-2 text-xs text-slate-300">
              Cross-channel memory across phone, WhatsApp, SMS and email, with
              deep sync to your CRM so every interaction adds context.
            </p>
          </div>
          <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-4">
            <h2 className="text-sm font-semibold text-cyan-300">
              Built for revenue, not minutes
            </h2>
            <p className="mt-2 text-xs text-slate-300">
              Optimized to capture, qualify and book the right clients —
              turning lost calls into recurring revenue, 24/7.
            </p>
          </div>
        </div>
      </section>

      {/* INDUSTRIES GRID */}
      <section
        id="industries"
        className="border-b border-slate-900 bg-slate-950/90 py-12"
      >
        <div className="mx-auto max-w-6xl px-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-xs font-semibold uppercase tracking-[0.25em] text-cyan-400">
                Industries
              </h2>
              <p className="mt-2 text-2xl font-semibold tracking-tight">
                Designed for high-value, high-volume businesses.
              </p>
              <p className="mt-2 text-sm text-slate-300">
                From medical and legal to real estate and home services, ALEX
                adapts scripts, tone and workflows to your vertical.
              </p>
            </div>
            <div className="text-xs text-slate-400">
              <p>Multilingual, multi-location, multi-channel by default.</p>
              <p>Built for Mexico, U.S. & Latin America from day one.</p>
            </div>
          </div>

          <div className="mt-6">
            <IndustriesGrid />
          </div>
        </div>
      </section>

      {/* TRUST & COMPLIANCE */}
      <section
        id="trust"
        className="border-b border-slate-900 bg-slate-950/80 py-16"
      >
        <div className="mx-auto max-w-5xl px-4">
          <h2 className="text-center text-xs font-semibold uppercase tracking-[0.25em] text-cyan-400">
            Trust & Compliance
          </h2>
          <p className="mt-4 text-center text-2xl font-semibold text-slate-50">
            Enterprise-grade security for regulated industries.
          </p>
          <p className="mt-3 text-center text-sm text-slate-300">
            FrontDesk Agents is designed for medical, legal, real-estate and
            high-velocity B2B teams that require strict privacy, auditability
            and compliance-ready infrastructure.
          </p>

          <div className="mt-8 grid gap-6 md:grid-cols-3">
            <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5">
              <h3 className="text-sm font-semibold text-slate-50">
                SOC 2 Type II–Ready Architecture
              </h3>
              <p className="mt-2 text-xs text-slate-300">
                Built following SOC 2 Type II best practices for access control,
                encryption and audit logs to support your compliance journey.
              </p>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5">
              <h3 className="text-sm font-semibold text-slate-50">
                GDPR / CCPA–Ready
              </h3>
              <p className="mt-2 text-xs text-slate-300">
                Data-minimization, regional routing and right-to-be-forgotten
                workflows to help you stay aligned with GDPR and CCPA.
              </p>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5">
              <h3 className="text-sm font-semibold text-slate-50">
                Human-in-the-Loop (HIL) as a Service
              </h3>
              <p className="mt-2 text-xs text-slate-300">
                Optional human escalation layer for sensitive flows, providing a
                safety net and quality guarantee for high-stakes conversations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* QUICK SETUP / BLUEPRINT FORM */}
      <section
        id="setup"
        className="border-b border-slate-900 bg-slate-950/95 py-16"
      >
        <div className="mx-auto max-w-4xl px-4">
          <h2 className="text-center text-xs font-semibold uppercase tracking-[0.25em] text-cyan-400">
            Design Your AI PHONE OS
          </h2>
          <p className="mt-4 text-center text-2xl font-semibold">
            Get your custom AI agent blueprint in 24 hours.
          </p>
          <p className="mt-3 text-center text-sm text-slate-300">
            Tell us about your business, call volume and priorities. We’ll
            design a tailored AI receptionist — including scripts, flows and
            integration plan — and walk you through it live.
          </p>

          <div className="mt-8 rounded-2xl border border-slate-800 bg-slate-900/70 p-5 sm:p-6">
            {/* El componente ya existe en tu repo; aquí se le pasa lang="en" */}
            <AISetupForm lang="en" />
          </div>

          <p className="mt-3 text-center text-[11px] text-slate-500">
            By submitting, you agree to be contacted about FrontDesk Agents
            onboarding. No spam. No resale of your data.
          </p>
        </div>
      </section>

      {/* PRICING PREVIEW */}
      <section
        id="pricing"
        className="bg-slate-950 py-16"
      >
        <div className="mx-auto max-w-6xl px-4">
          <div className="flex flex-col items-center text-center">
            <h2 className="text-xs font-semibold uppercase tracking-[0.25em] text-cyan-400">
              Pricing
            </h2>
            <p className="mt-3 text-2xl font-semibold">
              Price based on value, not minutes.
            </p>
            <p className="mt-3 max-w-2xl text-sm text-slate-300">
              Whether you&apos;re a single clinic or a multi-location group,
              FrontDesk Agents scales from your first AI receptionist to a
              full AI Phone OS across brands and countries.
            </p>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
              <h3 className="text-sm font-semibold text-slate-50">Starter</h3>
              <p className="mt-1 text-2xl font-semibold">$249–$349/mo</p>
              <p className="text-xs text-slate-400">+$399–$599 setup</p>
              <ul className="mt-4 space-y-1 text-xs text-slate-300">
                <li>• 1 AI receptionist · 1 inbox</li>
                <li>• Basic booking & lead capture</li>
                <li>• Ideal for solo & small clinics</li>
              </ul>
            </div>

            <div className="rounded-2xl border border-cyan-500/60 bg-slate-900 p-5 shadow-[0_0_40px_rgba(6,182,212,0.35)]">
              <h3 className="text-sm font-semibold text-cyan-300">Pro</h3>
              <p className="mt-1 text-2xl font-semibold">$699–$999/mo</p>
              <p className="text-xs text-slate-400">+$1,299–$1,999 setup</p>
              <ul className="mt-4 space-y-1 text-xs text-slate-300">
                <li>• 3 AI agents, multilingual</li>
                <li>• CRM sync & advanced automations</li>
                <li>• Ideal for multi-location practices</li>
              </ul>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
              <h3 className="text-sm font-semibold text-slate-50">
                Enterprise
              </h3>
              <p className="mt-1 text-2xl font-semibold">$1,999–$4,999+/mo</p>
              <p className="text-xs text-slate-400">+$3,500–$7,500+ setup</p>
              <ul className="mt-4 space-y-1 text-xs text-slate-300">
                <li>• Custom workflows & HIL</li>
                <li>• Dedicated success & SLAs</li>
                <li>• Designed for chains & groups</li>
              </ul>
            </div>
          </div>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 text-center text-xs text-slate-400 sm:flex-row">
            <Link
              href="/app/pricing"
              className="btn-primary"
            >
              View full pricing details
            </Link>
            <p>Annual commitments may reduce setup fees by 50–100%.</p>
          </div>
        </div>
      </section>
    </main>
  );
}
