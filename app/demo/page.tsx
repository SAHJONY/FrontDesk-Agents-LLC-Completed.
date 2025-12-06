"use client";

import React from "react";
import {
  LanguageProvider,
  useLanguage,
} from "../components/LanguageProvider";

function DemoContent() {
  const { language, setLanguage } = useLanguage();
  const isEnglish = language === "en";

  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-4 px-4">
      <h1 className="text-2xl font-bold text-center">
        {isEnglish
          ? "Live Demo – AI Receptionist"
          : "Demostración en Vivo – Recepcionista IA"}
      </h1>
      <p className="max-w-xl text-center text-slate-600">
        {isEnglish
          ? "Use this page later to embed your call widgets, calendar, or product tour. For now it is just a safe demo placeholder."
          : "Usa esta página más adelante para incrustar tus widgets de llamadas, calendario o recorrido del producto. Por ahora es solo un demo seguro."}
      </p>

      <div className="flex gap-2">
        <button
          className={`px-3 py-1 rounded border ${
            isEnglish ? "font-semibold" : ""
          }`}
          onClick={() => setLanguage("en")}
        >
          English
        </button>
        <button
          className={`px-3 py-1 rounded border ${
            !isEnglish ? "font-semibold" : ""
          }`}
          onClick={() => setLanguage("es")}
        >
          Español
        </button>
      </div>
    </main>
  );
}

export default function DemoPage() {
  return (
    <LanguageProvider>
      <DemoContent />
    </LanguageProvider>
  );
}
