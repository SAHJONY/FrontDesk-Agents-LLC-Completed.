// app/components/MainNav.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
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

  return (
    <header className="border-b border-slate-800 bg-slate-950/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="font-semibold text-sky-400">
          FrontDesk Agents
        </Link>

        <nav className="hidden gap-6 text-sm md:flex">
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={
                  "transition-colors " +
                  (isActive ? "text-sky-400" : "text-slate-300 hover:text-white")
                }
              >
                {link.label[lang]}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          {/* Language switch */}
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

          {/* Theme toggle */}
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
