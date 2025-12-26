// ✅ UPDATED: Points to the root app folder regardless of where this layout sits
import "@/app/globals.css"; 

import { Inter } from 'next/font/google';
import LanguageToggle from '@/components/navigation/LanguageToggle';

const inter = Inter({ subsets: ['latin'] });

export default async function RootLayout({ 
  children, 
  params 
}: { 
  children: React.ReactNode, 
  params: Promise<{ locale: string }> 
}) {
  const { locale } = await params;

  return (
    <html lang={locale || 'en'}>
      <body className={`${inter.className} bg-[#010204] text-white antialiased`}>
        {/* TOP STATUS BAR */}
        <div className="fixed top-0 left-0 right-0 z-[100] h-9 bg-black/80 backdrop-blur-md border-b border-cyan-500/20 flex items-center justify-between px-4">
          <div className="flex gap-12 text-[9px] font-black uppercase tracking-[0.4em] text-cyan-500/80 italic">
            <span>NETWORK SECURE</span>
            <span>SYSTEM OPTIMAL</span>
          </div>
          <LanguageToggle />
        </div>

        {/* PAGE CONTENT */}
        <div className="pt-9">
          {children}
        </div>
      </body>
    </html>
  );
}
