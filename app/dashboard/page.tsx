// app/dashboard/page.tsx
"use client";

import React from "react";
import {
  LanguageProvider,
  useLanguage,
} from "../components/LanguageProvider";

function DashboardContent() {
  const { language, setLanguage } = useLanguage();
  const isEnglish = language === "en";

  return (
    // Applied premium dark mode styling to main container
    <main className="min-h-screen bg-slate-950 text-slate-50 px-4 py-10 flex flex-col gap-8">
      <header className="flex items-center justify-between border-b border-slate-800 pb-4">
        <h1 className="text-3xl font-extrabold text-white">
          {isEnglish
            ? "FrontDesk Agents – Control Center"
            : "FrontDesk Agents – Centro de Control"}
        </h1>
        <div className="flex gap-2">
          <button
            // Fixed syntax error and applied premium button styling
            className={`px-4 py-2 rounded-lg border-2 text-sm font-semibold transition ${
              isEnglish 
                ? "border-sky-500 bg-sky-500 text-slate-950 shadow-md" 
                : "border-slate-700 text-slate-400 hover:border-sky-500"
            }`}
            onClick={() => setLanguage("en")}
          >
            EN
          </button>
          <button
            // Fixed syntax error and applied premium button styling
            className={`px-4 py-2 rounded-lg border-2 text-sm font-semibold transition ${
              !isEnglish 
                ? "border-sky-500 bg-sky-500 text-slate-950 shadow-md" 
                : "border-slate-700 text-slate-400 hover:border-sky-500"
            }`}
            onClick={() => setLanguage("es")}
          >
            ES
          </button>
        </div>
      </header>

      <section className="grid gap-6 md:grid-cols-3">
        {/* Premium Card Styling */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 shadow-xl">
          <h2 className="text-xl font-bold mb-2 text-sky-300">
            {isEnglish ? "Active phone agents" : "Agentes telefónicos activos"}
          </h2>
          <p className="text-sm text-slate-400">
            {isEnglish
              ? "Metrics widget placeholder. Later you can connect to Bland.ai / Twilio stats."
              : "Widget de métricas de ejemplo. Luego puedes conectarlo a las estadísticas de Bland.ai / Twilio."}
          </p>
        </div>
        {/* Premium Card Styling */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 shadow-xl">
          <h2 className="text-xl font-bold mb-2 text-sky-300">
            {isEnglish ? "Today’s calls" : "Llamadas de hoy"}
          </h2>
          <p className="text-sm text-slate-400">
            {isEnglish
              ? "Show total calls, answered, missed, and booked appointments."
              : "Muestra total de llamadas, atendidas, perdidas y citas agendadas."
            }
          </p>
        </div>
        {/* Premium Card Styling */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 shadow-xl">
          <h2 className="text-xl font-bold mb-2 text-sky-300">
            {isEnglish ? "Conversion summary" : "Resumen de conversión"}
          </h2>
          <p className="text-sm text-slate-400">
            {isEnglish
              ? "Placeholder card for your core KPIs."
              : "Tarjeta de ejemplo para tus KPIs principales."
            }
          </p>
        </div>
      </section>
    </main>
  );
}

export default function DashboardPage() {
  return (
    <LanguageProvider>
      <DashboardContent />
    </LanguageProvider>
  );
}
