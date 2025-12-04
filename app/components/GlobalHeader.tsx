"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useLanguage } from "../providers/LanguageProvider";

type Theme = "light" | "dark";

const navLabels = {
  en: {
    pricing: "Pricing",
    demo: "Live demo",
    industries: "Industries",
    support: "Support",
    login: "Login",
    cta: "Start now",
    langToggle: "ES",
  },
  es: {
    pricing: "Precios",
    demo: "Demo en vivo",
    industries: "Industrias",
    support: "Soporte",
    login: "Ingresar",
    cta: "Comienza ahora",
    langToggle: "EN",
  },
};

export default function GlobalHeader() {
  const { lang, setLang } = useLanguage();
  const t = navLabels[lang];
  const [theme, setTheme] = useState<Theme>("light");

  // Cargar tema inicial
  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = window.localStorage.getItem("theme") as Theme | null;
    const prefersDark =
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches;

    const initial: Theme =
      stored === "dark" || (!stored && prefersDark) ? "dark" : "light";

    setTheme(initial);
    document.documentElement.classList.toggle("dark", initial === "dark");
  }, []);

  // Guardar tema y aplicar clase
  useEffect(() => {
    if (typeof window === "undefined") return;
    document.documentElement.classList.toggle("dark", theme === "dark");
    window.localStorage.setItem("theme", theme);
  }, [theme]);

  const isDark = theme === "dark";

  return (
    <header className="w-full border-b border-slate-100 dark:border-slate-800 bg-white/80 dark:bg-slate-950/80 backdrop-blur-lg sticky top-0 z-40">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        {/* Logo / Marca */}
        <Link href="/" className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-sky-500" />
          <div className="flex flex-col leading-tight">
            <span className="text-sm font-semibold tracking-tight">
              FrontDesk Agents
            </span>
            <span className="text-[11px] text-sky-500 font-medium uppercase tracking-[0.18em]">
              AI RECEPTIONIST • 24/7
            </span>
          </div>
        </Link>

        {/* Navegación principal */}
        <nav className="hidden md:flex items-center gap-6 text-xs font-medium text-slate-600 dark:text-slate-300">
          <Link href="/pricing" className="hover:text-slate-900 dark:hover:text-white">
            {t.pricing}
          </Link>
          <Link href="/demo" className="hover:text-slate-900 dark:hover:text-white">
            {t.demo}
          </Link>
          <Link href="/industries" className="hover:text-slate-900 dark:hover:text-white">
            {t.industries}
          </Link>
          <Link href="/support" className="hover:text-slate-900 dark:hover:text-white">
            {t.support}
          </Link>
        </nav>

        {/* Acciones derechas */}
        <div className="flex items-center gap-2">
          {/* Theme toggle */}
          <button
            type="button"
            onClick={() => setTheme(isDark ? "light" : "dark")}
            className="text-[11px] px-3 py-1 rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-100"
          >
            {isDark ? "☀️ Light" : "🌙 Dark"}
          </button>

          {/* Language toggle */}
          <button
            type="button"
            onClick={() => setLang(lang === "en" ? "es" : "en")}
            className="text-[11px] px-3 py-1 rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-100"
          >
            {t.langToggle}
          </button>

          {/* Login + CTA */}
          <Link
            href="/login"
            className="hidden sm:inline-flex text-[11px] font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
          >
            {t.login}
          </Link>
          <Link
            href="/demo"
            className="inline-flex items-center justify-center rounded-full bg-sky-500 px-4 py-1.5 text-[11px] font-semibold text-white shadow-sm hover:bg-sky-600"
          >
            {t.cta}
          </Link>
        </div>
      </div>
    </header>
  );
}
