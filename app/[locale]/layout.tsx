import './globals.css';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ 
  children, 
  params 
}: { 
  children: React.ReactNode, 
  params: { locale: string } 
}) {
  return (
    <html lang={params.locale || 'en'}>
      <body className={`${inter.className} bg-[#010204] text-white antialiased`}>
        
        {/* GLOBAL STATUS TICKER - THE PLANETARY HEARTBEAT */}
        <div className="fixed top-0 left-0 right-0 z-[100] h-9 bg-black/80 backdrop-blur-md border-b border-cyan-500/20 flex items-center overflow-hidden">
          <div className="relative flex overflow-x-hidden">
            <div className="flex gap-12 animate-marquee whitespace-nowrap text-[9px] font-black uppercase tracking-[0.4em] text-cyan-500/80 px-4">
              <span>Node NYC: Optimal</span>
              <span>Node LDN: Surge Detected</span>
              <span>Node TYO: Processing</span>
              <span>Node DXB: Secure</span>
              <span>Node SYD: Idle</span>
              <span>Node GRU: Optimal</span>
              <span>Node HKG: Active</span>
              <span>Node BER: Filtering</span>
            </div>

            {/* Mirror div to create seamless loop */}
            <div className="absolute top-0 flex gap-12 animate-marquee2 whitespace-nowrap text-[9px] font-black uppercase tracking-[0.4em] text-cyan-500/80 px-4">
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
        </div>

        {/* Padding-top added to prevent content from hiding under the fixed ticker */}
        <div className="pt-9">
          {children}
        </div>

      </body>
    </html>
  );
}
