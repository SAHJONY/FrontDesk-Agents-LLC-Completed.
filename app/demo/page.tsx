// app/demo/page.tsx
"use client";

import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function DemoPage() {
  const { language, setLanguage } = useLanguage();

  const isSpanish = language === "es";

  return (
    <main className="min-h-screen w-full flex flex-col items-center justify-center px-4 py-8">
      <div className="max-w-xl w-full border rounded-2xl shadow-md p-6 bg-white">
        <h1 className="text-2xl font-bold mb-4 text-gray-900">
          {isSpanish ? "Demo de FrontDesk Agents" : "FrontDesk Agents Demo"}
        </h1>

        <p className="text-sm text-gray-600 mb-4">
          {isSpanish
            ? "Esta es una página de demostración segura que usa el contexto de idioma sin romper el build."
            : "This is a safe demo page that uses the language context without breaking the build."}
        </p>

        <div className="flex items-center gap-3 mb-6">
          <span className="text-sm font-medium text-gray-700">
            {isSpanish ? "Idioma actual:" : "Current language:"}
          </span>
          <span className="inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold">
            {language === "en" ? "English" : "Español"}
          </span>
        </div>

        <div className="flex gap-3 mb-6">
          <button
            type="button"
            onClick={() => setLanguage("en")}
            className="flex-1 border rounded-lg px-3 py-2 text-sm font-medium hover:bg-gray-50 transition"
          >
            English
          </button>
          <button
            type="button"
            onClick={() => setLanguage("es")}
            className="flex-1 border rounded-lg px-3 py-2 text-sm font-medium hover:bg-gray-50 transition"
          >
            Español
          </button>
        </div>

        <div className="text-xs text-gray-500">
          {isSpanish
            ? "Si ves esta página en producción, significa que el sistema de idioma y el build están funcionando correctamente."
            : "If you see this page in production, it means the language system and build are working correctly."}
        </div>
      </div>
    </main>
  );
}
