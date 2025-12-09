// app/ai-agents/page.tsx
import PremiumImage from "@/components/PremiumImage"; // NEW: Import PremiumImage component

export default function AIAgentsPage() {
  // Hardcoded hero content for simplicity, assuming it's not dynamic
  const hero = {
    title: "AI Agents Command Center",
    description: "Diseña, entrena y monitorea tus agentes de voz, WhatsApp, SMS y email desde un solo panel. Listo para vender a clínicas, abogados y más de 500 industrias."
  };

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-16 text-slate-50 lg:px-8">
      <section className="mx-auto max-w-5xl space-y-12">
        <header className="space-y-4 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-400">
            AI RECEPTIONIST · AUTONOMOUS AGENTS
          </p>
          <h1 className="text-4xl font-extrabold sm:text-5xl">
            {hero.title}
          </h1>
          <p className="text-lg text-slate-300 max-w-3xl mx-auto">
            {hero.description}
          </p>
        </header>

        {/* Premium Hero Image */}
        <div className="relative aspect-[16/9] overflow-hidden rounded-3xl border border-slate-800 shadow-2xl shadow-sky-900/50">
          <PremiumImage
            imageKey="ai-agents-hero"
            className="h-full"
          />
        </div>

        {/* Premium Feature Cards */}
        <div className="grid gap-6 md:grid-cols-3 pt-8">
          <div className="rounded-2xl border border-slate-700 bg-slate-900/70 p-6 shadow-lg hover:border-sky-500 transition duration-300">
            <h2 className="mb-2 text-xl font-bold text-sky-300">
              Inbound · Recepción 24/7
            </h2>
            <p className="text-sm text-slate-300">
              Atiende todas las llamadas, agenda citas y responde preguntas
              frecuentes en más de 100 idiomas y dialectos.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-700 bg-slate-900/70 p-6 shadow-lg hover:border-sky-500 transition duration-300">
            <h2 className="mb-2 text-xl font-bold text-sky-300">
              Outbound · Recordatorios y cobros
            </h2>
            <p className="text-sm text-slate-300">
              Campañas de llamadas y SMS para recordar citas, reducir
              no-shows y recuperar facturas pendientes.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-700 bg-slate-900/70 p-6 shadow-lg hover:border-sky-500 transition duration-300">
            <h2 className="mb-2 text-xl font-bold text-sky-300">
              Retención · Pacientes y clientes VIP
            </h2>
            <p className="text-sm text-slate-300">
              Flujos de seguimiento automatizados para mantener a los clientes
              activos y aumentar el LTV de cada cuenta.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
