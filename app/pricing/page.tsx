// app/pricing/page.tsx
import Link from "next/link";

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-50">
      <section className="mx-auto flex w-full max-w-5xl flex-col gap-10 px-4 pb-20 pt-16">
        {/* Encabezado */}
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-cyan-400">
            Pricing · Precios
          </p>
          <h1 className="mt-3 text-3xl font-semibold sm:text-4xl">
            Plans that grow with your business
            <span className="block text-cyan-300">
              Planes que crecen con tu negocio
            </span>
          </h1>
          <p className="mt-4 text-sm text-slate-300 sm:text-base">
            Empieza con un piloto pequeño y escala cuando FrontDesk Agents esté
            generando ingresos reservados 24/7 para tu empresa.
          </p>
        </div>

        {/* Grid de planes */}
        <div className="grid gap-6 md:grid-cols-3">
          {/* Starter */}
          <div className="flex flex-col rounded-2xl border border-slate-800 bg-slate-900/60 p-6 shadow-lg shadow-slate-900/80">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
              Starter
            </p>
            <h2 className="mt-2 text-xl font-semibold">$399 / mes</h2>
            <p className="mt-1 text-xs text-slate-400">
              Ideal para clínicas pequeñas, consultorios o despachos con un solo
              número principal.
            </p>
            <ul className="mt-4 flex-1 space-y-2 text-xs text-slate-200">
              <li>• 1 AI receptionist (voz + WhatsApp + email)</li>
              <li>• 1 inbox central</li>
              <li>• Soporte en Inglés + Español por defecto</li>
              <li>• Horario 24/7</li>
              <li>• Logs básicos y grabaciones de llamadas</li>
            </ul>
            <Link
              href="/setup"
              className="mt-5 inline-flex items-center justify-center rounded-full bg-cyan-500 px-4 py-2 text-sm font-semibold text-slate-950 hover:bg-cyan-400"
            >
              Start with Starter · Comenzar
            </Link>
          </div>

          {/* Professional */}
          <div className="relative flex flex-col rounded-2xl border border-cyan-500/80 bg-slate-900/80 p-6 shadow-xl shadow-cyan-500/30">
            <span className="absolute right-4 top-4 rounded-full bg-cyan-500/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-wide text-cyan-300">
              Most popular · Más vendido
            </span>
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
              Professional
            </p>
            <h2 className="mt-2 text-xl font-semibold">$899 / mes</h2>
            <p className="mt-1 text-xs text-slate-400">
              Para PYMES, firmas legales y multi-sucursales que quieren
              reemplazar el call center tradicional.
            </p>
            <ul className="mt-4 flex-1 space-y-2 text-xs text-slate-200">
              <li>• 3 AI receptionists (ventas, soporte, cobranza)</li>
              <li>• 3 inboxes + routing inteligente</li>
              <li>• Multilenguaje (hasta 100+ idiomas y dialectos)</li>
              <li>• Integración con CRM y calendarios</li>
              <li>• Dashboards de revenue y analytics en tiempo real</li>
              <li>• Soporte prioritario</li>
            </ul>
            <Link
              href="/setup"
              className="mt-5 inline-flex items-center justify-center rounded-full bg-cyan-500 px-4 py-2 text-sm font-semibold text-slate-950 hover:bg-cyan-400"
            >
              Start Professional · Agendar demo
            </Link>
          </div>

          {/* Enterprise */}
          <div className="flex flex-col rounded-2xl border border-slate-800 bg-slate-900/60 p-6 shadow-lg shadow-slate-900/80">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
              Enterprise
            </p>
            <h2 className="mt-2 text-xl font-semibold">$1,799 / mes</h2>
            <p className="mt-1 text-xs text-slate-400">
              Diseñado para cadenas, hospitales, grupos multi-marca o
              operaciones con alto volumen de llamadas.
            </p>
            <ul className="mt-4 flex-1 space-y-2 text-xs text-slate-200">
              <li>• AI receptionists e inboxes ilimitados</li>
              <li>• Flujos personalizados por sucursal y marca</li>
              <li>• Single Sign-On, SLA empresarial y auditoría avanzada</li>
              <li>• Soporte dedicado / Customer Success Manager</li>
              <li>• Integraciones personalizadas y acceso API</li>
            </ul>
            <Link
              href="/contact"
              className="mt-5 inline-flex items-center justify-center rounded-full border border-cyan-500/70 px-4 py-2 text-sm font-semibold text-cyan-300 hover:bg-cyan-500/10"
            >
              Talk to sales · Hablar con ventas
            </Link>
          </div>
        </div>

        {/* FAQ corta */}
        <div className="mt-6 grid gap-6 rounded-2xl border border-slate-800 bg-slate-900/50 p-5 text-sm text-slate-200 md:grid-cols-3">
          <div>
            <h3 className="text-sm font-semibold">¿Hay contrato mínimo?</h3>
            <p className="mt-1 text-xs text-slate-400">
              Mes a mes. Puedes cambiar de plan o cancelar con 30 días de aviso.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold">¿Incluye puesta en marcha?</h3>
            <p className="mt-1 text-xs text-slate-400">
              Sí. Configuramos tu primer agente, flujos y scripts sin costo
              adicional en todos los planes.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold">¿Cómo se calcula el retorno?</h3>
            <p className="mt-1 text-xs text-slate-400">
              Medimos citas reservadas, consultas agendadas y valor de cada
              llamada para mostrar el ROI directo en tu dashboard.
            </p>
          </div>
        </div>

        {/* CTA final */}
        <div className="mt-4 flex flex-col items-center gap-3 text-center text-sm text-slate-300">
          <p>
            ¿No estás seguro de qué plan elegir? —{" "}
            <span className="text-cyan-300">
              Empezamos con un piloto pequeño y ajustamos después.
            </span>
          </p>
          <Link
            href="/setup"
            className="inline-flex items-center justify-center rounded-full bg-cyan-500 px-5 py-2.5 text-sm font-semibold text-slate-950 hover:bg-cyan-400"
          >
            Configurar tu AI Receptionist en 5 minutos
          </Link>
        </div>
      </section>
    </main>
  );
}
