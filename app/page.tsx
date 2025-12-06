"use client";

import React from "react";
import { LanguageProvider, useLanguage } from "./components/LanguageProvider";

function HomeContent() {
  const { language, setLanguage } = useLanguage();
  const isEnglish = language === "en";

  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-4 px-4">
      <h1 className="text-3xl font-bold text-center">
        {isEnglish
          ? "FrontDesk Agents – AI Receptionist Dashboard"
          : "FrontDesk Agents – Panel de Recepción IA"}
      </h1>
      <p className="text-center max-w-xl text-slate-600">
        {isEnglish
          ? "This is the main landing screen of your SaaS. Content will be expanded later, but the page is now language-aware and safe for prerender."
          : "Esta es la pantalla principal de tu SaaS. Más contenido se agregará después, pero ahora la página entiende el idioma y es segura para el prerender."}
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

export default function Page() {
  return (
    <LanguageProvider>
      <HomeContent />
    </LanguageProvider>
  );
}
