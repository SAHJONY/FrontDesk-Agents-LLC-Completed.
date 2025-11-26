// app/components/ThemeToggle.tsx
"use client";

import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (typeof document !== "undefined") {
      const html = document.documentElement;
      const prefersDark = window.matchMedia?.("(prefers-color-scheme: dark)")?.matches;
      const hasClass = html.classList.contains("dark");
      const initial = hasClass || prefersDark;
      if (initial) html.classList.add("dark");
      setIsDark(initial);
    }
  }, []);

  if (!mounted) return null;

  const toggleTheme = () => {
    if (typeof document === "undefined") return;
    const html = document.documentElement;
    if (isDark) {
      html.classList.remove("dark");
      setIsDark(false);
    } else {
      html.classList.add("dark");
      setIsDark(true);
    }
  };

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="inline-flex items-center gap-2 rounded-full border border-slate-600 bg-slate-900/70 px-3 py-1 text-xs font-medium text-slate-100 shadow-sm hover:border-cyan-400 hover:text-cyan-300 dark:bg-slate-800/80"
      aria-label="Toggle light/dark mode"
    >
      <span className="h-2 w-2 rounded-full bg-cyan-400" />
      <span>{isDark ? "Dark mode" : "Light mode"}</span>
    </button>
  );
}
