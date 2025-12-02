// app/setup/page.tsx
import Image from "next/image";
import { getPageHero } from "@/lib/siteImages";
import { TopNav } from "@/components/top-nav";

export default function SetupPage() {
  const hero = getPageHero("setup");

  const steps = [
    "Connect your main phone number (Twilio, operator or call forward).",
    "Define business hours, languages and escalation rules.",
    "Upload your FAQs, intake questions and qualification rules.",
    "Connect CRM / spreadsheet so leads land where you want.",
    "Test your first live calls and refine the script.",
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      <TopNav />

      <main className="mx-auto max-w-6xl px-4 pb-16 lg:px-0">
        <section className="mb-10 grid gap-8 lg:grid-cols-[3fr,2fr] lg:items-center">
          <div className="space-y-4">
            <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
              Client setup & onboarding
            </h1>
            <p className="text-sm md:text-base text-slate-300">
              This page is your checklist to go from “just signed” to “AI receptionist is
              answering real calls” in a few hours.
            </p>
            <p className="text-xs text-slate-400">
              Podemos guiarte por Zoom o hacerlo 100% asíncrono si prefieres.
            </p>

            <ol className="mt-4 space-y-2 text-xs text-slate-200">
              {steps.map((step, idx) => (
                <li key={idx}>
                  <span className="mr-2 inline-flex h-5 w-5 items-center justify-center rounded-full bg-sky-500/10 text-[11px] font-semibold text-sky-400">
                    {idx + 1}
                  </span>
                  {step}
                </li>
              ))}
            </ol>
          </div>

          <div className="relative">
            <Image
              src={hero.src}
              alt={hero.alt}
              width={1600}
              height={900}
              className="h-auto w-full rounded-xl border border-slate-800 object-cover shadow-xl"
            />
          </div>
        </section>
      </main>
    </div>
  );
}
