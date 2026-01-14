// app/ai-agents/page.tsx
import Image from "next/image";
import { getPageHero } from "@/lib/siteImages";

export default function AIAgentsPage() {
  
  const hero = getPageHero("ai-agents");

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-10 text-slate-50 lg:px-8">
      <section className="mx-auto max-w-5xl space-y-8">
        <header className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-sky-400">
            AI RECEPTIONIST · AUTONOMOUS AGENTS
          </p>
          {hero && (
            <>
              <h1 className="text-3xl font-bold sm:text-4xl">
                {hero.title}
              </h1>
              <p className="text-sm text-slate-300 sm:text-base">
                {hero.description}
              </p>
            </>
          )}
        </header>

        {hero && (
          <div className="relative mt-2 aspect-[16/9] overflow-hidden rounded-2xl border border-slate-800">
            <Image
              src={hero.src}
              alt={hero.alt}
              width={1600}
              height={900}
              className="w-full h-auto rounded-xl object-cover"
              priority
            />
          </div>
        )}

        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-4">
            <h2 className="mb-1 text-sm font-semibold text-sky-300">
              Inbound · Recepción 24/7
            </h2>
            <p className="text-xs text-slate-300">
              Atiende todas las llamadas, agenda citas y responde preguntas
              frecuentes en más de 100 idiomas y dialectos.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-4">
            <h2 className="mb-1 text-sm font-semibold text-sky-300">
              Outbound · Recordatorios y cobros
            </h2>
            <p className="text-xs text-slate-300">
              Campañas de llamadas y SMS para recordar citas, reducir
              no-shows y recuperar facturas pendientes.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-4">
            <h2 className="mb-1 text-sm font-semibold text-sky-300">
              Retención · Pacientes y clientes VIP
            </h2>
            <p className="text-xs text-slate-300">
              Flujos de seguimiento automatizados para mantener a los clientes
              activos y aumentar el LTV de cada cuenta.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
