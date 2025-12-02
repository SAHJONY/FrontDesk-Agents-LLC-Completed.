// app/login/page.tsx
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Login | FrontDesk Agents",
};

export default function LoginPage() {
  return (
    <main className="min-h-screen w-full bg-slate-950 text-slate-50 px-4 py-10 lg:px-8">
      <section className="mx-auto max-w-md space-y-8">
        <header className="space-y-2 text-center">
          <p className="text-xs font-semibold tracking-[0.3em] text-sky-400 uppercase">
            FrontDesk Agents
          </p>
          <h1 className="text-2xl font-semibold">Inicia sesión</h1>
          <p className="text-sm text-slate-400">
            Accede a tu Command Center para ver llamadas, leads y configuración.
          </p>
        </header>

        <form className="space-y-4 rounded-xl border border-slate-800 bg-slate-900/60 p-6">
          <div className="space-y-1">
            <label className="text-xs font-medium text-slate-300">
              Email
            </label>
            <input
              type="email"
              className="w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-sm outline-none focus:border-sky-400"
              placeholder="you@clinic.com"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-medium text-slate-300">
              Password
            </label>
            <input
              type="password"
              className="w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-sm outline-none focus:border-sky-400"
              placeholder="••••••••"
            />
          </div>

          <div className="flex items-center justify-between text-xs">
            <Link
              href="/forgot-password"
              className="text-sky-400 hover:text-sky-300"
            >
              ¿Olvidaste tu contraseña?
            </Link>
          </div>

          <button
            type="submit"
            className="w-full rounded-md bg-sky-400 px-3 py-2 text-sm font-semibold text-slate-950 hover:bg-sky-300"
          >
            Entrar
          </button>
        </form>

        <p className="text-center text-xs text-slate-500">
          ¿Aún no eres cliente?{" "}
          <Link href="/demo" className="text-sky-400 hover:text-sky-300">
            Agenda una demo en vivo
          </Link>
        </p>
      </section>
    </main>
  );
}
