import { ReactNode } from 'react';

export default function LoginLayout({ children }: { children: ReactNode }) {
  // Isolated layout for login page - returns children only
  return <>{children}</>;
}
