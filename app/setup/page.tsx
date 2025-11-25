import React from "react";
import Link from "next/link";
import AISetupForm from "../components/AISetupForm";

export default function SetupPage() {
  return (
    <div className="page-shell">
      <div className="page-shell-inner">
        <header>
          <span className="badge">
            <span>STEP 1</span>
            <span>Onboarding rápido</span>
          </span>
          <h1 className="page-title">Set Up Your AI Receptionist</h1>
          <p className="page-subtitle">
            Configura un recepcionista de IA 24/7 para tu negocio online. En
            menos de 2 minutos dejamos tu cuenta lista para conectar números y
            CRM.
          </p>
        </header>

        <section className="setup-layout">
          <div className="setup-panel">
            <div className="setup-panel-inner">
              <AISetupForm />
            </div>
          </div>

          <div className="setup-panel">
            <div className="setup-panel-inner">
              <h2 className="summary-card-title">¿Qué va a hacer tu recepcionista?</h2>
              <p className="microcopy">
                Este panel controlará llamadas, WhatsApp, SMS y correos. La IA
                puede:
              </p>
              <ul className="summary-list">
                <li>• Contestar llamadas en inglés y español.</li>
                <li>• Calificar leads y enviarlos a tu CRM o Airtable.</li>
                <li>• Agendar citas en tu calendario.</li>
                <li>• Responder preguntas frecuentes de tus clientes.</li>
              </ul>
              <p className="microcopy" style={{ marginTop: 12 }}>
                Cuando termines este paso, continúa al{" "}
                <Link href="/dashboard" className="text-link">
                  Command Center →
                </Link>
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
