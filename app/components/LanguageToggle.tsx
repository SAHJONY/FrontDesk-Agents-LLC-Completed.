"use client";

import { useLanguage } from "../context/LanguageContext";

export default function LanguageToggle() {
  const { lang, setLang } = useLanguage();

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    if (value === "en" || value === "es") {
      setLang(value);
    }
  };

  return (
    <label className="inline-flex items-center gap-1 text-xs sm:text-sm text-slate-400">
      <span className="hidden sm:inline">Language</span>
      <select
        value={lang}
        onChange={handleChange}
        className="rounded-md border border-slate-700 bg-slate-900/60 px-2 py-1 text-[11px] sm:text-xs text-slate-100 shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/80"
      >
        <option value="en">EN</option>
        <option value="es">ES</option>
      </select>
    </label>
  );
}
