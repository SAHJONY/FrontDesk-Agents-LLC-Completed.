"use client";

import Link from "next/link";
import { useLang } from "./LangProvider";

export default function BackToHome() {
  const { lang } = useLang();
  const isEs = lang === "es";

  return (
    <div className="mb-4">
      <Link
        href="/"
        className="inline-flex items-center gap-1 rounded-md border border-slate-600 px-3 py-1.5 text-xs font-medium text-slate-100 hover:border-slate-300 hover:bg-slate-900/60 transition"
      >
        <span>←</span>
        <span>{isEs ? "Volver al inicio" : "Back to home"}</span>
      </Link>
    </div>
  );
}
