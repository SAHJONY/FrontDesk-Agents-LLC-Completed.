'use client';
import { useEffect, useState } from 'react';
import { ArrowRight, Shield, Zap, Clock } from 'lucide-react';

export default function Home() {
  const [lang, setLang] = useState<'en' | 'es'>('en');

  useEffect(() => {
    const storedLang = localStorage.getItem('lang') as 'en' | 'es' | null;
    if (storedLang) setLang(storedLang);
  }, []);

  const t = (en: string, es: string) => (lang === 'en' ? en : es);

  const Feature = ({
    icon: Icon,
    title,
    desc,
  }: {
    icon: any;
    title: string;
    desc: string;
  }) => (
    <div className="bg-white dark:bg-slate-800/60 p-6 rounded-xl border border-cyan-200 dark:border-slate-700 shadow-lg hover:scale-[1.02] transition-transform">
      <Icon className="w-8 h-8 text-cyan-500 mb-3" />
      <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-white">{title}</h3>
      <p className="text-gray-600 dark:text-gray-300">{desc}</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
      {/* Hero */}
      <section className="flex flex-col items-center justify-center text-center min-h-[80vh] px-8">
        <h1 className="text-5xl md:text-7xl font-extrabold bg-gradient-to-r from-cyan-500 to-blue-400 bg-clip-text text-transparent mb-6">
          {t('AI Phone OS for Enterprise', 'Sistema Telefónico IA para Empresas')}
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mb-10">
          {t(
            'Deploy a fully autonomous AI receptionist that answers, qualifies, and converts — 24/7.',
            'Despliega un recepcionista IA totalmente autónomo que atiende, califica y convierte — las 24 horas.'
          )}
        </p>
        <div className="flex gap-4">
          <button className="bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white font-semibold px-6 py-3 rounded-full shadow-md flex items-center gap-2">
            {t('Start Free Trial', 'Comienza Gratis')}
            <ArrowRight className="w-5 h-5" />
          </button>
          <button className="border border-gray-400 dark:border-gray-600 px-6 py-3 rounded-full font-semibold hover:bg-gray-100 dark:hover:bg-slate-700">
            {t('View Demo', 'Ver Demostración')}
          </button>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-6 md:px-12 bg-gray-50 dark:bg-slate-900">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-10 text-gray-900 dark:text-white">
            {t('Built for Modern Businesses', 'Diseñado para Empresas Modernas')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Feature
              icon={Clock}
              title={t('24/7 Availability', 'Disponibilidad 24/7')}
              desc={t(
                'Always online, answering every customer with speed and consistency.',
                'Siempre disponible, respondiendo a cada cliente con rapidez y consistencia.'
              )}
            />
            <Feature
              icon={Zap}
              title={t('Natural Conversations', 'Conversaciones Naturales')}
              desc={t(
                'Voices so human-like your callers can’t tell the difference.',
                'Voces tan realistas que los clientes no notarán la diferencia.'
              )}
            />
            <Feature
              icon={Shield}
              title={t('Secure & Compliant', 'Seguro y Cumple Normativas')}
              desc={t(
                'SOC2-ready and GDPR compliant by design.',
                'Preparado para SOC2 y cumple con GDPR por diseño.'
              )}
            />
          </div>
        </div>
      </section>
    </div>
  );
}
