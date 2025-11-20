export const metadata = {
  title: "Front Desk Agents",
  description: "Live deployment confirmation page",
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
          backgroundColor: "#f9fafb",
          color: "#111",
          fontFamily: "sans-serif",
        }}
      >
        {children}
      </body>
    </html>
  );
}
