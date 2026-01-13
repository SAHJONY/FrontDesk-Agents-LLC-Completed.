"use client";

import React, { useState, FormEvent } from "react";

export type SupportedLang = "en" | "es";

interface AISetupFormProps {
  lang: SupportedLang;
}

export function AISetupForm({ lang }: AISetupFormProps) {
  const isEs = lang === "es";

  const t = {
    title: isEs
      ? "Configura tu Agente IA FrontDesk en 60 segundos"
      : "Set up your FrontDesk AI Agent in 60 seconds",
    subtitle: isEs
      ? "Cuéntanos lo básico de tu negocio para que el agente comience a atender llamadas, WhatsApp y emails como si fuera tu mejor recepcionista."
      : "Tell us the basics about your business so the agent can start handling calls, WhatsApp and emails like your best receptionist.",
    businessSection: isEs ? "Datos del negocio" : "Business details",
    businessName: isEs ? "Nombre del negocio" : "Business name",
    businessNamePlaceholder: isEs
      ? "Ej. Clínica Sonrisa Perfecta"
      : "e.g. Perfect Smile Dental Clinic",
    website: isEs ? "Sitio web" : "Website",
    websitePlaceholder: "https://",
    industry: isEs ? "Industria principal" : "Primary industry",
    industryPlaceholder: isEs
      ? "Ej. Clínica dental, bufete de abogados, bienes raíces..."
      : "e.g. Dental clinic, law firm, real estate...",
    phoneSection: isEs ? "Contacto y llamadas" : "Contact & calls",
    mainPhone: isEs ? "Teléfono principal de la empresa" : "Main business phone",
    mainPhonePlaceholder: isEs
      ? "Número que tus clientes ya conocen"
      : "Number your clients already know",
    country: isEs ? "País principal de operación" : "Primary country",
    countryPlaceholder: isEs ? "Ej. Estados Unidos, México" : "e.g. United States, Mexico",
    timezone: isEs ? "Zona horaria" : "Time zone",
    timezonePlaceholder: isEs ? "Ej. America/Chicago" : "e.g. America/Chicago",
    volumeSection: isEs ? "Volumen y canales" : "Volume & channels",
    callsPerDay: isEs ? "Llamadas promedio por día" : "Average calls per day",
    callsPerDayPlaceholder: isEs ? "Ej. 15" : "e.g. 15",
    channelsLabel: isEs ? "Canales que quieres activar" : "Channels to activate",
    chPhone: isEs ? "Llamadas telefónicas 24/7" : "24/7 phone calls",
    chWhatsApp: "WhatsApp Business",
    chEmail: isEs ? "Email profesional" : "Professional email",
    chSms: "SMS",
    languageSection: isEs ? "Idioma y estilo" : "Language & tone",
    primaryLanguage: isEs ? "Idioma principal del agente" : "Agent primary language",
    primaryLanguageHelp: isEs
      ? "El sistema soporta más de 100 idiomas y dialectos. Aquí defines el idioma por defecto para tus clientes."
      : "The system supports 100+ languages and dialects. Here you define your default customer-facing language.",
    toneLabel: isEs ? "Tono del agente" : "Agent tone",
    toneOption1: isEs ? "Profesional y cálido" : "Professional & warm",
    toneOption2: isEs ? "Súper cercano / amistoso" : "Very friendly / casual",
    toneOption3: isEs ? "Ultra formal (legal / médico)" : "Ultra formal (legal / medical)",
    submit: isEs ? "Activar configuración inicial" : "Activate initial configuration",
    submitting: isEs ? "Guardando configuración..." : "Saving configuration...",
    success: isEs
      ? "Configuración inicial guardada. Tu agente IA ya puede comenzar a trabajar."
      : "Initial configuration saved. Your AI agent can now start working.",
    error: isEs
      ? "No se pudo guardar la configuración. Inténtalo de nuevo."
      : "Could not save configuration. Please try again."
  };

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus("idle");

    const formData = new FormData(e.currentTarget);

    try {
      // 🔹 Aquí puedes conectar con tu backend real (API / Airtable / DB)
      // Ejemplo placeholder seguro (no rompe nada en producción):
      console.log("[FrontDesk Setup] Submitted data:", Object.fromEntries(formData));

      setStatus("success");
    } catch (err) {
      console.error(err);
      setStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Header */}
      <header className="space-y-2">
        <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-slate-900 dark:text-slate-50">
          {t.title}
        </h2>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300">
          {t.subtitle}
        </p>
      </header>

      {/* Business section */}
      <section className="space-y-4">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
          {t.businessSection}
        </h3>

        <div className="space-y-1.5">
          <label className="text-sm font-medium text-slate-800 dark:text-slate-100">
            {t.businessName}
          </label>
          <input
            name="businessName"
            required
            placeholder={t.businessNamePlaceholder}
            className="fd-input"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-medium text-slate-800 dark:text-slate-100">
            {t.website}
          </label>
          <input
            name="website"
            type="url"
            placeholder={t.websitePlaceholder}
            className="fd-input"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-medium text-slate-800 dark:text-slate-100">
            {t.industry}
          </label>
          <input
            name="industry"
            placeholder={t.industryPlaceholder}
            className="fd-input"
          />
        </div>
      </section>

      {/* Phone & contact */}
      <section className="space-y-4">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
          {t.phoneSection}
        </h3>

        <div className="space-y-1.5">
          <label className="text-sm font-medium text-slate-800 dark:text-slate-100">
            {t.mainPhone}
          </label>
          <input
            name="mainPhone"
            type="tel"
            placeholder={t.mainPhonePlaceholder}
            className="fd-input"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-slate-800 dark:text-slate-100">
              {t.country}
            </label>
            <input
              name="country"
              placeholder={t.countryPlaceholder}
              className="fd-input"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium text-slate-800 dark:text-slate-100">
              {t.timezone}
            </label>
            <input
              name="timezone"
              placeholder={t.timezonePlaceholder}
              className="fd-input"
            />
          </div>
        </div>
      </section>

      {/* Volume & channels */}
      <section className="space-y-4">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
          {t.volumeSection}
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-slate-800 dark:text-slate-100">
              {t.callsPerDay}
            </label>
            <input
              name="callsPerDay"
              type="number"
              min={0}
              placeholder={t.callsPerDayPlaceholder}
              className="fd-input"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium text-slate-800 dark:text-slate-100">
              {t.channelsLabel}
            </label>
            <div className="grid grid-cols-1 gap-2 text-sm text-slate-700 dark:text-slate-200">
              <label className="inline-flex items-center gap-2">
                <input type="checkbox" name="channels" value="phone" />
                <span>{t.chPhone}</span>
              </label>
              <label className="inline-flex items-center gap-2">
                <input type="checkbox" name="channels" value="whatsapp" />
                <span>{t.chWhatsApp}</span>
              </label>
              <label className="inline-flex items-center gap-2">
                <input type="checkbox" name="channels" value="email" />
                <span>{t.chEmail}</span>
              </label>
              <label className="inline-flex items-center gap-2">
                <input type="checkbox" name="channels" value="sms" />
                <span>{t.chSms}</span>
              </label>
            </div>
          </div>
        </div>
      </section>

      {/* Language & tone */}
      <section className="space-y-4">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
          {t.languageSection}
        </h3>

        <div className="space-y-1.5">
          <label className="text-sm font-medium text-slate-800 dark:text-slate-100">
            {t.primaryLanguage}
          </label>
          <select name="primaryLanguage" className="fd-input">
            <option value="es">Español (default)</option>
            <option value="en">English</option>
            <option value="bilingual">
              {isEs ? "Bilingüe: Inglés + Español" : "Bilingual: English + Spanish"}
            </option>
          </select>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            {t.primaryLanguageHelp}
          </p>
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-medium text-slate-800 dark:text-slate-100">
            {t.toneLabel}
          </label>
          <select name="tone" className="fd-input">
            <option value="pro-warm">{t.toneOption1}</option>
            <option value="friendly">{t.toneOption2}</option>
            <option value="ultra-formal">{t.toneOption3}</option>
          </select>
        </div>
      </section>

      {/* Status & submit */}
      {status === "success" && (
        <p className="text-xs font-medium text-emerald-600 dark:text-emerald-400">
          {t.success}
        </p>
      )}
      {status === "error" && (
        <p className="text-xs font-medium text-red-600 dark:text-red-400">
          {t.error}
        </p>
      )}

      <div className="flex justify-end pt-2">
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex items-center justify-center rounded-md border border-transparent bg-sky-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-sky-700 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isSubmitting ? t.submitting : t.submit}
        </button>
      </div>
    </form>
  );
}

export default AISetupForm;
