// app/support/page.tsx
import type { Metadata } from "next";
import Image from "next/image";
import { getPageHero } from "@/lib/siteImages";

export const metadata: Metadata = {
  title: "Soporte | FrontDesk Agents",
};

export default function SupportPage() {
  const hero = getPageHero("support");
  return (
    <main className="min-h-screen bg-slate-950 text-slate-50 px-4 py-10 lg:px-8">
      <section className="mx-auto max-w-3xl space-y-8">
        <header className="space-y-2">
          {hero && (
            <div className="relative mb-6 aspect-[16/9] overflow-hidden rounded-2xl border border-slate-800">
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
          <p className="text-xs font-semibold tracking-[0.3em] text-sky-400 uppercase">
            Support
          </p>
          {hero && (
            <>
              <h1 className="text-2xl font-semibold">
                {hero.title}
              </h1>
              <p className="text-sm text-slate-400">
                {hero.description}
              </p>
            </>
          )}
        </header>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4 space-y-2">
            <p className="text-xs font-semibold text-slate-300 uppercase">
              WhatsApp / Teléfono
            </p>
            <p className="text-sm text-slate-200">
              +1 (216) 452-6636
            </p>
            <p className="text-xs text-slate-500">
              Lunes a sábado, 9:00am – 7:30pm (CT).
            </p>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4 space-y-2">
            <p className="text-xs font-semibold text-slate-300 uppercase">
              Email
            </p>
            <p className="text-sm text-slate-200">
              support@frontdeskagents.com
            </p>
            <p className="text-xs text-slate-500">
              Respondemos normalmente en menos de 24 horas.
            </p>
          </div>
        </div>

        <div className="space-y-3 rounded-xl border border-slate-800 bg-slate-900/60 p-4">
          <p className="text-xs font-semibold text-slate-300 uppercase">
            Preguntas frecuentes (resumen)
          </p>
          <ul className="space-y-2 text-sm text-slate-300">
            <li>• ¿Cómo conecto mi número de teléfono?</li>
            <li>• ¿Cómo edito el script que usa Alex?</li>
            <li>• ¿Cómo veo el resumen de llamadas y leads?</li>
          </ul>
          <p className="text-xs text-slate-500">
            Más artículos y tutoriales vendrán aquí. Por ahora, te acompañamos
            1 a 1 en el onboarding.
          </p>
        </div>
      </section>
    </main>
  );
}
