'use client';

import Image from 'next/image';

export default function AnalyticsEngine() {
  return (
    <div className="p-8 max-w-7xl mx-auto relative z-10">
      <div className="mb-12 relative h-48 rounded-xl overflow-hidden">
        <Image 
          src="/images/premium/client-dashboard.jpg" 
          alt="Analytics Dashboard" 
          fill 
          className="object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 to-transparent flex items-center">
          <h1 className="text-4xl font-black italic ml-8 text-white">NEURAL ANALYTICS</h1>
        </div>
      </div>
      
      <div className="titan-card mb-8 h-64 flex flex-col justify-end">
        <div className="flex items-end gap-2 h-full">
          {[40, 70, 45, 90, 65, 80, 95].map((h, i) => (
            <div 
              key={i} 
              style={{ height: `${h}%` }} 
              className="flex-1 bg-gradient-to-t from-brand-cyan to-transparent opacity-50 rounded-t-sm hover:opacity-100 transition-all cursor-pointer"
            />
          ))}
        </div>
        <p className="text-brand-slate text-[10px] mt-4 uppercase font-bold tracking-widest">7-Day Conversion Velocity</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="titan-card">
          <h4 className="text-slate-400 text-xs font-bold mb-4">Top Performing Scripts</h4>
          <p className="text-white font-bold">"Western-Market-Outbound-A" <span className="text-brand-cyan">(12.4%)</span></p>
        </div>
        <div className="titan-card">
          <h4 className="text-slate-400 text-xs font-bold mb-4">Average Call Length</h4>
          <p className="text-white font-bold">4m 22s <span className="text-slate-600 font-normal">(-12s vs last week)</span></p>
        </div>
      </div>
    </div>
  );
}
