// app/components/MainNav.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useLanguage } from "../providers/LanguageProvider";
import { ThemeToggle } from "./ThemeToggle";

const links = [
  { href: "/", label: { en: "Home", es: "Inicio" } },
  { href: "/pricing", label: { en: "Pricing", es: "Precios" } },
  { href: "/demo", label: { en: "Live Demo", es: "Demo en vivo" } },
  { href: "/industries", label: { en: "Industries", es: "Industrias" } },
  { href: "/support", label: { en: "Support", es: "Soporte" } },
];

export function MainNav() {
  const pathname = usePathname();
  const { lang, setLang } = useLanguage();
  const [open, setOpen] = useState(false);

  const renderLinks = (orientation: "row" | "col") => (
    <nav
      className={
        orientation === "row"
          ? "hidden gap-6 text-sm md:flex"
          : "flex flex-col gap-2 text-sm md:hidden"
      }
    >
      {links.map((link) => {
        const isActive = pathname === link.href;
        return (
          <Link
            key={link.href}
            href={link.href}
            className={
              "transition-colors " +
              (isActive
                ? "text-sky-400"
                : "text-slate-300 hover:text-white")
            }
            onClick={() => setOpen(false)}
          >
            {link.label[lang]}
          </Link>
        );
      })}
    </nav>
  );

  return (
    <header className="sticky top-0 z-40 border-b border-slate-800 bg-slate-950/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-sm font-semibold text-sky-400">
            FrontDesk Agents
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-4 md:flex">
          {renderLinks("row")}

          {/* Language & theme */}
          <div className="flex items-center gap-2">
            <div className="flex items-center rounded-full border border-slate-700 bg-slate-900 px-1 text-xs">
              <button
                onClick={() => setLang("en")}
                className={
                  "px-2 py-1 rounded-full " +
                  (lang === "en"
                    ? "bg-sky-500 text-slate-900"
                    : "text-slate-300")
                }
              >
                EN
              </button>
              <button
                onClick={() => setLang("es")}
                className={
                  "px-2 py-1 rounded-full " +
                  (lang === "es"
                    ? "bg-sky-500 text-slate-900"
                    : "text-slate-300")
                }
              >
                ES
              </button>
            </div>
            <ThemeToggle />
          </div>
        </div>

        {/* Mobile controls */}
        <div className="flex items-center gap-2 md:hidden">
          <div className="flex items-center rounded-full border border-slate-700 bg-slate-900 px-1 text-xs">
            <button
              onClick={() => setLang("en")}
              className={
                "px-2 py-1 rounded-full " +
                (lang === "en"
                  ? "bg-sky-500 text-slate-900"
                  : "text-slate-300")
              }
            >
              EN
            </button>
            <button
              onClick={() => setLang("es")}
              className={
                "px-2 py-1 rounded-full " +
                (lang === "es"
                  ? "bg-sky-500 text-slate-900"
                  : "text-slate-300")
              }
            >
              ES
            </button>
          </div>
          <ThemeToggle />
          <button
            onClick={() => setOpen((v) => !v)}
            className="rounded-md border border-slate-700 bg-slate-900 p-1.5 text-slate-200"
            aria-label="Open menu"
          >
            {open ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-slate-800 bg-slate-950 px-4 py-3 md:hidden">
          {renderLinks("col")}
        </div>
      )}
    </header>
  );
}
