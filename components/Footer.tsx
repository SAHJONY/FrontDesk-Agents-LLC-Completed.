import Link from 'next/link';

export const Footer = () => {
  return (
    <footer className="border-t border-white/5 bg-black py-12 mt-20">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="col-span-2">
          <h2 className="text-xl font-black italic mb-4">FRONT DESK AGENTS LLC</h2>
          <p className="text-slate-500 text-sm max-w-sm">
            Autonomous AI Sales & Receptionist Fleet. Operating global nodes since 2025.
          </p>
        </div>
        <div>
          <h4 className="text-white text-xs font-bold uppercase mb-4">Infrastructure</h4>
          <ul className="space-y-2 text-xs text-slate-500 font-medium">
            <li><Link href="/legal/terms" className="hover:text-brand-cyan">Terms of Sovereignty</Link></li>
            <li><Link href="/legal/privacy" className="hover:text-brand-cyan">Privacy Protocol</Link></li>
            <li><Link href="/support" className="hover:text-brand-cyan">Command Support</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white text-xs font-bold uppercase mb-4">Status</h4>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-[10px] text-slate-400 font-mono">GLOBAL NODES: OPTIMAL</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
