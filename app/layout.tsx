// app/layout.tsx
// TEMPORARILY COMMENT OUT THIS IMPORT
// import TopNav from '@/components/top-nav';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {/* TEMPORARILY COMMENT OUT THE COMPONENT */}
        {/* <TopNav /> */}
        
        {/* Add a simple header instead */}
        <div className="bg-blue-600 text-white p-4">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-xl font-bold">FrontDesk Agents</h1>
          </div>
        </div>
        
        {children}
      </body>
    </html>
  );
}
