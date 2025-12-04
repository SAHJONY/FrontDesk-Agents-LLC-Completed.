// app/demo/page.tsx

import PremiumImage from "../components/PremiumImage";
import { demoCopy } from "@/lib/i18n";
import { useLanguage } from "@/lib/use-language";

export default function DemoPage() {
  const { lang } = useLanguage();
  const t = demoCopy[lang];

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 space-y-10">
      {/* HERO */}
      <section className="grid gap-8 md:grid-cols-2 md:items-center">
        <div className="space-y-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-sky-500">
            {lang === "es" ? "Demo en vivo • 15 minutos" : "Live demo • 15 minutes"}
          </p>
          <h1 className="text-3xl font-bold md:text-4xl">{t.heroTitle}</h1>
          <p className="text-base text-slate-600 dark:text-slate-300">
            {t.heroSubtitle}
          </p>

          <div className="flex flex-wrap gap-3 pt-2">
            <a
              href="#demo-form"
              className="inline-flex items-center justify-center rounded-md border border-transparent px-4 py-2 text-sm font-medium shadow-sm bg-sky-600 text-white hover:bg-sky-700"
            >
              {t.ctaPrimary}
            </a>
            <a
              href="/pricing"
              className="inline-flex items-center justify-center rounded-md border px-4 py-2 text-sm font-medium text-slate-900 dark:text-slate-100 border-slate-300 dark:border-slate-600"
            >
              {t.ctaSecondary}
            </a>
          </div>
        </div>

        <div className="relative">
          <PremiumImage
            src="/images/premium/demo-control-room-16x9.jpg"
            alt="FrontDesk Agents live demo"
            aspectRatio="16/9"
          />
        </div>
      </section>

      {/* FORM */}
      <section
        id="demo-form"
        className="rounded-xl border border-slate-200 bg-white/80 p-6 shadow-sm backdrop-blur dark:border-slate-800 dark:bg-slate-900/60"
      >
        <h2 className="text-lg font-semibold mb-2">
          {lang === "es" ? "Agenda tu demo en vivo" : "Schedule your live demo"}
        </h2>
        <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
          {lang === "es"
            ? "Déjanos tu información y te mostraremos cómo FrontDesk Agents atiende llamadas reales 24/7."
            : "Tell us a bit about you and we’ll show you FrontDesk Agents handling real calls 24/7."}
        </p>

        <form
          method="post"
          action="/api/demo-request"
          className="grid gap-4 md:grid-cols-2"
        >
          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-slate-700 dark:text-slate-300">
              {lang === "es" ? "Nombre completo" : "Full name"}
            </label>
            <input
              name="name"
              required
              className="rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-sky-500 dark:border-slate-700 dark:bg-slate-900"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-slate-700 dark:text-slate-300">
              Email
            </label>
            <input
              type="email"
              name="email"
              required
              className="rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-sky-500 dark:border-slate-700 dark:bg-slate-900"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-slate-700 dark:text-slate-300">
              {lang === "es" ? "Teléfono" : "Phone"}
            </label>
            <input
              name="phone"
              className="rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-sky-500 dark:border-slate-700 dark:bg-slate-900"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-slate-700 dark:text-slate-300">
              {lang === "es" ? "Negocio" : "Business"}
            </label>
            <input
              name="company"
              className="rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-sky-500 dark:border-slate-700 dark:bg-slate-900"
            />
          </div>

          <div className="flex flex-col gap-1 md:col-span-2">
            <label className="text-xs font-medium text-slate-700 dark:text-slate-300">
              {lang === "es"
                ? "¿Qué tipo de llamadas quieres automatizar?"
                : "What type of calls do you want to automate?"}
            </label>
            <textarea
              name="notes"
              rows={3}
              className="rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-sky-500 dark:border-slate-700 dark:bg-slate-900"
            />
          </div>

          <div className="md:col-span-2 flex justify-end">
            <button
              type="submit"
              className="inline-flex items-center rounded-md bg-sky-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-sky-700"
            >
              {lang === "es"
                ? "Enviar solicitud de demo"
                : "Send demo request"}
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}
