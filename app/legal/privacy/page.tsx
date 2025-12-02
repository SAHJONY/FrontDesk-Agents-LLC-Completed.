// app/legal/privacy/page.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Política de privacidad | FrontDesk Agents",
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-50 px-4 py-10 lg:px-8">
      <section className="mx-auto max-w-3xl space-y-6">
        <header className="space-y-2">
          <p className="text-xs font-semibold tracking-[0.3em] text-sky-400 uppercase">
            Legal
          </p>
          <h1 className="text-2xl font-semibold">Política de privacidad</h1>
          <p className="text-sm text-slate-400">
            Resumen simplificado. Más adelante puedes reemplazar el texto con
            tu versión revisada por abogado.
          </p>
        </header>

        <article className="space-y-4 text-sm text-slate-300">
          <p>
            FrontDesk Agents recopila información necesaria para operar el
            servicio de AI Receptionist: datos de contacto del negocio, datos
            básicos de llamadas, y respuestas de los leads que interactúan con
            el sistema.
          </p>
          <p>
            No vendemos tu información ni la de tus clientes a terceros. Usamos
            proveedores de infraestructura y telecomunicaciones para poder
            ofrecer el servicio (por ejemplo: voz, almacenamiento, analítica).
          </p>
          <p>
            Puedes solicitar la corrección o eliminación de ciertos datos
            escribiendo a support@frontdeskagents.com. Algunas obligaciones
            legales pueden requerir que conservemos registros mínimos de
            actividad.
          </p>
          <p className="text-xs text-slate-500">
            * Este texto es genérico y no constituye asesoría legal. Debe ser
            revisado y adaptado por un profesional según tu jurisdicción.
          </p>
        </article>
      </section>
    </main>
  );
}
