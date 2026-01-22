"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

type Props = {
  defaultRedirect?: "admin" | "dashboard";
};

export default function LoginForm({ defaultRedirect = "admin" }: Props) {
  const router = useRouter();
  const params = useSearchParams();

  const next = params.get("next") || "";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrorMsg(null);
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          email: email.trim(),
          password,
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setErrorMsg(data?.error || "Login failed.");
        return;
      }

      // Prefer safe `next` if present, else backend redirectUrl, else fallback
      const fallback = defaultRedirect === "admin" ? "/admin" : "/dashboard";
      const safeNext =
        next && next.startsWith("/") && !next.startsWith("//") ? next : "";

      const target = safeNext || data?.redirectUrl || fallback;

      router.replace(target);
      router.refresh();
    } catch (err: any) {
      setErrorMsg(err?.message || "Login failed.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="space-y-2">
        <label className="text-xs font-medium text-slate-200">Email</label>
        <input
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-md border border-slate-800 bg-slate-950 px-3 py-2 text-sm text-slate-100 outline-none focus:border-sky-400"
          placeholder="you@company.com"
        />
      </div>

      <div className="space-y-2">
        <label className="text-xs font-medium text-slate-200">Password</label>
        <input
          type="password"
          autoComplete="current-password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full rounded-md border border-slate-800 bg-slate-950 px-3 py-2 text-sm text-slate-100 outline-none focus:border-sky-400"
          placeholder="••••••••"
        />
      </div>

      {errorMsg && (
        <div className="rounded-md border border-red-900/60 bg-red-950/40 px-3 py-2 text-xs text-red-200">
          {errorMsg}
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-md bg-sky-400 px-4 py-2 text-center text-sm font-semibold text-slate-950 hover:bg-sky-300 disabled:opacity-60"
      >
        {loading ? "Signing in..." : "Sign in"}
      </button>

      <div className="flex items-center justify-between pt-2">
        <a href="/forgot-password" className="text-xs text-slate-300 hover:text-sky-300">
          Forgot password?
        </a>

        <a href="/signup" className="text-xs text-slate-300 hover:text-sky-300">
          Create account
        </a>
      </div>

      <p className="text-[11px] text-slate-500">
        After sign-in, you will be redirected automatically.
      </p>
    </form>
  );
}
