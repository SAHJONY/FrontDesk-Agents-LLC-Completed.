"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";

type Props = { calendlyUrl: string };

export default function DemoLeadForm({ calendlyUrl }: Props) {
  const params = useSearchParams();

  const [fullName, setFullName] = useState("");
  const [company, setCompany] = useState("");
  const [trade, setTrade] = useState("Plumbing");
  const [serviceArea, setServiceArea] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [monthlyCalls, setMonthlyCalls] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  function getUtm() {
    const keys = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"];
    const out: Record<string, string> = {};
    keys.forEach((k) => {
      const v = params.get(k);
      if (v) out[k] = v;
    });
    return out;
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMsg(null);
    setLoading(true);

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          fullName: fullName.trim(),
          company: company.trim(),
          trade,
          serviceArea: serviceArea.trim(),
          phone: phone.trim(),
          email: email.trim(),
          monthlyCalls: monthlyCalls.trim(),
          source: "demo_calendly",
          utm: getUtm(),
        }),
      });

      const json = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(json?.error || "Could not save lead.");

      setMsg("Saved. Now book your demo.");
      // Open Calendly in new tab (best conversion)
      window.open(calendlyUrl, "_blank", "noopener,noreferrer");
    } catch (err: any) {
      setMsg(err?.message || "Failed.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-3 md:grid-cols-2">
      <Field label="Full name">
        <input
          required
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          className="w-full rounded-md border border-slate-800 bg-slate-950 px-3 py-2 text-sm text-slate-100 outline-none focus:border-sky-400"
          placeholder="John Smith"
        />
      </Field>

      <Field label="Company">
        <input
          required
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          className="w-full rounded-md border border-slate-800 bg-slate-950 px-3 py-2 text-sm text-slate-100 outline-none focus:border-sky-400"
          placeholder="ABC Plumbing"
        />
      </Field>

      <Field label="Trade">
        <select
          value={trade}
          onChange={(e) => setTrade(e.target.value)}
          className="w-full rounded-md border border-slate-800 bg-slate-950 px-3 py-2 text-sm text-slate-100 outline-none focus:border-sky-400"
        >
          <option>Plumbing</option>
          <option>HVAC</option>
          <option>Roofing</option>
          <option>Cleaning</option>
          <option>Electrical</option>
          <option>Pest Control</option>
          <option>Junk Removal</option>
          <option>Landscaping</option>
        </select>
      </Field>

      <Field label="Service area">
        <input
          required
          value={serviceArea}
          onChange={(e) => setServiceArea(e.target.value)}
          className="w-full rounded-md border border-slate-800 bg-slate-950 px-3 py-2 text-sm text-slate-100 outline-none focus:border-sky-400"
          placeholder="Nationwide / City, State"
        />
      </Field>

      <Field label="Phone">
        <input
          required
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full rounded-md border border-slate-800 bg-slate-950 px-3 py-2 text-sm text-slate-100 outline-none focus:border-sky-400"
          placeholder="+1 (___) ___-____"
        />
      </Field>

      <Field label="Email">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-md border border-slate-800 bg-slate-950 px-3 py-2 text-sm text-slate-100 outline-none focus:border-sky-400"
          placeholder="you@company.com"
        />
      </Field>

      <Field label="Monthly calls (optional)">
        <input
          value={monthlyCalls}
          onChange={(e) => setMonthlyCalls(e.target.value)}
          className="w-full rounded-md border border-slate-800 bg-slate-950 px-3 py-2 text-sm text-slate-100 outline-none focus:border-sky-400"
          placeholder="200"
        />
      </Field>

      <div className="md:col-span-2">
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-md bg-sky-400 px-4 py-2 text-center text-sm font-semibold text-slate-950 hover:bg-sky-300 disabled:opacity-60"
        >
          {loading ? "Saving..." : "Save details & open Calendly"}
        </button>

        {msg && (
          <div className="mt-3 rounded-md border border-slate-800 bg-slate-950 px-3 py-2 text-xs text-slate-200">
            {msg}
          </div>
        )}
      </div>
    </form>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1">
      <label className="text-xs font-medium text-slate-200">{label}</label>
      {children}
    </div>
  );
}
