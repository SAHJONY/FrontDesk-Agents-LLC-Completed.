import "./globals.css";

export const metadata = {
  title: "FrontDesk Agents – Command Center",
  description:
    "AI Receptionist and Command Center for calls, inbox, and analytics."
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>
        {children}
      </body>
    </html>
  );
}
