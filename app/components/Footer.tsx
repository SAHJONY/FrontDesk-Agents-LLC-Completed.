"use client";

import { useLanguage } from "../providers/LanguageProvider";

export function Footer() {
  const { lang, setLang } = useLanguage();

  return (
    <footer className="border-t border-slate-800 bg-slate-950/90">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 text-xs text-slate-400">
        <span>© {new Date().getFullYear()} FrontDesk Agents. All rights reserved.</span>
        <div className="flex items-center gap-2">
          <span>{lang === "en" ? "Language:" : "Idioma:"}</span>
          <button
            onClick={() => setLang("en")}
            className={lang === "en" ? "font-semibold text-sky-400" : ""}
          >
            EN
          </button>
          <span>/</span>
          <button
            onClick={() => setLang("es")}
            className={lang === "es" ? "font-semibold text-sky-400" : ""}
          >
            ES
          </button>
        </div>
      </div>
    </footer>
  );
}
