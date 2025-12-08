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
    <main className="min-h-screen px-4 py-8 flex flex-col gap-6">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">
          {isEnglish
            ? "FrontDesk Agents – Control Center"
            : "FrontDesk Agents – Centro de Control"}
        </h1>
        <div className="flex gap-2">
          <button
            className={`px-3 py-1 rounded border <LaTex>${
              isEnglish ? "font-semibold" : ""
            }`}
            onClick={() => setLanguage("en")}
          >
            EN
          </button>
          <button
            className={`px-3 py-1 rounded border $</LaTex>{
              !isEnglish ? "font-semibold" : ""
            }`}
            onClick={() => setLanguage("es")}
          >
            ES
          </button>
        </div>
      </header>

      <section className="grid gap-4 md:grid-cols-3">
        <div className="border rounded-lg p-4">
          <h2 className="font-semibold mb-1">
            {isEnglish ? "Active phone agents" : "Agentes telefónicos activos"}
          </h2>
          <p className="text-sm text-slate-600">
            {isEnglish
              ? "Metrics widget placeholder. Later you can connect to Bland.ai / Twilio stats."
              : "Widget de métricas de ejemplo. Luego puedes conectarlo a las estadísticas de Bland.ai / Twilio."}
          </p>
        </div>
        <div className="border rounded-lg p-4">
          <h2 className="font-semibold mb-1">
            {isEnglish ? "Today’s calls" : "Llamadas de hoy"}
          </h2>
          <p className="text-sm text-slate-600">
            {isEnglish
              ? "Show total calls, answered, missed, and booked appointments."
              : "Muestra total de llamadas, atendidas, perdidas y citas agendadas."
            }
          </p>
        </div>
        <div className="border rounded-lg p-4">
          <h2 className="font-semibold mb-1">
            {isEnglish ? "Conversion summary" : "Resumen de conversión"}
          </h2>
          <p className="text-sm text-slate-600">
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
