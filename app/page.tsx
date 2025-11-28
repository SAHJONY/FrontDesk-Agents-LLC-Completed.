// app/page.tsx
import Link from "next/link";
import ProductScreenshots from "./components/ProductScreenshots";

export default function HomePage() {
  return (
    <>
      {/* HERO */}
      <section className="mx-auto flex max-w-6xl flex-col gap-10 px-4 pb-12 pt-10 md:flex-row md:items-center">
        <div className="flex-1 space-y-5">
          <p className="inline-flex items-center gap-2 rounded-full border border-cyan-500/40 bg-cyan-500/10 px-3 py-1 text-[11px] font-medium text-cyan-200">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            Always-on AI Phone OS · 24/7
          </p>

          <div className="space-y-3">
            <h1 className="text-balance text-3xl font-semibold leading-tight text-slate-50 md:text-4xl">
              Convierte cada llamada, WhatsApp y email en{" "}
              <span className="text-cyan-300">
                ingresos reservados en menos de 60 segundos
              </span>
              .
            </h1>
            <p className="max-w-xl text-sm text-slate-300">
              FrontDesk Agents es tu{" "}
              <span className="font-semibold">AI Receptionist Command Center</span>{" "}
              de nivel Fortune 500: agenda citas, califica leads, responde
              clientes y protege cada oportunidad, incluso mientras duermes.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/setup"
              className="rounded-full bg-cyan-500 px-5 py-2.5 text-sm font-semibold text-slate-950 shadow-lg shadow-cyan-500/40 hover:bg-cyan-400"
            >
              Iniciar demo guiada
            </Link>
            <Link
              href="/pricing"
              className="rounded-full border border-slate-600/70 px-4 py-2 text-sm font-medium text-slate-100 hover:border-cyan-400 hover:text-cyan-200"
            >
              Ver precios & planes
            </Link>
            <p className="w-full text-xs text-slate-400 md:w-auto">
              +38% más citas confirmadas en promedio en 90 días.
            </p>
          </div>

          <div className="grid max-w-xl grid-cols-3 gap-3 text-[11px] text-slate-300">
            <div>
              <p className="font-semibold text-slate-100">Clínicas & Médicos</p>
              <p className="text-slate-400">No-shows abajo, producción arriba.</p>
            </div>
            <div>
              <p className="font-semibold text-slate-100">Firmas Legales</p>
              <p className="text-slate-400">
                Intake filtrado y casos mejor calificados.
              </p>
            </div>
            <div>
              <p className="font-semibold text-slate-100">Real Estate</p>
              <p className="text-slate-400">
                Inversionistas, leads y showings sin perder llamadas.
              </p>
            </div>
          </div>
        </div>

        {/* Side highlight image */}
        <div className="flex-1">
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl border border-slate-800/80 bg-slate-900/80">
            {/* Imagen premium desde /public */}
            {/* Puedes cambiar el archivo si quieres otro hero */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(34,211,238,0.35),_transparent_55%),radial-gradient(circle_at_bottom,_rgba(59,130,246,0.35),_transparent_55%)]" />
            <div className="absolute inset-[14px] rounded-2xl border border-slate-700/70 bg-slate-950/80 backdrop-blur">
              <div className="flex h-full flex-col justify-between p-4">
                <div className="space-y-2">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-cyan-300/80">
                    LIVE COMMAND FEED
                  </p>
                  <p className="text-xs text-slate-200">
                    AI Receptionist gestionando llamadas, WhatsApp y emails en
                    tiempo real para tus 4 verticales clave.
                  </p>
                </div>

                <div className="space-y-3 text-[11px]">
                  <div className="flex items-center justify-between rounded-xl bg-slate-900/80 px-3 py-2">
                    <span className="text-slate-300">
                      07:42 · Clínica Dental Houston
                    </span>
                    <span className="text-emerald-400 font-semibold">
                      Cita confirmada
                    </span>
                  </div>
                  <div className="flex items-center justify-between rounded-xl bg-slate-900/80 px-3 py-2">
                    <span className="text-slate-300">
                      07:44 · Bufete de Abogados
                    </span>
                    <span className="text-amber-300 font-semibold">
                      Lead calificado
                    </span>
                  </div>
                  <div className="flex items-center justify-between rounded-xl bg-slate-900/80 px-3 py-2">
                    <span className="text-slate-300">
                      07:45 · Inversionista Real Estate
                    </span>
                    <span className="text-cyan-300 font-semibold">
                      Showing agendado
                    </span>
                  </div>
                  <p className="pt-1 text-[10px] text-slate-500">
                    24/7 · Multilenguaje · Grabaciones auditables · Trazabilidad
                    completa.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PRODUCT SCREENS */}
      <ProductScreenshots />
    </>
  );
}
