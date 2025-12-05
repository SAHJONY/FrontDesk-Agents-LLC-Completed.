"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { useLanguage } from "../providers/LanguageProvider";

export default function SignupPage() {
  const { lang } = useLanguage();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const isEn = lang === "en";

  const copy = {
    title: isEn ? "Create your account" : "Crea tu cuenta",
    subtitle: isEn
      ? "Launch your 24/7 AI receptionist in a few minutes."
      : "Lanza tu recepcionista IA 24/7 en pocos minutos.",
    businessName: isEn ? "Business name" : "Nombre del negocio",
    fullName: isEn ? "Your name" : "Tu nombre",
    emailLabel: isEn ? "Work email" : "Correo de trabajo",
    phoneLabel: isEn ? "Mobile / WhatsApp" : "Móvil / WhatsApp",
    passwordLabel: isEn ? "Password" : "Contraseña",
    planLabel: isEn ? "Plan" : "Plan",
    planStarter: isEn ? "Starter – $399/mo" : "Starter – $399/mes",
    planPro: isEn ? "Professional – $899/mo" : "Professional – $899/mes",
    planEnt: isEn ? "Enterprise – $1,799/mo" : "Enterprise – $1,799/mes",
    button: isEn ? "Create account" : "Crear cuenta",
    already: isEn ? "Already have an account?" : "¿Ya tienes una cuenta?",
    goLogin: isEn ? "Sign in" : "Iniciar sesión",
    note: isEn
      ? "No card charged yet. Our team will verify your details and help you onboard."
      : "Todavía no se cobra tu tarjeta. Nuestro equipo verificará tus datos y te ayudará a hacer el onboarding.",
  };

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    // TODO: conectar a backend real de registro / Stripe / etc.
    setTimeout(() => {
      setLoading(false);
      router.push("/dashboard");
    }, 1000);
  }

  return (
    <div className="min-h-[calc(100vh-56px)] bg-gradient-to-b from-slate-950 via-slate-950 to-slate-900 dark:from-slate-950 dark:via-slate-950 dark:to-slate-900 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-2xl">
        <div className="mb-6 text-center">
          <p className="text-[11px] font-semibold tracking-[0.2em] text-sky-400 uppercase">
            {isEn ? "GET STARTED" : "EMPEZAR"}
          </p>
          <h1 className="mt-3 text-2xl md:text-3xl font-semibold text-white tracking-tight">
            {copy.title}
          </h1>
          <p className="mt-2 text-sm text-slate-300">{copy.subtitle}</p>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-950/70 backdrop-blur-xl shadow-[0_20px_80px_rgba(15,23,42,0.8)] p-5 md:p-6">
          <form className="grid gap-4 md:grid-cols-2" onSubmit={handleSubmit}>
            <div className="space-y-1.5 md:col-span-2">
              <label className="block text-xs font-medium text-slate-200">
                {copy.businessName}
              </label>
              <input
                required
                className="w-full rounded-lg border border-slate-700 bg-slate-950/60 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500/70 focus:border-sky-500/70"
                placeholder={
                  isEn ? "Houston Dental Group" : "Clínica Dental Houston"
                }
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-medium text-slate-200">
                {copy.fullName}
              </label>
              <input
                required
                className="w-full rounded-lg border border-slate-700 bg-slate-950/60 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500/70 focus:border-sky-500/70"
                placeholder={isEn ? "John Doe" : "Juan Pérez"}
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-medium text-slate-200">
                {copy.emailLabel}
              </label>
              <input
                type="email"
                required
                className="w-full rounded-lg border border-slate-700 bg-slate-950/60 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500/70 focus:border-sky-500/70"
                placeholder="you@clinic.com"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-medium text-slate-200">
                {copy.phoneLabel}
              </label>
              <input
                required
                className="w-full rounded-lg border border-slate-700 bg-slate-950/60 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500/70 focus:border-sky-500/70"
                placeholder="+1 (216) 480-4413"
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

            <div className="space-y-1.5">
              <label className="block text-xs font-medium text-slate-200">
                {copy.planLabel}
              </label>
              <select
                className="w-full rounded-lg border border-slate-700 bg-slate-950/60 px-3 py-2 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-sky-500/70 focus:border-sky-500/70"
                defaultValue="starter"
              >
                <option value="starter">{copy.planStarter}</option>
                <option value="pro">{copy.planPro}</option>
                <option value="enterprise">{copy.planEnt}</option>
              </select>
            </div>

            <div className="md:col-span-2 mt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full inline-flex items-center justify-center rounded-lg bg-sky-500 text-sm font-medium text-white py-2.5 transition hover:bg-sky-400 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading
                  ? isEn
                    ? "Creating account..."
                    : "Creando cuenta..."
                  : copy.button}
              </button>
              <p className="mt-2 text-[11px] text-slate-400">{copy.note}</p>
            </div>
          </form>

          <div className="mt-4 border-t border-slate-800 pt-3 text-xs text-slate-300 text-center">
            <span>{copy.already} </span>
            <Link
              href="/login"
              className="font-semibold text-sky-400 hover:text-sky-300"
            >
              {copy.goLogin}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
