"use client";

import React from "react";
import { useLanguage } from "./LanguageProvider";

const LanguageSwitcherBase: React.FC = () => {
  const { language, toggleLanguage } = useLanguage();

  const nextLabel = language === "en" ? "ES" : "EN";
  const title =
    language === "en"
      ? "Switch language to Spanish"
      : "Cambiar idioma a inglés";

  return (
    <button
      type="button"
      onClick={toggleLanguage}
      className="inline-flex items-center rounded-md border border-slate-600/60 bg-slate-900/40 px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-slate-50 hover:bg-slate-800/80"
      title={title}
    >
      {nextLabel}
    </button>
  );
};

// Named export (lo que espera MainNav y otros)
export const LanguageSwitcher = LanguageSwitcherBase;

// Default export por si en algún lado usan `import LanguageSwitcher from`
export default LanguageSwitcherBase;
