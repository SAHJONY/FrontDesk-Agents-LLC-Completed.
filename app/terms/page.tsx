import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service — FrontDesk Agents",
  description:
    "Terms of Service for the FrontDesk Agents platform. Effective date: January 5, 2026.",
};

export default function TermsPage() {
  return (
    <main className="mx-auto w-full max-w-3xl px-6 py-10">
      <header className="mb-8">
        <h1 className="text-3xl font-extrabold tracking-tight md:text-4xl">
          Terms of Service
        </h1>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
          Effective date: January 5, 2026
        </p>
      </header>

      <section className="space-y-4 text-base leading-7 text-slate-800 dark:text-slate-100">
        <p>
          These Terms govern your access to and use of FrontDesk Agents (“Service”).
          By using the Service, you agree to these Terms.{" "}
          <strong>
            This is a template and should be reviewed by legal counsel before use.
          </strong>
        </p>

        <div className="h-px w-full bg-slate-200 dark:bg-slate-800" />

        <h2 className="text-xl font-bold">1. Accounts &amp; access</h2>
        <p>
          You are responsible for maintaining the confidentiality of your credentials
          and for all activities under your account.
        </p>

        <h2 className="text-xl font-bold">2. Payments</h2>
        <p>
          Paid plans are billed in advance. Taxes may apply. Refunds (if any) are governed
          by your plan and applicable law.
        </p>

        <h2 className="text-xl font-bold">3. Acceptable use</h2>
        <p>
          You agree not to misuse the Service, including violating laws, transmitting spam,
          or attempting unauthorized access.
        </p>

        <h2 className="text-xl font-bold">4. Disclaimers</h2>
        <p>
          The Service is provided “as is” without warranties except as required by law.
        </p>

        <h2 className="text-xl font-bold">5. Limitation of liability</h2>
        <p>
          To the extent permitted by law, FrontDesk Agents will not be liable for indirect
          or consequential damages.
        </p>

        <h2 className="text-xl font-bold">6. Contact</h2>
        <p>
          Support:{" "}
          <a
            href="mailto:support@frontdeskagents.com"
            className="font-medium underline underline-offset-4 hover:opacity-80"
          >
            support@frontdeskagents.com
          </a>
        </p>
      </section>
    </main>
  );
}
