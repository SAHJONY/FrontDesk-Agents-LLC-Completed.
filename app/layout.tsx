// app/layout.tsx
import "./app/globals.css";
import type { ReactNode } from "react";

export const metadata = {
  title: "FrontDesk Agents LLC",
  description: "AI-powered front desk automation platform",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
