// app/industries/page.tsx
import Image from "next/image";
import { getPageHero } from "@/lib/siteImages";

const industries = [
  {
    key: "medical",
    title: "Clinics & Medical Practices",
    description:
      "We answer every new patient call, reschedule no-shows and keep your provider calendar packed.",
    bullets: [
      "New patient intake & insurance pre-screen",
      "No-show reactivation & recall campaigns",
      "Refill & basic FAQ automation",
    ],
  },
  {
    key: "law",
    title: "Law Firms",
    description:
      "AI intake that pre-qualifies cases, schedules consults and routes only real leads to your attorneys.",
    bullets: [
      "24/7 intake for PI, immigration, family, criminal",
      "Lead scoring & case-type routing",
      "Missed call text-back & follow-up",
    ],
  },
  {
    key: "real-estate",
    title: "Real Estate & Investment",
    description:
      "Turn every inbound call, sign and ad into live conversations, tours and funding calls.",
    bullets: [
      "Lead response in under 30 seconds",
      "Appointment setting for showings & calls",
      "Follow-up sequences for cold leads",
    ],
  },
];

export default function IndustriesPage() {
  const hero = getPageHero("industries");

  return (
    <div className="space-y-10">
      <section className="space-y-4">
        <p className="text-xs font-semibold tracking-[0.3em] text-sky-400 uppercase">
          INDUSTRIES
        </p>
        {hero && (
          <>
            <h1 className="text-2xl font-bold text-slate-50 sm:text-3xl">
              {hero.title}
            </h1>
            <p className="max-w-2xl text-sm text-slate-300">
              {hero.description}
            </p>
          </>
        )}
      </section>

      {hero && (
        <Image
          src={hero.src}
          alt={hero.alt}
          width={1600}
          height={900}
          className="h-auto w-full rounded-xl border border-slate-800 object-cover"
        />
      )}

      <section className="grid gap-6 md:grid-cols-3">
        {industries.map((ind) => (
          <article
            key={ind.key}
            className="flex flex-col rounded-xl border border-slate-800 bg-slate-950/60 p-5"
          >
            <h2 className="text-sm font-semibold text-slate-50">
              {ind.title}
            </h2>
            <p className="mt-2 text-xs text-slate-300">{ind.description}</p>
            <ul className="mt-3 space-y-1.5 text-[11px] text-slate-400">
              {ind.bullets.map((b) => (
                <li key={b}>• {b}</li>
              ))}
            </ul>
          </article>
        ))}
      </section>
    </div>
  );
}
