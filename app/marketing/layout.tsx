// app/marketing/layout.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FrontDesk Agents — Global Revenue Workforce",
  description:
    "A Fortune-500 grade AI Receptionist & Revenue Workforce for multi-location businesses. Capture every lead, book appointments, and increase revenue—24/7.",
  robots: { index: true, follow: true },
};

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      {children}
    </div>
  );
}
