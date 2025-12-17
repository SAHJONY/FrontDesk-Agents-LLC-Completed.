"use client";

import React from "react";

/* =========================
   Constantes
========================= */

const USER_LOCALE = "en-US";

/* =========================
   Utilidades
========================= */

// Utility function to format full date and time string
const formatDateTime = (dateTimeString: string): string => {
  const date = new Date(dateTimeString + "Z");

  return date.toLocaleString(USER_LOCALE, {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
};

/* =========================
   Tipos
========================= */

interface AuditLog {
  id: string;
  action: string;
  actor: string;
  created_at: string;
}

/* =========================
   Page
========================= */

export default function AuditPage() {
  // Mock data (replace with real data source if needed)
  const logs: AuditLog[] = [
    {
      id: "1",
      action: "USER_LOGIN",
      actor: "admin@frontdeskagents.com",
      created_at: "2025-01-01T12:30:45",
    },
    {
      id: "2",
      action: "ACCOUNT_ACTIVATED",
      actor: "ceo@frontdeskagents.com",
      created_at: "2025-01-02T09:15:10",
    },
  ];

  return (
    <div className="min-h-screen bg-neutral-50 px-6 py-10">
      <div className="max-w-5xl mx-auto bg-white rounded-xl shadow p-8">
        <h1 className="text-2xl font-semibold mb-6">Audit Log</h1>

        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b text-left text-sm text-neutral-500">
              <th className="py-3">Action</th>
              <th className="py-3">Actor</th>
              <th className="py-3">Date</th>
            </tr>
          </thead>

          <tbody>
            {logs.map((log) => (
              <tr key={log.id} className="border-b last:border-none">
                <td className="py-3">{log.action}</td>
                <td className="py-3">{log.actor}</td>
                <td className="py-3">
                  {formatDateTime(log.created_at)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
