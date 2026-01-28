import Link from 'next/link';
import { signOut } from '@/app/auth/actions';
import { createClient } from '@/utils/supabase/server';

export const Navbar = async () => {
  // Check if user is logged in
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

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
          
          {user ? (
            /* Show Logout if logged in */
            <form action={signOut}>
              <button 
                type="submit" 
                className="border border-red-500/20 text-red-400 px-4 py-2 rounded hover:bg-red-500 hover:text-white transition-all"
              >
                Logout
              </button>
            </form>
          ) : (
            /* Show Login if guest */
            <Link 
              href="/login" 
              className="bg-brand-cyan text-black px-4 py-2 rounded hover:bg-white transition-all"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};
