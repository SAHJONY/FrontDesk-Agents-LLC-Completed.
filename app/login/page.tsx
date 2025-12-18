'use client';

import { useState } from 'react';
import { createBrowserClient } from '@supabase/ssr';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const handleMagicLink = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        // This is where you go after clicking the email link
        emailRedirectTo: `${window.location.origin}/admin/waitlist`,
      },
    });

    if (error) {
      alert(error.message);
    } else {
      alert('¡Revisa tu email! Te hemos enviado un link de acceso.');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#000814] flex items-center justify-center px-6">
      <div className="max-w-md w-full bg-slate-900 border border-white/10 p-10 rounded-[32px] text-center">
        <h1 className="text-2xl font-black text-white mb-4 uppercase italic">Client Access</h1>
        <p className="text-gray-400 mb-8 text-sm italic">
          El acceso al dashboard está restringido a los primeros 25 pioneros aprobados.
        </p>
        
        <form onSubmit={handleMagicLink} className="space-y-4">
          <input 
            type="email"
            placeholder="TU EMAIL"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full py-4 bg-slate-800 border border-white/5 rounded-2xl text-white text-center text-xs uppercase tracking-widest focus:outline-none focus:border-white/20"
          />
          
          <button 
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-white text-black font-black rounded-2xl uppercase tracking-widest text-xs hover:bg-gray-200 transition-colors disabled:opacity-50"
          >
            {loading ? 'Enviando...' : 'Entrar con Magic Link'}
          </button>
          
          <p className="text-[10px] text-gray-600 uppercase">
            Verifica tu email para el acceso directo.
          </p>
        </form>
      </div>
    </div>
  );
}
