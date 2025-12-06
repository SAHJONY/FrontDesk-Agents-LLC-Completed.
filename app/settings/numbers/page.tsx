"use client";

import React from "react";
import {
  LanguageProvider,
  useLanguage,
} from "../../components/LanguageProvider";

function NumbersSettingsContent() {
  const { language, setLanguage } = useLanguage();
  const isEnglish = language === "en";

  return (
    <main className="min-h-screen px-4 py-8 flex flex-col gap-6">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">
          {isEnglish
            ? "Phone Numbers Settings"
            : "Configuración de Números Telefónicos"}
        </h1>
        <div className="flex gap-2">
          <button
            className={`px-3 py-1 rounded border ${
              isEnglish ? "font-semibold" : ""
            }`}
            onClick={() => setLanguage("en")}
          >
            EN
          </button>
          <button
            className={`px-3 py-1 rounded border ${
              !isEnglish ? "font-semibold" : ""
            }`}
            onClick={() => setLanguage("es")}
          >
            ES
          </button>
        </div>
      </header>

      <section className="space-y-4 max-w-2xl">
        <p className="text-slate-600">
          {isEnglish
            ? "Here you will later manage your Bland.ai / Twilio numbers: inbound, outbound, real estate line, clinic line, etc."
            : "Aquí luego vas a gestionar tus números de Bland.ai / Twilio: entrantes, salientes, línea de real estate, línea de clínica, etc."}
        </p>

        <div className="border rounded-lg p-4 space-y-2">
          <h2 className="font-semibold">
            {isEnglish ? "Numbers list (placeholder)" : "Lista de números (ejemplo)"}
          </h2>
          <ul className="text-sm list-disc pl-5 space-y-1">
            <li>+1 (346) 000-0000 – {isEnglish ? "Outbound ALEX" : "ALEX Saliente"}</li>
            <li>+1 (216) 480-4413 – {isEnglish ? "Inbound Website" : "Entrante Website"}</li>
          </ul>
        </div>
      </section>
    </main>
  );
}

export default function NumbersSettingsPage() {
  return (
    <LanguageProvider>
      <NumbersSettingsContent />
    </LanguageProvider>
  );
}
