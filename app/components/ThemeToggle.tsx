// app/components/ThemeToggle.tsx
"use client";

import { useEffect, useState } from "react";

type Theme = "light" | "dark";

function getInitialTheme(): Theme {
  if (typeof window === "undefined") return "dark";
  const stored = window.localStorage.getItem("fda-theme");
  if (stored === "light" || stored === "dark") return stored;
  // Por defecto, dark
  return "dark";
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    const initial = getInitialTheme();
    setTheme(initial);
    if (initial === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggle = () => {
    setTheme((prev) => {
      const next: Theme = prev === "dark" ? "light" : "dark";
      if (next === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
      window.localStorage.setItem("fda-theme", next);
      return next;
    });
  };

  return (
    <button
      type="button"
      onClick={toggle}
      className="inline-flex items-center gap-1 rounded-full border border-slate-600/60 bg-slate-900/60 px-3 py-1 text-xs font-medium text-slate-100 hover:bg-slate-800/80 hover:border-slate-400/70 transition-colors"
      aria-label="Toggle light/dark mode"
    >
      <span className="text-[11px] opacity-70">Theme</span>
      <span className="text-[11px]">
        {theme === "dark" ? "Dark · 🌙" : "Light · ☀️"}
      </span>
    </button>
  );
}
