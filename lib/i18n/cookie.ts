import type { Locale } from "./strings";
import { DEFAULT_LOCALE, LOCALES } from "./strings";

const COOKIE_NAME = "fd_locale";

export function getLocaleFromCookie(): Locale {
  if (typeof document === "undefined") return DEFAULT_LOCALE;

  const match = document.cookie.match(new RegExp(`(?:^|; )${COOKIE_NAME}=([^;]*)`));
  const value = match ? decodeURIComponent(match[1]) : DEFAULT_LOCALE;

  return LOCALES.includes(value as Locale) ? (value as Locale) : DEFAULT_LOCALE;
}

export function setLocaleCookie(locale: Locale) {
  if (typeof document === "undefined") return;

  const safe = encodeURIComponent(locale);
  const maxAge = 60 * 60 * 24 * 180; // 180 days
  document.cookie = `${COOKIE_NAME}=${safe}; Path=/; Max-Age=${maxAge}; SameSite=Lax`;
}