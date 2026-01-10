'use client';

import Image from 'next/image';

export default function DemoPage() {
  return (
    <div className="flex items-center justify-center min-h-screen px-4 relative">
      {/* Background Image */}
      <div className="absolute inset-0 -z-10 opacity-20">
        <Image 
          src="/images/premium/demo-hero.jpg" 
          alt="AI Agent Interface" 
          fill 
          className="object-cover"
        />
      </div>
      <div className="titan-card w-full max-w-2xl backdrop-blur-sm bg-black/80">
        <h2 className="text-3xl font-black italic mb-2 uppercase">Request Fleet Demo</h2>
        <p className="text-slate-500 mb-8">Experience the Elite Tier autonomous response first-hand.</p>
        
        <form className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <input placeholder="First Name" className="bg-slate-900 border border-white/5 p-4 rounded-xl outline-none focus:border-brand-cyan" />
            <input placeholder="Last Name" className="bg-slate-900 border border-white/5 p-4 rounded-xl outline-none focus:border-brand-cyan" />
          </div>
          <input placeholder="Business Phone Number" className="w-full bg-slate-900 border border-white/5 p-4 rounded-xl outline-none focus:border-brand-cyan" />
          <button className="w-full bg-brand-cyan text-black py-4 rounded-xl font-bold uppercase tracking-widest">
            Initialize Demo Call
          </button>
        </form>
      </div>
    </div>
  );
}
