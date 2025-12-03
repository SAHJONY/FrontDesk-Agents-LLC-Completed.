// app/components/DemoRequestForm.tsx
"use client";

import { useState } from "react";

export function DemoRequestForm() {
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const payload = {
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      businessType: formData.get("businessType"),
      companyName: formData.get("companyName"),
      notes: formData.get("notes"),
    };

    try {
      const res = await fetch("/api/demo-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok || !data.ok) {
        throw new Error(data.error || "Unknown error");
      }

      setDone(true);
      e.currentTarget.reset();
    } catch (err: any) {
      console.error(err);
      setError("There was a problem sending your request. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mt-8 max-w-xl rounded-xl border border-slate-800 bg-slate-900/60 p-6">
      <h2 className="text-lg font-semibold text-slate-50">
        Request a live demo
      </h2>
      <p className="mt-1 text-sm text-slate-400">
        Tell us about your business and we&apos;ll configure ALEX & SARA for a
        live test.
      </p>

      <form onSubmit={handleSubmit} className="mt-4 space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-sm text-slate-300 mb-1">
              Name *
            </label>
            <input
              name="name"
              required
              className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-50 outline-none focus:border-sky-500"
            />
          </div>

          <div>
            <label className="block text-sm text-slate-300 mb-1">
              Email *
            </label>
            <input
              type="email"
              name="email"
              required
              className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-50 outline-none focus:border-sky-500"
            />
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-sm text-slate-300 mb-1">
              Phone / WhatsApp
            </label>
            <input
              name="phone"
              className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-50 outline-none focus:border-sky-500"
            />
          </div>

          <div>
            <label className="block text-sm text-slate-300 mb-1">
              Industry
            </label>
            <input
              name="businessType"
              placeholder="Medical, Legal, Real Estate..."
              className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-50 outline-none focus:border-sky-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm text-slate-300 mb-1">
            Business name
          </label>
          <input
            name="companyName"
            className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-50 outline-none focus:border-sky-500"
          />
        </div>

        <div>
          <label className="block text-sm text-slate-300 mb-1">
            What do you want FrontDesk Agents to solve?
          </label>
          <textarea
            name="notes"
            rows={3}
            className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-50 outline-none focus:border-sky-500"
          />
        </div>

        {error && (
          <p className="text-sm text-red-400">
            {error}
          </p>
        )}

        {done && (
          <p className="text-sm text-emerald-400">
            Demo request received. We&apos;ll contact you shortly.
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center justify-center rounded-lg bg-sky-500 px-4 py-2 text-sm font-semibold text-slate-950 hover:bg-sky-400 disabled:opacity-60"
        >
          {loading ? "Sending..." : "Send demo request"}
        </button>
      </form>
    </div>
  );
}
