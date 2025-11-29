"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "./LanguageProvider";
import LanguageSwitcher from "./LanguageSwitcher";

type Lang = "en" | "es";

const NAV_ITEMS: { href: string; id: string }[] = [
  { href: "/", id: "home" },
  { href: "/industries", id: "industries" },
  { href: "/ai-agents", id: "aiAgents" },
  { href: "/pricing", id: "pricing" },
  { href: "/dashboard", id: "dashboard" },
];

function getLabel(id: string, lang: Lang): string {
  const map: Record<string, { en: string; es: string }> = {
    home: { en: "Home", es: "Inicio" },
    industries: { en: "Industries", es: "Industrias" },
    aiAgents: { en: "AI Agents", es: "Agentes IA" },
    pricing: { en: "Pricing", es: "Precios" },
    dashboard: { en: "Login", es: "Ingresar" },
  };
  return map[id]?.[lang] ?? id;
}

export default function SiteHeader() {
  const pathname = usePathname() || "/";
  const { lang } = useLanguage();

  const primaryCta =
    lang === "en" ? "Start guided demo" : "Iniciar demo guiada";
  const secondaryCta =
    lang === "en" ? "See plans & pricing" : "Ver planes y precios";

  return (
    <header className="sticky top-0 z-40 border-b border-slate-800/60 bg-slate-950/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo + Brand */}
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-sky-500/90 text-white shadow-lg shadow-sky-500/40">
            <span className="text-xs font-black tracking-tight">FD</span>
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-sm font-semibold text-slate-50">
              FrontDesk Agents
            </span>
            <span className="text-[11px] font-medium uppercase tracking-[0.16em] text-slate-400">
              AI Phone OS
            </span>
          </div>
        </Link>

        {/* Center navigation */}
        <nav className="hidden items-center gap-4 text-xs font-medium text-slate-300 sm:flex">
          {NAV_ITEMS.map((item) => {
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-full px-3 py-1 transition ${
                  isActive
                    ? "bg-sky-500/15 text-sky-300 border border-sky-500/40"
                    : "text-slate-300/80 hover:text-slate-50 hover:bg-slate-800/60"
                }`}
              >
                {getLabel(item.id, lang)}
              </Link>
            );
          })}
        </nav>

        {/* Right side: language + CTAs */}
        <div className="flex items-center gap-3">
          <LanguageSwitcher />

          <Link
            href="/pricing"
            className="hidden rounded-full border border-sky-500/40 bg-slate-900/40 px-3 py-1.5 text-xs font-medium text-sky-200 hover:border-sky-400/80 hover:text-sky-50 sm:inline-flex"
          >
            {secondaryCta}
          </Link>

          <Link
            href="/setup"
            className="inline-flex items-center rounded-full bg-sky-500 px-3 py-1.5 text-xs font-semibold text-white shadow-lg shadow-sky-500/40 hover:bg-sky-400"
          >
            {primaryCta}
          </Link>
        </div>
      </div>
    </header>
  );
}
