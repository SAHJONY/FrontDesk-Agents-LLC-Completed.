'use client';

import { useState } from 'react';

type Lang = 'en' | 'es';

interface AISetupFormProps {
  lang: Lang;
}

const COPY = {
  en: {
    title: 'Configure Your AI Receptionist',
    subtitle:
      "Tell us about your business and we'll generate the perfect AI phone agent script, flows and inbox.",
    businessName: 'Business Name',
    website: 'Website',
    agentName: 'Receptionist Name',
    agentRole: 'Main role or focus',
    purposePlaceholder: 'Turn calls into booked appointments, reduce no-shows, qualify leads…',
    notesLabel: 'Anything else we should know?',
    notesPlaceholder:
      'Opening hours, insurance, main services, how you like to greet patients or clients…',
    cta: 'Continue',
    helper:
      "We'll use this to personalize greetings, questions and follow-up messages for every call."
  },
  es: {
    title: 'Configura tu Recepcionista AI',
    subtitle:
      'Cuéntanos sobre tu negocio y generaremos el guion perfecto, los flujos y el inbox para tu agente telefónico AI.',
    businessName: 'Nombre del negocio',
    website: 'Sitio web',
    agentName: 'Nombre de la recepcionista',
    agentRole: 'Rol o enfoque principal',
    purposePlaceholder:
      'Convertir llamadas en citas reservadas, reducir ausencias, calificar prospectos…',
    notesLabel: '¿Algo más que debamos saber?',
    notesPlaceholder:
      'Horario, seguros que aceptas, servicios principales, cómo te gusta saludar a los clientes…',
    cta: 'Continuar',
    helper:
      'Usaremos esto para personalizar saludos, preguntas y mensajes de seguimiento en cada llamada.'
  }
} as const;

export default function AISetupForm({ lang }: AISetupFormProps) {
  const t = COPY[lang] ?? COPY.en;

  const [form, setForm] = useState({
    businessName: '',
    website: '',
    agentName: 'SARA',
    agentRole: '',
    notes: ''
  });

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // Aquí luego podrás conectar con tu backend / API
    // Por ahora solo mostramos un log para debug
    console.log('AI Setup form submitted', { lang, ...form });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="space-y-1.5">
        <h1 className="text-xl font-semibold tracking-tight text-slate-50">
          {t.title}
        </h1>
        <p className="text-sm text-slate-400">{t.subtitle}</p>
      </div>

      {/* Business + Website */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <label
            htmlFor="businessName"
            className="text-xs font-medium uppercase tracking-wide text-slate-400"
          >
            {t.businessName}
          </label>
          <input
            id="businessName"
            name="businessName"
            type="text"
            autoComplete="organization"
            placeholder="Downtown Dental Clinic"
            value={form.businessName}
            onChange={handleChange}
            className="w-full rounded-xl border border-slate-700/70 bg-slate-900/70 px-3 py-2 text-sm text-slate-50 placeholder:text-slate-500 focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/40"
          />
        </div>

        <div className="space-y-1.5">
          <label
            htmlFor="website"
            className="text-xs font-medium uppercase tracking-wide text-slate-400"
          >
            {t.website}
          </label>
          <input
            id="website"
            name="website"
            type="url"
            autoComplete="url"
            placeholder="https://yourclinic.com"
            value={form.website}
            onChange={handleChange}
            className="w-full rounded-xl border border-slate-700/70 bg-slate-900/70 px-3 py-2 text-sm text-slate-50 placeholder:text-slate-500 focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/40"
          />
        </div>
      </div>

      {/* Agent name + role */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <label
            htmlFor="agentName"
            className="text-xs font-medium uppercase tracking-wide text-slate-400"
          >
            {t.agentName}
          </label>
          <input
            id="agentName"
            name="agentName"
            type="text"
            placeholder="SARA"
            value={form.agentName}
            onChange={handleChange}
            className="w-full rounded-xl border border-slate-700/70 bg-slate-900/70 px-3 py-2 text-sm text-slate-50 placeholder:text-slate-500 focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/40"
          />
        </div>

        <div className="space-y-1.5">
          <label
            htmlFor="agentRole"
            className="text-xs font-medium uppercase tracking-wide text-slate-400"
          >
            {t.agentRole}
          </label>
          <input
            id="agentRole"
            name="agentRole"
            type="text"
            placeholder={t.purposePlaceholder}
            value={form.agentRole}
            onChange={handleChange}
            className="w-full rounded-xl border border-slate-700/70 bg-slate-900/70 px-3 py-2 text-sm text-slate-50 placeholder:text-slate-500 focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/40"
          />
        </div>
      </div>

      {/* Extra notes */}
      <div className="space-y-1.5">
        <label
          htmlFor="notes"
          className="text-xs font-medium uppercase tracking-wide text-slate-400"
        >
          {t.notesLabel}
        </label>
        <textarea
          id="notes"
          name="notes"
          rows={4}
          placeholder={t.notesPlaceholder}
          value={form.notes}
          onChange={handleChange}
          className="w-full rounded-xl border border-slate-700/70 bg-slate-900/70 px-3 py-2 text-sm text-slate-50 placeholder:text-slate-500 focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/40"
        />
        <p className="text-xs text-slate-500">{t.helper}</p>
      </div>

      {/* CTA */}
      <div className="flex items-center justify-between gap-4 pt-2">
        <button
          type="submit"
          className="inline-flex items-center justify-center rounded-full bg-cyan-500 px-4 py-2 text-sm font-semibold text-slate-950 shadow-[0_0_32px_rgba(34,211,238,0.8)] hover:bg-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/60"
        >
          {t.cta}
        </button>
        <span className="text-[11px] text-slate-500">
          Multilingual by default · EN / ES / +100 dialects
        </span>
      </div>
    </form>
  );
}
