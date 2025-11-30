"use client";

import Link from "next/link";

type BackToHomeButtonProps = {
  href?: string;
  label?: string;
};

export default function BackToHomeButton({
  href = "/",
  label = "← Back to Home",
}: BackToHomeButtonProps) {
  return (
    <div className="mb-4">
      <Link
        href={href}
        className="inline-flex items-center gap-1 rounded-md border border-slate-600 px-3 py-1.5 text-xs font-medium text-slate-100 hover:bg-slate-800"
      >
        {label}
      </Link>
    </div>
  );
}
