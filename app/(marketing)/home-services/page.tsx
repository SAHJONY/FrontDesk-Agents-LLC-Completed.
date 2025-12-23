import Link from "next/link";

export const metadata = {
  title: "AI Dispatch for Home Services | FrontDesk Agents",
  description:
    "24/7 AI Dispatch for HVAC, Plumbing, and Electrical. Never miss an emergency call and book jobs instantly.",
};

export default function HomeServicesLanding() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-16">
      {/* 1. URGENCY HEADER */}
      <h1 className="text-4xl font-bold text-center">
        Stop Losing High-Ticket Emergency Jobs to Voicemail
      </h1>

      <p className="text-center text-lg mt-4 text-muted-foreground">
        When a pipe bursts or the AC fails at 2 AM, the first company to answer wins the job. 
        FrontDesk Agents ensures your dispatch is always open.
      </p>

      {/* 2. CRITICAL CALL TO ACTION */}
      <div className="flex justify-center mt-6">
        <Link
          href="/demo"
          className="bg-primary px-8 py-4 text-white rounded-lg font-bold text-lg hover:opacity-90 transition-all"
        >
          Activate 24/7 AI Dispatch
        </Link>
      </div>

      {/* 3. CORE SERVICE NODES */}
      <section className="mt-16 grid md:grid-cols-3 gap-8">
        <div className="border border-red-100 p-6 rounded-xl bg-red-50/10">
          <h3 className="font-bold text-xl mb-2 text-red-600">Emergency Routing</h3>
          <p className="text-sm">
            AI identifies high-priority emergencies (floods, no heat, fire hazards) 
            and alerts your on-call techs in real-time.
          </p>
        </div>

        <div className="border p-6 rounded-xl bg-blue-50/10">
          <h3 className="font-bold text-xl mb-2 text-blue-600">Instant Scheduling</h3>
          <p className="text-sm">
            Syncs with ServiceTitan or Jobber to book service windows immediately 
            via conversational SMS or voice.
          </p>
        </div>

        <div className="border p-6 rounded-xl bg-green-50/10">
          <h3 className="font-bold text-xl mb-2 text-green-600">Multi-Channel Intake</h3>
          <p className="text-sm">
            Capture leads from phone, SMS, and WhatsApp. AI remembers the customer 
            history for a VIP experience.
          </p>
        </div>
      </section>

      {/* 4. THE ECONOMIC MOAT */}
      <section className="mt-16 bg-muted p-10 rounded-2xl">
        <h2 className="text-2xl font-bold mb-4">The Cost of a Missed Call</h2>
        <p className="text-lg">
          For Home Services, a missed call isn't just a nuisance—it’s a **$500 to $5,000** loss in immediate revenue. FrontDesk Agents provides a sovereign 15-second response 
          moat that keeps your trucks moving while competitors sleep.
        </p>
      </section>

      {/* 5. DISCLAIMER & COMPLIANCE */}
      <section className="mt-12 text-sm text-muted-foreground border-t pt-6">
        <p>
          FrontDesk Agents acts as a communication layer. Emergency routing is performed 
          based on clinic or company-defined protocols and depends on the availability 
          of your on-site technicians.
        </p>
      </section>
    </main>
  );
}
