// components/IndustriesGrid.tsx
import Image from "next/image";

const INDUSTRIES = [
  {
    id: "medical",
    title: "Medical & Dental Clinics",
    description:
      "Turn missed calls into booked appointments, recalls and follow-ups – 24/7 in English & Spanish.",
    badge: "+38% more booked visits",
    image: "/0672B5C4-2EA5-4904-B71C-F50815398E48.png",
  },
  {
    id: "legal",
    title: "Law Firms & Immigration",
    description:
      "Intake, qualification and scheduling for high-value cases with call recording and full audit trail.",
    badge: "Pre-qualified leads",
    image: "/08E6E2CC-933F-448F-96AA-E2CAC6AC7598.png",
  },
  {
    id: "real-estate",
    title: "Real Estate & Investors",
    description:
      "Capture every buyer, seller and wholesaler lead – even after hours, weekends and holidays.",
    badge: "Never miss a hot lead",
    image: "/0DD5A262-4F4A-48A6-BCA8-B7D106E781EB.png",
  },
  {
    id: "b2b",
    title: "B2B & Professional Services",
    description:
      "Qualify prospects, route calls to the right team and sync every interaction to your CRM.",
    badge: "Full pipeline visibility",
    image: "/0E208AAA-D75C-4EE3-A570-8E88DAF84829.png",
  },
];

export function IndustriesGrid() {
  return (
    <section
      id="industries"
      className="border-y border-slate-800 bg-slate-950/40 py-16"
    >
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex flex-col items-center gap-3 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-cyan-400">
            Industries
          </p>
          <h2 className="text-2xl sm:text-3xl font-semibold text-slate-50">
            Built for high-value, phone-driven businesses.
          </h2>
          <p className="max-w-2xl text-sm text-slate-300">
            From medical practices to law firms and real-estate investors, FrontDesk
            Agents turns every call into a tracked, measurable revenue event.
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {INDUSTRIES.map((item) => (
            <article
              key={item.id}
              className="flex flex-col overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/60 shadow-lg shadow-slate-950/40"
            >
              <div className="relative h-40 w-full overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover object-center"
                  priority={item.id === "medical"}
                />
              </div>

              <div className="flex flex-1 flex-col gap-2 p-5">
                <div className="inline-flex items-center gap-2">
                  <h3 className="text-base font-semibold text-slate-50">
                    {item.title}
                  </h3>
                  {item.badge && (
                    <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-medium text-emerald-300">
                      {item.badge}
                    </span>
                  )}
                </div>

                <p className="text-sm text-slate-300">{item.description}</p>

                <div className="mt-3 flex items-center gap-2 text-xs text-slate-400">
                  <span className="inline-flex h-1.5 w-1.5 rounded-full bg-cyan-400" />
                  <span>AI PHONE OS · 24/7 · Call, SMS & WhatsApp</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
