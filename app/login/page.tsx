"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useState } from "react";
import { useLanguage } from "../providers/LanguageProvider";

export default function LoginPage() {
  const { lang } = useLanguage();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const redirectTo = searchParams.get("redirectTo") || "/dashboard";

  const isEn = lang === "en";

  const copy = {
    title: isEn ? "Welcome back" : "Bienvenido de nuevo",
    subtitle: isEn
      ? "Sign in to your FrontDesk Agents console."
      : "Inicia sesión en tu consola de FrontDesk Agents.",
    emailLabel: isEn ? "Work email" : "Correo de trabajo",
    passwordLabel: isEn ? "Password" : "Contraseña",
    rememberMe: isEn ? "Remember me" : "Recordarme",
    forgotPassword: isEn ? "Forgot your password?" : "¿Olvidaste tu contraseña?",
    button: isEn ? "Sign in" : "Iniciar sesión",
    noAccount: isEn ? "No account yet?" : "¿Aún no tienes cuenta?",
    goSignup: isEn ? "Create your account" : "Crear cuenta",
    privacy: isEn
      ? "By signing in you agree to our Terms and Privacy Policy."
      : "Al iniciar sesión aceptas nuestros Términos y Política de Privacidad.",
  };

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    // TODO: conectar a tu backend de autenticación real.
    // De momento, simulamos un login exitoso y redirigimos:
    setTimeout(() => {
      setLoading(false);
      router.push(redirectTo);
    }, 800);
  }

  return (
    <div className="min-h-[calc(100vh-56px)] bg-gradient-to-b from-slate-950 via-slate-950 to-slate-900 dark:from-slate-950 dark:via-slate-950 dark:to-slate-900 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md">
        <div className="mb-6 text-center">
          <p className="text-[11px] font-semibold tracking-[0.2em] text-sky-400 uppercase">
            {isEn ? "AI RECEPTIONIST PLATFORM" : "PLATAFORMA DE RECEPCIONISTA IA"}
          </p>
          <h1 className="mt-3 text-2xl md:text-3xl font-semibold text-white tracking-tight">
            {copy.title}
          </h1>
          <p className="mt-2 text-sm text-slate-300">{copy.subtitle}</p>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-950/70 backdrop-blur-xl shadow-[0_20px_80px_rgba(15,23,42,0.8)] p-5 md:p-6">
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-1.5">
              <label className="block text-xs font-medium text-slate-200">
                {copy.emailLabel}
              </label>
              <input
                type="email"
                required
                placeholder="you@clinic.com"
                className="w-full rounded-lg border border-slate-700 bg-slate-950/60 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500/70 focus:border-sky-500/70"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-medium text-slate-200">
                {copy.passwordLabel}
              </label>
              <input
                type="password"
                required
                className="w-full rounded-lg border border-slate-700 bg-slate-950/60 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500/70 focus:border-sky-500/70"
              />
            </div>

            <div className="flex items-center justify-between text-xs text-slate-300">
              <label className="inline-flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="h-3 w-3 rounded border-slate-600 bg-slate-950 text-sky-500 focus:ring-sky-500"
                />
                <span>{copy.rememberMe}</span>
              </label>
              <Link
                href="/forgot-password"
                className="font-medium text-sky-400 hover:text-sky-300"
              >
                {copy.forgotPassword}
              </Link>
            </div>

            {error && (
              <p className="text-xs text-rose-400 bg-rose-950/40 border border-rose-800 rounded-lg px-3 py-2">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full inline-flex items-center justify-center rounded-lg bg-sky-500 text-sm font-medium text-white py-2.5 mt-1 transition hover:bg-sky-400 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? (isEn ? "Signing in..." : "Iniciando sesión...") : copy.button}
            </button>

            <p className="mt-2 text-[11px] text-slate-400">{copy.privacy}</p>
          </form>

          <div className="mt-4 border-t border-slate-800 pt-3 text-xs text-slate-300 text-center">
            <span>{copy.noAccount} </span>
            <Link
              href="/signup"
              className="font-semibold text-sky-400 hover:text-sky-300"
            >
              {copy.goSignup}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
