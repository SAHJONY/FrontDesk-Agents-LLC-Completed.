import Link from "next/link";

export const metadata = {
  title: "AI Real Estate Receptionist | FrontDesk Agents",
  description: "Never miss another buyer or seller call. AI receptionist for real estate teams.",
};

export default function RealEstateLanding() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-16">
      <h1 className="text-4xl font-bold text-center">
        Capture Every Buyer and Seller Lead
      </h1>
      <p className="text-center text-lg mt-4">
        AI answers instantly, qualifies leads, and routes hot prospects.
      </p>

      <div className="flex justify-center mt-6">
        <Link href="/demo" className="bg-primary px-6 py-3 text-white rounded-lg font-semibold">
          Get a Real Estate Demo
        </Link>
      </div>

      <section className="mt-16 grid md:grid-cols-2 gap-6">
        <div className="border p-6 rounded-xl">Lead Qualification</div>
        <div className="border p-6 rounded-xl">Agent Routing</div>
      </section>
    </main>
  );
}
