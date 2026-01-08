import { ReactNode } from 'react';

export default function LoginLayout({ children }: { children: ReactNode }) {
  // Isolated layout for login page - no navigation, no sidebar
  return (
    <div className="login-page-wrapper">
      <style jsx global>{`
        /* Hide any sidebar or navigation that might be injected */
        .login-page-wrapper ~ nav,
        .login-page-wrapper ~ div nav,
        body > div > div.flex.min-h-screen > nav {
          display: none !important;
        }
        
        /* Ensure login page takes full width */
        .login-page-wrapper {
          width: 100vw !important;
          min-height: 100vh !important;
        }
        
        /* Hide any flex containers that might wrap the page */
        body > div > div.flex.min-h-screen {
          display: block !important;
        }
      `}</style>
      {children}
    </div>
  );
}
