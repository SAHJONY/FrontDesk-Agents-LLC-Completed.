"use client";

import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "../providers/LanguageProvider";
import { premiumBranding } from "../config/branding";

export default function DemoPage() {
  const { lang } = useLanguage();
  const isEn = lang === "en";

  const copy = {
    title: isEn ? "See FrontDesk Agents in action" : "Mira FrontDesk Agents en acción",
    subtitle: isEn
      ? "Book a live demo and watch an AI receptionist handle real calls, messages and bookings."
      : "Agenda una demo en vivo y mira cómo una recepcionista IA maneja llamadas, mensajes y reservas reales.",
    formTitle: isEn ? "Request your demo" : "Solicita tu demo",
    button: isEn ? "Confirm demo request" : "Confirmar solicitud de demo",
  };

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="relative py-16 lg:py-20">
        {/* Fondo premium específico de demo */}
        <div className="absolute inset-0 -z-10">
          <Image
            src={premiumBranding.demo.main}
            alt="Demo – AI receptionist dashboard"
            fill
            className="object-cover opacity-35"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-slate-950/90 via-slate-950/92 to-sky-900/40" />
        </div>

        <div className="max-w-5xl mx-auto px-4 grid lg:grid-cols-[1.1fr,1fr] gap-10 items-start">
          <div>
            <p className="text-[11px] font-semibold tracking-[0.2em] text-sky-300 uppercase">
              {isEn ? "LIVE DEMO CONSOLE" : "CONSOLA DE DEMO EN VIVO"}
            </p>
            <h1 className="mt-3 text-2xl md:text-3xl font-semibold tracking-tight">
              {copy.title}
            </h1>
            <p className="mt-3 text-sm text-slate-200 max-w-xl">
              {copy.subtitle}
            </p>

            {/* Aquí podrías poner video, iframe o imagen estática premium */}
            <div className="mt-6 rounded-2xl border border-sky-500/30 bg-slate-950/70 backdrop-blur-xl p-3 shadow-[0_20px_80px_rgba(15,23,42,0.95)]">
              <div className="relative aspect-[16/9] overflow-hidden rounded-xl">
                <Image
                  src={premiumBranding.dashboard.background}
                  alt="Premium AI call dashboard"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-slate-950/55 via-transparent to-sky-500/20" />
              </div>
            </div>
          </div>

          {/* Formulario simple de solicitud de demo */}
          <div className="rounded-2xl border border-slate-800 bg-slate-950/80 backdrop-blur-xl p-5 space-y-4">
            <h2 className="text-sm font-semibold">{copy.formTitle}</h2>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block mb-1 text-slate-300">
                  {isEn ? "Full name" : "Nombre completo"}
                </label>
                <input
                  className="w-full rounded-lg border border-slate-700 bg-slate-950/50 px-3 py-2 text-xs text-slate-100 focus:outline-none focus:ring-2 focus:ring-sky-500/80"
                  placeholder={isEn ? "Dr. Smith / Attorney Lopez" : "Dr. Pérez / Lic. Rodríguez"}
                />
              </div>
              <div>
                <label className="block mb-1 text-slate-300">
                  {isEn ? "Business email" : "Correo empresarial"}
                </label>
                <input
                  type="email"
                  className="w-full rounded-lg border border-slate-700 bg-slate-950/50 px-3 py-2 text-xs text-slate-100 focus:outline-none focus:ring-2 focus:ring-sky-500/80"
                  placeholder="you@clinic.com"
                />
              </div>
              <div>
                <label className="block mb-1 text-slate-300">
                  {isEn ? "Phone / WhatsApp" : "Teléfono / WhatsApp"}
                </label>
                <input
                  className="w-full rounded-lg border border-slate-700 bg-slate-950/50 px-3 py-2 text-xs text-slate-100 focus:outline-none focus:ring-2 focus:ring-sky-500/80"
                  placeholder="+1 (___) ___-____"
                />
              </div>
            </div>

            <button className="w-full rounded-lg bg-sky-500 py-2.5 text-xs font-medium text-white hover:bg-sky-400 transition">
              {copy.button}
            </button>

            <p className="text-[10px] text-slate-400">
              {isEn
                ? "We’ll reach out within one business day with available demo slots."
                : "Te contactaremos en un día hábil con horarios disponibles para la demo."}
            </p>

            <p className="text-[10px] text-slate-500">
              {isEn ? "Already a client?" : "¿Ya eres cliente?"}{" "}
              <Link
                href="/login"
                className="text-sky-400 hover:text-sky-300 font-medium"
              >
                {isEn ? "Log in to your console" : "Inicia sesión en tu consola"}
              </Link>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
