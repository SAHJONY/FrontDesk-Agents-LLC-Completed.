"use client";

import Link from "next/link";
import { useLang } from "../LangProvider";

export default function BackToHome() {
  const { lang } = useLang();
  const isEs = lang === "es";

  return (
    <div className="mb-4">
      <Link
        href="/"
        className="inline-flex items-center gap-1 rounded-md border border-slate-600 px-3 py-1.5 text-xs font-medium"
      >
        ← {isEs ? "Volver al inicio" : "Back to Home"}
      </Link>
    </div>
  );
}
