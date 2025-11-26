import "./globals.css";
import SystemStatusBar from "@/app/components/SystemStatusBar";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-slate-950 text-slate-50">
        {children}
        <SystemStatusBar />
      </body>
    </html>
  );
}
