// app/legal/terms/page.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Términos de servicio | FrontDesk Agents",
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-50 px-4 py-10 lg:px-8">
      <section className="mx-auto max-w-3xl space-y-6">
        <header className="space-y-2">
          <p className="text-xs font-semibold tracking-[0.3em] text-sky-400 uppercase">
            Legal
          </p>
          <h1 className="text-2xl font-semibold">Términos de servicio</h1>
          <p className="text-sm text-slate-400">
            Reglas básicas de uso del sistema FrontDesk Agents.
          </p>
        </header>

        <article className="space-y-4 text-sm text-slate-300">
          <p>
            Al usar FrontDesk Agents aceptas que el servicio se ofrece “tal cual”
            y que trabajaremos de buena fe para mantenerlo disponible y
            funcional, pero no garantizamos disponibilidad del 100% ni
            exactitud perfecta de las respuestas de la IA.
          </p>
          <p>
            Eres responsable de cumplir las leyes aplicables de protección de
            datos, telecomunicaciones y privacidad de tus clientes. FrontDesk
            Agents es una herramienta operativa; las decisiones comerciales y
            legales finales son tuyas.
          </p>
          <p>
            Podemos actualizar estos términos para reflejar mejoras del
            producto, cambios regulatorios o nuevos países soportados. Te
            notificaremos por los canales configurados en tu cuenta.
          </p>
          <p className="text-xs text-slate-500">
            * Este texto es un placeholder profesional. Debe ser revisado por un
            abogado para uso definitivo.
          </p>
        </article>
      </section>
    </main>
  );
}
