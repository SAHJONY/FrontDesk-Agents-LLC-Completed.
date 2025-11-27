// app/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import { IndustriesGrid } from "@/components/IndustriesGrid";

export const metadata: Metadata = {
  title: "FrontDesk Agents – 24/7 AI Receptionist & Booking OS",
  description:
    "Convierte llamadas, WhatsApp y emails en citas reservadas en menos de 60 segundos con FrontDesk Agents."
};

export default function HomePage() {
  return (
    <main className="min-h-screen bg-neutral-50 text-neutral-900">
      {/* HERO */}
      <section className="border-b border-neutral-200 bg-white">
        <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 py-16 md:flex-row md:items-center md:py-20">
          <div className="flex-1">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-600">
              FRONTDESK AGENTS • AI RECEPTION OS
            </p>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
              Convierte cada llamada, WhatsApp y correo en{" "}
              <span className="text-blue-600">ingresos reservados</span> en
              menos de 60 segundos.
            </h1>
            <p className="mt-4 max-w-xl text-sm text-neutral-600 sm:text-base">
              Un sistema de recepcionistas con IA, disponible 24/7, que responde,
              califica, agenda y confirma cada oportunidad en tiempo real, en
              múltiples idiomas.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href="#demo"
                className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-700"
              >
                Agendar demo gratuita
              </Link>
              <Link
                href="#industries"
                className="text-sm font-medium text-neutral-700 hover:text-neutral-900"
              >
                Ver industrias compatibles →
              </Link>
            </div>

            <dl className="mt-8 grid max-w-xl grid-cols-2 gap-4 text-xs text-neutral-600 sm:text-sm">
              <div>
                <dt className="font-semibold text-neutral-800">
                  24/7/365 sin buzones de voz
                </dt>
                <dd>Recepción continua, incluso fuera de horario y festivos.</dd>
              </div>
              <div>
                <dt className="font-semibold text-neutral-800">
                  Multicanal y multilingüe
                </dt>
                <dd>Teléfono, WhatsApp, SMS, email y web chat.</dd>
              </div>
              <div>
                <dt className="font-semibold text-neutral-800">
                  Integración con tu stack
                </dt>
                <dd>Calendario, CRM y herramientas de negocio.</dd>
              </div>
              <div>
                <dt className="font-semibold text-neutral-800">
                  Diseñado para ingresos
                </dt>
                <dd>Optimizado para reservas, no solo para respuestas.</dd>
              </div>
            </dl>
          </div>

          <div className="flex-1 md:max-w-sm">
            <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-900 px-6 py-5 text-sm text-neutral-50 shadow-lg">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-400">
                PANEL EN TIEMPO REAL
              </p>
              <p className="mt-2 text-base font-medium">
                Cada llamada atendida. Cada oportunidad rastreada.
              </p>
              <ul className="mt-4 space-y-2 text-xs text-neutral-300">
                <li>• Vista en vivo de llamadas, chats y WhatsApps.</li>
                <li>• Motivo de contacto, urgencia e intención de compra.</li>
                <li>• Citas confirmadas con recordatorios automáticos.</li>
                <li>• Etiquetas por campaña y fuente de tráfico.</li>
              </ul>
              <div className="mt-5 rounded-xl bg-neutral-800 px-4 py-3 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-neutral-100">
                    Hoy
                  </span>
                  <span className="text-green-400">+37% reservas</span>
                </div>
                <div className="mt-3 h-2 w-full rounded-full bg-neutral-700">
                  <div className="h-2 w-3/4 rounded-full bg-blue-500" />
                </div>
                <p className="mt-2 text-[11px] text-neutral-400">
                  Incremento frente al promedio semanal tras activar FrontDesk
                  Agents.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BENEFICIOS PRINCIPALES */}
      <section
        id="demo"
        className="border-b border-neutral-200 bg-neutral-50 py-14"
      >
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            De contacto perdido a ingreso reservado.
          </h2>
          <p className="mt-3 max-w-2xl text-sm text-neutral-600 sm:text-base">
            El sistema responde como tu mejor recepcionista humano, pero sin
            descansos: detecta intención, captura datos clave, agenda citas y
            actualiza tu CRM automáticamente.
          </p>

          <div className="mt-8 grid gap-6 md:grid-cols-3">
            <div className="rounded-xl border border-neutral-200 bg-white p-5 text-sm">
              <h3 className="text-base font-semibold">Nunca más buzón de voz</h3>
              <p className="mt-2 text-xs text-neutral-600">
                Cada llamada es atendida en segundos con scripts diseñados para
                convertir, no solo para informar.
              </p>
            </div>
            <div className="rounded-xl border border-neutral-200 bg-white p-5 text-sm">
              <h3 className="text-base font-semibold">
                Citas completas y cualificadas
              </h3>
              <p className="mt-2 text-xs text-neutral-600">
                Recolecta motivo, seguro, presupuesto, urgencia y cualquier dato
                que tu equipo necesite antes de la visita.
              </p>
            </div>
            <div className="rounded-xl border border-neutral-200 bg-white p-5 text-sm">
              <h3 className="text-base font-semibold">
                Operación global, voz local
              </h3>
              <p className="mt-2 text-xs text-neutral-600">
                Soporta múltiples idiomas y zonas horarias, manteniendo el tono y
                protocolo de tu marca en cada interacción.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* INDUSTRIAS */}
      <section id="industries">
        <IndustriesGrid />
      </section>
    </main>
  );
}
