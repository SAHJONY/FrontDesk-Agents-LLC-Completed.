"use client";

import React, { useEffect, useState } from "react";

type Theme = "light" | "dark";

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("dark");

  // Leer tema inicial (localStorage o sistema)
  useEffect(() => {
    if (typeof window === "undefined") return;

    const stored = window.localStorage.getItem("theme");
    const systemPrefersDark =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches;

    const initial: Theme =
      stored === "light" || stored === "dark"
        ? (stored as Theme)
        : systemPrefersDark
        ? "dark"
        : "light";

    setTheme(initial);
  }, []);

  // Aplicar tema al <html> y guardar en localStorage
  useEffect(() => {
    if (typeof window === "undefined") return;

    const root = window.document.documentElement;

    if (theme === "dark") {
      root.classList.add("dark");
      root.classList.remove("light");
    } else {
      root.classList.add("light");
      root.classList.remove("dark");
    }

    window.localStorage.setItem("theme", theme);
  }, [theme]);

  const toggle = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const icon = theme === "dark" ? "☀️" : "🌙";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Toggle theme"
      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-600 bg-slate-900/40 text-slate-100 hover:bg-slate-800 transition"
    >
      <span aria-hidden="true">{icon}</span>
    </button>
  );
}

// Soporta import tanto por default como nombrado
export default ThemeToggle;
