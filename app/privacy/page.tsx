import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy — FrontDesk Agents",
  description:
    "Privacy Policy for the FrontDesk Agents platform. Effective date: January 7, 2026.",
};

export default function PrivacyPage() {
  return (
    <main className="mx-auto w-full max-w-3xl px-6 py-10">
      <header className="mb-8">
        <h1 className="text-3xl font-extrabold tracking-tight md:text-4xl">
          Privacy Policy
        </h1>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
          Effective date: January 7, 2026
        </p>
      </header>

      <section className="space-y-4 text-base leading-7 text-slate-800 dark:text-slate-100">
        <p>
          This Policy describes how FrontDesk Agents collects and uses information.
        </p>

        <div className="h-px w-full bg-slate-200 dark:bg-slate-800" />

        <h2 className="text-xl font-bold">1. Data we collect</h2>
        <p>
          Account info, usage data, and any information you submit through forms or integrations.
        </p>

        <h2 className="text-xl font-bold">2. How we use data</h2>
        <p>
          To provide the Service, maintain security, support customers, and improve product performance.
        </p>

        <h2 className="text-xl font-bold">3. Sharing</h2>
        <p>
          We share data with service providers (e.g., hosting, billing) as needed to operate the Service.
        </p>

        <h2 className="text-xl font-bold">4. Security</h2>
        <p>
          We apply reasonable safeguards. No method of transmission is 100% secure.
        </p>

        <h2 className="text-xl font-bold">5. Contact</h2>
        <p>
          For privacy questions, contact us at:{" "}
          <a
            href="mailto:frontdeskllc@outlook.com"
            className="font-medium underline underline-offset-4 hover:opacity-80"
          >
            frontdeskllc@outlook.com
          </a>
        </p>
      </section>
    </main>
  );
}
