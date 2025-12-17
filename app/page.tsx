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

export default function HomePage() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a1929] via-[#0f1e2e] to-[#000814]">
      
      {/* --- Sección Corporate Office --- */}
      <section className="relative py-20 border-t border-white/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/10">
              <img
                src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=90&fit=crop"
                alt="Modern corporate headquarters"
                className="w-full aspect-[21/9] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" /> 
              
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Global Enterprise Solutions</h2>
                <p className="text-xl text-gray-200 mb-8 max-w-2xl">
                  Delivering world-class AI communication platforms to businesses across 50+ countries.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- Sección Final CTA --- */}
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
              
              <div className="absolute bottom-0 left-0 right-0 p-8 text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to Transform Your Operations?</h2>
                <p className="text-lg md:text-xl text-gray-300 mb-6">Schedule your executive consultation to see measurable ROI in 30 days.</p>
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

      {/* --- Footer (Simple) --- */}
      <footer className="py-10 text-center text-gray-500 border-t border-white/5">
        <p>© 2025 FrontDesk Agents LLC. All rights reserved.</p>
      </footer>
    </div>
  );
}
