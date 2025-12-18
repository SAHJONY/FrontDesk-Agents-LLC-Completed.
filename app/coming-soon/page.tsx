import WaitlistForm from '@/components/WaitlistForm'

export default function ComingSoon() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#000814] text-white p-6">
      <div className="max-w-2xl text-center">
        <h1 className="text-5xl font-black mb-4 uppercase italic bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent tracking-tighter">
          FrontDesk Agents LLC
        </h1>
        <p className="text-lg text-slate-400 font-light mb-8 uppercase tracking-widest">
          AI-Powered Receptionists for Professional Services
        </p>
        
        <WaitlistForm />
        
        <p className="mt-12 text-[10px] text-slate-600 uppercase tracking-[0.2em]">
          Restricted access. Currently onboarding the first 25 pioneers.
        </p>
      </div>
    </div>
  )
}
