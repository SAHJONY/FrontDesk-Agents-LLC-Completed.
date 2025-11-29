"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "./ThemeProvider";
import { useLang } from "./LangProvider";

const NAV_ITEMS = [
  { href: "/", key: "home" },
  { href: "/industries", key: "industries" },
  { href: "/pricing", key: "pricing" },
  { href: "/app/ai-agents", key: "ai" },
  { href: "/dashboard", key: "dashboard" },
];

const LABELS = {
  es: {
    home: "Inicio",
    industries: "Industrias",
    pricing: "Precios",
    ai: "Agentes IA",
    dashboard: "Command Center",
    demo: "Iniciar demo guiada",
  },
  en: {
    home: "Home",
    industries: "Industries",
    pricing: "Pricing",
    ai: "AI Agents",
    dashboard: "Command Center",
    demo: "Start guided demo",
  },
};

export default function SiteHeader() {
  const rawPathname = usePathname();
  const pathname = rawPathname || "/";
  const { theme, toggleTheme } = useTheme();
  const { lang, toggleLang } = useLang();

  const L = LABELS[lang];

  return (
    <header className="border-b border-slate-800/70 bg-slate-950/80 backdrop-blur supports-[backdrop-filter]:bg-slate-950/60 sticky top-0 z-40">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between gap-4">
        {/* Logo + Back to Home */}
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-xl bg-sky-500/90 shadow-lg shadow-sky-500/40 flex items-center justify-center text-xs font-black tracking-tight">
              FD
            </div>
            <div className="leading-tight">
              <p className="text-sm font-semibold text-slate-50">
                FrontDesk Agents
              </p>
              <p className="text-[10px] uppercase tracking-[0.18em] text-slate-400">
                AI RECEPTIONIST COMMAND CENTER
              </p>
            </div>
          </Link>

          {/* Back to home extra claro (redundante pero explícito) */}
          {pathname !== "/" && (
            <Link
              href="/"
              className="ml-2 rounded-full border border-slate-700/70 px-2.5 py-1 text-[11px] font-medium text-slate-300 hover:border-sky-500 hover:text-sky-200 transition"
            >
              ⬅ {lang === "es" ? "Volver al inicio" : "Back to home"}
            </Link>
          )}
        </div>

        {/* Navegación desktop */}
        <nav className="hidden md:flex items-center gap-4 text-xs font-medium text-slate-300">
          {NAV_ITEMS.map((item) => {
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`px-2 py-1 rounded-full transition ${
                  isActive
                    ? "bg-sky-600 text-white shadow-sm shadow-sky-500/40"
                    : "text-slate-300 hover:text-sky-200 hover:bg-slate-800/70"
                }`}
              >
                {L[item.key as keyof typeof L]}
              </Link>
            );
          })}
        </nav>

        {/* Controles derecha: idioma, tema, CTA */}
        <div className="flex items-center gap-2">
          {/* Language toggle */}
          <button
            type="button"
            onClick={toggleLang}
            className="h-8 px-3 rounded-full border border-slate-700/80 text-[11px] font-semibold uppercase tracking-wide text-slate-200 hover:border-sky-500 hover:text-sky-100 bg-slate-900/70 transition"
          >
            {lang === "es" ? "ES / EN" : "EN / ES"}
          </button>

          {/* Theme toggle */}
          <button
            type="button"
            onClick={toggleTheme}
            className="h-8 w-8 rounded-full border border-slate-700/80 flex items-center justify-center text-slate-200 hover:border-sky-500 hover:text-sky-100 bg-slate-900/70 transition"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? "🌙" : "☀️"}
          </button>

          {/* CTA principal */}
          <Link
            href="/setup"
            className="hidden sm:inline-flex h-8 items-center rounded-full bg-sky-600 px-3.5 text-[11px] font-semibold uppercase tracking-wide text-white shadow-sm shadow-sky-500/50 hover:bg-sky-500 transition"
          >
            {L.demo}
          </Link>
        </div>
      </div>

      {/* Navegación mobile simple */}
      <nav className="md:hidden border-t border-slate-800/70 bg-slate-950/95">
        <div className="flex overflow-x-auto no-scrollbar px-2 py-2 gap-2 text-[11px] font-medium text-slate-300">
          {NAV_ITEMS.map((item) => {
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`px-2.5 py-1 rounded-full whitespace-nowrap transition ${
                  isActive
                    ? "bg-sky-600 text-white shadow-sm shadow-sky-500/40"
                    : "bg-slate-900/80 text-slate-300 hover:text-sky-200"
                }`}
              >
                {L[item.key as keyof typeof L]}
              </Link>
            );
          })}
        </div>
      </nav>
    </header>
  );
}
