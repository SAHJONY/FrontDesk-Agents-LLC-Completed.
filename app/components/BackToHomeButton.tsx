// app/components/BackToHome.tsx
"use client";

import Link from "next/link";

export default function BackToHome() {
  return (
    <div className="mb-4">
      <Link
        href="/"
        className="inline-flex items-center gap-1 rounded-md border border-slate-600 px-3 py-1.5 text-xs font-medium text-slate-900 hover:bg-slate-50 dark:border-slate-400 dark:text-slate-50 dark:hover:bg-slate-800"
      >
        ← Back to homepage
      </Link>
    </div>
  );
}
