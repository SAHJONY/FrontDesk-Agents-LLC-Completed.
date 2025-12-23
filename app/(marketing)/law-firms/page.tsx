import Link from "next/link";

export const metadata = {
  title: "AI Legal Receptionist | FrontDesk Agents",
  description: "AI receptionist for law firms. Capture every lead and qualify callers instantly.",
};

export default function LawLanding() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-16">
      <h1 className="text-4xl font-bold text-center">
        Every Missed Call Is a Lost Case
      </h1>
      <p className="text-center text-lg mt-4">
        FrontDesk Agents answers, qualifies, and routes legal calls 24/7.
      </p>

      <div className="flex justify-center mt-6">
        <Link href="/demo" className="bg-primary px-6 py-3 text-white rounded-lg font-semibold">
          Book a Law Firm Demo
        </Link>
      </div>

      <ul className="mt-16 list-disc pl-6 space-y-2">
        <li>Instant call answering</li>
        <li>Lead qualification</li>
        <li>Practice-area routing</li>
        <li>After-hours coverage</li>
      </ul>

      <p className="mt-10 text-sm text-muted-foreground">
        No legal advice provided. Calls are routed per firm rules.
      </p>
    </main>
  );
}
