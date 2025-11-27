// app/page.tsx
import Image from "next/image";
import Link from "next/link";
import AISetupForm from "@/app/components/AISetupForm";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-50">
      {/* HERO */}
      <section className="border-b border-slate-800 bg-gradient-to-b from-slate-950 to-slate-900/80">
        <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 pb-16 pt-12 md:flex-row md:items-center md:pb-24 md:pt-16">
          {/* Copy principal */}
          <div className="flex-1">
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/40 bg-cyan-500/10 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-cyan-300">
              <span>AI PHONE OS</span>
              <span className="h-1 w-1 rounded-full bg-cyan-400" />
              <span>FrontDesk Agents</span>
            </div>

            <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
              Turn every call into{" "}
              <span className="bg-gradient-to-r from-cyan-300 to-sky-400 bg-clip-text text-transparent">
                booked revenue
              </span>{" "}
              in under 60 seconds.
            </h1>

            <p className="mt-4 max-w-xl text-sm text-slate-300 md:text-base">
              FrontDesk Agents is the{" "}
              <span className="font-semibold text-cyan-200">
                AI PHONE OS
              </span>{" "}
              that answers, qualifies and books customers automatically for
              medical clinics, law firms, real-estate teams and B2B companies —
              24/7, in múltiples idiomas.
            </p>

            <ul className="mt-4 space-y-2 text-sm text-slate-300">
              <li>• Never miss another high-intent call or lead.</li>
              <li>• Voice-first, low-latency experience that feels human.</li>
              <li>• Cross-channel memory: calls, SMS, WhatsApp, email.</li>
            </ul>

            {/* CTAs HERO */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href="#pricing" className="btn-primary">
                Start Free Trial
              </a>
              <a href="#setup" className="btn-secondary">
                Request Enterprise Demo
              </a>
            </div>

            {/* Franja de confianza */}
            <div className="mt-5 flex flex-wrap items-center gap-3 text-[11px] text-slate-400">
              <span className="inline-flex items-center gap-1 rounded-full border border-slate-800 bg-slate-900/60 px-2 py-1">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                SOC 2 Type II–ready architecture
              </span>
              <span className="inline-flex items-center gap-1 rounded-full border border-slate-800 bg-slate-900/60 px-2 py-1">
                GDPR / CCPA–ready
              </span>
              <span className="inline-flex items-center gap-1 rounded-full border border-slate-800 bg-slate-900/60 px-2 py-1">
                Human-in-the-Loop (HIL) safety net
              </span>
            </div>
          </div>

          {/* Imagen hero */}
          <div className="flex-1">
            <div className="relative mx-auto h-64 w-full max-w-md overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/60 shadow-xl shadow-cyan-500/20">
              <Image
                src="/images/hero-office.jpg"
                alt="FrontDesk Agents AI PHONE OS dashboard"
                fill
                className="object-cover"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 rounded-xl bg-slate-950/70 p-3 text-xs text-slate-100 backdrop-blur">
                <p className="font-semibold">
                  “AI PHONE OS answers, qualifies, and books our calls 24/7.”
                </p>
                <p className="mt-1 text-[11px] text-slate-300">
                  — Multi-location medical clinic, +38% more booked appointments
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST & COMPLIANCE */}
      <section
        id="trust"
        className="border-b border-slate-800 bg-slate-950/60 py-16"
      >
        <div className="mx-auto max-w-5xl px-4">
          <h2 className="text-center text-xs font-semibold uppercase tracking-[0.25em] text-cyan-400">
            Trust &amp; Compliance
          </h2>
          <p className="mt-4 text-center text-2xl font-semibold text-slate-50">
            Enterprise-grade security for regulated industries.
          </p>
          <p className="mt-3 text-center text-slate-300 text-sm md:text-base">
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
                Data minimization, regional routing and right-to-be-forgotten
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

      {/* INDUSTRIES / USE CASES */}
      <section className="border-b border-slate-800 bg-slate-950 py-14">
        <div className="mx-auto max-w-5xl px-4">
          <h2 className="text-center text-xs font-semibold uppercase tracking-[0.25em] text-cyan-400">
            Built for high-value teams
          </h2>
          <p className="mt-3 text-center text-xl font-semibold">
            One AI PHONE OS. Multiple industries.
          </p>

          <div className="mt-8 grid gap-6 md:grid-cols-3">
            <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
              <Image
                src="/images/medical-team.jpg"
                alt="Medical & Dental"
                width={400}
                height={260}
                className="h-32 w-full rounded-lg object-cover"
              />
              <h3 className="mt-3 text-sm font-semibold">Medical &amp; Dental</h3>
              <p className="mt-1 text-xs text-slate-300">
                Recover missed calls, confirm appointments and reduce no-shows
                while your staff focuses on patients.
              </p>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
              <Image
                src="/images/law-firm.jpg"
                alt="Law Firms"
                width={400}
                height={260}
                className="h-32 w-full rounded-lg object-cover"
              />
              <h3 className="mt-3 text-sm font-semibold">Law Firms</h3>
              <p className="mt-1 text-xs text-slate-300">
                Qualify new matters, route to the right attorney and schedule
                consultations even after hours.
              </p>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
              <Image
                src="/images/real-estate.jpg"
                alt="Real Estate Teams"
                width={400}
                height={260}
                className="h-32 w-full rounded-lg object-cover"
              />
              <h3 className="mt-3 text-sm font-semibold">Real Estate &amp; B2B</h3>
              <p className="mt-1 text-xs text-slate-300">
                Capture inbound leads, qualify motivation and book showings or
                demos directly into your calendar.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SOCIAL PROOF / TESTIMONIOS */}
      <section className="border-b border-slate-800 bg-slate-950/80 py-14">
        <div className="mx-auto max-w-5xl px-4">
          <h2 className="text-center text-xs font-semibold uppercase tracking-[0.25em] text-cyan-400">
            Customers
          </h2>
          <p className="mt-3 text-center text-xl font-semibold">
            Designed with real teams, in real operations.
          </p>
          <p className="mt-2 text-center text-sm text-slate-300">
            Early adopters are already using FrontDesk Agents to turn missed
            calls into booked revenue every day.
          </p>

          <div className="mt-8 grid gap-6 md:grid-cols-3">
            <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4 text-sm">
              <p className="text-slate-100">
                “We went from voicemail chaos to a predictable flow of booked
                patients in less than 2 weeks.”
              </p>
              <p className="mt-2 text-[11px] text-slate-400">
                Clinic Manager · Multi-location practice
              </p>
            </div>
            <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4 text-sm">
              <p className="text-slate-100">
                “The AI PHONE OS feels like a real receptionist that never gets
                tired. Our intake team loves it.”
              </p>
              <p className="mt-2 text-[11px] text-slate-400">
                Partner · Litigation law firm
              </p>
            </div>
            <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4 text-sm">
              <p className="text-slate-100">
                “Every inbound call is now logged, qualified and routed in
                seconds. No more lost deals.”
              </p>
              <p className="mt-2 text-[11px] text-slate-400">
                Team Lead · Real-estate &amp; B2B sales
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section
        id="pricing"
        className="border-b border-slate-800 bg-slate-950 py-16"
      >
        <div className="mx-auto max-w-5xl px-4">
          <h2 className="text-center text-xs font-semibold uppercase tracking-[0.25em] text-cyan-400">
            Pricing
          </h2>
          <p className="mt-3 text-center text-xl font-semibold">
            Plans that scale with your call volume.
          </p>
          <p className="mt-2 text-center text-sm text-slate-300">
            Value-based pricing with transparent setup fees for configuration,
            training and integrations.
          </p>

          <div className="mt-8 grid gap-6 md:grid-cols-3">
            <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-5">
              <h3 className="text-sm font-semibold">Starter</h3>
              <p className="mt-1 text-xs text-slate-300">
                For solo and small teams.
              </p>
              <p className="mt-4 text-2xl font-semibold">$399</p>
              <p className="text-xs text-slate-400">per month</p>
              <p className="mt-2 text-xs text-slate-400">
                Setup: $399–$599 one-time.
              </p>
              <ul className="mt-4 space-y-1 text-xs text-slate-300">
                <li>• 1 AI receptionist, 1 inbox</li>
                <li>• Core automation &amp; booking</li>
                <li>• Basic reporting</li>
              </ul>
            </div>

            <div className="rounded-xl border border-cyan-500 bg-slate-900/80 p-5 shadow-lg shadow-cyan-500/30">
              <h3 className="text-sm font-semibold">Professional</h3>
              <p className="mt-1 text-xs text-slate-300">
                For growing clinics, law firms and sales teams.
              </p>
              <p className="mt-4 text-2xl font-semibold">$899</p>
              <p className="text-xs text-slate-400">per month</p>
              <p className="mt-2 text-xs text-slate-400">
                Setup: $1,299–$1,999 one-time.
              </p>
              <ul className="mt-4 space-y-1 text-xs text-slate-300">
                <li>• 3 AI agents &amp; multi-channel routing</li>
                <li>• Cross-channel memory &amp; CRM sync</li>
                <li>• Advanced workflows &amp; reporting</li>
              </ul>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-5">
              <h3 className="text-sm font-semibold">Enterprise</h3>
              <p className="mt-1 text-xs text-slate-300">
                For high-volume and multi-location operations.
              </p>
              <p className="mt-4 text-2xl font-semibold">$1,799+</p>
              <p className="text-xs text-slate-400">per month</p>
              <p className="mt-2 text-xs text-slate-400">
                Setup: $3,500+ based on scope.
              </p>
              <ul className="mt-4 space-y-1 text-xs text-slate-300">
                <li>• Unlimited agents &amp; inboxes</li>
                <li>• Full ATE workflows &amp; HIL options</li>
                <li>• Custom integrations &amp; SLAs</li>
              </ul>
            </div>
          </div>

          <p className="mt-4 text-center text-[11px] text-slate-400">
            Overage minutes billed between $0.10–$0.15 per minute depending on
            volume and vertical.
          </p>
        </div>
      </section>

      {/* SETUP FORM */}
      <section
        id="setup"
        className="border-b border-slate-800 bg-slate-950/90 py-16"
      >
        <div className="mx-auto max-w-4xl px-4">
          <h2 className="text-center text-xs font-semibold uppercase tracking-[0.25em] text-cyan-400">
            Design your AI PHONE OS
          </h2>
          <p className="mt-3 text-center text-xl font-semibold">
            Get your custom AI receptionist blueprint.
          </p>
          <p className="mt-2 text-center text-sm text-slate-300">
            Share a few details about your business and our team will configure
            a personalized AI PHONE OS plan, including pricing, workflows and
            recommended channels.
          </p>

          <div className="mt-8 rounded-2xl border border-slate-800 bg-slate-900/70 p-4 sm:p-6">
            <AISetupForm lang="en" />
          </div>
        </div>
      </section>

      {/* FOOTER SIMPLE */}
      <footer className="border-t border-slate-800 bg-slate-950 py-6">
        <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-3 px-4 text-[11px] text-slate-500 sm:flex-row">
          <p>© {new Date().getFullYear()} FrontDesk Agents · AI PHONE OS</p>
          <div className="flex items-center gap-4">
            <a href="#trust" className="hover:text-slate-300">
              Trust &amp; Compliance
            </a>
            <a href="#pricing" className="hover:text-slate-300">
              Pricing
            </a>
            <a
              href="mailto:info@frontdeskagents.com"
              className="hover:text-slate-300"
            >
              Contact
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
