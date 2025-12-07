"use client";

import React from "react";

type LanguageSwitcherProps = {
  className?: string;
};

export function LanguageSwitcher({ className }: LanguageSwitcherProps) {
  // Versión simple: solo muestra EN / ES (sin contexto global)
  return (
    <button
      type="button"
      className={
        className ??
        "inline-flex items-center gap-1 rounded-full border border-slate-600 px-3 py-1 text-xs font-medium text-slate-100 hover:bg-slate-900/60 transition"
      }
      aria-label="Change language"
    >
      <span>EN</span>
      <span className="opacity-50">/</span>
      <span>ES</span>
    </button>
  );
}

// Soporta import tanto por default como nombrado
export default LanguageSwitcher;
