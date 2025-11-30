"use client";

import Link from "next/link";
import { useTheme } from "next-themes";
import { useLang } from "./LangProvider";
import { useEffect, useState } from "react";

export default function SiteHeader() {
  const { theme, setTheme } = useTheme();
  const { lang, toggleLang } = useLang();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const isEs = lang === "es";

  const t = {
    brand: "FrontDesk Agents",
    navDashboard: isEs ? "Command Center" : "Command Center",
    navPricing: isEs ? "Planes" : "Pricing",
    navIndustries: isEs ? "Industrias" : "Industries",
    navSetup: isEs ? "Onboarding" : "Onboarding",
    langLabel: isEs ? "ES" : "EN",
  };

  return (
    <header className="border-b border-slate-200/70 dark:border-slate-800/80 bg-white/80 dark:bg-slate-950/80 backdrop-blur">
      <div className="max-w-6xl mx-auto px-4 h-14 sm:h-16 flex items-center justify-between gap-4">
        {/* Logo + brand */}
        <Link href="/" className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-xl bg-sky-600 bg-gradient-to-tr from-sky-500 to-cyan-400 flex items-center justify-center shadow-md shadow-sky-500/40">
            <span className="text-xs font-bold text-white">FD</span>
          </div>
          <div className="flex flex-col leading-tight">
            <span className="font-semibold text-sm sm:text-base">
              {t.brand}
            </span>
            <span className="text-[10px] sm:text-xs text-slate-500 dark:text-slate-400">
              AI Reception • 24/7 Command Center
            </span>
          </div>
        </Link>

        {/* Nav + actions */}
        <div className="flex items-center gap-3 sm:gap-4">
          <nav className="hidden sm:flex items-center gap-4 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
            <Link
              href="/dashboard"
              className="hover:text-sky-600 dark:hover:text-sky-400"
            >
              {t.navDashboard}
            </Link>
            <Link
              href="/pricing"
              className="hover:text-sky-600 dark:hover:text-sky-400"
            >
              {t.navPricing}
            </Link>
            <Link
              href="/industries"
              className="hover:text-sky-600 dark:hover:text-sky-400"
            >
              {t.navIndustries}
            </Link>
            <Link
              href="/setup"
              className="hover:text-sky-600 dark:hover:text-sky-400"
            >
              {t.navSetup}
            </Link>
          </nav>

          {/* Language toggle */}
          <button
            type="button"
            onClick={toggleLang}
            className="inline-flex items-center justify-center rounded-full border border-slate-300/80 dark:border-slate-600/80 px-2.5 py-1 text-[11px] font-semibold tracking-wide uppercase hover:border-sky-500 hover:text-sky-600 dark:hover:border-sky-400 dark:hover:text-sky-300"
          >
            {t.langLabel}
          </button>

          {/* Theme toggle */}
          {mounted && (
            <button
              type="button"
              onClick={() =>
                setTheme(theme === "light" ? "dark" : "light")
              }
              className="inline-flex items-center justify-center rounded-full border border-slate-300/80 dark:border-slate-600/80 w-8 h-8 text-slate-600 dark:text-slate-200 hover:border-sky-500 hover:text-sky-500 dark:hover:border-sky-400 dark:hover:text-sky-300"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? "🌙" : "☀️"}
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
