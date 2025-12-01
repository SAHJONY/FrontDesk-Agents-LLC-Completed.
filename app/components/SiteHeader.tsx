"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { useLang } from "./LangProvider";

const navItems = [
  { href: "/", key: "home" },
  { href: "/industries", key: "industries" },
  { href: "/pricing", key: "pricing" },
  { href: "/dashboard", key: "dashboard" },
  { href: "/setup", key: "setup" },
  { href: "/app/ai-agents", key: "ai-agents" },
];

export default function SiteHeader() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const { lang, toggleLang } = useLang();

  const t = (key: string) => {
    const en: Record<string, string> = {
      brand: "FrontDesk Agents",
      tagline: "24/7 AI Receptionist Command Center",
      home: "Overview",
      industries: "Industries",
      pricing: "Pricing",
      dashboard: "Command Center",
      "ai-agents": "AI Agents",
      setup: "Onboarding",
      themeLight: "Light",
      themeDark: "Dark",
      langButton: "ES",
    };

    const es: Record<string, string> = {
      brand: "FrontDesk Agents",
      tagline: "Central de Recepción AI 24/7",
      home: "Resumen",
      industries: "Industrias",
      pricing: "Precios",
      dashboard: "Command Center",
      "ai-agents": "Agentes AI",
      setup: "Onboarding",
      themeLight: "Claro",
      themeDark: "Oscuro",
      langButton: "EN",
    };

    return (lang === "en" ? en : es)[key] ?? key;
  };

  const currentThemeLabel =
    theme === "light" ? t("themeLight") : t("themeDark");

  return (
    <header className="border-b border-slate-200/60 dark:border-slate-800/80 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md sticky top-0 z-40">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <div className="flex items-center gap-2">
          <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-sky-500 via-blue-600 to-indigo-500 shadow-lg shadow-sky-500/40 flex items-center justify-center text-white text-lg font-bold">
            FD
          </div>
          <div className="leading-tight">
            <div className="font-semibold tracking-tight text-slate-900 dark:text-slate-50">
              {t("brand")}
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400">
              {t("tagline")}
            </div>
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-4 text-sm">
          {navItems.map((item) => {
            const active =
              pathname === item.href ||
              (item.href !== "/" && pathname.startsWith(item.href));

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-md px-3 py-1.5 transition text-xs font-medium ${
                  active
                    ? "bg-sky-600 text-white shadow-sm"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-300 dark:hover:text-white dark:hover:bg-slate-800"
                }`}
              >
                {t(item.key)}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            className="inline-flex items-center gap-1 rounded-md border border-slate-300 dark:border-slate-700 px-2.5 py-1 text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <span
              aria-hidden
              className="h-4 w-4 rounded-full border border-slate-400 dark:border-slate-500 flex items-center justify-center text-[10px]"
            >
              {theme === "light" ? "☀️" : "🌙"}
            </span>
            <span>{currentThemeLabel}</span>
          </button>

          <button
            type="button"
            onClick={toggleLang}
            className="inline-flex items-center gap-1 rounded-md border border-sky-500/60 bg-sky-500/10 px-2.5 py-1 text-xs font-semibold text-sky-700 dark:text-sky-300 hover:bg-sky-500/20"
          >
            {t("langButton")}
          </button>
        </div>
      </div>
    </header>
  );
}
