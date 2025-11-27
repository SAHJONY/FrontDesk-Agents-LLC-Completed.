// app/page.tsx

import React from "react";
import SystemStatusBar from "./components/SystemStatusBar";
import PricingTable from "./components/PricingTable";
import AISetupForm from "./components/AISetupForm";

type Lang = "en" | "es";

export default function HomePage() {
  const lang: Lang = "en";

  return (
    <main className="min-h-screen bg-slate-950 text-slate-50">
      {/* Top status bar */}
      <SystemStatusBar />

      {/* HERO */}
      <section className="border-b border-slate-800 bg-slate-950/80">
        <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 py-12 lg:flex-row lg:items-center lg:py-16">
          {/* Left: copy */}
          <div className="max-w-xl">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-cyan-400">
              AI PHONE OS FOR REVENUE TEAMS
            </p>

            <h1 className="mt-3 text-3xl font-bold leading-tight sm:text-4xl">
              Turn every call into booked revenue in under 60 seconds.
            </h1>

            <p className="mt-4 text-sm leading-relaxed text-slate-200 sm:text-base">
              FrontDesk Agents is the AI PHONE OS that answers, qualifies,
              routes and books customers automatically for medical clinics, law
              firms, real-estate teams and high-velocity B2B companies — 24/7,
              in multiple languages, with human-like voice and memory.
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

            {/* CTAs */}
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <a
                href="#pricing"
                className="inline-flex items-center justify-center rounded-full bg-cyan-500 px-5 py-2 text-sm font-semibold text-slate-950 shadow-lg shadow-cyan-500/30 hover:bg-cyan-400"
              >
                Start Free Trial
              </a>
              <a
                href="#setup"
                className="inline-flex items-center justify-center rounded-full border border-slate-700 px-5 py-2 text-sm font-semibold text-slate-100 hover:border-cyan-400 hover:text-cyan-300"
              >
                Request Enterprise Demo
              </a>
            </div>

            <p className="mt-4 text-xs text-slate-300">
              Built for medical, legal, real-estate and high-velocity B2B teams
              that can’t afford missed calls.
            </p>
          </div>

          {/* Right: simulated dashboard (no external image) */}
          <div className="flex items-center justify-center lg:flex-1">
            <div className="relative w-full max-w-md">
              {/* Glow */}
              <div className="pointer-events-none absolute -inset-3 rounded-3xl bg-cyan-500/15 blur-xl" />

              {/* Card */}
              <div className="relative z-10 h-[260px] w-full overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/95 p-4">
                {/* Top bar */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-emerald-400" />
                    <p className="text-[11px] font-semibold text-slate-100">
                      AI PHONE OS Dashboard
                    </p>
                  </div>
                  <p className="text-[10px] text-slate-400">
                    Live calls · 24/7
                  </p>
                </div>

                {/* Metrics */}
                <div className="mt-4 grid grid-cols-3 gap-3 text-[10px]">
                  <div className="rounded-lg bg-slate-950/70 p-2">
                    <p className="text-slate-400">Answered</p>
                    <p className="mt-1 text-base font-semibold text-emerald-400">
                      98%
                    </p>
                    <p className="text-[9px] text-emerald-300">
                      +12% vs last week
                    </p>
                  </div>
                  <div className="rounded-lg bg-slate-950/70 p-2">
                    <p className="text-slate-400">Bookings</p>
                    <p className="mt-1 text-base font-semibold text-cyan-300">
                      312
                    </p>
                    <p className="text-[9px] text-cyan-200">per 7 days</p>
                  </div>
                  <div className="rounded-lg bg-slate-950/70 p-2">
                    <p className="text-slate-400">No-shows</p>
                    <p className="mt-1 text-base font-semibold text-rose-300">
                      -31%
                    </p>
                    <p className="text-[9px] text-rose-200">
                      with smart reminders
                    </p>
                  </div>
                </div>

                {/* Call flow mini-chart */}
                <div className="mt-4">
                  <p className="text-[10px] text-slate-400">
                    Today&apos;s call flow
                  </p>
                  <div className="mt-2 flex h-16 items-end gap-1">
                    {[
                      "h-6",
                      "h-10",
                      "h-8",
                      "h-14",
                      "h-11",
                      "h-16",
                      "h-9",
                      "h-13",
                    ].map((h, idx) => (
                      <div
                        key={idx}
                        className={`flex-1 rounded-sm bg-gradient-to-t from-cyan-500/20 via-cyan-400/60 to-cyan-300/80 ${h}`}
                      />
                    ))}
                  </div>
                </div>

                {/* Bottom strip */}
                <div className="mt-4 flex items-center justify-between rounded-lg bg-slate-950/80 px-3 py-2">
                  <p className="text-[10px] text-slate-300">
                    “Every call gets answered, routed or booked automatically.”
                  </p>
                  <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-[9px] font-semibold text-emerald-300">
                    LIVE
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial strip */}
      <section className="border-b border-slate-800 bg-slate-950/70">
        <div className="mx-auto max-w-4xl px-4 py-6 text-sm text-slate-200">
          <p>
            “AI PHONE OS answers, qualifies, and books our calls 24/7. We cut
            no-shows and filled our calendar without hiring another
            receptionist.”
          </p>
          <p className="mt-2 text-xs text-slate-400">
            — Multi-location medical clinic, +38% more booked appointments
          </p>
        </div>
      </section>

      {/* TRUST & COMPLIANCE */}
      <section
        id="trust"
        className="border-b border-slate-800 bg-slate-950/60 py-16"
      >
        <div className="mx-auto max-w-5xl px-4">
          <h2 className="text-center text-2xl font-semibold text-slate-50">
            Trust &amp; Compliance
          </h2>
          <p className="mt-3 text-center text-sm text-slate-300 sm:text-base">
            Enterprise-grade security for regulated industries. FrontDesk Agents
            is designed for medical, legal, real-estate and high-velocity B2B
            teams that require strict privacy, auditability and
            compliance-ready infrastructure.
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

      {/* PRICING */}
      <section
        id="pricing"
        className="border-b border-slate-800 bg-slate-950/80 py-16"
      >
        <div className="mx-auto max-w-5xl px-4">
          <h2 className="text-center text-2xl font-semibold text-slate-50">
            Value-based pricing that scales with your revenue.
          </h2>
          <p className="mt-3 text-center text-sm text-slate-300 sm:text-base">
            Flexible monthly plans with a one-time setup fee, designed for
            high-volume, high-ROI customers. Start small, then scale into
            multi-location and enterprise deployments.
          </p>

          <div className="mt-8">
            <PricingTable />
          </div>
        </div>
      </section>

      {/* SETUP / AI BLUEPRINT */}
      <section
        id="setup"
        className="bg-slate-950/90 py-16"
      >
        <div className="mx-auto max-w-5xl px-4">
          <h2 className="text-center text-2xl font-semibold text-slate-50">
            Design your AI PHONE OS in minutes.
          </h2>
          <p className="mt-3 text-center text-sm text-slate-300 sm:text-base">
            Answer a few questions and we&apos;ll generate a tailored AI
            reception workflow, suggested pricing tier and onboarding checklist
            for your clinic, firm or team.
          </p>

          <div className="mt-8 max-w-xl mx-auto rounded-2xl border border-slate-800 bg-slate-900/80 p-4 sm:p-6">
            <AISetupForm lang={lang} />
          </div>
        </div>
      </section>
    </main>
  );
}
