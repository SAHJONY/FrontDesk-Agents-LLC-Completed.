"use client";

import { useEffect, useState } from "react";
import type { Locale } from "./strings";
import { DEFAULT_LOCALE } from "./strings";
import { getLocaleFromCookie } from "./cookie";

export function useLocale(): Locale {
  const [locale, setLocale] = useState<Locale>(DEFAULT_LOCALE);

  useEffect(() => {
    setLocale(getLocaleFromCookie());
  }, []);

  return locale;
}