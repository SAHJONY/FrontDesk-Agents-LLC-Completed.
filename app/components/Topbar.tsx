"use client";

import { useTheme } from "next-themes";
import LanguageSelectorMulti from "@/components/LanguageSelectorMulti";
import { useEffect, useState } from "react";

// Mock LanguageSwitcher if not imported
const LanguageSwitcher = () => <LanguageSelectorMulti />;

export function Topbar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  if (!mounted) {
    return (
      <header className="flex items-center justify-between border-b border-slate-800 bg-slate-950 px-4 py-3">
        <div className="text-sm text-slate-200">
          <span className="font-semibold text-white">FrontDesk Agents</span>{" "}
          <span className="text-slate-400">— Workspace</span>
        </div>
        <div className="flex items-center gap-2">
          <LanguageSelectorMulti />
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-md border border-slate-600 px-3 py-1 text-xs font-semibold text-slate-400"
            disabled
          >
            ...
          </button>
        </div>
      </header>
    );
  }

  return (
    <header className="flex items-center justify-between border-b border-slate-800 bg-slate-950 px-4 py-3">
      <div className="text-sm text-slate-200">
        <span className="font-semibold text-white">FrontDesk Agents</span>{" "}
        <span className="text-slate-400">— Workspace</span>
      </div>

      <div className="flex items-center gap-2">
        <LanguageSwitcher />
        <button
          type="button"
          onClick={toggleTheme}
          className="inline-flex items-center justify-center rounded-md border border-slate-600 px-3 py-1 text-xs font-semibold text-slate-200 hover:bg-slate-800 hover:text-white transition-colors"
          aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
        >
          {theme === "dark" ? (
            <>
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              Light
            </>
          ) : (
            <>
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
              Dark
            </>
          )}
        </button>
      </div>
    </header>
  );
}

export default Topbar;
