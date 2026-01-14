// app/setup/page.tsx
import Image from "next/image";
import TopNav from "@/components/top-nav";
import { getPageHero } from "@/lib/siteImages";

export default function SetupPage() {
  const hero = getPageHero("setup");

  return (
    <main className="min-h-screen bg-slate-950 text-slate-50">
      <TopNav />

      <section className="mx-auto max-w-5xl px-4 pb-16 pt-10 lg:px-8">
        <header className="mb-8 space-y-3">
          <p className="text-xs font-semibold tracking-[0.3em] text-sky-400 uppercase">
            Setup · Onboarding
          </p>
          {hero && (
            <>
              <h1 className="text-3xl font-bold sm:text-4xl">
                {hero.title}
              </h1>
              <p className="text-sm text-slate-300 sm:text-base">
                {hero.description}
              </p>
            </>
          )}
        </header>

        {hero && (
          <div className="relative mb-10 aspect-[16/9] overflow-hidden rounded-2xl border border-slate-800">
            <Image
              src={hero.src}
              alt={hero.alt}
              width={1600}
              height={900}
              className="w-full h-auto rounded-xl object-cover"
              priority
            />
          </div>
        )}

        <div className="space-y-6">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-5">
            <h2 className="mb-2 text-sm font-semibold text-sky-300">
              Paso 1 · Conecta tu número de teléfono
            </h2>
            <p className="text-sm text-slate-300">
              Usaremos Bland.ai / Twilio como troncal de voz. Desde el Owner
              Command Center podrás elegir el país, prefijo y horario de
              atención. Todas las llamadas quedarán registradas en el
              dashboard de llamadas.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-5">
            <h2 className="mb-2 text-sm font-semibold text-sky-300">
              Paso 2 · Activa pagos (Stripe, Square, Zelle, Cash App, PayPal)
            </h2>
            <p className="text-sm text-slate-300">
              En esta versión, conectaremos Stripe como pasarela principal. El
              equipo puede añadir también Square, Zelle, Cash App, PayPal y
              transferencias bancarias para cobrar depósitos y membresías
              directamente desde las llamadas.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-5">
            <h2 className="mb-2 text-sm font-semibold text-sky-300">
              Paso 3 · Conecta tu CRM y calendarios
            </h2>
            <p className="text-sm text-slate-300">
              El Command Center se integra con HubSpot, Google Sheets y otros
              CRMs. Las citas confirmadas se enviarán automáticamente a tu
              calendario y al paciente/cliente por SMS o WhatsApp.
            </p>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <button className="rounded-full bg-sky-500 px-5 py-2 text-sm font-semibold text-slate-950 hover:bg-sky-400">
              Comenzar configuración guiada
            </button>
            <p className="text-xs text-slate-400">
              Cuando completes estos pasos, tu cuenta estará lista para cobrar
              y registrar llamadas en tiempo real.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
