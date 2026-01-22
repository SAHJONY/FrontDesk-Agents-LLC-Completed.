"use client";

import React, { useState } from "react";
import { ShieldAlert, LockOpen, PlusCircle } from "lucide-react";

export default function AdminConsole() {
  const [tenantId, setTenantId] = useState("");
  const [reason, setReason] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  async function callOverride(mode: "unlock" | "provision") {
    setLoading(true);
    setResult(null);

    try {
      const res = await fetch("/api/admin/override", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tenantId: tenantId.trim(),
          reason: reason.trim() || "admin_override",
          mode,
        }),
      });

      const json = await res.json();
      if (!res.ok) {
        setResult(json?.error || "Request failed");
      } else {
        setResult("Success");
      }
    } catch (e: any) {
      setResult(e?.message || "Unexpected error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#fafafa] p-8">
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="flex items-center gap-3">
          <ShieldAlert className="w-6 h-6 text-gray-900" />
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">
            Admin Console
          </h1>
        </div>

        <p className="text-gray-600">
          Emergency tools for tenant overrides. Use only when necessary.
        </p>

        <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-4">
          <label className="block">
            <span className="text-sm font-semibold text-gray-800">Tenant ID</span>
            <input
              value={tenantId}
              onChange={(e) => setTenantId(e.target.value)}
              placeholder="tenant_uuid_or_owner_id"
              className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-300"
            />
          </label>

          <label className="block">
            <span className="text-sm font-semibold text-gray-800">Reason</span>
            <input
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="why are you overriding?"
              className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-300"
            />
          </label>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => callOverride("unlock")}
              disabled={loading || !tenantId.trim()}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-gray-900 text-white px-5 py-3 font-semibold disabled:opacity-50"
            >
              <LockOpen className="w-4 h-4" />
              Unlock Tenant
            </button>

            <button
              onClick={() => callOverride("provision")}
              disabled={loading || !tenantId.trim()}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-white border border-gray-200 text-gray-900 px-5 py-3 font-semibold disabled:opacity-50"
            >
              <PlusCircle className="w-4 h-4" />
              Provision Defaults
            </button>
          </div>

          {result && (
            <div className="rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-800">
              {result}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
