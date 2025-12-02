import { getPageHero } from "@/lib/siteImages";

export default function Page() {
  const hero = getPageHero("ai-agents");

  return (
    <main className="min-h-screen px-4 py-10 lg:px-8">
      <section className="mx-auto max-w-6xl">
        <header className="mb-8 space-y-3">
          <p className="text-xs font-semibold tracking-[0.3em] text-sky-400 uppercase">
            AI Agents
          </p>
          <h1 className="text-4xl font-bold">{hero?.title}</h1>
          <p className="text-gray-400">{hero?.description}</p>
        </header>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* CONTENIDO REAL DE TU SECCIÓN */}
          <div className="p-6 rounded-xl border border-gray-800 bg-black/20">
            <h2 className="font-semibold mb-2 text-lg">Autonomous Agents</h2>
            <p className="text-gray-400 text-sm">
              Multi-agent orchestration for real-world tasks.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
