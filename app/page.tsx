'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  PhoneIcon, 
  SparklesIcon, 
  ClockIcon,
  ShieldCheckIcon,
  GlobeAltIcon,
  ChartBarIcon,
  ArrowRightIcon,
  PlayCircleIcon,
  ChatBubbleLeftRightIcon
} from '@heroicons/react/24/outline';

// ... (El resto de las funciones auxiliares se mantienen sin cambios)

export default function HomePage() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // ... (Definición de features y stats se mantienen sin cambios)

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a1929] via-[#0f1e2e] to-[#000814]">
      {/* Navigation, Hero, Stats Sections se mantienen sin cambios */}

      {/* Corporate Office Section (Donde ocurrió el error) */}
      <section className="relative py-20 border-t border-white/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/10">
              <img
                src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=90&fit=crop"
                alt="Modern corporate headquarters"
                className="w-full aspect-[21/9] object-cover"
              />
              {/* CORRECCIÓN DE SINTAXIS EN LÍNEA 8: Se elimina el comentario de JS puro */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" /> 
              
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
                <h2 className="text-5xl font-bold text-white mb-6">Global Enterprise Solutions</h2>
                <p className="text-xl text-gray-200 mb-8 max-w-2xl">
                  Delivering world-class AI communication platforms to businesses across 50+ countries
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Teaser Section se mantiene sin cambios */}
      
      {/* Final CTA Section (Donde ocurrió el error en el final del bloque) */}
      <section className="relative py-32">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-purple-500/10" />
        
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/10 mb-8">
              <img
                src="https://images.unsplash.com/photo-1568992688065-536aad8a12f6?w=1200&q=90&fit=crop"
                alt="Professional executive"
                className="w-full aspect-video object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              
              {/* CORRECCIÓN DE SINTAXIS: Se cierra correctamente el div aquí, y se eliminan comentarios JS */}
              <div className="absolute bottom-0 left-0 right-0 p-8 text-center">
                <h2 className="text-4xl font-bold text-white mb-4">Ready to Transform Your Operations?</h2>
                <p className="text-xl text-gray-300 mb-6">Schedule your executive consultation to see measurable ROI in 30 days.</p>
                <Link
                  href="/demo"
                  className="inline-flex items-center justify-center gap-2 px-10 py-4 bg-green-600 rounded-lg text-white font-semibold shadow-xl hover:shadow-2xl hover:shadow-green-500/50 transition-all duration-300"
                >
                  <PlayCircleIcon className="w-5 h-5" />
                  Request Consultation Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer se mantiene sin cambios */}
    </div>
  );
}
