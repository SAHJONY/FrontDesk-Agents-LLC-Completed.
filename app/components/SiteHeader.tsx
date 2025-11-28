"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const NAV_ITEMS = [
  { href: "/", label: "Inicio" },
  { href: "/industries", label: "Industrias" },
  { href: "/app/pricing", label: "Precios" },
  { href: "/app/ai-agents", label: "AI Agents" },
  { href: "/setup", label: "Configurar Receptionist" },
];

type Theme = "light" | "dark";

function getInitialTheme(): Theme {
  if (typeof window === "undefined") return "dark";
  const stored = window.localStorage.getItem("fda-theme");
  if (stored === "light" || stored === "dark") return stored;

  // prefer system
  const prefersDark = window.matchMedia?.(
    "(prefers-color-scheme: dark)"
  ).matches;
  return prefersDark ? "dark" : "light";
}

export default function SiteHeader() {
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    const initial = getInitialTheme();
    setTheme(initial);
  }, []);

  useEffect(() => {
    if (typeof document === "undefined") return;
    const root = document.documentElement;

    if (theme === "dark") {
      root.classList.add("dark");
      root.classList.remove("light");
    } else {
      root.classList.add("light");
      root.classList.remove("dark");
    }

    window.localStorage.setItem("fda-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <header className="sticky top-0 z-40 border-b border-slate-800/80 bg-slate-950/85 backdrop-blur">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-4">
        {/* BRAND */}
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <div className="h-7 w-7 rounded-xl bg-cyan-500/20 border border-cyan-400/60 flex items-center justify-center text-[11px] font-bold text-cyan-200">
              FD
            </div>
            <div className="leading-tight">
              <span className="block text-sm font-semibold text-slate-50">
                FrontDesk Agents
              </span>
              <span className="block text-[10px] uppercase tracking-[0.18em] text-slate-400">
                AI PHONE OS
              </span>
            </div>
          </Link>
        </div>

        {/* NAV */}
        <nav className="hidden md:flex flex-1 items-center justify-center gap-5 text-xs font-medium text-slate-300">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="hover:text-cyan-300 transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* CONTROLES DERECHA */}
        <div className="ml-auto flex items-center gap-3">
          {/* Multi-idioma */}
          <div className="hidden sm:flex flex-col items-end">
            <span className="text-[10px] font-semibold text-cyan-300">
              EN · ES por defecto
            </span>
            <span className="text-[9px] text-slate-400">
              +100 idiomas y dialectos auto-configurables
            </span>
          </div>

          {/* Toggle Light/Dark */}
          <button
            type="button"
            onClick={toggleTheme}
            className="inline-flex items-center justify-between w-16 rounded-full border border-slate-600 bg-slate-900 px-1 py-1 text-[11px] text-slate-200 hover:border-cyan-400 transition"
            aria-label="Cambiar tema claro/oscuro"
          >
            <span
              className={
                theme === "light" ? "font-semibold text-amber-300" : ""
              }
            >
              ☀
            </span>
            <span
              className={
                theme === "dark" ? "font-semibold text-cyan-300" : ""
              }
            >
              ☾
            </span>
          </button>

          {/* CTA mini */}
          <Link
            href="/setup"
            className="hidden sm:inline-flex items-center rounded-full bg-cyan-400 px-3 py-1.5 text-[11px] font-semibold text-slate-950 hover:bg-cyan-300 transition"
          >
            Demo guiada
          </Link>
        </div>
      </div>
    </header>
  );
}
