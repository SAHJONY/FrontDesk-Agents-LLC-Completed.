export default function RootLayout({ children, params }: { children: any, params: { locale: string } }) {
  return (
    <html lang={params.locale}>
      <body className="bg-[#010204] text-white antialiased">
        {/* GLOBAL STATUS TICKER */}
        <div className="h-8 bg-cyan-500/10 border-b border-cyan-500/20 flex items-center overflow-hidden">
          <div className="flex gap-12 animate-marquee whitespace-nowrap text-[8px] font-black uppercase tracking-[0.3em] text-cyan-500/70">
            <span>Node NYC: Optimal</span>
            <span>Node LDN: Surge Detected</span>
            <span>Node TYO: Processing</span>
            <span>Node DXB: Secure</span>
            <span>Node SYD: Idle</span>
            <span>Node GRU: Optimal</span>
          </div>
        </div>
        {children}
      </body>
    </html>
  );
}
