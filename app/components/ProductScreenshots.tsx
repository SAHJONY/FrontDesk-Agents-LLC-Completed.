// components/ProductScreenshots.tsx
import Image from "next/image";

const screenshots = [
  {
    src: "/0672B5C4-2EA5-4904-B71C-F50815398E48.png",
    title: "Command Center · Vista general",
    desc: "Panel central con KPIs de llamadas, WhatsApp y conversiones en tiempo real.",
  },
  {
    src: "/08E6E2CC-933F-448F-96AA-E2CAC6AC7598.png",
    title: "Embudo de ingresos",
    desc: "Visualización de cómo cada llamada se convierte en leads, citas y ventas.",
  },
  {
    src: "/0DD5A262-4F4A-48A6-BCA8-B7D106E781EB.png",
    title: "Detalle de conversación",
    desc: "Historial completo con transcripción, grabación y contexto del cliente.",
  },
  {
    src: "/0E208AAA-D75C-4EE3-A570-8E88DAF84829.png",
    title: "Automatizaciones y reglas",
    desc: "Reglas por industria para enrutar y priorizar llamadas de alto valor.",
  },
];

export function ProductScreenshots() {
  return (
    <section
      id="features"
      className="border-y border-slate-800 bg-slate-950/70 py-16"
    >
      <div className="mx-auto max-w-6xl px-4">
        <p className="text-center text-xs font-semibold uppercase tracking-[0.25em] text-cyan-400">
          Command Center en acción
        </p>
        <h2 className="mt-4 text-center text-2xl font-semibold sm:text-3xl">
          Ve cómo AI PHONE OS controla cada llamada, WhatsApp y email.
        </h2>
        <p className="mt-3 text-center text-sm text-slate-300 sm:text-base">
          Dashboards de nivel ejecutivo, configurados para médicos,
          abogados, inmobiliarias y equipos B2B que viven de cada
          conversación.
        </p>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {screenshots.map((shot) => (
            <div
              key={shot.src}
              className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/70 shadow-sm shadow-slate-950/60"
            >
              <div className="relative h-56 w-full sm:h-64">
                <Image
                  src={shot.src}
                  alt={shot.title}
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 50vw, 100vw"
                />
              </div>
              <div className="px-4 py-3">
                <h3 className="text-sm font-semibold text-slate-50">
                  {shot.title}
                </h3>
                <p className="mt-1 text-xs text-slate-300">{shot.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
