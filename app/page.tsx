import Image from "next/image";
import Link from "next/link";
import { useLang } from "./components/LangProvider";

function HeroContent() {
  const { lang } = useLang();
  const isEs = lang === "es";

  const t = {
    badge: isEs ? "AI Reception 24/7" : "24/7 AI Reception",
    title: isEs
      ? "Tu negocio nunca vuelve a perder una llamada"
      : "Your business never misses a call again",
    subtitle: isEs
      ? "FrontDesk Agents combina agentes de voz IA, WhatsApp, SMS y email en un solo Command Center. Diseñado para clínicas, despachos, inmobiliarias y negocios que viven del teléfono."
      : "FrontDesk Agents unifies AI voice agents, WhatsApp, SMS and email into one Command Center. Built for clinics, law firms, real estate and any phone-driven business.",
    ctaPrimary: isEs ? "Ver Command Center en vivo" : "View Command Center live",
    ctaSecondary: isEs ? "Configurar en 60 segundos" : "Set up in 60 seconds",
    trust:
      isEs
        ? "Optimizado para llamadas internacionales, spam shield y reportes diarios."
        : "Optimized for international calls, spam shield and daily reporting.",
  };

  return (
    <div className="grid gap-10 lg:grid-cols-[1.1fr_minmax(0,1fr)] items-center mt-6">
      {/* Text side */}
      <div className="space-y-6">
        <span className="inline-flex items-center gap-1 rounded-full border border-sky-400/60 bg-sky-50/80 dark:bg-sky-950/40 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-sky-700 dark:text-sky-300">
          • {t.badge}
        </span>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight">
          {t.title}
        </h1>

        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-xl">
          {t.subtitle}
        </p>

        <div className="flex flex-wrap gap-3">
          <Link
            href="/dashboard"
            className="inline-flex items-center justify-center rounded-lg bg-sky-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-sky-500/40 hover:bg-sky-700"
          >
            {t.ctaPrimary}
          </Link>
          <Link
            href="/setup"
            className="inline-flex items-center justify-center rounded-lg border border-slate-300/80 dark:border-slate-600/80 px-4 py-2.5 text-sm font-semibold hover:border-sky-500 hover:text-sky-600 dark:hover:border-sky-400 dark:hover:text-sky-300"
          >
            {t.ctaSecondary}
          </Link>
        </div>

        <p className="text-xs sm:text-[13px] text-slate-500 dark:text-slate-400 max-w-md">
          {t.trust}
        </p>
      </div>

      {/* Visual side */}
      <div className="grid gap-4">
        <div className="relative h-52 sm:h-64 rounded-2xl overflow-hidden border border-slate-800/60 bg-gradient-to-tr from-slate-900 via-slate-950 to-sky-900">
          <Image
            src="/hero-cinema-1.jpg"
            alt="AI Command Center dashboard with live calls"
            fill
            priority
            className="object-cover opacity-70"
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-slate-950/80 via-slate-900/40 to-sky-500/20" />
          <div className="absolute inset-0 p-4 flex flex-col justify-between">
            <div className="flex justify-between text-[11px] text-sky-200">
              <span>Live Command Center</span>
              <span>Real-time calls</span>
            </div>
            <div className="space-y-2">
              <p className="text-xs text-slate-300">
                AI Agents handling calls, WhatsApp, SMS and email in one
                cinematic dashboard.
              </p>
              <div className="grid grid-cols-3 gap-2 text-[10px] text-slate-100">
                <div className="rounded-lg bg-slate-900/70 p-2">
                  <p className="text-slate-400 mb-1">Today calls</p>
                  <p className="text-lg font-semibold text-emerald-400">
                    124
                  </p>
                </div>
                <div className="rounded-lg bg-slate-900/70 p-2">
                  <p className="text-slate-400 mb-1">Booked</p>
                  <p className="text-lg font-semibold text-sky-400">39</p>
                </div>
                <div className="rounded-lg bg-slate-900/70 p-2">
                  <p className="text-slate-400 mb-1">Missed</p>
                  <p className="text-lg font-semibold text-rose-400">0</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Two smaller cinematic frames */}
        <div className="grid grid-cols-2 gap-4">
          <div className="relative h-32 sm:h-36 rounded-2xl overflow-hidden border border-slate-800/60 bg-slate-900">
            <Image
              src="/hero-cinema-2.jpg"
              alt="AI voice agent waveform"
              fill
              className="object-cover opacity-60"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-slate-950/80 via-slate-900/40 to-emerald-500/20" />
            <div className="absolute inset-0 p-3 flex flex-col justify-between">
              <p className="text-[11px] text-slate-100">
                AI Voice Agent on call
              </p>
              <p className="text-[10px] text-emerald-300">
                Natural, bilingual, always on.
              </p>
            </div>
          </div>

          <div className="relative h-32 sm:h-36 rounded-2xl overflow-hidden border border-slate-800/60 bg-slate-900">
            <Image
              src="/hero-cinema-3.jpg"
              alt="WhatsApp and SMS threads"
              fill
              className="object-cover opacity-60"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-slate-950/80 via-slate-900/40 to-sky-500/20" />
            <div className="absolute inset-0 p-3 flex flex-col justify-between">
              <p className="text-[11px] text-slate-100">WhatsApp + SMS</p>
              <p className="text-[10px] text-sky-300">
                Unified inbox for all your channels.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Wrapper because Home is server component by default
export default function HomePage() {
  return (
    <div className="pt-4 sm:pt-6">
      <HeroContent />

      {/* Command Center teaser section */}
      <section className="mt-12 sm:mt-16 space-y-4">
        <h2 className="text-lg sm:text-xl font-semibold">
          Command Center listo para trabajar desde el día 1
        </h2>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-2xl">
          Visualiza en tiempo real todas las llamadas, conversaciones y
          oportunidades. Tus agentes humanos sólo se enfocan en los casos
          importantes; FrontDesk Agents filtra spam, agenda citas y hace
          seguimiento.
        </p>
        <Link
          href="/dashboard"
          className="inline-flex text-sm font-semibold text-sky-600 dark:text-sky-400 hover:underline"
        >
          Abrir Command Center →
        </Link>
      </section>
    </div>
  );
}
