// app/page.tsx
import Link from "next/link";

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
              FrontDesk Agents es tu AI PHONE OS siempre encendido: responde,
              califica y agenda llamadas por teléfono, WhatsApp y SMS con voz
              humana y memoria cruzada entre canales.
            </p>

            <ul className="mt-4 space-y-2 text-sm text-slate-300">
              <li>• 24/7 AI receptionist entrenado en tu negocio.</li>
              <li>• Low-latency, human-like turn-taking en cada llamada.</li>
              <li>• Unified Customer Profile entre llamadas, SMS y WhatsApp.</li>
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
              Diseñado para clínicas, despachos legales, real estate e
              industrias B2B que no pueden perder una sola llamada.
            </p>
          </div>

          {/* RIGHT: HERO IMAGE */}
          <div className="flex-1">
            <div className="relative h-64 w-full max-w-md overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/60 lg:h-80 lg:max-w-lg">
              <img
                src="/hero-office.png"
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
            FrontDesk Agents está diseñado para equipos médicos, legales, real
            estate y B2B que necesitan privacidad, auditoría y una
            infraestructura lista para compliance.
          </p>

          <div className="mt-8 grid gap-6 md:grid-cols-3">
            <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5">
              <h3 className="text-sm font-semibold text-slate-50">
                SOC 2 Type II–Ready Architecture
              </h3>
              <p className="mt-2 text-sm text-slate-300">
                Buenas prácticas de SOC 2 Type II: control de acceso,
                encriptación y logs de auditoría para acompañar tu proceso de
                certificación.
              </p>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5">
              <h3 className="text-sm font-semibold text-slate-50">
                GDPR / CCPA–Ready
              </h3>
              <p className="mt-2 text-sm text-slate-300">
                Data-minimization, enrutamiento regional y flujos de
                right-to-be-forgotten para mantenerte alineado con GDPR y CCPA.
              </p>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5">
              <h3 className="text-sm font-semibold text-slate-50">
                Human-in-the-Loop (HIL) as a Service
              </h3>
              <p className="mt-2 text-sm text-slate-300">
                Capa opcional de escalación humana para flujos sensibles:
                red de seguridad y garantía de calidad en conversaciones
                críticas.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SIMPLE INDUSTRIES STRIP WITH IMAGES */}
      <section
        id="industries"
        className="border-b border-slate-800 bg-slate-950/40 py-16"
      >
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-center text-xs font-semibold uppercase tracking-[0.25em] text-cyan-400">
            Built for your industry
          </h2>
          <p className="mt-3 text-center text-2xl font-semibold text-slate-50">
            From first ring to booked revenue.
          </p>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            <div className="overflow-hidden rounded-xl border border-slate-800 bg-slate-900/60">
              <img
                src="/medical-team.png"
                alt="Medical and dental teams using AI receptionist"
                className="h-40 w-full object-cover"
              />
              <div className="p-4">
                <p className="text-sm font-semibold text-slate-50">
                  Medical & Dental
                </p>
                <p className="mt-1 text-xs text-slate-300">
                  Reduce no-shows y llena la agenda con un AI receptionist que
                  nunca se cansa.
                </p>
              </div>
            </div>

            <div className="overflow-hidden rounded-xl border border-slate-800 bg-slate-900/60">
              <img
                src="/law-firm.png"
                alt="Law firm front desk and clients"
                className="h-40 w-full object-cover"
              />
              <div className="p-4">
                <p className="text-sm font-semibold text-slate-50">Law Firms</p>
                <p className="mt-1 text-xs text-slate-300">
                  Filtra casos, agenda consultas y protege cada interacción con
                  registros auditables.
                </p>
              </div>
            </div>

            <div className="overflow-hidden rounded-xl border border-slate-800 bg-slate-900/60">
              <img
                src="/real-estate-team.png"
                alt="Real estate team on calls"
                className="h-40 w-full object-cover"
              />
              <div className="p-4">
                <p className="text-sm font-semibold text-slate-50">
                  Real Estate & Investors
                </p>
                <p className="mt-1 text-xs text-slate-300">
                  Nunca pierdas un lead caliente: calificación, follow-up y
                  agenda automática 24/7.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PRICING SECTION */}
      {/* (igual que antes, lo dejo tal cual para no alargar más) */}

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
