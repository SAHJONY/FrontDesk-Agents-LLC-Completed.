// app/pricing/page.tsx
import Link from "next/link";

const plans = [
  {
    name: "Starter",
    price: "$399 / mes",
    target: "Consultorios pequeños, profesionales independientes y primeras sucursales.",
    highlight: "Perfecto para probar AI PHONE OS en un solo número.",
    features: [
      "1 número inteligente (llamadas + WhatsApp + correo)",
      "Hasta 1 recepcionista AI personalizada",
      "Atención 24/7 en 1 idioma",
      "Integración básica de calendario",
      "Resumen diario de llamadas y oportunidades",
    ],
    cta: "Comenzar con Starter",
    popular: false,
  },
  {
    name: "Professional",
    price: "$899 / mes",
    target: "Clínicas, despachos y equipos con múltiples agendas y mayor volumen.",
    highlight: "+38% más citas confirmadas en promedio en 90 días.",
    features: [
      "Hasta 3 números inteligentes (sucursales / marcas)",
      "3 recepcionistas AI especializadas por flujo",
      "Multicanal: llamadas, WhatsApp y email",
      "Integraciones CRM + calendario avanzadas",
      "Playbooks por industria (médico, legal, real estate)",
      "Onboarding guiado y soporte prioritario",
    ],
    cta: "Escalar con Professional",
    popular: true,
  },
  {
    name: "Enterprise",
    price: "Desde $1,799 / mes",
    target: "Cadenas, grupos multilocalización y operaciones reguladas.",
    highlight: "Arquitectura lista para SOC 2, GDPR y flujos a medida.",
    features: [
      "Números inteligentes ilimitados",
      "Recepcionistas AI ilimitadas por línea / marca / país",
      "Workflows personalizados y enroutamiento omnicanal",
      "Integraciones a medida (EMR, PMS, CRM propietario)",
      "Human-in-the-loop para flujos críticos",
      "CSM dedicado y acuerdos SLA Enterprise",
    ],
    cta: "Hablar con ventas Enterprise",
    popular: false,
  },
];

export default function PricingPage() {
  return (
    <div className="bg-slate-950 text-slate-50">
      <section className="border-b border-slate-800 bg-gradient-to-b from-slate-950 via-slate-950 to-slate-950/90">
        <div className="mx-auto max-w-5xl px-4 py-12">
          <p className="text-center text-xs font-semibold uppercase tracking-[0.25em] text-cyan-400">
            Precios & planes
          </p>
          <h1 className="mt-4 text-center text-3xl font-semibold sm:text-4xl">
            Elige el plan que convierta tus llamadas en ingresos reservados.
          </h1>
          <p className="mt-3 text-center text-sm text-slate-300 sm:text-base">
            Todos los planes incluyen configuración guiada, dashboards en tiempo real
            y grabaciones auditables para cada interacción.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/setup"
              className="rounded-full bg-cyan-500 px-5 py-2 text-sm font-semibold text-slate-950 shadow-sm shadow-cyan-500/40 hover:bg-cyan-400"
            >
              Iniciar demo guiada
            </Link>
            <Link
              href="/#contact"
              className="text-sm text-slate-300 underline-offset-4 hover:text-cyan-300 hover:underline"
            >
              ¿Necesitas un plan a medida? Habla con nosotros.
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 pb-16 pt-8">
        <div className="grid gap-6 md:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`flex flex-col rounded-2xl border bg-slate-900/70 p-5 shadow-sm shadow-slate-900/60 ${
                plan.popular
                  ? "border-cyan-400/70 ring-1 ring-cyan-400/40"
                  : "border-slate-800"
              }`}
            >
              {plan.popular && (
                <span className="mb-2 inline-flex w-fit items-center rounded-full bg-cyan-500/10 px-2 py-0.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-cyan-300">
                  Más popular
                </span>
              )}
              <h2 className="text-lg font-semibold text-slate-50">
                {plan.name}
              </h2>
              <p className="mt-1 text-base font-semibold text-cyan-300">
                {plan.price}
              </p>
              <p className="mt-2 text-xs font-medium uppercase tracking-[0.18em] text-slate-400">
                {plan.target}
              </p>
              <p className="mt-3 text-sm text-slate-300">{plan.highlight}</p>

              <ul className="mt-4 flex-1 space-y-2 text-sm text-slate-200">
                {plan.features.map((feat) => (
                  <li key={feat} className="flex gap-2">
                    <span className="mt-[3px] h-1.5 w-1.5 rounded-full bg-cyan-400" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>

              <Link
                href={plan.name === "Enterprise" ? "/setup" : "/setup"}
                className={`mt-5 inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-semibold ${
                  plan.popular
                    ? "bg-cyan-500 text-slate-950 shadow-sm shadow-cyan-500/40 hover:bg-cyan-400"
                    : "border border-slate-600 text-slate-50 hover:border-cyan-400 hover:bg-slate-900"
                }`}
              >
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>

        <p className="mt-8 text-center text-xs text-slate-500">
          Todos los planes se pueden adaptar a volumen de llamadas, idiomas y
          requisitos de cumplimiento específicos. Pregunta por descuentos
          anuales y despliegues por cadena.
        </p>
      </section>
    </div>
  );
}
