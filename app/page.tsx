// app/page.tsx
import Image from "next/image";
import AISetupForm from "./components/AISetupForm";

type Lang = "en" | "es";
const LANG: Lang = "en";

export default function Home() {
  const year = new Date().getFullYear();

  return (
    <main className="min-h-screen bg-slate-950 text-slate-50">
      {/* TOP BAR */}
      <header className="border-b border-slate-900/60 bg-slate-950/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
          <div className="flex flex-col gap-1 sm:flex-row sm:items-center">
            <div className="flex items-center gap-2">
              <span className="h-7 w-7 rounded-xl bg-cyan-500/10 ring-1 ring-cyan-400/40" />
              <span className="text-sm font-semibold tracking-tight">
                FrontDesk Agents
              </span>
            </div>
            <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-cyan-300">
              AI PHONE OS
            </span>
          </div>

          <nav className="flex items-center gap-4 text-[11px] text-slate-300">
            <a href="#trust" className="hover:text-cyan-300">
              Trust
            </a>
            <a href="#pricing" className="hover:text-cyan-300">
              Pricing
            </a>
            <a href="#setup" className="hover:text-cyan-300">
              Setup
            </a>
          </nav>
        </div>
      </header>

      {/* HERO */}
      <section className="border-b border-slate-900/60 bg-gradient-to-b from-slate-950 to-slate-950/95">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-10 md:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] md:py-16">
          {/* Left: text */}
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-cyan-300">
              AI PHONE OS FOR REVENUE TEAMS
            </p>
            <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              Turn every call into booked revenue in under{" "}
              <span className="text-cyan-300">60 seconds.</span>
            </h1>

            <p className="mt-4 text-sm leading-relaxed text-slate-200">
              FrontDesk Agents is the{" "}
              <span className="font-semibold">AI PHONE OS</span> that answers,
              qualifies, routes and books customers automatically for medical
              clinics, law firms, real-estate teams and high-velocity B2B
              companies — 24/7, in multiple languages, with human-like voice and
              memory.
            </p>

            <ul className="mt-4 space-y-2 text-sm text-slate-200">
              <li>• Never miss another high-intent call or lead.</li>
              <li>
                • Voice-first, low-latency experience that feels human — not a
                robot.
              </li>
              <li>
                • Cross-channel memory across calls, SMS, WhatsApp and email.
              </li>
            </ul>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <a
                href="#pricing"
                className="inline-flex items-center justify-center rounded-full bg-cyan-500 px-5 py-2 text-sm font-semibold text-slate-950 shadow-lg shadow-cyan-500/30 hover:bg-cyan-400"
              >
                Start Free Trial
              </a>
              <a
                href="#setup"
                className="inline-flex items-center justify-center rounded-full border border-slate-700 bg-slate-900/70 px-5 py-2 text-sm font-semibold text-slate-50 hover:border-slate-500"
              >
                Request Enterprise Demo
              </a>
            </div>

            <p className="mt-4 text-[11px] text-slate-400">
              Built for medical, legal, real-estate and high-velocity B2B teams
              that can’t afford missed calls.
            </p>
          </div>

          {/* Right: image (fixed, responsive height) */}
          <div className="flex items-center justify-center">
            <div className="relative w-full max-w-md">
              {/* Glow */}
              <div className="pointer-events-none absolute -inset-3 rounded-3xl bg-cyan-500/15 blur-xl" />
              {/* Card container: altura fija razonable */}
              <div className="relative z-10 h-[240px] w-full overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/90">
                <Image
                  src="/ai-phone-os-dashboard.png"
                  alt="FrontDesk Agents AI PHONE OS dashboard"
                  width={960}
                  height={540}
                  className="h-full w-full object-contain"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SHORT TESTIMONIAL */}
      <section className="border-b border-slate-900/60 bg-slate-950">
        <div className="mx-auto flex max-w-4xl flex-col gap-3 px-4 py-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-2xl text-sm italic text-slate-200">
            “AI PHONE OS answers, qualifies and books our calls 24/7. We cut
            no-shows and filled our calendar without hiring another
            receptionist.”
          </p>
          <p className="text-[11px] text-slate-400">
            — Multi-location medical clinic,{" "}
            <span className="font-semibold text-cyan-300">
              +38% more booked appointments
            </span>
          </p>
        </div>
      </section>

      {/* TRUST & COMPLIANCE */}
      <section
        id="trust"
        className="border-b border-slate-900/60 bg-slate-950/70 py-14"
      >
        <div className="mx-auto max-w-5xl px-4">
          <h2 className="text-center text-xs font-semibold uppercase tracking-[0.25em] text-cyan-400">
            Trust &amp; Compliance
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
            <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-5">
              <h3 className="text-sm font-semibold text-slate-50">
                SOC 2 Type II–Ready Architecture
              </h3>
              <p className="mt-2 text-sm text-slate-300">
                Built following SOC 2 Type II best practices for access control,
                encryption and audit logs to support your compliance journey.
              </p>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-5">
              <h3 className="text-sm font-semibold text-slate-50">
                GDPR / CCPA–Ready
              </h3>
              <p className="mt-2 text-sm text-slate-300">
                Data-minimization, regional routing and right-to-be-forgotten
                workflows to help you stay aligned with GDPR and CCPA.
              </p>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-5">
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

      {/* PRICING */}
      <section
        id="pricing"
        className="border-b border-slate-900/60 bg-slate-950 py-14"
      >
        <div className="mx-auto max-w-5xl px-4">
          <h2 className="text-center text-xs font-semibold uppercase tracking-[0.25em] text-cyan-400">
            Pricing
          </h2>
          <p className="mt-4 text-center text-2xl font-semibold text-slate-50">
            Value-based pricing that scales with your revenue.
          </p>
          <p className="mt-3 text-center text-sm text-slate-300">
            Tiered plans with setup fee designed to capture the value we create
            for high-volume, high-ROI teams.
          </p>

          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {/* Starter */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-300">
                Starter
              </p>
              <p className="mt-2 text-2xl font-semibold">$249–$349</p>
              <p className="text-[11px] text-slate-400">/month</p>
              <p className="mt-2 text-[11px] text-slate-300">
                Setup fee:{" "}
                <span className="font-semibold text-slate-100">$399–$599</span>
              </p>
              <ul className="mt-3 space-y-1.5 text-xs text-slate-300">
                <li>• Core 24/7 automation &amp; appointment booking.</li>
                <li>• Single location.</li>
                <li>• Basic reporting.</li>
              </ul>
            </div>

            {/* Pro */}
            <div className="rounded-2xl border border-cyan-500/60 bg-slate-900 p-5 shadow-lg shadow-cyan-500/20">
              <p className="text-xs font-semibold uppercase tracking-wide text-cyan-300">
                Pro (Most Popular)
              </p>
              <p className="mt-2 text-2xl font-semibold">$699–$999</p>
              <p className="text-[11px] text-slate-400">/month</p>
              <p className="mt-2 text-[11px] text-slate-300">
                Setup fee:{" "}
                <span className="font-semibold text-slate-100">
                  $1,299–$1,999
                </span>
              </p>
              <ul className="mt-3 space-y-1.5 text-xs text-slate-300">
                <li>• Cross-channel memory &amp; 2-way CRM sync.</li>
                <li>• Advanced routing &amp; workflows.</li>
                <li>• Priority support.</li>
              </ul>
            </div>

            {/* Enterprise */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-300">
                Enterprise
              </p>
              <p className="mt-2 text-2xl font-semibold">$1,999–$4,999+</p>
              <p className="text-[11px] text-slate-400">/month</p>
              <p className="mt-2 text-[11px] text-slate-300">
                Setup fee:{" "}
                <span className="font-semibold text-slate-100">
                  $3,500–$7,500+
                </span>
              </p>
              <ul className="mt-3 space-y-1.5 text-xs text-slate-300">
                <li>• Full ATE, HIL options &amp; custom model tuning.</li>
                <li>• Dedicated CSM &amp; SLA.</li>
                <li>• Multi-location &amp; multi-brand support.</li>
              </ul>
            </div>
          </div>

          <p className="mt-6 text-center text-[11px] text-slate-400">
            Recommended usage overage:{" "}
            <span className="font-semibold text-slate-200">$0.10–$0.15</span> per
            minute beyond the included allowance.
          </p>
        </div>
      </section>

      {/* SETUP / BLUEPRINT FORM */}
      <section
        id="setup"
        className="border-b border-slate-900/60 bg-slate-950/80 py-14"
      >
        <div className="mx-auto max-w-4xl px-4">
          <h2 className="text-center text-xs font-semibold uppercase tracking-[0.25em] text-cyan-400">
            Design Your AI PHONE OS
          </h2>
          <p className="mt-4 text-center text-2xl font-semibold text-slate-50">
            Get your custom AI agent blueprint in minutes.
          </p>
          <p className="mt-3 text-center text-sm text-slate-300">
            Tell us about your business, industry and monthly call volume.
            We&apos;ll route you to the right tier and configure your AI
            receptionist to follow your exact rules.
          </p>

          <div className="mt-8 rounded-2xl border border-slate-800 bg-slate-900/80 p-5 sm:p-6">
            <AISetupForm lang={LANG} />
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-slate-900/60 bg-slate-950 py-5">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-4 text-[11px] text-slate-500 sm:flex-row">
          <p>© {year} FrontDesk Agents LLC. All rights reserved.</p>
          <p>AI PHONE OS for high-value, always-on revenue teams.</p>
        </div>
      </footer>
    </main>
  );
}
