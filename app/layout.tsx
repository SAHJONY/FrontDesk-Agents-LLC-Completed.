import "./globals.css";
import type { ReactNode } from "react";

export const metadata = {
  title: "FrontDesk Agents – Command Center",
  description:
    "AI receptionists and command center to manage calls, leads, inbox and automations in real time.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es">
      <body className="app-body">
        <div className="app-shell">
          {children}
        </div>
      </body>
    </html>
  );
}
