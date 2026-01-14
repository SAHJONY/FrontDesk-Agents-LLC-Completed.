"use client";

import { CreditCard, DollarSign, ExternalLink, Landmark, Wallet } from "lucide-react";

const PAYMENT_METHODS = [
  {
    id: "stripe",
    name: "Stripe",
    icon: CreditCard,
    envVar: "NEXT_PUBLIC_STRIPE_PORTAL_URL",
    color: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20",
  },
  {
    id: "square",
    name: "Square",
    icon: CreditCard,
    envVar: "NEXT_PUBLIC_SQUARE_CHECKOUT_URL",
    color: "bg-slate-500/10 text-slate-300 border-slate-500/20",
  },
  {
    id: "paypal",
    name: "PayPal",
    icon: Wallet,
    envVar: "NEXT_PUBLIC_PAYPAL_URL",
    color: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  },
  {
    id: "zelle",
    name: "Zelle",
    icon: Landmark,
    envVar: "NEXT_PUBLIC_ZELLE_INSTRUCTIONS",
    color: "bg-purple-500/10 text-purple-400 border-purple-500/20",
  },
  {
    id: "cashapp",
    name: "Cash App",
    icon: DollarSign,
    envVar: "NEXT_PUBLIC_CASHAPP_TAG",
    color: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  },
  {
    id: "wire",
    name: "Wire Transfer",
    icon: Landmark,
    envVar: "NEXT_PUBLIC_WIRE_INSTRUCTIONS",
    color: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  },
];

export default function PaymentEntryPoints() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {PAYMENT_METHODS.map((method) => {
        const urlOrText = process.env[method.envVar] || "#";
        const isUrl = urlOrText.startsWith("http");

        return (
          <div
            key={method.id}
            className={`flex flex-col justify-between rounded-xl border p-5 transition-all hover:scale-[1.02] ${method.color}`}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <method.icon size={20} />
                <span className="font-bold uppercase tracking-wider text-xs">
                  {method.name}
                </span>
              </div>
              {isUrl && <ExternalLink size={14} className="opacity-50" />}
            </div>

            <div className="space-y-3">
              <p className="text-[11px] opacity-70 leading-relaxed">
                {isUrl 
                  ? `Click to pay or manage your subscription via ${method.name}.`
                  : `Instructions: ${urlOrText === "#" ? "Contact support for details." : urlOrText}`}
              </p>
              
              {isUrl ? (
                <a
                  href={urlOrText}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-full items-center justify-center rounded-lg bg-white/10 py-2 text-xs font-bold uppercase tracking-widest transition-colors hover:bg-white/20"
                >
                  Open {method.name}
                </a>
              ) : (
                <button
                  disabled
                  className="inline-flex w-full items-center justify-center rounded-lg bg-white/5 py-2 text-xs font-bold uppercase tracking-widest opacity-50"
                >
                  Manual Method
                </button>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
