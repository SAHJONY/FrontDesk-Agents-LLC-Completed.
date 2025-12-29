export default function LoginPage() {
  return (
    <div className="flex items-center justify-center min-h-screen px-4">
      <div className="titan-card w-full max-w-md relative z-10">
        <h2 className="text-3xl font-bold mb-2">Initialize Session</h2>
        <p className="text-slate-500 mb-8 text-sm">Enter your credentials to access the Sovereign Hub.</p>
        
        <form className="space-y-6">
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-brand-slate mb-2">
              Corporate Email
            </label>
            <input 
              type="email" 
              className="w-full bg-slate-900 border border-slate-800 rounded-xl p-4 text-white focus:border-brand-cyan outline-none transition-all"
              placeholder="name@company.com"
            />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-brand-slate mb-2">
              Security Key
            </label>
            <input 
              type="password" 
              className="w-full bg-slate-900 border border-slate-800 rounded-xl p-4 text-white focus:border-brand-cyan outline-none transition-all"
              placeholder="••••••••"
            />
          </div>
          <button 
            type="submit"
            className="w-full bg-brand-cyan text-black py-4 rounded-xl font-black uppercase tracking-tighter hover:bg-cyan-400 transition-all"
          >
            Authenticate Node
          </button>
        </form>
      </div>
    </div>
  );
}
