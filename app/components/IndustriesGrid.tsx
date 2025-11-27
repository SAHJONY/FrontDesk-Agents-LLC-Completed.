// app/components/IndustriesGrid.tsx
"use client";

import Image from "next/image";

type Industry = {
  id: string;
  name: string;
  description: string;
  imageSrc: string;
  badge?: string;
};

const INDUSTRIES: Industry[] = [
  {
    id: "medical",
    name: "Medical & Dental Clinics",
    description:
      "Answer every patient call, reduce no-shows and keep your schedule fully booked — without adding front-desk headcount.",
    imageSrc: "/IMG_MEDICAL.png", // CAMBIA por un nombre real de /public
    badge: "+38% more booked appointments"
  },
  {
    id: "legal",
    name: "Law Firms & Immigration",
    description:
      "Qualify inbound cases, schedule consultations and keep clients informed with compliant, human-sounding voice.",
    imageSrc: "/IMG_LAW.png", // CAMBIA por un nombre real
    badge: "24/7 intake & screening"
  },
  {
    id: "realestate",
    name: "Real Estate & Property",
    description:
      "Capture every buyer and seller call, route to the right agent and follow up automatically by SMS and WhatsApp.",
    imageSrc: "/IMG_REALESTATE.png", // CAMBIA por un nombre real
    badge: "Never miss an opportunity"
  },
  {
    id: "hospitality",
    name: "Hotels, Spas & Hospitality",
    description:
      "Handle reservations, changes and FAQs for guests day and night with a calm, multilingual AI receptionist.",
    imageSrc: "/IMG_HOSPITALITY.png", // CAMBIA por un nombre real
  },
  {
    id: "b2b",
    name: "High-Velocity B2B Teams",
    description:
      "Qualify leads, book demos and sync outcomes directly into your CRM so your sales team only speaks with warm prospects.",
    imageSrc: "/IMG_B2B.png", // CAMBIA por un nombre real
  },
  {
    id: "callcenter",
    name: "Call Centers & Outsourcing",
    description:
      "Augment human agents with an AI layer that handles routine calls, leaving your team focused on high-value cases.",
    imageSrc: "/IMG_CALLCENTER.png", // CAMBIA por un nombre real
  }
];

export function IndustriesGrid() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {INDUSTRIES.map((industry) => (
        <article
          key={industry.id}
          className="group flex flex-col overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/60 shadow-sm shadow-slate-950/40 transition hover:border-cyan-500/60 hover:shadow-cyan-500/20"
        >
          <div className="relative h-40 w-full overflow-hidden bg-slate-950">
            <Image
              src={industry.imageSrc}
              alt={industry.name}
              fill
              className="object-cover transition duration-500 group-hover:scale-105"
            />
            {industry.badge && (
              <div className="absolute bottom-2 left-2 rounded-full bg-slate-950/80 px-3 py-1 text-[10px] font-medium text-cyan-300 backdrop-blur">
                {industry.badge}
              </div>
            )}
          </div>
          <div className="flex flex-1 flex-col p-4">
            <h3 className="text-sm font-semibold text-slate-50">
              {industry.name}
            </h3>
            <p className="mt-2 text-xs text-slate-300">
              {industry.description}
            </p>
          </div>
        </article>
      ))}
    </div>
  );
}
