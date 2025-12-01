// app/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { SiteHeader } from "./components/SiteHeader";

export const metadata: Metadata = {
  title: "FrontDesk Agents – AI Receptionist Command Center",
  description:
    "24/7 AI Receptionist that answers calls, WhatsApp, SMS and email like your best human agent. More bookings, zero missed calls.",
};

const features = [
  {
    title: "24/7 AI Receptionist",
    desc: "Responde llamadas, WhatsApp, SMS y email aunque tu equipo esté durmiendo o en otra llamada.",
  },
  {
    title: "Command Center en tiempo real",
    desc: "Un solo panel para ver quién llamó, qué preguntó, qué vendimos y cuánto dinero generó cada conversación.",
  },
  {
    title: "Entrenado con TU negocio",
    desc: "Aprende tu guion, precios, horarios, pólizas y forma de hablar. No es un bot genérico.",
  },
];

const stats = [
  { label: "Llamadas perdidas", value: "–80%" },
  { label: "Nuevas citas", value: "+35%" },
  { label: "Disponible", value: "24/7/365" },
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-50">
      {/* Header global con toggle de idioma y tema */}
      <SiteHeader />

      {/* HERO */}
      <section className="relative overflow-hidden border-b border-slate-800 bg-gradient-to-b from-slate-950 via-slate-950 to-slate-900">
        <div className="absolute inset-0 opacity-40 pointer-events-none">
          <div className="mx-auto max-w-6xl h-full blur-3xl">
            <div className="h-1/2 bg-sky-500/20" />
            <div className="h-1/2 bg-emerald-500/10" />
          </div>
        </div>

        <div className="relative mx-auto flex max-w-6xl flex-col gap-10 px-4 pb-16 pt-8 sm:px-6 lg:flex-row lg:items-center lg:pb-24 lg:pt-16">
          {/* Columna texto */}
          <div className="w-full lg:w-1/2 space-y-6">
            <span className="inline-flex items-center gap-2 rounded-full border border-sky-500/40 bg-sky-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-sky-200">
              FrontDesk Agents · AI Receptionist Command Center
            </span>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-slate-50">
              Tu recepcionista IA 24/7
              <span className="block text-sky-300">
                que nunca deja un cliente en espera.
              </span>
            </h1>

            <p className="max-w-xl text-sm sm:text-base text-slate-300">
              FrontDesk Agents atiende todas tus llamadas, WhatsApp, SMS y emails
              en inglés y español, confirma citas, pre-califica clientes y envía
              resúmenes a tu equipo. Tú sólo ves el dinero entrar.
            </p>

            {/* Bullets rápidos */}
            <ul className="space-y-2 text-sm text-slate-200">
              <li>• Soporta múltiples sucursales, horarios y números al mismo tiempo.</li>
              <li>• Integración con tu CRM, agenda y pipelines de ventas.</li>
              <li>• Modo bilingüe EN/ES listo para clínicas, abogados y real estate.</li>
            </ul>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3 pt-2">
              <Link
                href="/setup"
                className="inline-flex items-center justify-center rounded-full bg-sky-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-sky-500/40 hover:bg-sky-400"
              >
                Configurar mi agente en 60s
              </Link>

              <Link
                href="/pricing"
                className="inline-flex items-center justify-center rounded-full border border-slate-600 bg-slate-950/60 px-5 py-2.5 text-sm font-semibold text-slate-100 hover:bg-slate-900/80"
              >
                Ver planes y precios
              </Link>
            </div>

            {/* Stats */}
            <div className="mt-4 grid grid-cols-3 gap-4 max-w-xs text-xs sm:text-sm">
              {stats.map((s) => (
                <div key={s.label} className="space-y-0.5">
                  <div className="text-lg sm:text-xl font-semibold text-sky-300">
                    {s.value}
                  </div>
                  <div className="text-slate-400">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Columna imágenes / command center */}
          <div className="w-full lg:w-1/2 space-y-4">
            {/* Imagen cinematográfica principal */}
            <div className="relative aspect-video w-full overflow-hidden rounded-3xl border border-slate-800/80 bg-slate-900">
              <Image
                src="/hero-frontdesk-1.jpg"
                alt="AI Receptionist command center dashboard"
                fill
                priority
                className="object-cover"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-900/10 to-transparent" />
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-slate-100">
                <span className="font-semibold">Command Center · Live Calls</span>
                <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-[11px] text-emerald-200">
                  3 agentes IA activos
                </span>
              </div>
            </div>

            {/* Mini cards tipo dashboard */}
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-3 text-xs text-slate-200">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-semibold">Hoy</span>
                  <span className="text-[11px] text-emerald-300">+18% vs ayer</span>
                </div>
                <p>Llamadas atendidas: 62</p>
                <p>Citas agendadas: 19</p>
                <p className="text-[11px] text-slate-400 mt-1">
                  Sin llamadas perdidas mientras dormías.
                </p>
              </div>
              <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-3 text-xs text-slate-200">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-semibold">Multi-idioma</span>
                  <span className="text-[11px] text-sky-300">EN · ES</span>
                </div>
                <p>Detecta idioma del cliente en tiempo real.</p>
                <p>Responde en inglés o español automáticamente.</p>
                <p className="text-[11px] text-slate-400 mt-1">
                  Perfecto para USA, México y Latinoamérica.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sección features */}
      <section className="border-t border-slate-800 bg-slate-950">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
          <h2 className="text-xl sm:text-2xl font-semibold text-slate-50 mb-5">
            Un solo sistema. Toda tu recepción bajo control.
          </h2>
          <div className="grid gap-5 sm:grid-cols-3">
            {features.map((f) => (
              <div
                key={f.title}
                className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 text-sm text-slate-200"
              >
                <h3 className="mb-1 text-sm font-semibold text-sky-200">
                  {f.title}
                </h3>
                <p className="text-slate-300 text-xs sm:text-sm">{f.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400">
            <span>Funciona para clínicas, despachos legales, inmobiliarias y más de 500 industrias.</span>
            <Link
              href="/dashboard"
              className="inline-flex items-center justify-center rounded-full border border-slate-600 px-4 py-1.5 text-xs font-semibold text-slate-100 hover:bg-slate-900"
            >
              Ver demo del Command Center
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
