"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type FormState = {
  fullName: string;
  email: string;
  phone: string;
  company: string;
  trade: string;
  serviceArea: string;
  monthlyCalls: string;
  notes: string;
};

const initial: FormState = {
  fullName: "",
  email: "",
  phone: "",
  company: "",
  trade: "Plumbing",
  serviceArea: "",
  monthlyCalls: "",
  notes: "",
};

export default function DemoForm() {
  const router = useRouter();
  const [data, setData] = useState<FormState>(initial);
  const [loading, setLoading] = useState(false);
  const [ok, setOk] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    setOk(null);
    setLoading(true);

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          ...data,
          source: "demo_form",
        }),
      });

      const json = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(json?.error || "Failed to submit.");

      setOk("Done. We’ll contact you within 1 business day.");
      setData(initial);

      // optional redirect
      router.refresh();
    } catch (e: any) {
      setErr(e?.message || "Submission failed.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={submit} className="space-y-4">
      <div className="grid gap-3 md:grid-cols-2">
        <Field label="Full name">
          <input
            required
            value={data.fullName}
            onChange={(e) => setData({ ...data, fullName: e.target.value })}
            className="w-full rounded-md border border-slate-800 bg-slate-950 px-3 py-2 text-sm text-slate-100 outline-none focus:border-sky-400"
            placeholder="John Smith"
          />
        </Field>

        <Field label="Email">
          <input
            type="email"
            required
            value={data.email}
            onChange={(e) => setData({ ...data, email: e.target.value })}
            className="w-full rounded-md border border-slate-800 bg-slate-950 px-3 py-2 text-sm text-slate-100 outline-none focus:border-sky-400"
            placeholder="you@company.com"
          />
        </Field>

        <Field label="Phone">
          <input
            required
            value={data.phone}
            onChange={(e) => setData({ ...data, phone: e.target.value })}
            className="w-full rounded-md border border-slate-800 bg-slate-950 px-3 py-2 text-sm text-slate-100 outline-none focus:border-sky-400"
            placeholder="+1 (___) ___-____"
          />
        </Field>

        <Field label="Company">
          <input
            required
            value={data.company}
            onChange={(e) => setData({ ...data, company: e.target.value })}
            className="w-full rounded-md border border-slate-800 bg-slate-950 px-3 py-2 text-sm text-slate-100 outline-none focus:border-sky-400"
            placeholder="ABC Plumbing"
          />
        </Field>

        <Field label="Trade">
          <select
            value={data.trade}
            onChange={(e) => setData({ ...data, trade: e.target.value })}
            className="w-full rounded-md border border-slate-800 bg-slate-950 px-3 py-2 text-sm text-slate-100 outline-none focus:border-sky-400"
          >
            <option>Plumbing</option>
            <option>HVAC</option>
            <option>Roofing</option>
            <option>Cleaning</option>
            <option>Electrical</option>
            <option>Pest Control</option>
            <option>Junk Removal</option>
          </select>
        </Field>

        <Field label="Service area (City/State or Nationwide)">
          <input
            required
            value={data.serviceArea}
            onChange={(e) => setData({ ...data, serviceArea: e.target.value })}
            className="w-full rounded-md border border-slate-800 bg-slate-950 px-3 py-2 text-sm text-slate-100 outline-none focus:border-sky-400"
            placeholder="Dallas, TX / Nationwide"
          />
        </Field>

        <Field label="Monthly calls (estimate)">
          <input
            value={data.monthlyCalls}
            onChange={(e) => setData({ ...data, monthlyCalls: e.target.value })}
            className="w-full rounded-md border border-slate-800 bg-slate-950 px-3 py-2 text-sm text-slate-100 outline-none focus:border-sky-400"
            placeholder="200"
          />
        </Field>

        <Field label="Notes (optional)">
          <input
            value={data.notes}
            onChange={(e) => setData({ ...data, notes: e.target.value })}
            className="w-full rounded-md border border-slate-800 bg-slate-950 px-3 py-2 text-sm text-slate-100 outline-none focus:border-sky-400"
            placeholder="After-hours calls are our biggest problem..."
          />
        </Field>
      </div>

      {err && (
        <div className="rounded-md border border-red-900/60 bg-red-950/40 px-3 py-2 text-xs text-red-200">
          {err}
        </div>
      )}
      {ok && (
        <div className="rounded-md border border-emerald-900/60 bg-emerald-950/40 px-3 py-2 text-xs text-emerald-200">
          {ok}
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-md bg-sky-400 px-4 py-2 text-center text-sm font-semibold text-slate-950 hover:bg-sky-300 disabled:opacity-60"
      >
        {loading ? "Submitting..." : "Request demo"}
      </button>

      <p className="text-[11px] text-slate-500">
        We respond within 1 business day. Urgent? Add “urgent” in Notes.
      </p>
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
