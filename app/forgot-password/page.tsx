export default function ForgotPassword() {
  return (
    <div className="flex items-center justify-center min-h-screen text-center">
      <div className="titan-card w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">RECOVER ACCESS</h2>
        <p className="text-slate-500 text-sm mb-8">Enter your email to receive a secure recovery key.</p>
        <input placeholder="Email Address" className="w-full bg-slate-900 border border-white/5 p-4 rounded-xl mb-4" />
        <button className="w-full border border-brand-cyan text-brand-cyan py-4 rounded-xl font-bold uppercase">Send Reset Link</button>
      </div>
    </div>
  );
}
