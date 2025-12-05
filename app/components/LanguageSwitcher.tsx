"use client";

import { useLanguage } from "./LanguageProvider";

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  const isEn = language === "en";
  const isEs = language === "es";

  return (
    <div className="flex items-center gap-1">
      <button
        type="button"
        onClick={() => setLanguage("en")}
        className={`px-2 py-1 text-xs rounded ${
          isEn ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-800"
        }`}
      >
        EN
      </button>
      <button
        type="button"
        onClick={() => setLanguage("es")}
        className={`px-2 py-1 text-xs rounded ${
          isEs ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-800"
        }`}
      >
        ES
      </button>
    </div>
  );
}
