"use client";

import PremiumImage from "../components/PremiumImage";
import { demoCopy, demoCopyEs } from "@/lib/i18n";
import { useLanguage } from "@/lib/use-language";

export default function DemoPage() {
  const { lang } = useLanguage();

  // Aquí está el fix: escogemos texto según el idioma, sin indexar demoCopy[lang]
  const t = lang === "es" ? demoCopyEs : demoCopy;

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 space-y-6">
      <section className="grid gap-8 md:grid-cols-2 md:items-center">
        <div className="space-y-4">
          <p className="text-sm font-semibold uppercase tracking-wide text-primary">
            FrontDesk Agents · Live Demo
          </p>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
            {t.heroTitle}
          </h1>
          <p className="text-muted-foreground text-base md:text-lg">
            {t.heroSubtitle}
          </p>

          <div className="flex flex-wrap gap-3 pt-2">
            <a
              href="#demo-form"
              className="inline-flex items-center rounded-md border border-transparent bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm hover:opacity-90"
            >
              {t.ctaPrimary}
            </a>
            <a
              href="#contact-sales"
              className="inline-flex items-center rounded-md border px-4 py-2 text-sm font-medium hover:bg-muted"
            >
              {t.ctaSecondary}
            </a>
          </div>

          <ul className="mt-4 space-y-1 text-sm text-muted-foreground">
            <li>• 24/7 AI receptionist that answers every call</li>
            <li>• Live call routing to you or your team</li>
            <li>• SMS + email follow-up for missed calls</li>
          </ul>
        </div>

        <div className="relative">
          <PremiumImage
            src="/images/premium/demo-hero.webp"
            alt="FrontDesk Agents live demo"
            className="w-full rounded-xl border shadow-md"
            aspectRatio="16/9"
          />
        </div>
      </section>

      <section
        id="demo-form"
        className="mt-10 rounded-xl border bg-card p-6 shadow-sm space-y-4"
      >
        <h2 className="text-xl font-semibold">
          {lang === "es"
            ? "Solicita tu demo en vivo"
            : "Request your live demo"}
        </h2>
        <p className="text-sm text-muted-foreground">
          {lang === "es"
            ? "Déjanos tus datos y te mostraremos cómo FrontDesk Agents puede atender tus llamadas en tiempo real."
            : "Tell us a bit about your business and we’ll show you how FrontDesk Agents can handle your calls in real time."}
        </p>

        {/* Aquí solo el markup del formulario; la lógica está manejada por la ruta /api/demo-request */}
        <form className="grid gap-4 md:grid-cols-2">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">
              {lang === "es" ? "Nombre completo" : "Full name"}
            </label>
            <input
              type="text"
              name="name"
              className="h-9 rounded-md border px-2 text-sm"
              placeholder={
                lang === "es" ? "Ej: Dra. Ana Martínez" : "e.g. Dr. Jane Smith"
              }
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">Email</label>
            <input
              type="email"
              name="email"
              className="h-9 rounded-md border px-2 text-sm"
              placeholder="you@example.com"
              required
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">
              {lang === "es" ? "Empresa o clínica" : "Business or clinic"}
            </label>
            <input
              type="text"
              name="company"
              className="h-9 rounded-md border px-2 text-sm"
              placeholder={
                lang === "es"
                  ? "Ej: Houston Family Clinic"
                  : "e.g. Houston Family Clinic"
              }
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">
              {lang === "es" ? "Teléfono" : "Phone"}
            </label>
            <input
              type="tel"
              name="phone"
              className="h-9 rounded-md border px-2 text-sm"
              placeholder={
                lang === "es" ? "(000) 000-0000" : "(000) 000-0000"
              }
            />
          </div>

          <div className="md:col-span-2 flex flex-col gap-1">
            <label className="text-sm font-medium">
              {lang === "es"
                ? "Cuéntanos sobre tu operación"
                : "Tell us about your operation"}
            </label>
            <textarea
              name="notes"
              rows={3}
              className="rounded-md border px-2 py-1 text-sm"
              placeholder={
                lang === "es"
                  ? "Ej: 3 doctores, 2 recepcionistas, muchas llamadas perdidas…"
                  : "e.g. 3 doctors, 2 front desk staff, lots of missed calls…"
              }
            />
          </div>

          <div className="md:col-span-2 flex justify-between items-center pt-2">
            <button
              type="submit"
              className="inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow hover:opacity-90"
            >
              {lang === "es"
                ? "Enviar solicitud de demo"
                : "Submit demo request"}
            </button>
            <p className="text-[11px] text-muted-foreground">
              {lang === "es"
                ? "Nunca compartimos tu información con terceros."
                : "We never share your information with third parties."}
            </p>
          </div>
        </form>
      </section>
    </main>
  );
}
