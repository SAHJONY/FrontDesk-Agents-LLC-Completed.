import { AuthGuard } from '@/components/AuthGuard';

export default function OwnerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard requiredRole="OWNER">
      {children}
    </AuthGuard>
  );
}
