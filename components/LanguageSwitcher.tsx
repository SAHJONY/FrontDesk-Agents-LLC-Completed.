"use client";

import React from "react";
import { useLanguage } from "./LanguageProvider";

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  const current = language ?? "EN";
  const next = current === "EN" ? "ES" : "EN";

  const handleClick = () => {
    setLanguage(next);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label="Change language"
      className="inline-flex items-center gap-1 rounded-full border border-slate-600 px-3 py-1 text-xs font-medium text-slate-100 hover:bg-slate-900/60 transition"
    >
      <span>{current}</span>
      <span className="opacity-50">/</span>
      <span>{next}</span>
    </button>
  );
}

export default LanguageSwitcher;
