import React from "react";
import Link from "next/link";
import DashboardCard from "../components/DashboardCard";

export default function DashboardPage() {
  return (
    <div className="page-shell">
      <div className="page-shell-inner">
        <div className="badge">
          <span>● LIVE</span>
          <span>FrontDesk Agents · Command Center</span>
        </div>

        <header style={{ marginBottom: 16 }}>
          <h1 className="page-title">Dashboard en tiempo real</h1>
          <p className="page-subtitle">
            Aquí ves las métricas clave de tus recepcionistas de IA: llamadas,
            leads y mensajes atendidos en las últimas 24 horas.
          </p>
        </header>

        {/* Top stats */}
        <section className="dashboard-grid">
          <DashboardCard
            title="Llamadas de hoy"
            value="0"
            helper="Conectadas / atendidas por tus agentes de IA."
            badge="Demo"
            tone="green"
          />
          <DashboardCard
            title="Leads nuevos"
            value="0"
            helper="Leads capturados en las últimas 24 horas."
            badge="Embudo"
            tone="blue"
          />
          <DashboardCard
            title="Mensajes pendientes"
            value="0"
            helper="WhatsApp / SMS / emails por responder."
            badge="Inbox"
            tone="gray"
          />
        </section>

        {/* Main row */}
        <section className="dashboard-main-row">
          <div className="card">
            <div className="card-header">
              <div className="card-title">Actividad reciente</div>
              <span className="card-pill">DEMO</span>
            </div>
            <p className="card-footer">
              Aquí aparecerá la línea de tiempo de llamadas, mensajes y correos
              gestionados por tus agentes. Una vez conectemos Bland/Twilio y
              Airtable, verás todo en tiempo real.
            </p>
            <p className="microcopy" style={{ marginTop: 10 }}>
              Próximo upgrade: filtros por agente, canal (voz / WhatsApp / email)
              y resultado (venta, cita, soporte).
            </p>
          </div>

          <div className="card">
            <div className="card-header">
              <div className="card-title">Próximos pasos</div>
            </div>
            <ol className="summary-list">
              <li>1. Conectar números telefónicos (Bland.ai / Twilio).</li>
              <li>2. Conectar el CRM o Airtable donde quieres los leads.</li>
              <li>3. Configurar scripts y recepcionistas en la página de Setup.</li>
              <li>4. Revisar métricas diarias de llamadas y conversiones.</li>
            </ol>
            <p className="microcopy">
              ¿Listo para configurar?{" "}
              <Link href="/setup" className="text-link">
                Ir a Setup de recepcionista →
              </Link>
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
