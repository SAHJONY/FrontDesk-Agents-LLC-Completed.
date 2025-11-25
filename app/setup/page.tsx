// app/setup/page.tsx
import Image from "next/image";
import { copy, normalizeLang } from "@/lib/i18n";
import AISetupForm from "../components/AISetupForm";

type PageProps = {
  searchParams?: { lang?: string };
};

export default function SetupPage({ searchParams }: PageProps) {
  const lang = normalizeLang(searchParams?.lang);
  const t = copy.setup[lang];

  return (
    <main className="min-h-screen px-5 sm:px-8 pt-6 pb-12 bg-slate-950">
      <div className="max-w-6xl mx-auto space-y-8">
        <header className="flex justify-between items-center">
          <div>
            <p className="text-xs uppercase tracking-[0.20em] text-cyan-300/80">
              FrontDesk Agents – Setup
            </p>
            <h1 className="mt-2 text-2xl sm:text-3xl font-bold text-slate-50">
              {t.title}
            </h1>
            <p className="mt-2 text-sm sm:text-base text-slate-300 max-w-xl">
              {t.subtitle}
            </p>
          </div>
        </header>

        <div className="grid lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] gap-10 items-start">
          {/* Form card */}
          <section className="fd-card p-6 sm:p-7">
            <AISetupForm lang={lang} />
          </section>

          {/* Visual */}
          <section className="space-y-4">
            <div className="premium-image-container">
              <Image
                src={
                  lang === "es"
                    ? "/premium/dashboard-dark-es.png"
                    : "/premium/dashboard-dark.png"
                }
                alt="FrontDesk Agents dashboard preview"
                fill
                className="premium-image"
              />
            </div>
            <p className="text-xs sm:text-sm text-slate-400">
              This is a demo preview of how your AI receptionists, live calls,
              WhatsApp threads and leads will appear inside the Command Center.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
