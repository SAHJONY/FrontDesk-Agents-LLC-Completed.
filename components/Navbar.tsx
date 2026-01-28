import Link from 'next/link';
import { signOut } from '@/app/auth/actions'; // Make sure this path matches where you saved the action

export const Navbar = () => {
  return (
    <nav className="border-b border-white/5 bg-black/50 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link href="/" className="text-xl font-black italic tracking-tighter">
          SOVEREIGN <span className="text-brand-cyan font-mono text-xs font-normal">HUB</span>
        </Link>
        
        <div className="flex items-center gap-8 text-xs font-bold uppercase tracking-widest text-brand-slate">
          <Link href="/dashboard" className="hover:text-white">Dashboard</Link>
          <Link href="/pricing" className="hover:text-white">Pricing</Link>
          <Link href="/owner" className="hover:text-brand-cyan">Owner Control</Link>
          
          {/* Logout Form Action */}
          <form action={signOut}>
            <button 
              type="submit" 
              className="border border-white/10 px-4 py-2 rounded hover:bg-white hover:text-black transition-all"
            >
              Logout
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
};
