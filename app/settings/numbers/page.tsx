// app/settings/numbers/page.tsx
import React from "react";
import SidebarLayout from "@/app/components/SidebarLayout";

export default function NumbersSettingsPage() {
  return (
    <SidebarLayout title="Phone numbers">
      <div className="space-y-4 text-sm text-slate-200">
        <p>
          Aquí vas a gestionar los números de teléfono conectados a FrontDesk
          Agents (Bland.ai, Twilio, etc.).
        </p>
        <p>
          Esta pantalla es un stub visual temporal. La lógica real de
          aprovisionamiento, compra y asignación de números se conectará en el
          siguiente paso del SaaS Kernel v2.
        </p>
      </div>
    </SidebarLayout>
  );
}
