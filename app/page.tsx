// app/page.tsx
import Image from "next/image";
import { IndustriesGrid } from "@/components/IndustriesGrid";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-50">
      {/* HERO */}
      <section className="border-b border-slate-800 bg-gradient-to-b from-slate-950 via-slate-950 to-slate-900">
        <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 py-16 lg:flex-row lg:items-center">
          {/* Texto */}
          <div className="flex-1">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-cyan-400">
              AI PHONE OS · FRONTDESK AGENTS
            </p>
            <h1 className="mt-4 text-3xl font-semibold leading-tight sm:text-4xl lg:text-5xl">
              Turn every call into{" "}
              <span className="bg-gradient-to-r from-cyan-300 to-sky-400 bg-clip-text text-transparent">
                booked revenue
              </span>{" "}
              in under 60 seconds.
            </h1>
            <p className="mt-4 max-w-xl text-sm text-slate-300 sm:text-base">
              AI receptionists that sound human, remember every conversation,
              and book appointments 24/7 for medical, legal, and real-estate
              businesses across the world.
            </p>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <a
                href="#pricing"
                className="inline-flex items-center justify-center rounded-full bg-cyan-400 px-5 py-2.5 text-sm font-semibold text-slate-950 shadow-lg shadow-cyan-500/30 hover:bg-cyan-300"
              >
                Start Free Trial
              </a>
              <a
                href="#setup"
                className="inline-flex items-center justify-center rounded-full border border-slate-600 px-5 py-2.5 text-sm font-semibold text-slate-50 hover:border-slate-400"
              >
                Request Enterprise Demo
              </a>
            </div>

            <p className="mt-3 text-xs text-slate-400">
              Trusted by clinics, firms and teams that cannot afford to miss a
              single high-intent call.
            </p>
          </div>

          {/* Imagen hero */}
          <div className="flex-1">
            <div className="relative mx-auto max-w-md overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/60 p-3 shadow-xl shadow-cyan-500/20">
              <Image
                src="/0672B5C4-2EA5-4904-B71C-F50815398E48.png"
                alt="AI receptionist handling calls for a global business"
                width={640}
                height={420}
                className="h-auto w-full rounded-xl object-cover"
                priority
              />
              <div className="pointer-events-none absolute inset-x-6 bottom-6 rounded-xl bg-slate-950/70 px-4 py-3 text-xs text-slate-200 backdrop-blur">
                <p className="font-semibold">
                  “We increased booked appointments by +38% in 6 weeks.”
                </p>
                <p className="mt-1 text-[11px] text-slate-400">
                  Multi-location medical clinic · Houston → Mexico · Powered by
                  FrontDesk Agents AI PHONE OS.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BENEFICIOS RÁPIDOS */}
      <section className="border-b border-slate-800 bg-slate-950/80 py-12">
        <div className="mx-auto max-w-5xl px-4">
          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-5">
              <h3 className="text-sm font-semibold text-slate-50">
                Voice-first, human-like
              </h3>
              <p className="mt-2 text-xs text-slate-300">
                Low-latency, natural turn-taking so clients feel like they are
                speaking to a real trained receptionist.
              </p>
            </div>
            <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-5">
              <h3 className="text-sm font-semibold text-slate-50">
                Unified customer memory
              </h3>
              <p className="mt-2 text-xs text-slate-300">
                One AI that remembers calls, SMS, WhatsApp and email so every
                interaction is contextual and consistent.
              </p>
            </div>
            <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-5">
              <h3 className="text-sm font-semibold text-slate-50">
                Built to convert, not just answer
              </h3>
              <p className="mt-2 text-xs text-slate-300">
                Scripts and flows optimized to move callers from “just asking”
                to booked, confirmed and reminded.
              </p>
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
                SOC 2 Type II–Ready
              </h3>
              <p className="mt-2 text-xs text-slate-300">
                Architecture aligned with SOC 2 Type II best practices for
                access control, encryption and audit logging.
              </p>
            </div>
            <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5">
              <h3 className="text-sm font-semibold text-slate-50">
                GDPR / CCPA–Ready
              </h3>
              <p className="mt-2 text-xs text-slate-300">
                Data minimization, regional routing and right-to-be-forgotten
                workflows built into the OS design.
              </p>
            </div>
            <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5">
              <h3 className="text-sm font-semibold text-slate-50">
                Human-in-the-Loop
              </h3>
              <p className="mt-2 text-xs text-slate-300">
                Optional escalation to your team for sensitive flows, keeping
                humans in control of high-stakes conversations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* INDUSTRIAS */}
      <section id="industries" className="border-b border-slate-800 bg-slate-950 py-16">
        <div className="mx-auto max-w-5xl px-4">
          <h2 className="text-center text-xs font-semibold uppercase tracking-[0.25em] text-cyan-400">
            Industries
          </h2>
          <p className="mt-4 text-center text-2xl font-semibold text-slate-50">
            Tuned for clinics, firms and teams that live on the phone.
          </p>
          <p className="mt-3 text-center text-sm text-slate-300">
            Medical, legal, real-estate, high-ticket B2B and more — AI PHONE OS
            adapts to your workflows and languages.
          </p>

          <div className="mt-8">
            <IndustriesGrid />
          </div>
        </div>
      </section>

      {/* SETUP / FORM */}
      <section
        id="setup"
        className="bg-slate-950/80 py-16 border-t border-slate-800"
      >
        <div className="mx-auto max-w-4xl px-4">
          <h2 className="text-center text-xs font-semibold uppercase tracking-[0.25em] text-cyan-400">
            Design Your AI PHONE OS
          </h2>
          <p className="mt-4 text-center text-2xl font-semibold text-slate-50">
            Tell us how your phones work today. We&apos;ll show you the revenue
            you&apos;re leaving on the table.
          </p>
          <p className="mt-3 text-center text-sm text-slate-300">
            Share a few details about your clinic, firm or team and we&apos;ll
            send you a custom deployment blueprint within 24 hours.
          </p>

          <form className="mt-8 grid gap-4 rounded-2xl border border-slate-800 bg-slate-900/70 p-6 sm:grid-cols-2">
            <div className="sm:col-span-1">
              <label className="text-xs font-medium text-slate-200">
                Business name
              </label>
              <input
                className="mt-1 w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-50 outline-none placeholder:text-slate-500"
                placeholder="Houston Medical Group"
              />
            </div>
            <div className="sm:col-span-1">
              <label className="text-xs font-medium text-slate-200">
                Website
              </label>
              <input
                className="mt-1 w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-50 outline-none placeholder:text-slate-500"
                placeholder="www.yourclinic.com"
              />
            </div>
            <div className="sm:col-span-1">
              <label className="text-xs font-medium text-slate-200">
                Industry
              </label>
              <input
                className="mt-1 w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-50 outline-none placeholder:text-slate-500"
                placeholder="Medical · Legal · Real-estate · B2B…"
              />
            </div>
            <div className="sm:col-span-1">
              <label className="text-xs font-medium text-slate-200">
                Estimated monthly call volume
              </label>
              <input
                className="mt-1 w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-50 outline-none placeholder:text-slate-500"
                placeholder="e.g. 300–1,000 calls / month"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="text-xs font-medium text-slate-200">
                What do you want your AI receptionist to do?
              </label>
              <textarea
                className="mt-1 w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-50 outline-none placeholder:text-slate-500"
                rows={3}
                placeholder="Book new patients, pre-qualify leads, handle after-hours emergencies, confirm and reschedule appointments…"
              />
            </div>
            <div className="sm:col-span-2 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <button
                type="submit"
                className="inline-flex items-center justify-center rounded-full bg-cyan-400 px-5 py-2.5 text-sm font-semibold text-slate-950 shadow-lg shadow-cyan-500/30 hover:bg-cyan-300"
              >
                Get My AI PHONE OS Blueprint
              </button>
              <p className="text-[11px] text-slate-500">
                No credit card required · We&apos;ll respond within 24 hours.
              </p>
            </div>
          </form>
        </div>
      </section>

      {/* FOOTER SIMPLE */}
      <footer className="border-t border-slate-800 bg-slate-950 py-6">
        <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-3 px-4 text-[11px] text-slate-500 sm:flex-row">
          <span>© {new Date().getFullYear()} FrontDesk Agents LLC · AI PHONE OS</span>
          <span>Worldwide · Multilingual · Built for high-value calls</span>
        </div>
      </footer>
    </main>
  );
}
