// components/IndustriesGrid.tsx
import React from "react";

export function IndustriesGrid() {
  const industries = [
    {
      label: "Medical & Dental",
      headline: "Never miss a new patient call again.",
      body: "24/7 AI reception that books visits, handles follow-ups and reduces no-shows with reminders.",
      badge: "Clinics · Dental · Aesthetic",
    },
    {
      label: "Law Firms",
      headline: "Turn consultations into retained clients.",
      body: "Pre-qualify leads, capture case details and route high-value callers to the right attorney.",
      badge: "Immigration · Injury · Litigation",
    },
    {
      label: "Real Estate",
      headline: "Capture every showing and seller lead.",
      body: "Answer portal leads instantly, schedule showings and keep buyers and sellers always updated.",
      badge: "Agents · Brokers · Investors",
    },
    {
      label: "B2B & Agencies",
      headline: "Qualify leads while your team sleeps.",
      body: "Score inbound calls, ask discovery questions and sync qualified leads into your CRM.",
      badge: "SaaS · Marketing · Consulting",
    },
    {
      label: "Multi-location & Chains",
      headline: "One AI PHONE OS for every location.",
      body: "Consistent scripts, centralized reporting and local numbers for each branch or office.",
      badge: "Franchises · Groups",
    },
    {
      label: "Global & Multilingual",
      headline: "From Houston to México y Latinoamérica.",
      body: "English + Spanish today, ready to scale across languages as your brand goes global.",
      badge: "Worldwide · 24/7",
    },
  ];

  return (
    <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {industries.map((item) => (
        <div
          key={item.label}
          className="flex h-full flex-col rounded-xl border border-slate-800 bg-slate-900/70 p-5"
        >
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-cyan-300">
            {item.label}
          </p>
          <h3 className="mt-3 text-sm font-semibold text-slate-50">
            {item.headline}
          </h3>
          <p className="mt-2 text-xs text-slate-300">{item.body}</p>
          <div className="mt-4 inline-flex w-fit rounded-full border border-slate-700 bg-slate-950/60 px-3 py-1 text-[10px] text-slate-400">
            {item.badge}
          </div>
        </div>
      ))}
    </div>
  );
}
