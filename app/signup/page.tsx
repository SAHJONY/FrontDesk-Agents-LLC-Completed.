// app/signup/page.tsx
"use client";

import { useLanguage } from "@/contexts/LanguageContext";

export default function SignupPage() {
  const { language } = useLanguage();

  const copy =
    language === "en"
      ? {
          title: "Create your FrontDesk Agents account",
          subtitle:
            "Placeholder signup screen. Add billing and onboarding flows later.",
          fullName: "Full name",
          email: "Work email",
          password: "Password",
          create: "Create account",
        }
      : {
          title: "Crea tu cuenta de FrontDesk Agents",
          subtitle:
            "Pantalla de registro provisional. Agrega más tarde los flujos de cobro y onboarding.",
          fullName: "Nombre completo",
          email: "Correo de trabajo",
          password: "Contraseña",
          create: "Crear cuenta",
        };

  return (
    <section className="mx-auto max-w-md space-y-6 py-10">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold text-white">{copy.title}</h1>
        <p className="text-sm text-slate-300">{copy.subtitle}</p>
      </div>

      <form className="space-y-4">
        <div>
          <label className="mb-1 block text-xs font-medium text-slate-300">
            {copy.fullName}
          </label>
          <input
            type="text"
            className="w-full rounded-lg border border-slate-700 bg-slate-950/60 px-3 py-2 text-sm text-slate-100 outline-none focus:border-emerald-400"
          />
        </div>
        <div>
          <label className="mb-1 block text-xs font-medium text-slate-300">
            {copy.email}
          </label>
          <input
            type="email"
            className="w-full rounded-lg border border-slate-700 bg-slate-950/60 px-3 py-2 text-sm text-slate-100 outline-none focus:border-emerald-400"
          />
        </div>
        <div>
          <label className="mb-1 block text-xs font-medium text-slate-300">
            {copy.password}
          </label>
          <input
            type="password"
            className="w-full rounded-lg border border-slate-700 bg-slate-950/60 px-3 py-2 text-sm text-slate-100 outline-none focus:border-emerald-400"
          />
        </div>

        <button
          type="submit"
          className="mt-2 w-full rounded-xl bg-emerald-400 px-4 py-2.5 text-sm font-semibold text-emerald-950 hover:bg-emerald-300"
        >
          {copy.create}
        </button>
      </form>
    </section>
  );
}
