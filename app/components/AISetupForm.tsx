"use client";

import React, { useState, FormEvent } from "react";

type SetupState = {
  businessName: string;
  website: string;
  receptionistName: string;
  mainPurpose: string;
};

const initialState: SetupState = {
  businessName: "",
  website: "",
  receptionistName: "",
  mainPurpose: "",
};

export default function AISetupForm() {
  const [step, setStep] = useState<1 | 2>(1);
  const [form, setForm] = useState<SetupState>(initialState);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Aquí en producción conectaríamos con Airtable / API
    console.log("AI Receptionist setup payload:", form);
    alert("Demo: configuración guardada localmente. Listo para conectar APIs.");
  };

  const containerStyle: React.CSSProperties = {
    maxWidth: 960,
    margin: "0 auto",
    padding: "32px 16px 64px",
    color: "white",
    fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
  };

  const cardStyle: React.CSSProperties = {
    background:
      "radial-gradient(circle at top left, #1f2937, #020617 55%, #000000 100%)",
    borderRadius: 24,
    padding: 24,
    border: "1px solid rgba(148,163,184,0.35)",
    boxShadow: "0 24px 60px rgba(15,23,42,0.9)",
  };

  const badgeStyle: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    padding: "4px 10px",
    borderRadius: 999,
    fontSize: 11,
    letterSpacing: 0.04,
    textTransform: "uppercase",
    background: "rgba(34,197,94,0.1)",
    border: "1px solid rgba(34,197,94,0.4)",
    color: "#4ade80",
  };

  const gridStyle: React.CSSProperties = {
    display: "grid",
    gap: 16,
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    marginTop: 24,
  };

  const labelStyle: React.CSSProperties = {
    display: "block",
    fontSize: 13,
    marginBottom: 6,
    color: "#e5e7eb",
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    borderRadius: 999,
    padding: "10px 14px",
    border: "1px solid rgba(148,163,184,0.6)",
    background: "rgba(15,23,42,0.9)",
    color: "white",
    fontSize: 14,
    outline: "none",
  };

  const textareaStyle: React.CSSProperties = {
    width: "100%",
    borderRadius: 16,
    padding: "10px 14px",
    border: "1px solid rgba(148,163,184,0.6)",
    background: "rgba(15,23,42,0.9)",
    color: "white",
    fontSize: 14,
    outline: "none",
    minHeight: 72,
    resize: "vertical",
  };

  const buttonPrimary: React.CSSProperties = {
    borderRadius: 999,
    padding: "10px 18px",
    border: "none",
    background:
      "linear-gradient(135deg, #22c55e, #a3e635 35%, #22c55e 70%, #0ea5e9)",
    color: "#020617",
    fontWeight: 600,
    fontSize: 14,
    cursor: "pointer",
    boxShadow: "0 12px 30px rgba(34,197,94,0.55)",
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
  };

  const buttonGhost: React.CSSProperties = {
    borderRadius: 999,
    padding: "10px 16px",
    border: "1px solid rgba(148,163,184,0.7)",
    background: "transparent",
    color: "#e5e7eb",
    fontSize: 13,
    cursor: "pointer",
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <div style={{ display: "flex", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}>
          <div>
            <div style={badgeStyle}>
              <span>Step {step} of 2</span>
              <span style={{ width: 4, height: 4, borderRadius: 999, background: "#22c55e" }} />
              <span>Onboarding</span>
            </div>
            <h1
              style={{
                fontSize: 28,
                marginTop: 16,
                marginBottom: 4,
                fontWeight: 700,
              }}
            >
              Set Up Your AI Receptionist
            </h1>
            <p style={{ color: "#9ca3af", fontSize: 14, maxWidth: 520 }}>
              Configure your **24/7 AI receptionist** and connect phone numbers,
              WhatsApp, and email inboxes. This is the only step you need before
              going live with real clients.
            </p>
          </div>

          <div
            style={{
              minWidth: 220,
              padding: 14,
              borderRadius: 20,
              border: "1px solid rgba(148,163,184,0.4)",
              background:
                "radial-gradient(circle at top, rgba(56,189,248,0.18), transparent 60%)",
              fontSize: 12,
              color: "#e5e7eb",
            }}
          >
            <div style={{ fontWeight: 600, marginBottom: 4 }}>
              Command Center Preview
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              <span>• Calls, leads & messages in real time.</span>
              <span>• Metrics for each receptionist & channel.</span>
              <span>• Demo mode until you plug real APIs.</span>
            </div>
          </div>
        </div>

        {/* STEP 1 – BASIC INFO */}
        {step === 1 && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setStep(2);
            }}
            style={{ marginTop: 24 }}
          >
            <div style={gridStyle}>
              <div>
                <label style={labelStyle} htmlFor="businessName">
                  Business Name
                </label>
                <input
                  id="businessName"
                  name="businessName"
                  style={inputStyle}
                  placeholder="FrontDesk Agents LLC"
                  value={form.businessName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label style={labelStyle} htmlFor="website">
                  Website
                </label>
                <input
                  id="website"
                  name="website"
                  style={inputStyle}
                  placeholder="https://frontdeskagents.com"
                  value={form.website}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label style={labelStyle} htmlFor="receptionistName">
                  Receptionist Name
                </label>
                <input
                  id="receptionistName"
                  name="receptionistName"
                  style={inputStyle}
                  placeholder="SARA, ALEX, etc."
                  value={form.receptionistName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label style={labelStyle} htmlFor="mainPurpose">
                  Main Purpose
                </label>
                <input
                  id="mainPurpose"
                  name="mainPurpose"
                  style={inputStyle}
                  placeholder="Book appointments, qualify leads, support, etc."
                  value={form.mainPurpose}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div
              style={{
                marginTop: 24,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: 16,
              }}
            >
              <p style={{ fontSize: 12, color: "#9ca3af" }}>
                You can change this later. Step 2 will show the **exact prompt**
                your AI receptionist will use on calls and chats.
              </p>
              <button type="submit" style={buttonPrimary}>
                Continue to AI prompt
                <span>→</span>
              </button>
            </div>
          </form>
        )}

        {/* STEP 2 – PREVIEW PROMPT */}
        {step === 2 && (
          <form onSubmit={handleSubmit} style={{ marginTop: 24 }}>
            <div style={{ display: "grid", gap: 16, gridTemplateColumns: "minmax(0,1.4fr) minmax(0,1fr)" }}>
              <div>
                <label style={labelStyle}>AI Receptionist System Prompt</label>
                <textarea
                  style={textareaStyle}
                  value={`You are ${form.receptionistName || "an AI Receptionist"} for ${form.businessName || "this business"}. 
You answer calls, WhatsApp and web chat 24/7 in perfect English and Spanish.
Main purpose: ${form.mainPurpose || "capture and qualify leads, book appointments and route urgent issues."}

Rules:
- Always sound friendly, professional and confident.
- Capture caller name, phone, email and reason for contacting.
- If it's a lead, propose at least two time slots for an appointment.
- If it's an existing client, summarize the issue and tag it for follow-up.
- Never promise legal / medical / financial results; always say a human will confirm.`}
                  onChange={() => {}}
                  readOnly
                />
              </div>
              <div
                style={{
                  borderRadius: 20,
                  border: "1px solid rgba(148,163,184,0.4)",
                  padding: 16,
                  background:
                    "radial-gradient(circle at top, rgba(129,140,248,0.18), transparent 60%)",
                  fontSize: 13,
                }}
              >
                <div style={{ fontWeight: 600, marginBottom: 8 }}>
                  What happens after saving?
                </div>
                <ol style={{ paddingLeft: 18, color: "#e5e7eb" }}>
                  <li>We store this config in the Command Center.</li>
                  <li>You connect phone numbers (Bland/Twilio) and Airtable.</li>
                  <li>All calls and chats will follow this exact behavior.</li>
                </ol>
                <p style={{ marginTop: 10, fontSize: 12, color: "#9ca3af" }}>
                  In this demo deployment, we only log the payload to the
                  browser console. In production we’ll wire it to your real
                  backend / Airtable base.
                </p>
              </div>
            </div>

            <div
              style={{
                marginTop: 24,
                display: "flex",
                justifyContent: "space-between",
                gap: 12,
                flexWrap: "wrap",
              }}
            >
              <button
                type="button"
                style={buttonGhost}
                onClick={() => setStep(1)}
              >
                ← Back to basic info
              </button>
              <button type="submit" style={buttonPrimary}>
                Save setup & go to dashboard
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
