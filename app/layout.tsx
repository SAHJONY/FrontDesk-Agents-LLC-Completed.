// app/layout.tsx
import "./globals.css";
import type { ReactNode } from "react";

export const metadata = {
  title: "FrontDesk Agents – Command Center",
  description:
    "FrontDesk Agents – AI Receptionist & Command Center para llamadas, inbox y analytics en tiempo real.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es">
      <body className="min-h-screen bg-slate-950 text-slate-50 antialiased">
        {children}
      </body>
    </html>
  );
}
