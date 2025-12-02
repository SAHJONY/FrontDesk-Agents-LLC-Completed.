// app/industries/page.tsx
import Image from "next/image";
import { getPageHero } from "@/lib/siteImages";
import { TopNav } from "@/components/top-nav";

export default function IndustriesPage() {
  const hero = getPageHero("industries");

  const industries = [
    {
      name: "Medical & Dental",
      es: "Clínicas y consultorios",
      detail: "Appointment scheduling, insurance pre-qualification, reminders.",
    },
    {
      name: "Law Firms",
      es: "Bufetes y abogados",
      detail: "New client intake, conflict checks, call triage and follow-ups.",
    },
    {
      name: "Real Estate & Investors",
      es: "Bienes raíces & inversionistas",
      detail: "Lead screening, showing scheduling, seller intake, wholesaler support.",
    },
    {
      name: "Home Services",
      es: "Contratistas y servicios",
      detail: "Estimates, dispatch, after-hours emergency call handling.",
    },
    {
      name: "Call Centers & BPO",
      es: "Contact centers",
      detail: "High-volume call routing, QA-ready call logs and analytics.",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      <TopNav />

      <main className="mx-auto max-w-6xl px-4 pb-16 lg:px-0">
        <section className="mb-10 grid gap-8 lg:grid-cols-[3fr,2fr] lg:items-center">
          <div className="space-y-4">
            <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
              Built for high-value, phone-heavy businesses
            </h1>
            <p className="text-sm md:text-base text-slate-300">
              FrontDesk Agents works wherever missed calls mean lost money. We plug into your
              existing phone numbers, CRMs and workflows.
            </p>
            <p className="text-xs text-slate-400">
              Diseñado para Norteamérica, Latinoamérica y operaciones bilingües EN/ES.
            </p>
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

        <section className="grid gap-4 md:grid-cols-2">
          {industries.map((ind) => (
            <div
              key={ind.name}
              className="rounded-xl border border-slate-800 bg-slate-900/40 p-4"
            >
              <h2 className="text-sm font-semibold text-slate-100">
                {ind.name}{" "}
                <span className="ml-1 text-[11px] font-normal text-slate-400">
                  · {ind.es}
                </span>
              </h2>
              <p className="mt-2 text-xs text-slate-300">{ind.detail}</p>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
}
