"use client";

import { useMemo } from "react";
import type { Locale } from "@/lib/i18n/strings";
import { LOCALES } from "@/lib/i18n/strings";
import { useLocale } from "@/lib/i18n/useLocale";
import { setLocaleCookie } from "@/lib/i18n/cookie";

export default function LanguageToggle() {
  const locale = useLocale();

  const nextLocale: Locale = useMemo(() => {
    const idx = LOCALES.indexOf(locale);
    return LOCALES[(idx + 1) % LOCALES.length] as Locale;
  }, [locale]);

  function onToggle() {
    setLocaleCookie(nextLocale);
    window.location.reload();
  }

  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label="Change language"
      className="fd-btn fd-btn-ghost fd-lang"
    >
      <span className="fd-lang__label">{locale.toUpperCase()}</span>
      <span className="fd-lang__divider" aria-hidden="true">·</span>
      <span className="fd-lang__next">{nextLocale.toUpperCase()}</span>
    </button>
  );
}