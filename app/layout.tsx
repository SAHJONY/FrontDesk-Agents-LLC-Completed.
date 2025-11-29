// app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

// Proveedores de tema e idioma (client components)
import ThemeProvider from "./components/ThemeProvider";
import LangProvider from "./components/LangProvider";

// Layout visual
import SiteHeader from "./components/SiteHeader";
import SiteFooter from "./components/SiteFooter";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FrontDesk Agents – AI Receptionist Command Center",
  description:
    "AI phone & WhatsApp receptionists that convert every call, message and email into booked revenue in under 60 seconds. 24/7, multilingual, audit-ready.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body
        className={`${inter.className} bg-slate-950 text-slate-50 antialiased`}
      >
        <ThemeProvider>
          <LangProvider>
            <div className="min-h-screen flex flex-col bg-slate-950 text-slate-50">
              {/* Barra superior con logo, navegación, selector idioma, toggle light/dark */}
              <SiteHeader />

              {/* Contenido principal */}
              <main className="flex-1">{children}</main>

              {/* Footer global con links legales, contacto, etc. */}
              <SiteFooter />
            </div>
          </LangProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
