// app/components/LanguageSwitcher.tsx
"use client";

import { useLanguage } from "./LanguageProvider";

const labels = {
  en: "EN",
  es: "ES",
};

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  const nextLanguage = language === "en" ? "es" : "en";

  const handleToggle = () => {
    setLanguage(nextLanguage);
  };

  return (
    <button
      type="button"
      onClick={handleToggle}
      className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium hover:bg-accent hover:text-accent-foreground transition"
    >
      <span className="uppercase tracking-wide">
        {labels[language] ?? language.toUpperCase()}
      </span>
      <span className="text-[10px] opacity-70">Switch</span>
    </button>
  );
}
