import { frontdeskAgentsSystem } from "@/lib/frontdesk_agents_system";

export default function DashboardPage() {
  const ai = frontdeskAgentsSystem.ai_agent_advancement;

  return (
    <main className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="text-2xl font-semibold tracking-tight">
        Command Center
      </h1>
      <p className="mt-1 text-xs text-slate-400">
        {frontdeskAgentsSystem.identity.core_tagline} ·{" "}
        {frontdeskAgentsSystem.identity.name}
      </p>

      <section className="mt-6 grid gap-4 md:grid-cols-3">
        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
          <h2 className="text-sm font-semibold text-cyan-300">
            Today&apos;s performance
          </h2>
          {/* Aquí luego conectamos métricas reales */}
          <p className="mt-2 text-sm text-slate-300">
            Calls handled: 0 · Booked: 0 · Conversion: 0%
          </p>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
          <h2 className="text-sm font-semibold text-cyan-300">
            Core capabilities
          </h2>
          <ul className="mt-2 space-y-1 text-xs text-slate-300">
            <li>• {ai.features.proactive_intent_modeling}</li>
            <li>• {ai.features.cross_channel_contextual_memory}</li>
            <li>• {ai.features.dynamic_persona_shifting}</li>
            <li>• {ai.features.autonomous_task_execution}</li>
          </ul>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
          <h2 className="text-sm font-semibold text-cyan-300">Compliance</h2>
          <p className="mt-2 text-xs text-slate-300">
            {frontdeskAgentsSystem.compliance.legal.note}
          </p>
        </div>
      </section>
    </main>
  );
}
import BackToHomeButton from "@/app/components/BackToHomeButton";

export default function DashboardPage() {
  return (
    <main className="px-4 py-6">
      {/* …tu contenido actual… */}
      <BackToHomeButton />
    </main>
  );
}
