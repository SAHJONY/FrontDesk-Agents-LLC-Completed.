// app/ai-agents/page.tsx
import Image from "next/image";

export default function AIAgentsPage() {
  return (
    <main className="min-h-screen px-5 sm:px-8 pt-6 pb-12 bg-slate-950">
      <div className="max-w-6xl mx-auto space-y-8">
        <header className="space-y-2">
          <p className="text-xs uppercase tracking-[0.22em] text-cyan-300/80">
            Multi-Agent AI Workforce
          </p>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-50">
            AI Receptionists, Qualifiers & Follow-Up Agents
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl">
            Deploy different AI agents for intake, scheduling, payments and
            follow-ups. Each agent can speak multiple languages and adapt to
            your script and compliance rules.
          </p>
        </header>

        <section className="premium-image-container">
          <Image
            src="/premium/ai-agent-grid.png"
            alt="AI agents overview"
            fill
            className="premium-image"
          />
        </section>
      </div>
    </main>
  );
}
