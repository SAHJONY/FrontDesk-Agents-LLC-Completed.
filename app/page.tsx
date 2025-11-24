// app/page.tsx
'use client';

import Image from 'next/image';
import { useState } from 'react';

export default function LandingPage() {
  const [lang, setLang] = useState<'en' | 'es'>('en');

  const content = {
    en: {
      heroTitle: 'Deploy Your AI Receptionist in Minutes',
      heroSubtitle:
        'Quickly set up an AI-powered receptionist for your business with just a few clicks.',
      heroButton: 'Get Started',
      featureTitle: 'Turn Calls into Appointments in 60 Seconds',
      features: [
        'Free 14-day trial',
        'No charges during the trial',
        'Cancel anytime',
      ],
      trialButton: '@frontdesk.agents',
    },
    es: {
      heroTitle: 'Implementa Tu Recepcionista de IA en Minutos',
      heroSubtitle:
        'Configura rápidamente una recepcionista impulsada por IA para tu negocio en línea.',
      heroButton: 'Empezar',
      featureTitle: 'Convierte Llamadas en Citas en 60 Segundos',
      features: [
        'Prueba gratis de 14 días',
        'Sin cargos durante la prueba',
        'Cancela en cualquier momento',
      ],
      trialButton: '@frontdesk.agents',
    },
  };

  const t = content[lang];

  return (
    <main className="min-h-screen bg-[#0A0A12] text-white flex flex-col items-center">
      {/* Language Toggle */}
      <div className="absolute top-6 right-6 flex space-x-4 text-sm">
        <button
          className={`font-medium ${lang === 'en' ? 'text-cyan-400' : 'text-gray-400'}`}
          onClick={() => setLang('en')}
        >
          EN
        </button>
        <button
          className={`font-medium ${lang === 'es' ? 'text-cyan-400' : 'text-gray-400'}`}
          onClick={() => setLang('es')}
        >
          ES
        </button>
      </div>

      {/* Hero Section */}
      <section className="relative w-full h-[90vh] flex flex-col justify-center items-center text-center">
        <Image
          src="/hero.jpg" // Replace with your actual hero image path
          alt="AI Receptionist"
          fill
          className="object-cover opacity-40 -z-10"
          priority
        />
        <h1 className="text-4xl md:text-6xl font-bold max-w-3xl leading-tight mb-4">
          {t.heroTitle}
        </h1>
        <p className="text-lg md:text-xl text-gray-300 max-w-xl mb-8">
          {t.heroSubtitle}
        </p>
        <button className="bg-cyan-400 text-black font-semibold px-8 py-3 rounded-full hover:bg-cyan-300 transition">
          {t.heroButton}
        </button>
      </section>

      {/* Features Section */}
      <section className="bg-black py-20 px-6 w-full text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-10">{t.featureTitle}</h2>
        <div className="grid md:grid-cols-3 gap-10 max-w-4xl mx-auto">
          {t.features.map((feat, i) => (
            <div key={i} className="flex flex-col items-center">
              <div className="text-cyan-400 text-2xl mb-2">✔</div>
              <p className="text-lg text-gray-300">{feat}</p>
            </div>
          ))}
        </div>
        <div className="mt-10">
          <button className="bg-cyan-400 text-black font-semibold px-8 py-3 rounded-full hover:bg-cyan-300 transition">
            {t.trialButton}
          </button>
        </div>
      </section>
    </main>
  );
}
