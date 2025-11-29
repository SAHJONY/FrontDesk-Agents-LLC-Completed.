'use client';

import { useState } from 'react';
import BackToHomeButton from './BackToHomeButton';

export default function AISetupForm() {
  const [businessName, setBusinessName] = useState('Downtown Dental Clinic');
  const [website, setWebsite] = useState('https://yourclinic.com');
  const [agentName, setAgentName] = useState('SARA');
  const [purpose, setPurpose] = useState('Turn calls into booked appointments');

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-xs tracking-[0.25em] text-cyan-400 mb-1">
            FRONTDESK AGENTS – SETUP
          </p>
          <h1 className="text-2xl md:text-3xl font-semibold text-slate-50">
            Configure Your AI Receptionist
          </h1>
          <p className="mt-2 text-sm text-slate-300 max-w-xl">
            Tell us about your business and we&apos;ll generate the perfect AI phone
            agent script, flows and inbox. Ready in minutes, not weeks.
          </p>
        </div>
        <BackToHomeButton />
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.3fr,1fr]">
        {/* Form card */}
        <div className="rounded-3xl bg-slate-950/80 border border-slate-800/80 shadow-[0_0_60px_rgba(15,23,42,0.8)] p-4 sm:p-6 space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-300">
                Business Name
              </label>
              <input
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                className="w-full rounded-xl bg-slate-900/80 border border-slate-700/80 px-3 py-2 text-sm text-slate-50 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/70"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-300">Website</label>
              <input
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                className="w-full rounded-xl bg-slate-900/80 border border-slate-700/80 px-3 py-2 text-sm text-slate-50 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/70"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-300">
                AI Receptionist Name
              </label>
              <input
                value={agentName}
                onChange={(e) => setAgentName(e.target.value)}
                className="w-full rounded-xl bg-slate-900/80 border border-slate-700/80 px-3 py-2 text-sm text-slate-50 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/70"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-300">
                Main Purpose
              </label>
              <input
                value={purpose}
                onChange={(e) => setPurpose(e.target.value)}
                className="w-full rounded-xl bg-slate-900/80 border border-slate-700/80 px-3 py-2 text-sm text-slate-50 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/70"
              />
            </div>
          </div>

          <p className="text-xs text-slate-400">
            We&apos;ll use this to personalize greetings, questions and follow-up
            messages for every caller, WhatsApp and email.
          </p>

          <button className="mt-2 inline-flex items-center justify-center rounded-full bg-cyan-500 px-4 py-2 text-sm font-semibold text-slate-950 shadow-[0_0_40px_rgba(34,211,238,0.8)] hover:bg-cyan-400 transition">
            Continue
          </button>
        </div>

        {/* Live preview card */}
        <div className="rounded-3xl bg-slate-950/90 border border-slate-800/80 shadow-[0_0_50px_rgba(15,23,42,0.9)] p-4 space-y-3">
          <p className="text-xs font-medium text-cyan-300 tracking-[0.2em]">
            FRONTDESK AGENTS · PREVIEW
          </p>

          <div className="relative overflow-hidden rounded-2xl bg-[radial-gradient(circle_at_top,_rgba(34,211,238,0.35),_transparent_55%),_radial-gradient(circle_at_bottom,_rgba(56,189,248,0.2),_transparent_55%)] border border-slate-800/80">
            <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-950/70 to-slate-900/50" />
            <div className="relative p-4 space-y-3 text-[11px] text-slate-100">
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-xs font-semibold">{businessName || 'Clinic'}</span>
                  <span className="text-[10px] text-slate-400">
                    AI Receptionist · {agentName || 'Your agent'}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="rounded-full bg-slate-900/80 px-2 py-0.5 text-[10px] text-slate-300">
                    EN · ES · +100
                  </span>
                  <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.9)]" />
                </div>
              </div>

              <div className="rounded-xl bg-slate-950/70 border border-slate-800/80 p-3 space-y-1.5">
                <p className="font-medium">
                  “Thank you for calling {businessName || 'your clinic'}. My name is{' '}
                  {agentName || 'your AI receptionist'}. I can help you {purpose.toLowerCase()}.
                  Are you a new or existing patient?”
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="rounded-lg bg-slate-950/70 border border-slate-800/80 px-2 py-1.5">
                  <p className="text-[10px] text-slate-400">Channel</p>
                  <p className="text-xs text-slate-100">Phone · WhatsApp · Email</p>
                </div>
                <div className="rounded-lg bg-slate-950/70 border border-slate-800/80 px-2 py-1.5">
                  <p className="text-[10px] text-slate-400">Goal</p>
                  <p className="text-xs text-slate-100">{purpose}</p>
                </div>
              </div>

              <p className="text-[10px] text-slate-400 mt-1">
                * Preview ilustrativo. La configuración real se adapta a tu idioma, marca y
                flujos de negocio.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
