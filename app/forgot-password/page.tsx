// app/forgot-password/page.tsx
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Recuperar contraseña | FrontDesk Agents",
};

export default function ForgotPasswordPage() {
  return (
    <main className="min-h-screen w-full bg-slate-950 text-slate-50 px-4 py-10 lg:px-8">
      <section className="mx-auto max-w-md space-y-8">
        <header className="space-y-2 text-center">
          <p className="text-xs font-semibold tracking-[0.3em] text-sky-400 uppercase">
            Seguridad
          </p>
          <h1 className="text-2xl font-semibold">Recuperar contraseña</h1>
          <p className="text-sm text-slate-400">
            Te enviaremos un enlace seguro para restablecer tu acceso.
          </p>
        </header>

        <form className="space-y-4 rounded-xl border border-slate-800 bg-slate-900/60 p-6">
          <div className="space-y-1">
            <label className="text-xs font-medium text-slate-300">
              Email de tu cuenta
            </label>
            <input
              type="email"
              className="w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-sm outline-none focus:border-sky-400"
              placeholder="you@clinic.com"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-md bg-sky-400 px-3 py-2 text-sm font-semibold text-slate-950 hover:bg-sky-300"
          >
            Enviar enlace de recuperación
          </button>
        </form>

        <p className="text-center text-xs text-slate-500">
          <Link href="/login" className="text-sky-400 hover:text-sky-300">
            Volver al login
          </Link>
        </p>
      </section>
    </main>
  );
}
