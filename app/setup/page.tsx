"use client";

import type { Metadata } from "next";
import Link from "next/link";
import AISetupForm from "../components/AISetupForm";
import BackToHome from "../components/BackToHome";
import { useLang } from "../components/LangProvider";

export const metadata: Metadata = {
  title: "FrontDesk Agents – AI Setup",
  description: "Configure your FrontDesk AI Receptionist in 60 seconds.",
};

export default function SetupPage() {
  const { lang } = useLang();
  const isEs = lang === "es";

  const t = {
    title: isEs
      ? "Configuración inicial de tu Agente IA"
      : "Initial configuration of your AI Agent",
    subtitle: isEs
      ? "Completa estos datos y tu recepcionista IA podrá empezar a atender llamadas, WhatsApp y correos como si fuera parte de tu equipo."
      : "Fill in these details and your AI receptionist can start handling calls, WhatsApp and emails like part of your team.",
  };

  return (
    <div className="bg-slate-950 text-slate-50 min-h-[calc(100vh-4rem)]">
      <div className="mx-auto max-w-5xl px-4 py-8">
        <BackToHome />

        <header className="mb-6 space-y-2">
          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-slate-50">
            {t.title}
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl">
            {t.subtitle}
          </p>
        </header>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] items-start">
          {/* Form */}
          <section className="fd-card p-6 sm:p-7">
            <AISetupForm lang={lang as "es" | "en"} />
          </section>

          {/* Visual side panel */}
          <section className="fd-card bg-slate-900/80 border border-slate-800 p-5 space-y-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-sky-300">
              FrontDesk Owner View
            </p>
            <p className="text-xs text-slate-300">
              {isEs
                ? "Los datos que completes aquí se usan para entrenar a tu recepcionista IA y conectar con tus canales reales (teléfono, WhatsApp, email, calendario, CRM)."
                : "The details you provide here are used to train your AI receptionist and connect to your real channels (phone, WhatsApp, email, calendar, CRM)."}
            </p>
            <ul className="text-xs text-slate-300 space-y-1.5">
              <li>
                • {isEs ? "Número de negocio y horarios de atención." : "Business phone and hours of operation."}
              </li>
              <li>
                •{" "}
                {isEs
                  ? "Idiomas principales de tus clientes (más de 100 idiomas soportados en back-end)."
                  : "Primary languages of your customers (100+ languages supported in the back-end)."}
              </li>
              <li>
                •{" "}
                {isEs
                  ? "Conexión a tu CRM, calendario y herramientas actuales."
                  : "Connection to your existing CRM, calendar and tools."}
              </li>
              <li>
                •{" "}
                {isEs
                  ? "Políticas sobre emergencias, urgencias y escalamiento a humanos."
                  : "Policies for emergencies, urgency and human escalation."}
              </li>
            </ul>

            <p className="text-[11px] text-slate-500">
              {isEs
                ? "En producción, este módulo se conecta a tu back-end real (Twilio, WhatsApp Business API, Stripe, HubSpot, etc.). Este formulario es seguro para usar en Vercel sin romper el build."
                : "In production, this module connects to your real back-end (Twilio, WhatsApp Business API, Stripe, HubSpot, etc.). This form is safe to use on Vercel without breaking the build."}
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
