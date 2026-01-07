import { ReactNode } from 'react';

export default function LoginLayout({ children }: { children: ReactNode }) {
  // Isolated layout for login page - no navigation, no sidebar
  return <>{children}</>;
}
