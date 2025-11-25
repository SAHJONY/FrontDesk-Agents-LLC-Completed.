"use client";

import React, { useState } from "react";

export default function AISetupForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsSubmitting(true);
    // Placeholder: Here later we call API / onboarding.
    setTimeout(() => setIsSubmitting(false), 800);
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-row">
        <label>Business Name</label>
        <input
          className="form-input"
          name="businessName"
          placeholder="FrontDesk Agents LLC"
          required
        />
      </div>

      <div className="form-row">
        <label>Website</label>
        <input
          className="form-input"
          name="website"
          placeholder="https://frontdeskagents.com"
        />
      </div>

      <div className="form-row">
        <label>Receptionist Name</label>
        <input
          className="form-input"
          name="receptionistName"
          placeholder="SARA, ALEX, LEXI…"
          required
        />
      </div>

      <div className="form-row">
        <label>Main Purpose</label>
        <input
          className="form-input"
          name="mainPurpose"
          placeholder="Agendar citas, capturar leads, soporte, etc."
          required
        />
      </div>

      <button type="submit" className="button-primary" disabled={isSubmitting}>
        {isSubmitting ? "Guardando…" : "Continue"}
      </button>

      <p className="microcopy">
        Esta pantalla es solo la configuración inicial. Los detalles avanzados
        (scripts, horarios, flujos) se agregarán en el Command Center.
      </p>
    </form>
  );
}
