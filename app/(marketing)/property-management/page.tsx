import Link from "next/link";

export const metadata = {
  title: "AI Receptionist for Property Management | FrontDesk Agents",
  description: "Handle tenant calls, maintenance requests, and leasing inquiries automatically.",
};

export default function PropertyManagementLanding() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-16">
      <h1 className="text-4xl font-bold text-center">
        Stop Overwhelming Your Property Managers
      </h1>
      <p className="text-center text-lg mt-4">
        FrontDesk Agents handles tenant calls, maintenance requests, and leasing 24/7.
      </p>

      <div className="flex justify-center mt-6">
        <Link href="/demo" className="bg-primary px-6 py-3 text-white rounded-lg font-semibold">
          Book a Property Mgmt Demo
        </Link>
      </div>

      <ul className="mt-16 list-disc pl-6 space-y-2">
        <li>Maintenance call intake</li>
        <li>Leasing inquiries</li>
        <li>Emergency routing</li>
        <li>After-hours coverage</li>
      </ul>
    </main>
  );
}
