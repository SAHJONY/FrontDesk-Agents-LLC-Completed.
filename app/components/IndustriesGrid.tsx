// app/components/IndustriesGrid.tsx
import Image from "next/image";

type Industry = {
  id: string;
  title: string;
  description: string;
  badge: string;
  image: string;
};

const INDUSTRIES: Industry[] = [
  {
    id: "medical",
    title: "Medical & Dental Clinics",
    description:
      "Fill the calendar, reduce no-shows y confirma citas en segundos con un AI receptionist entrenado para salud.",
    badge: "+38% más visitas confirmadas",
    image: "/0672B5C4-2EA5-4904-B71C-F50815398E48.png",
  },
  {
    id: "law",
    title: "Law Firms & Legal Services",
    description:
      "Califica leads, agenda consultas y protege cada interacción con registros auditables 24/7.",
    badge: "Prioriza casos de alto valor",
    image: "/0E208AAA-D75C-4EE3-A570-8E88DAF84829.png",
  },
  {
    id: "real-estate",
    title: "Real Estate & Investors",
    description:
      "Convierte cada llamada, WhatsApp y correo en citas con vendedores y compradores motivados.",
    badge: "Más listados, menos tiempo muerto",
    image: "/0DD5A262-4F4A-48A6-BCA8-B7D106E781EB.png",
  },
  {
    id: "home-services",
    title: "Home Services & Contractors",
    description:
      "Cada llamada de trabajo se convierte en una cita agendada: plomería, HVAC, electricidad y más.",
    badge: "Agenda llena todo el mes",
    image: "/08E6E2CC-933F-448F-96AA-E2CAC6AC7598.png",
  },
];

export function IndustriesGrid() {
  return (
    <section className="w-full border-t border-white/5 bg-slate-950/60">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-400">
              Built for your industry
            </p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-white md:text-4xl">
              From first ring to booked revenue.
            </h2>
            <p className="mt-3 max-w-2xl text-sm text-slate-300">
              FrontDesk Agents adapta la conversación a cada sector
              profesional, con flujos auditables y listos para producción.
            </p>
          </div>
          <p className="text-xs text-slate-400 md:text-right">
            Imágenes reales de flujos que usamos para ilustrar el “look
            premium” del sistema en acción.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {INDUSTRIES.map((industry) => (
            <article
              key={industry.id}
              className="group overflow-hidden rounded-2xl border border-white/5 bg-slate-900/70 shadow-[0_18px_45px_rgba(0,0,0,0.55)] backdrop-blur transition hover:border-cyan-400/60 hover:bg-slate-900"
            >
              <div className="relative h-52 w-full overflow-hidden">
                <Image
                  src={industry.image}
                  alt={industry.title}
                  fill
                  priority={industry.id === "medical"}
                  className="object-cover transition duration-500 group-hover:scale-105 group-hover:brightness-110"
                  sizes="(min-width: 1024px) 50vw, 100vw"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/10 to-transparent" />
                <span className="pointer-events-none absolute left-4 top-4 inline-flex items-center rounded-full bg-slate-900/80 px-3 py-1 text-xs font-semibold text-cyan-300 ring-1 ring-cyan-400/40 backdrop-blur">
                  {industry.badge}
                </span>
              </div>

              <div className="space-y-3 px-5 pb-5 pt-4">
                <h3 className="text-lg font-semibold text-white">
                  {industry.title}
                </h3>
                <p className="text-sm leading-relaxed text-slate-300">
                  {industry.description}
                </p>
                <button className="mt-2 inline-flex items-center text-sm font-semibold text-cyan-300 transition hover:text-cyan-200">
                  Ver playbook para este sector
                  <span className="ml-1 text-xs">↗</span>
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
