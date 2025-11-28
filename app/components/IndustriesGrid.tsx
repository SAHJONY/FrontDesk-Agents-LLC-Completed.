// app/components/IndustriesGrid.tsx
"use client";

import Link from "next/link";
import Image from "next/image";

interface Industry {
  title: string;
  description: string;
  href: string;
  badge: string;
  image: string;
}

const INDUSTRIES: Industry[] = [
  {
    title: "Medical & Dental Clinics",
    description:
      "Fill the calendar, reduce no-shows y confirma citas en segundos.",
    href: "/industries/medical",
    badge: "+38% más visitas confirmadas",
    image: "/images/industries/medical.jpg",
  },
  {
    title: "Law Firms & Legal Services",
    description:
      "Califica leads, agenda consultas y protege cada interacción con auditoría 24/7.",
    href: "/industries/law",
    badge: "Prioriza casos de alto valor",
    image: "/images/industries/law.jpg",
  },
];

export default function IndustriesGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
      {INDUSTRIES.map((industry) => (
        <Link
          key={industry.title}
          href={industry.href}
          className="rounded-xl border border-slate-800 bg-slate-900/40 p-3 hover:border-cyan-400/50 transition block"
        >
          <div className="text-[11px] inline-flex items-center rounded-full border border-cyan-400/50 bg-cyan-500/10 px-2 py-1 text-cyan-300 mb-3">
            {industry.badge}
          </div>

          <div className="relative w-full h-44 mb-3 overflow-hidden rounded-lg">
            <Image
              src={industry.image}
              alt={industry.title}
              fill
              className="object-cover"
            />
          </div>

          <h3 className="text-lg text-slate-50 font-semibold">
            {industry.title}
          </h3>

          <p className="text-sm text-slate-400">{industry.description}</p>

          <p className="text-cyan-300 text-sm font-medium mt-2">
            Ver playbook para este sector →
          </p>
        </Link>
      ))}
    </div>
  );
}
