import "./globals.css";
import type { ReactNode } from "react";

export const metadata = {
  title: "FrontDesk Agents – Command Center",
  description: "Plataforma de AI Receptionist y Command Center."
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
