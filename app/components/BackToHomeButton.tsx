// app/components/BackToHomeButton.tsx
"use client";

import Link from "next/link";

export default function BackToHomeButton() {
  return (
    <div className="mt-6">
      <Link
        href="/"
        className="inline-flex items-center gap-2 rounded-full border border-slate-600 bg-slate-900/70 px-4 py-2 text-xs font-medium text-slate-100 shadow-sm hover:border-cyan-400 hover:text-cyan-300 dark:bg-slate-800/80"
      >
        <span className="text-lg">←</span>
        <span>Back to Home</span>
      </Link>
    </div>
  );
}
