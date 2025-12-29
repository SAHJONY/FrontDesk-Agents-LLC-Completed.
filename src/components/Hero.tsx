import React from 'react';
import { ShieldCheck, Globe, Zap } from 'lucide-react';

export const Hero = () => {
  return (
    <div className="relative pt-16 pb-20 overflow-hidden">
      {/* Background Decorative Element */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-slate-950 to-slate-950 -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Trust Badges */}
        <div className="flex justify-center gap-6 mb-8">
          <div className="flex items-center gap-2 text-slate-400 text-xs font-semibold uppercase tracking-widest">
            <ShieldCheck className="w-4 h-4 text-blue-500" /> HIPAA Compliant
          </div>
          <div className="flex items-center gap-2 text-slate-400 text-xs font-semibold uppercase tracking-widest">
            <Globe className="w-4 h-4 text-blue-500" /> Global Node Ready
          </div>
        </div>

        {/* Main Value Prop */}
        <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 leading-tight">
          Your Autonomous <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">Sales Fleet</span> Is Here.
        </h1>
        
        <p className="text-lg md:text-xl text-slate-400 max-w-3xl mx-auto mb-10 leading-relaxed">
          The only Sovereign Global Financial Hub that deploys an unlimited AI voice fleet to answer, qualify, and close sales in any market—as a local platform.
        </p>

        {/* CTA Section */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-16">
          <button className="px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold text-lg transition-all shadow-lg shadow-blue-600/25">
            Activate Elite Hub ($1,499)
          </button>
          <button className="px-8 py-4 bg-slate-900 border border-slate-700 hover:border-slate-500 text-white rounded-xl font-bold text-lg transition-all">
            View Regional Pricing
          </button>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-8 border-y border-slate-800/50">
          <div>
            <div className="text-2xl font-bold text-white">0.0s</div>
            <div className="text-slate-500 text-xs uppercase">Response Latency</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-white">100%</div>
            <div className="text-slate-500 text-xs uppercase">Call Recording</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-white">HIPAA</div>
            <div className="text-slate-500 text-xs uppercase">Data Security</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-white">Unlimited</div>
            <div className="text-slate-500 text-xs uppercase">Elite Minutes</div>
          </div>
        </div>
      </div>
    </div>
  );
};
