// app/demo/page.tsx
"use client";

import { useLanguage } from "@/contexts/LanguageContext";

export default function DemoPage() {
  const { language } = useLanguage();

  const copy =
    language === "en"
      ? {
          title: "Live Demo – AI Receptionist",
          body: "Use this page later to embed your call widgets, calendar, or product tour. For now it is just a safe demo placeholder.",
          english: "English",
          spanish: "Español",
        }
      : {
          title: "Demo en vivo – Recepcionista IA",
          body: "Usa esta página más adelante para incrustar tus widgets de llamadas, calendario o tour del producto. Por ahora es solo un demo seguro.",
          english: "Inglés",
          spanish: "Español",
        };

  return (
    <section className="mx-auto max-w-3xl space-y-6 py-10">
      <h1 className="text-2xl font-bold text-white">{copy.title}</h1>
      <p className="text-sm text-slate-300">{copy.body}</p>
      <div className="flex gap-3">
        <button className="rounded-lg border border-slate-700 px-4 py-1.5 text-xs font-semibold text-slate-100">
          {copy.english}
        </button>
        <button className="rounded-lg border border-slate-700 px-4 py-1.5 text-xs font-semibold text-slate-100">
          {copy.spanish}
        </button>
      </div>
    </section>
  );
}
