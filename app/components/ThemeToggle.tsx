"use client";

import { useEffect, useState } from "react";

const THEME_STORAGE_KEY = "fd-theme";

type Theme = "light" | "dark";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("dark");

  // Cargar tema guardado
  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(THEME_STORAGE_KEY) as
        | Theme
        | null;
      const prefersDark =
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches;

      const initial: Theme =
        saved === "light" || saved === "dark"
          ? saved
          : prefersDark
          ? "dark"
          : "light";

      setTheme(initial);
      applyTheme(initial);
    } catch {
      setTheme("dark");
      applyTheme("dark");
    }
  }, []);

  const applyTheme = (next: Theme) => {
    const root = document.documentElement;
    if (next === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      // ignore
    }
  };

  const toggle = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    applyTheme(next);
  };

  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggle}
      className="inline-flex items-center gap-1 rounded-md border border-slate-700 bg-slate-900/60 px-2 py-1 text-xs text-slate-100 shadow-sm hover:border-cyan-500/80 hover:bg-slate-900/90 focus:outline-none focus:ring-2 focus:ring-cyan-500/80"
      aria-label="Toggle light/dark mode"
    >
      <span className="hidden sm:inline">
        {isDark ? "Dark" : "Light"}
      </span>
      <span aria-hidden="true">{isDark ? "🌙" : "☀️"}</span>
    </button>
  );
}
