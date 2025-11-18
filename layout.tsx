export const metadata = {
  title: "FrontDesk Agents",
  description: "AI-powered virtual receptionists for enterprise businesses.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          backgroundColor: "#020617", // dark background
          color: "#E2E8F0", // light text
          fontFamily: "Inter, sans-serif",
        }}
      >
        {children}
      </body>
    </html>
  );
}
