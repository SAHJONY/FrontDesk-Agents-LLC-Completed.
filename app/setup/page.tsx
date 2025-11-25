// app/setup/page.tsx
import AISetupForm from "../components/AISetupForm";

export default function SetupPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-50 px-4 py-6 sm:px-6 md:px-8">
      <div className="max-w-5xl mx-auto space-y-6">
        <header className="space-y-1">
          <p className="text-xs uppercase tracking-[0.2em] text-sky-400">
            Setup
          </p>
          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight">
            Configuración inicial de FrontDesk Agents
          </h1>
          <p className="text-sm text-slate-400 max-w-2xl">
            Aquí conectaremos tus números, CRM y reglas básicas del agente.
            Por ahora es una UI de demostración; luego la conectamos al backend
            real.
          </p>
        </header>

        <AISetupForm />
      </div>
    </main>
  );
}
