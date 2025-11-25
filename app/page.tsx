// app/page.tsx
import Link from "next/link";
import Image from "next/image";
import { copy, normalizeLang } from "@/lib/i18n";

type PageProps = {
  searchParams?: { lang?: string };
};

export default function HomePage({ searchParams }: PageProps) {
  const lang = normalizeLang(searchParams?.lang);
  const t = copy.hero[lang];

  return (
    <main className="hero-wrapper min-h-screen flex flex-col">
      <div className="hero-overlay" />
      <div className="hero-glow" />

      <header className="flex items-center justify-between px-5 sm:px-8 pt-5 sm:pt-7 max-w-6xl mx-auto w-full">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-xl bg-cyan-400/10 border border-cyan-400/40 flex items-center justify-center">
            <span className="text-xs font-semibold text-cyan-300">FD</span>
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-sm font-semibold tracking-wide">
              FrontDesk Agents LLC
            </span>
            <span className="text-[11px] text-slate-400">
              AI Receptionist Command Center
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="lang-toggle">
            <Link
              href="/?lang=en"
              className={`lang-pill ${lang === "en" ? "lang-pill-active" : ""}`}
            >
              EN
            </Link>
            <span className="text-slate-600">|</span>
            <Link
              href="/?lang=es"
              className={`lang-pill ${lang === "es" ? "lang-pill-active" : ""}`}
            >
              ES
            </Link>
          </div>
        </div>
      </header>

      <section className="flex-1 flex flex-col items-center justify-center px-5 sm:px-8 pb-16 pt-10">
        <div className="max-w-5xl w-full grid md:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] gap-10 items-center">
          {/* Text */}
          <div className="space-y-6">
            <p className="text-xs sm:text-sm uppercase tracking-[0.22em] text-cyan-300/80">
              {t.eyebrow}
            </p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.3rem] font-extrabold leading-tight text-slate-50">
              {t.title}
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-slate-300 max-w-xl">
              {t.subtitle}
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link href="/setup">
                <button className="fd-btn-primary">
                  {t.ctaPrimary}
                </button>
              </Link>

              <Link
                href="/dashboard"
                className="text-sm font-medium text-cyan-300 hover:text-cyan-200 underline-offset-4 hover:underline"
              >
                {t.ctaSecondary}
              </Link>
            </div>

            <div className="flex flex-wrap gap-4 pt-4 text-xs sm:text-sm text-slate-400">
              <span>• 24/7 AI phone agents</span>
              <span>• WhatsApp & SMS</span>
              <span>• Airtable + email integration</span>
            </div>
          </div>

          {/* Hero image */}
          <div className="premium-image-container">
            <Image
              src={lang === "es" ? "/premium/hero-es.png" : "/premium/hero-en.png"}
              alt="FrontDesk Agents – AI Receptionist"
              fill
              priority
              className="premium-image"
            />
          </div>
        </div>
      </section>
    </main>
  );
}
