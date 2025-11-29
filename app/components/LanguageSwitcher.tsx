"use client";

import { useLanguage } from "./LanguageProvider";

export default function LanguageSwitcher() {
  const { lang, setLang } = useLanguage();

  return (
    <div className="flex items-center gap-1">
      <button
        type="button"
        onClick={() => setLang("en")}
        className={`text-xs font-medium px-2 py-1 rounded-full border transition ${
          lang === "en"
            ? "bg-sky-500 text-white border-sky-400"
            : "bg-transparent text-slate-400 border-slate-600 hover:text-slate-100"
        }`}
      >
        EN
      </button>

      <button
        type="button"
        onClick={() => setLang("es")}
        className={`text-xs font-medium px-2 py-1 rounded-full border transition ${
          lang === "es"
            ? "bg-sky-500 text-white border-sky-400"
            : "bg-transparent text-slate-400 border-slate-600 hover:text-slate-100"
        }`}
      >
        ES
      </button>
    </div>
  );
}
