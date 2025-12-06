// app/page.tsx
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";

function HeroContent() {
  const { language } = useLanguage();

  const copy =
    language === "en"
      ? {
          badge: "AI RECEPTIONISTS · 24/7 · MULTILINGUAL",
          title: "Turn every missed call into a booked appointment.",
          body: "FrontDesk Agents answers every call, books appointments, qualifies leads and sends summaries by SMS and email. Works with your existing numbers and connects to your CRM.",
          primary: "Start free onboarding",
          secondary: "Watch live demo",
        }
      : {
          badge: "RECEPCIONISTAS IA · 24/7 · MULTILINGÜES",
          title: "Convierte cada llamada perdida en una cita agendada.",
          body: "FrontDesk Agents responde todas tus llamadas, agenda citas, califica leads y envía resúmenes por SMS y email. Funciona con tus números actuales y se integra con tu CRM.",
          primary: "Comenzar onboarding gratis",
          secondary: "Ver demo en vivo",
        };

  return (
    <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
      <div className="space-y-6">
        <p className="text-xs font-semibold tracking-[0.25em] text-emerald-400">
          {copy.badge}
        </p>
        <h1 className="text-3xl font-black tracking-tight text-white sm:text-4xl lg:text-5xl">
          {copy.title}
        </h1>
        <p className="max-w-xl text-sm text-slate-300 sm:text-base">
          {copy.body}
        </p>

        <div className="flex flex-wrap items-center gap-3">
          <Link
            href="/signup"
            className="inline-flex items-center justify-center rounded-xl bg-emerald-400 px-5 py-2.5 text-sm font-semibold text-emerald-950 shadow-lg shadow-emerald-500/40 hover:bg-emerald-300"
          >
            {copy.primary}
          </Link>
          <Link
            href="/demo"
            className="inline-flex items-center justify-center rounded-xl border border-slate-700 px-5 py-2.5 text-sm font-semibold text-slate-100 hover:bg-slate-900"
          >
            {copy.secondary}
          </Link>
        </div>

        <p className="text-xs text-slate-400">
          No engineers needed · You control the script.
        </p>
      </div>

      <div className="relative">
        <div className="absolute -inset-4 rounded-3xl bg-emerald-500/10 blur-2xl" />
        <div className="relative overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/60">
          <Image
            src="/images/premium/frontdesk-hero-main.png"
            alt="FrontDesk Agents AI receptionist dashboard"
            width={900}
            height={700}
            className="h-full w-full object-cover"
            priority
          />
        </div>
      </div>
    </div>
  );
}

export default function HomePage() {
  return <HeroContent />;
}
