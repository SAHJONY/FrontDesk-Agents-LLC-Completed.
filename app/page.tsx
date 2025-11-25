import React from "react";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="page-shell">
      <div className="page-shell-inner">
        <h1 className="page-title">FrontDesk Agents – Command Center</h1>
        <p className="page-subtitle">
          La plataforma ya está LIVE en producción. Aquí monitoreamos llamadas,
          leads e inbox en tiempo real.
        </p>

        <div style={{ marginTop: 24, display: "flex", gap: 12, flexWrap: "wrap" }}>
          <Link href="/dashboard" className="button-primary">
            Ir al Dashboard
          </Link>
          <Link href="/setup" className="text-link">
            Configurar cuenta →
          </Link>
        </div>

        <p className="microcopy" style={{ marginTop: 16 }}>
          Versión demo interna. Conecta números, Airtable y correos cuando estés
          listo.
        </p>
      </div>
    </div>
  );
}
