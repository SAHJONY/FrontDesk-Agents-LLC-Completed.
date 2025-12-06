"use client";

import { useLanguage } from "@/contexts/LanguageContext";

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  const toggle = () => {
    setLanguage(language === "en" ? "es" : "en");
  };

  return (
    <button
      onClick={toggle}
      className="px-3 py-1 rounded-md bg-gray-200 dark:bg-gray-700"
    >
      {language.toUpperCase()}
    </button>
  );
}
