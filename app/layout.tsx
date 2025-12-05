import React from "react";
import { AppShell } from "@/core/ui/AppShell";
import { OwnerGuard } from "@/core/auth/OwnerGuard";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <OwnerGuard>
      <AppShell>{children}</AppShell>
    </OwnerGuard>
  );
}
