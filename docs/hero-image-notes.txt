"use client";

import { useState, useEffect } from "react";

export default function Controls() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [language, setLanguage] = useState<"en" | "es">("en");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const savedLang = localStorage.getItem("lang");
    if (savedTheme) setTheme(savedTheme as "light" | "dark");
    if (savedLang) setLanguage(savedLang as "en" | "es");
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
    localStorage.setItem("lang", language);
  }, [theme, language]);

  return (
    <div className="fixed top-4 right-4 flex gap-2">
      <button
        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        className="px-3 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-sm font-medium"
      >
        {theme === "light" ? "🌞" : "🌙"}
      </button>
      <button
        onClick={() => setLanguage(language === "en" ? "es" : "en")}
        className="px-3 py-2 rounded-lg bg-sky-500 text-white text-sm font-semibold"
      >
        {language.toUpperCase()}
      </button>
    </div>
  );
}
