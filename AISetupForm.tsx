// app/components/AISetupForm.tsx
"use client";

import React, { useState } from "react";

type Lang = "en" | "es";

interface AISetupFormProps {
  lang: Lang;
}

export default function AISetupForm({ lang }: AISetupFormProps) {
  const [form, setForm] = useState({
    businessName: "",
    website: "",
    receptionistName: "",
    mainPurpose: "",
    industry: "",
    callVolume: "",
    crm: ""
  });

  const t = {
    title:
      lang === "en" ? "Design Your AI PHONE OS" : "Diseña Tu AI PHONE OS",
    subtitle:
      lang === "en"
        ? "Share a few details and we’ll generate a custom AI agent blueprint for your business."
        : "Cuéntanos unos detalles y generaremos un plano personalizado de tu agente de IA.",
    businessName: lang === "en" ? "Business Name" : "Nombre del Negocio",
    website: lang === "en" ? "Website" : "Sitio Web",
    receptionistName:
      lang === "en" ? "Receptionist Name" : "Nombre de la Recepcionista",
    mainPurpose:
      lang === "en"
        ? "Main Purpose (e.g. new leads, patient intake)"
        : "Propósito Principal (ej. nuevos clientes, admisión de pacientes)",
    industry: lang === "en" ? "Industry" : "Industria",
    callVolume:
      lang === "en"
        ? "Estimated Monthly Call Volume"
        : "Volumen de llamadas mensuales estimado",
    crm:
      lang === "en"
        ? "Current CRM / Calendar (optional)"
        : "CRM / Calendario actual (opcional)",
    button: lang === "en" ? "Generate My Blueprint" : "Generar Mi Plano de IA"
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Por ahora solo evitamos el reload.
    // En el futuro aquí podemos integrar con tu API / CRM.
    console.log("AI Setup Form submitted", form);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 rounded-2xl border border-slate-800 bg-slate-900/70 p-4 text-sm md:p-6 md:text-base"
    >
      <h3 className="text-lg font-semibold text-slate-50">{t.title}</h3>
      <p className="text-xs text-slate-400 md:text-sm">{t.subtitle}</p>

      <div className="grid gap-3 md:grid-cols-2">
        <div className="space-y-1">
          <label className="block text-xs font-medium text-slate-300">
            {t.businessName}
          </label>
          <input
            name="businessName"
            value={form.businessName}
            onChange={handleChange}
            className="w-full rounded-lg border border-slate-700 bg-slate-950/60 px-3 py-2 text-sm text-slate-100 outline-none focus:border-cyan-500"
          />
        </div>

        <div className="space-y-1">
          <label className="block text-xs font-medium text-slate-300">
            {t.website}
          </label>
          <input
            name="website"
            value={form.website}
            onChange={handleChange}
            className="w-full rounded-lg border border-slate-700 bg-slate-950/60 px-3 py-2 text-sm text-slate-100 outline-none focus:border-cyan-500"
          />
        </div>

        <div className="space-y-1">
          <label className="block text-xs font-medium text-slate-300">
            {t.receptionistName}
          </label>
          <input
            name="receptionistName"
            value={form.receptionistName}
            onChange={handleChange}
            className="w-full rounded-lg border border-slate-700 bg-slate-950/60 px-3 py-2 text-sm text-slate-100 outline-none focus:border-cyan-500"
          />
        </div>

        <div className="space-y-1">
          <label className="block text-xs font-medium text-slate-300">
            {t.industry}
          </label>
          <input
            name="industry"
            value={form.industry}
            onChange={handleChange}
            className="w-full rounded-lg border border-slate-700 bg-slate-950/60 px-3 py-2 text-sm text-slate-100 outline-none focus:border-cyan-500"
          />
        </div>

        <div className="space-y-1 md:col-span-2">
          <label className="block text-xs font-medium text-slate-300">
            {t.mainPurpose}
          </label>
          <textarea
            name="mainPurpose"
            value={form.mainPurpose}
            onChange={handleChange}
            rows={2}
            className="w-full rounded-lg border border-slate-700 bg-slate-950/60 px-3 py-2 text-sm text-slate-100 outline-none focus:border-cyan-500"
          />
        </div>

        <div className="space-y-1">
          <label className="block text-xs font-medium text-slate-300">
            {t.callVolume}
          </label>
          <input
            name="callVolume"
            value={form.callVolume}
            onChange={handleChange}
            placeholder={lang === "en" ? "e.g. 800–1,200" : "ej. 800–1,200"}
            className="w-full rounded-lg border border-slate-700 bg-slate-950/60 px-3 py-2 text-sm text-slate-100 outline-none focus:border-cyan-500"
          />
        </div>

        <div className="space-y-1">
          <label className="block text-xs font-medium text-slate-300">
            {t.crm}
          </label>
          <input
            name="crm"
            value={form.crm}
            onChange={handleChange}
            placeholder={
              lang === "en" ? "e.g. HubSpot, Zoho, Google" : "ej. HubSpot, Zoho"
            }
            className="w-full rounded-lg border border-slate-700 bg-slate-950/60 px-3 py-2 text-sm text-slate-100 outline-none focus:border-cyan-500"
          />
        </div>
      </div>

      <button
        type="submit"
        className="mt-2 inline-flex w-full items-center justify-center rounded-full bg-cyan-500 px-4 py-2 text-sm font-semibold text-slate-900 hover:bg-cyan-400 md:w-auto"
      >
        {t.button}
      </button>
    </form>
  );
}
