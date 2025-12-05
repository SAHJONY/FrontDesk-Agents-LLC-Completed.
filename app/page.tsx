// app/login/page.tsx
"use client";

import React, { useState, FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useLanguage } from "../providers/LanguageProvider";
import { useTheme } from "../providers/ThemeProvider";
import { BRAND } from "../config/branding";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams(); // URLSearchParams | null
  const { lang } = useLanguage();
  const { theme } = useTheme();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // ✅ Manejo seguro de null
  const redirectTo = searchParams?.get("redirectTo") ?? "/dashboard";

  const isEn = lang === "en";

  const texts = {
    title: isEn ? "Sign in to FrontDesk Agents" : "Inicia sesión en FrontDesk Agents",
    subtitle: isEn
      ? "Access your AI receptionists, numbers, and call analytics."
      : "Accede a tus recepcionistas IA, números y analíticas de llamadas.",
    emailLabel: isEn ? "Work email" : "Correo de trabajo",
    passwordLabel: isEn ? "Password" : "Contraseña",
    forgot: isEn ? "Forgot your password?" : "¿Olvidaste tu contraseña?",
    button: isEn ? "Sign in" : "Entrar",
    noAccount: isEn ? "Don't have an account?" : "¿No tienes cuenta?",
    createOne: isEn ? "Create one in minutes" : "Crea una en minutos",
    ownerHint: isEn
      ? "Owner login uses the same email, with full access."
      : "El login de propietario usa el mismo correo, con acceso total.",
  };

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      // Aquí luego conectamos con tu API real de auth.
      // Por ahora, simulamos éxito y redirigimos.
      await new Promise((r) => setTimeout(r, 400));
      router.push(redirectTo);
    } catch (err) {
      console.error(err);
      setError(
        isEn
          ? "We couldn't sign you in. Please try again."
          : "No pudimos iniciar sesión. Inténtalo de nuevo."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-3xl border border-white/10 bg-slate-950/70 p-8 shadow-[0_0_60px_rgba(56,189,248,0.35)] backdrop-blur">
        {/* Logo + título */}
        <div className="mb-6 flex items-center gap-3">
          <div className="h-9 w-9 rounded-2xl border border-cyan-400/50 bg-slate-900/80" />
          <div>
            <p className="text-sm font-semibold text-slate-50">
              {BRAND.name}
            </p>
            <p className="text-[11px] uppercase tracking-[0.2em] text-cyan-300/90">
              {BRAND.tagline}
            </p>
          </div>
        </div>

        <h1 className="text-xl font-semibold text-slate-50">{texts.title}</h1>
        <p className="mt-1 text-xs text-slate-300">{texts.subtitle}</p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="block text-xs font-medium text-slate-200 mb-1">
              {texts.emailLabel}
            </label>
            <input
              type
