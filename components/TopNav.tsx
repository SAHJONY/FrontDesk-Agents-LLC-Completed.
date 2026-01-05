"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import LanguageToggle from "@/components/LanguageToggle";
import type { Locale } from "@/lib/i18n/strings";
import { t } from "@/lib/i18n/strings";
import { useLocale } from "@/lib/i18n/useLocale";

type NavLink = { href: string; labelKey: string };

export default function TopNav() {
  const locale: Locale = useLocale();

  const [open, setOpen] = useState(false);
  const [solOpen, setSolOpen] = useState(false);
  const solRef = useRef<HTMLDivElement | null>(null);

  const primary: NavLink[] = useMemo(
    () => [
      { href: "/pricing", labelKey: "nav_pricing" },
      { href: "/demo", labelKey: "nav_demo" },
      { href: "/support", labelKey: "nav_support" },
    ],
    []
  );

  const solutions: NavLink[] = useMemo(
    () => [
      { href: "/solutions/law", labelKey: "sol_law" },
      { href: "/solutions/medical", labelKey: "sol_med" },
      { href: "/solutions/property-management", labelKey: "sol_pm" },
    ],
    []
  );

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      const target = e.target as Node;
      if (!solRef.current) return;
      if (solRef.current.contains(target)) return;
      setSolOpen(false);
    }
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  function closeAll() {
    setOpen(false);
    setSolOpen(false);
  }

  return (
    <header className="fd-nav">
      <div className="fd-nav__inner">
        <Link href="/" className="fd-nav__brand" onClick={closeAll}>
          <span className="fd-nav__logo" aria-hidden="true">◆</span>
          <span className="fd-nav__name">FrontDesk Agents</span>
        </Link>

        <nav className="fd-nav__links fd-hide-mobile" aria-label="Primary">
          <div className="fd-nav__dropdown" ref={solRef}>
            <button
              type="button"
              className="fd-nav__link fd-nav__link-btn"
              aria-haspopup="menu"
              aria-expanded={solOpen}
              onClick={() => setSolOpen((v) => !v)}
            >
              {t(locale, "nav_solutions")}
              <span className="fd-caret" aria-hidden="true">▾</span>
            </button>

            {solOpen && (
              <div className="fd-menu" role="menu">
                {solutions.map((x) => (
                  <Link
                    key={x.href}
                    href={x.href}
                    className="fd-menu__item"
                    role="menuitem"
                    onClick={closeAll}
                  >
                    {t(locale, x.labelKey)}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {primary.map((x) => (
            <Link key={x.href} href={x.href} className="fd-nav__link" onClick={closeAll}>
              {t(locale, x.labelKey)}
            </Link>
          ))}
        </nav>

        <div className="fd-nav__actions fd-hide-mobile">
          <LanguageToggle />
          <Link href="/login" className="fd-btn fd-btn-ghost" onClick={closeAll}>
            {t(locale, "nav_login")}
          </Link>
          <Link href="/signup" className="fd-btn fd-btn-primary" onClick={closeAll}>
            {t(locale, "nav_signup")}
          </Link>
        </div>

        <button
          type="button"
          className="fd-burger fd-show-mobile"
          aria-label="Open menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="fd-burger__bar" />
          <span className="fd-burger__bar" />
          <span className="fd-burger__bar" />
        </button>
      </div>

      {open && (
        <div className="fd-mobile fd-show-mobile" role="dialog" aria-label="Mobile menu">
          <div className="fd-mobile__section">
            <div className="fd-mobile__row">
              <LanguageToggle />
            </div>

            <div className="fd-mobile__row">
              <span className="fd-mobile__label">{t(locale, "nav_solutions")}</span>
              <div className="fd-mobile__list">
                {solutions.map((x) => (
                  <Link
                    key={x.href}
                    href={x.href}
                    className="fd-mobile__item"
                    onClick={closeAll}
                  >
                    {t(locale, x.labelKey)}
                  </Link>
                ))}
              </div>
            </div>

            <div className="fd-mobile__row">
              {primary.map((x) => (
                <Link
                  key={x.href}
                  href={x.href}
                  className="fd-mobile__item"
                  onClick={closeAll}
                >
                  {t(locale, x.labelKey)}
                </Link>
              ))}
            </div>
          </div>

          <div className="fd-mobile__section fd-mobile__cta">
            <Link href="/login" className="fd-btn fd-btn-ghost fd-btn-full" onClick={closeAll}>
              {t(locale, "nav_login")}
            </Link>
            <Link href="/signup" className="fd-btn fd-btn-primary fd-btn-full" onClick={closeAll}>
              {t(locale, "nav_signup")}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}