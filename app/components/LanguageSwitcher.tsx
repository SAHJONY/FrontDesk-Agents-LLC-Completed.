"use client";

import { useLanguage } from "./LanguageProvider";

export function LanguageSwitcher() {
  const { language, toggleLanguage } = useLanguage();

  const isSpanish = language === "es";
  const label = isSpanish ? "ES" : "EN";

  return (
    <button
      type="button"
      onClick={toggleLanguage}
      className="inline-flex items-center justify-center rounded-md border border-slate-600 px-3 py-1 text-xs font-semibold tracking-wide uppercase"
    >
      {label}
    </button>
  );
}
