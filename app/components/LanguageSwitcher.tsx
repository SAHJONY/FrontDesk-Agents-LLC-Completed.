"use client";

import { useLanguage } from "./LanguageProvider";

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center gap-1">
      <button
        type="button"
        onClick={() => setLanguage("en")}
        className={`px-2 py-1 text-xs rounded border ${
          language === "en"
            ? "bg-blue-600 text-white border-blue-500"
            : "bg-gray-800 text-gray-300 border-gray-700"
        }`}
      >
        EN
      </button>
      <button
        type="button"
        onClick={() => setLanguage("es")}
        className={`px-2 py-1 text-xs rounded border ${
          language === "es"
            ? "bg-blue-600 text-white border-blue-500"
            : "bg-gray-800 text-gray-300 border-gray-700"
        }`}
      >
        ES
      </button>
    </div>
  );
}
