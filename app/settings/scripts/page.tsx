// app/settings/scripts/page.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Settings – Script de recepción | FrontDesk Agents",
};

export default function SettingsScriptsPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-50 px-4 py-10 lg:px-8">
      <section className="mx-auto max-w-4xl space-y-8">
        <header className="space-y-2">
          <p className="text-xs font-semibold tracking-[0.3em] text-sky-400 uppercase">
            Settings
          </p>
          <h1 className="text-2xl font-semibold">Script de recepción</h1>
          <p className="text-sm text-slate-400">
            Define cómo Alex se presenta, qué pregunta y cómo agenda o califica leads.
          </p>
        </header>

        <div className="space-y-6 rounded-xl border border-slate-800 bg-slate-900/60 p-6">
          <div className="space-y-1">
            <label className="text-xs font-medium text-slate-300">
              Saludo principal
            </label>
            <textarea
              className="h-24 w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-sm outline-none focus:border-sky-400"
              placeholder={`Hola, gracias por llamar a [Nombre de la clínica], te habla Alex, asistente virtual. ¿En qué puedo ayudarte hoy?`}
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-medium text-slate-300">
              Preguntas clave (calificación de lead)
            </label>
            <textarea
              className="h-32 w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-sm outline-none focus:border-sky-400"
              placeholder={`1. ¿Es tu primera vez con nosotros?\n2. ¿Qué tipo de servicio estás buscando?\n3. ¿Cuál es tu mejor número de contacto?\n4. ¿En qué horario prefieres tu cita?`}
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-medium text-slate-300">
              Instrucciones para agendar / pasar el lead
            </label>
            <textarea
              className="h-24 w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-sm outline-none focus:border-sky-400"
              placeholder="Ej: Si el lead es nuevo y calificado, agenda en Calendly y envía resumen por email/WhatsApp."
            />
          </div>

          <button className="rounded-md bg-sky-400 px-4 py-2 text-sm font-semibold text-slate-950 hover:bg-sky-300">
            Guardar script
          </button>
        </div>
      </section>
    </main>
  );
}
