import { PLATFORM_CONFIG } from '@/lib/config/platform';
import { HeroSection } from '@/components/marketing/Hero';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans antialiased">
      <nav className="flex justify-between items-center px-12 py-8 bg-white border-b border-slate-100">
        <span className="text-2xl font-black tracking-tighter text-slate-900">
          {PLATFORM_CONFIG.name}
        </span>
        <div className="flex items-center gap-8">
          <span className="text-slate-400 font-medium">{PLATFORM_CONFIG.identity}</span>
          <button className="bg-slate-900 text-white px-6 py-3 rounded-xl font-bold hover:bg-slate-800 transition">
            Deploy Infrastructure
          </button>
        </div>
      </nav>

      <main>
        <div className="max-w-6xl mx-auto px-6 py-24 text-center">
          <h1 className="text-7xl font-black text-slate-900 tracking-tight leading-none mb-8">
            The {PLATFORM_CONFIG.identity}.
          </h1>
          <p className="text-2xl text-slate-500 max-w-3xl mx-auto mb-12">
            Standardize intake, qualification, and routing on a production-grade system. 
            The primary operating layer for revenue, support, and growth.
          </p>
          <div className="inline-flex items-center gap-4 bg-white p-2 rounded-2xl border border-slate-200 shadow-xl">
            <span className="px-6 font-bold text-slate-900 underline decoration-blue-500 decoration-4 underline-offset-4">
              Fixed Operating Fee: ${PLATFORM_CONFIG.pricing.anchor}/mo
            </span>
            <button className="bg-blue-600 text-white px-8 py-4 rounded-xl font-black text-lg hover:bg-blue-700 shadow-lg shadow-blue-500/20 transition">
              Establish Your Front Office
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
