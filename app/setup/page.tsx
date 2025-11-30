import type { Metadata } from "next";
import AISetupForm from "../components/AISetupForm";
import BackToHomeButton from "../components/BackToHomeButton";

export const metadata: Metadata = {
  title: "FrontDesk Agents – AI Setup",
  description: "Configure your FrontDesk AI Receptionist in 60 seconds."
};

export default function SetupPage() {
  // Idioma por defecto del asistente en el formulario
  const lang: "en" | "es" = "es";

  return (
    <main className="min-h-screen bg-slate-950 text-slate-50">
      <div className="max-w-5xl mx-auto px-4 py-8">
        <BackToHomeButton />

        <header className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight">
            Configure Your AI Receptionist
          </h1>
          <p className="mt-2 text-sm text-slate-300 max-w-2xl">
            Tell us about your business and we’ll generate the perfect AI phone agent
            script, flows and inbox. You can adjust everything later from your
            Command Center.
          </p>
        </header>

        <section className="grid gap-6 md:grid-cols-2">
          {/* Formulario */}
          <section className="fd-card p-6 sm:p-7">
            <AISetupForm lang={lang} />
          </section>

          {/* Visual / demo placeholder */}
          <section className="fd-card p-6 sm:p-7 flex flex-col justify-between">
            <div>
              <h2 className="text-sm font-semibold text-slate-100 mb-2">
                Live preview
              </h2>
              <p className="text-xs text-slate-300 mb-4">
                Aquí verás un preview de cómo tu agente IA saluda, confirma datos y
                agenda citas según la información que vas completando.
              </p>
            </div>
            <div className="rounded-lg border border-slate-800 bg-slate-900/70 p-4 text-xs text-slate-200 space-y-2">
              <p>
                <span className="font-semibold text-sky-400">AI:</span> FrontDesk
                Agents, buenos días, gracias por llamar a su clínica. ¿En qué puedo
                ayudarle hoy?
              </p>
              <p>
                <span className="font-semibold text-emerald-400">Cliente:</span> Quiero
                agendar una cita para la próxima semana.
              </p>
              <p>
                <span className="font-semibold text-sky-400">AI:</span> Perfecto, con
                gusto. ¿Cuál es su nombre completo y el mejor número para
                confirmaciones?
              </p>
            </div>
          </section>
        </section>
      </div>
    </main>
  );
}
