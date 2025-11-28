// app/industries/page.tsx
import Link from "next/link";

type Industry = {
  id: string;
  badge: string;
  title: string;
  description: string;
  href: string;
};

const INDUSTRIES: Industry[] = [
  {
    id: "medical",
    badge: "+38% más citas confirmadas",
    title: "Medical & Dental Clinics",
    description:
      "Llena la agenda, reduce no-shows y confirma citas en segundos con un AI receptionist entrenado para salud.",
    href: "/setup?vertical=medical",
  },
  {
    id: "legal",
    badge: "Prioriza casos de alto valor",
    title: "Law Firms & Legal Services",
    description:
      "Califica leads legales, agenda consultas y protege cada interacción con registros auditables 24/7.",
    href: "/setup?vertical=legal",
  },
  {
    id: "real-estate",
    badge: "Nunca pierdas un lead caliente",
    title: "Real Estate & Investors",
    description:
      "Responde a cada llamada, WhatsApp y formulario de anuncios en segundos, con routing por tipo de operación.",
    href: "/setup?vertical=real_estate",
  },
  {
    id: "home-services",
    badge: "Más trabajos cerrados por semana",
    title: "Home Services & Contractors",
    description:
      "Responde urgencias, agenda visitas y coordina equipos de campo sin depender de recepcionistas humanos.",
    href: "/setup?vertical=home_services",
  },
];

export default function IndustriesPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-50">
      <section className="mx-auto flex w-full max-w-5xl flex-col gap-8 px-4 pb-20 pt-16">
        {/* Encabezado */}
        <header className="space-y-3 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-cyan-400">
            Built for your industry · Diseñado para tu sector
          </p>
          <h1 className="text-3xl font-semibold sm:text-4xl">
            FrontDesk Agents se adapta a tu negocio,
            <span className="block text-cyan-300">
              no tu negocio al sistema.
            </span>
          </h1>
          <p className="mx-auto max-w-2xl text-sm text-slate-300">
            Cada vertical usa scripts, flujos y métricas específicos para tu
            industria, mientras el motor base de AI maneja llamadas, WhatsApp y
            email en más de 100 idiomas y dialectos.
          </p>
        </header>

        {/* Grid de industrias */}
        <div className="grid gap-6 md:grid-cols-2">
          {INDUSTRIES.map((industry) => (
            <article
              key={industry.id}
              className="flex flex-col rounded-2xl border border-slate-800 bg-slate-900/60 p-5 shadow-lg shadow-slate-950/60"
            >
              <span className="inline-flex w-fit rounded-full border border-cyan-500/40 px-3 py-1 text-[11px] font-medium text-cyan-300">
                {industry.badge}
              </span>
              <h2 className="mt-3 text-lg font-semibold">{industry.title}</h2>
              <p className="mt-2 text-sm text-slate-300">
                {industry.description}
              </p>
              <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-slate-400">
                <span>✓ Voz, WhatsApp, SMS y email</span>
                <span>·</span>
                <span>✓ Logging y grabaciones 24/7</span>
                <span>·</span>
                <span>✓ Integración con tu stack actual</span>
              </div>
              <div className="mt-5 flex items-center justify-between text-sm">
                <Link
                  href={industry.href}
                  className="inline-flex items-center gap-1 text-cyan-300 hover:text-cyan-200"
                >
                  Ver playbook para este sector
                  <span aria-hidden>↗</span>
                </Link>
                <Link
                  href="/pricing"
                  className="inline-flex items-center gap-1 text-xs text-slate-400 hover:text-slate-200"
                >
                  Ver precios y planes
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* CTA final */}
        <footer className="mt-4 rounded-2xl border border-slate-800 bg-slate-900/50 p-5 text-center text-sm text-slate-200">
          <p>
            ¿Tu industria no está en la lista? —{" "}
            <span className="text-cyan-300">
              Configuramos un AI receptionist entrenado para tu caso específico
              en menos de 7 días.
            </span>
          </p>
          <div className="mt-3 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/setup"
              className="inline-flex items-center justify-center rounded-full bg-cyan-500 px-5 py-2 text-sm font-semibold text-slate-950 hover:bg-cyan-400"
            >
              Configurar mi AI Receptionist
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full border border-slate-700 px-5 py-2 text-sm font-semibold text-slate-200 hover:border-cyan-500/70"
            >
              Hablar con el equipo
            </Link>
          </div>
        </footer>
      </section>
    </main>
  );
}
