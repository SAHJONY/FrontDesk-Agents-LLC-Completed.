// app/ai-agents/page.tsx
import Image from "next/image";
import { getPageHero } from "@/lib/siteImages";

export default function AIAgentsPage() {
  const hero = getPageHero("ai-agents");

  return (
    <main className="min-h-screen bg-slate-950 text-slate-50 px-4 py-10 lg:px-8">
      <section className="mx-auto max-w-6xl space-y-8">
        <header className="space-y-3">
          <p className="text-xs font-semibold tracking-[0.3em] text-sky-400 uppercase">
            AI RECEPTIONIST · AUTONOMOUS AGENTS
          </p>
          <h1 className="text-3xl sm:text-4xl font-bold">
            Your AI Agents Command Center
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl">
            Conecta tus agentes de voz, WhatsApp, SMS y email en un solo
            panel. Aquí controlas scripts, horarios, métricas y revenue
            generado por cada agente, sin depender de un call center humano.
          </p>
        </header>

        {hero && (
          <div className="overflow-hidden rounded-xl border border-slate-800 bg-slate-900/60">
            <Image
              src={hero.src}
              alt={hero.alt}
              width={1600}
              height={900}
              className="w-full h-auto object-cover"
              priority
            />
          </div>
        )}

        <div className="grid gap-6 md:grid-cols-3">
          <div className="space-y-2">
            <h2 className="text-sm font-semibold text-slate-100">
              Voice & Phone Agents
            </h2>
            <p className="text-xs text-slate-300">
              Responde llamadas entrantes, hace outbound y agenda citas 24/7
              en inglés y español, con scripts ajustados a tu industria.
            </p>
          </div>
          <div className="space-y-2">
            <h2 className="text-sm font-semibold text-slate-100">
              WhatsApp, SMS & Email
            </h2>
            <p className="text-xs text-slate-300">
              Conversaciones sincronizadas en todos los canales, con
              seguimiento automático de leads y recordatorios de citas.
            </p>
          </div>
          <div className="space-y-2">
            <h2 className="text-sm font-semibold text-slate-100">
              Revenue Tracking
            </h2>
            <p className="text-xs text-slate-300">
              Cada llamada, chat y cita se conecta a ingresos estimados para
              que veas cuánto dinero está generando tu receptionist AI.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
