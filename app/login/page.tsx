// app/login/page.tsx
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useLanguage } from "../providers/LanguageProvider";
import { useTheme } from "../providers/ThemeProvider";
import { BRAND } from "../config/branding";

export default function LoginPage() {
  const { lang, setLang } = useLanguage();
  const { toggleTheme } = useTheme();
  const router = useRouter();
  const searchParams = useSearchParams();

  // ✅ Corrección principal: searchParams puede ser null
  const redirectTo = searchParams?.get("redirectTo") ?? "/dashboard";

  const isEn = lang === "en";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const t = {
    title: isEn ? "Welcome back" : "Bienvenido de nuevo",
    subtitle: isEn
      ? "Sign in to your FrontDesk Agents control panel."
      : "Inicia sesión en tu panel de control de FrontDesk Agents.",
    emailLabel: isEn ? "Work email" : "Correo de trabajo",
    passwordLabel: isEn ? "Password" : "Contraseña",
    rememberMe: isEn ? "Remember me" : "Recuérdame",
    forgot: isEn ? "Forgot your password?" : "¿Olvidaste tu contraseña?",
    loginButton: isEn ? "Log in" : "Iniciar sesión",
    noAccount: isEn ? "Don't have an account?" : "¿No tienes cuenta?",
    signup: isEn ? "Create your account" : "Crear tu cuenta",
    ownerBadge: isEn
      ? "OWNER ACCESS • FULL CONTROL"
      : "ACCESO OWNER • CONTROL TOTAL",
    errorRequired: isEn
      ? "Email and password are required."
      : "Correo y contraseña son obligatorios.",
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email || !password) {
      setError(t.errorRequired);
      return;
    }

    setLoading(true);

    try {
      // ⚠️ Aquí luego conectamos tu backend de Auth real.
      // Por ahora, login “dummy” para que la UI y el redirect funcionen.
      router.push(redirectTo);
    } catch (err) {
      setError(
        isEn
          ? "There was a problem signing in."
          : "Hubo un problema al iniciar sesión."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-3xl border border-white/10 bg-slate-950/70 p-8 shadow-[0_0_60px_rgba(56,189,248,0.35)] backdrop-blur">
        {/* Logo + owner badge */}
        <div className="mb-6 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-2xl border border-cyan-400/60 bg-slate-900/80 shadow-[0_0_25px_rgba(34,211,238,0.7)]" />
            <div>
              <p className="text-sm font-semibold tracking-tight">
                {BRAND.name}
              </p>
              <p className="text-[10px] uppercase tracking-[0.22em] text-cyan-300/90">
                {BRAND.tagline}
              </p>
            </div>
          </div>

          <span className="rounded-full border border-amber-400/50 bg-amber-400/10 px-3 py-1 text-[9px] font-semibold uppercase tracking-[0.18em] text-amber-200">
            {t.ownerBadge}
          </span>
        </div>

        {/* Título */}
        <h1 className="text-xl font-semibold tracking-tight text-slate-50">
          {t.title}
        </h1>
        <p className="mt-1 text-xs text-slate-300">{t.subtitle}</p>

        {/* Controles arriba del formulario */}
        <div className="mt-4 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => setLang(isEn ? "es" : "en")}
            className="rounded-full border border-white/10 bg-slate-900/80 px-3 py-1 text-[11px] font-medium text-slate-100 hover:border-cyan-400/60"
          >
            {isEn ? "EN · ES" : "ES · EN"}
          </button>

          <button
            type="button"
            onClick={toggleTheme}
            className="rounded-full border border-cyan-400/40 bg-slate-900/80 px-3 py-1 text-[11px] font-medium text-cyan-200 hover:border-cyan-300"
          >
            Theme
          </button>
        </div>

        {/* Mensaje de error */}
        {error && (
          <div className="mt-4 rounded-2xl border border-rose-500/50 bg-rose-500/10 px-3 py-2 text-[11px] text-rose-100">
            {error}
          </div>
        )}

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <div>
            <label className="mb-1 block text-xs font-medium text-slate-200">
              {t.emailLabel}
            </label>
            <input
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-2xl border border-white/10 bg-slate-900/80 px-3 py-2 text-xs text-slate-100 outline-none ring-0 focus:border-cyan-400/70"
              placeholder={isEn ? "you@clinic.com" : "tu@negocio.com"}
            />
          </div>

          <div>
            <label className="mb-1 block text-xs font-medium text-slate-200">
              {t.passwordLabel}
            </label>
            <input
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-2xl border border-white/10 bg-slate-900/80 px-3 py-2 text-xs text-slate-100 outline-none ring-0 focus:border-cyan-400/70"
              placeholder="••••••••"
            />
          </div>

          <div className="flex items-center justify-between text-[11px] text-slate-300">
            <label className="inline-flex items-center gap-2">
              <input
                type="checkbox"
                className="h-3 w-3 rounded border border-slate-500/70 bg-slate-900/80"
              />
              <span>{t.rememberMe}</span>
            </label>
            <Link
              href="/forgot-password"
              className="text-cyan-300 hover:text-cyan-200"
            >
              {t.forgot}
            </Link>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-2 w-full rounded-full bg-cyan-500 px-4 py-2.5 text-xs font-semibold text-slate-950 shadow-[0_0_35px_rgba(34,211,238,0.7)] hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading ? (isEn ? "Signing in..." : "Entrando...") : t.loginButton}
          </button>
        </form>

        {/* Footer */}
        <div className="mt-5 flex items-center justify-between text-[11px] text-slate-300">
          <span>{t.noAccount}</span>
          <Link
            href="/owner/onboarding"
            className="font-semibold text-cyan-300 hover:text-cyan-200"
          >
            {t.signup}
          </Link>
        </div>
      </div>
    </div>
  );
}
