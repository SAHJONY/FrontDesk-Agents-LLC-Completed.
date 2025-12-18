'use client';

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-[#000814] flex items-center justify-center px-6">
      <div className="max-w-md w-full bg-slate-900 border border-white/10 p-10 rounded-[32px] text-center">
        <h1 className="text-2xl font-black text-white mb-4 uppercase italic">Client Access</h1>
        <p className="text-gray-400 mb-8 text-sm">El acceso al dashboard está restringido a los primeros 25 pioneros aprobados.</p>
        <div className="space-y-4">
          <button className="w-full py-4 bg-white text-black font-black rounded-2xl uppercase tracking-widest text-xs">
            Próximamente: Login con Magic Link
          </button>
          <p className="text-[10px] text-gray-600 uppercase">Verifica tu email para el acceso directo.</p>
        </div>
      </div>
    </div>
  );
}
