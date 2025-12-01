"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const { theme, setTheme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button
        type="button"
        aria-label="Toggle theme"
        className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-600 text-xs"
      >
        ◐
      </button>
    );
  }

  const resolvedTheme = theme === "system" ? systemTheme : theme;
  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label="Toggle theme"
      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-600 text-xs hover:border-slate-300 hover:bg-slate-800/60"
    >
      <span className="text-lg" aria-hidden="true">
        {isDark ? "☀️" : "🌙"}
      </span>
    </button>
  );
}
