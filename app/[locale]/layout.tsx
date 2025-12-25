import './globals.css';
import { Inter } from 'next/font/google';
import LanguageToggle from '@/components/navigation/LanguageToggle';
import { Activity } from 'lucide-react';

const inter = Inter({ subsets: ['latin'] });

export default async function RootLayout({ 
  children, 
  params 
}: { 
  children: React.ReactNode, 
  params: Promise<{ locale: string }> 
}) {
  // Await params in Next.js 15
  const { locale } = await params;

  return (
    <html lang={locale || 'en'}>
      <body className={`${inter.className} bg-[#010204] text-white antialiased`}>
        
        {/* GLOBAL COMMAND BAR - FIXED ATTACHMENT */}
        <div className="fixed top-0 left-0 right-0 z-[100] h-9 bg-black/80 backdrop-blur-md border-b border-cyan-500/20 flex items-center justify-between overflow-hidden px-4">
          
          {/* LEFT/CENTER: PLANETARY HEARTBEAT (MARQUEE) */}
          <div className="relative flex overflow-x-hidden flex-1 group">
            <div className="flex gap-12 animate-marquee whitespace-nowrap text-[9px] font-black uppercase tracking-[0.4em] text-cyan-500/80">
              <span>Node NYC: Optimal</span>
              <span>Node LDN: Surge Detected</span>
              <span>Node TYO: Processing</span>
              <span>Node DXB: Secure</span>
              <span>Node SYD: Idle</span>
              <span>Node GRU: Optimal</span>
              <span>Node HKG: Active</span>
              <span>Node BER: Filtering</span>
            </div>
            {/* Mirror div for seamless loop */}
            <div className="absolute top-0 flex gap-12 animate-marquee2 whitespace-nowrap text-[9px] font-black uppercase tracking-[0.4em] text-cyan-500/80">
              <span>Node NYC: Optimal</span>
              <span>Node LDN: Surge Detected</span>
              <span>Node TYO: Processing</span>
              <span>Node DXB: Secure</span>
              <span>Node SYD: Idle</span>
              <span>Node GRU: Optimal</span>
              <span>Node HKG: Active</span>
              <span>Node BER: Filtering</span>
            </div>
          </div>

          {/* RIGHT: LIVE TELEMETRY & LANGUAGE COMMANDS */}
          <div className="flex items-center gap-6 pl-8 bg-black/40 backdrop-blur-xl relative z-10">
            
            {/* NETWORK LATENCY INDICATOR */}
            <div className="hidden md:flex items-center gap-2 border-l border-white/10 pl-6">
              <div className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-500"></span>
              </div>
              <span className="text-[8px] font-black uppercase tracking-widest text-slate-500">
                Lat: <span className="text-white font-mono">14ms</span>
              </span>
            </div>

            <div className="h-4 w-[1px] bg-white/10" />

            {/* LANGUAGE SELECTOR */}
            <LanguageToggle />
          </div>
        </div>

        {/* MAIN CONTENT BUFFER */}
        <div className="pt-9">
          {children}
        </div>
      </body>
    </html>
  );
}
