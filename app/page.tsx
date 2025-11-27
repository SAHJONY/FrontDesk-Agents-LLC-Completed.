// app/page.tsx
import Image from "next/image";
import Link from "next/link";
import { IndustriesGrid } from "@/components/IndustriesGrid";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-50">
      {/* HERO */}
      <section className="relative overflow-hidden border-b border-slate-800 bg-slate-950">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-10 px-4 py-12 lg:flex-row lg:py-20">
          {/* LEFT: TEXT */}
          <div className="max-w-xl text-center lg:text-left">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-cyan-400">
              AI PHONE OS · FRONTDESK AGENTS
            </p>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
              Turn every call into{" "}
              <span className="text-cyan-400">booked revenue</span> in under 60 seconds.
            </h1>
            <p className="mt-4 text-sm text-slate-300 sm:text-base">
              ALEX, your AI receptionist, answers every call, books appointments,
              qualifies leads and sends follow-ups across phone, SMS, email and WhatsApp —
              24/7, in multiple languages.
            </p>

            <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-start">
              <Link
                href="#pricing"
                className="inline-flex items-center justify-center rounded-full bg-cyan-500 px-5 py-2.5 text-sm font-semibold text-slate-950 shadow-lg shadow-cyan-500/30 transition hover:bg-cyan-400"
              >
                Start Free Trial
              </Link>
              <Link
                href="#setup"
                className="inline-flex items-center justify-center rounded-full border border-slate-700 bg-slate-900/60 px-5 py-2.5 text-sm font-semibold text-slate-100 hover:border-cyan-500/70 hover:bg-slate-900"
              >
                Request Enterprise Demo
              </Link>
            </div>

            <p className="mt-3 text-xs text-slate-400">
              Built for medical, legal, real-estate and high-velocity B2B teams that
              can’t afford to miss a single call.
            </p>
          </div>

          {/* RIGHT: HERO IMAGE */}
          <div className="relative h-64 w-full max-w-md overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/60 lg:h-80">
            <Image
              src="/IMG_HERO_MAIN.png" 
              // 👆 CAMBIA ESTO por el nombre REAL, por ejemplo:
              // "/575AB50E-A31A-49E9-8CFF-090A774CC2F3.PNG"
              alt="FrontDesk Agents handling calls worldwide"
              fill
              className="object-cover"
              priority
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent" />
            <div className="absolute bottom-3 left-3 rounded-full bg-slate-950/80 px-3 py-1 text-xs text-slate-100 backdrop-blur">
              24/7 AI Phone OS · Multilingual · Worldwide
            </div>
          </div>
        </div>
      </section>

      {/* TRUST & COMPLIANCE (nuevo bloque profesional) */}
      <section
        id="trust"
        className="border-b border-slate-800 bg-slate-950/70 py-16"
      >
        <div className="mx-auto max-w-5xl px-4">
          <h2 className="text-center text-xs font-semibold uppercase tracking-[0.25em] text-cyan-400">
            Trust & Compliance
          </h2>
          <p className="mt-4 text-center text-2xl font-semibold text-slate-50">
            Enterprise-grade security for regulated industries.
          </p>
          <p className="mt-3 text-center text-slate-300 text-sm">
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
      <section
        id="industries"
        className="border-b border-slate-800 bg-slate-950 py-16"
      >
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-center text-xs font-semibold uppercase tracking-[0.25em] text-cyan-400">
            Built for your industry
          </h2>
          <p className="mt-4 text-center text-2xl font-semibold text-slate-50">
            Tailored AI PHONE OS for medical, legal, real estate and more.
          </p>
          <p className="mt-3 text-center text-sm text-slate-300">
            Your AI receptionist adapts scripts, tone and workflows to your sector —
            not the other way around.
          </p>

          <div className="mt-10">
            <IndustriesGrid />
          </div>
        </div>
      </section>

      {/* Aquí debajo mantienes tus secciones de pricing, setup, etc. existentes */}
    </main>
  );
}
