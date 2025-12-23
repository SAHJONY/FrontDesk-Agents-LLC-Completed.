import Link from "next/link";

export const metadata = {
  title: "AI Medical Receptionist | FrontDesk Agents",
  description:
    "Never miss another patient call. 24/7 AI medical receptionist that answers calls in under 15 seconds and books appointments instantly.",
};

export default function MedicalClinicsLanding() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-16">
      {/* HERO */}
      <section className="text-center space-y-6">
        <h1 className="text-4xl md:text-5xl font-bold">
          Never Miss Another Patient Call — 24/7 AI Medical Receptionist
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground">
          Answer every call, book appointments instantly, and capture new
          patients in under <strong>15 seconds</strong>, even after hours.
        </p>
        <div className="flex justify-center gap-4">
          <Link
            href="/demo"
            className="rounded-lg bg-primary px-6 py-3 text-white font-semibold"
          >
            Book More Appointments — Get a Demo
          </Link>
          <Link
            href="#how-it-works"
            className="rounded-lg border px-6 py-3 font-semibold"
          >
            See How It Works
          </Link>
        </div>
      </section>

      {/* PROBLEM */}
      <section className="mt-20 space-y-4">
        <h2 className="text-3xl font-semibold">
          Every missed call is a lost patient
        </h2>
        <p className="text-lg">
          Clinics lose <strong>20–40%</strong> of inbound calls due to after-hours,
          busy front desks, and long hold times. Patients don’t wait. They call
          the next clinic.
        </p>
      </section>

      {/* SOLUTION */}
      <section className="mt-16 space-y-6">
        <h2 className="text-3xl font-semibold">
          Your always-on AI Medical Receptionist
        </h2>
        <ul className="grid md:grid-cols-2 gap-4 list-disc pl-6">
          <li>Answers calls instantly, 24/7</li>
          <li>Books appointments directly into your calendar</li>
          <li>Handles FAQs (hours, insurance, services)</li>
          <li>Routes urgent calls appropriately</li>
          <li>Sends SMS confirmations and reminders</li>
          <li>Escalates to staff when needed</li>
        </ul>
      </section>

      {/* BENEFITS */}
      <section className="mt-16 grid md:grid-cols-3 gap-6">
        <div className="rounded-xl border p-6">
          <h3 className="font-semibold text-xl">Never Miss a Call</h3>
          <p>Every patient is answered. No voicemail. No waiting.</p>
        </div>
        <div className="rounded-xl border p-6">
          <h3 className="font-semibold text-xl">More Appointments</h3>
          <p>AI schedules while the patient is still on the line.</p>
        </div>
        <div className="rounded-xl border p-6">
          <h3 className="font-semibold text-xl">After-Hours Coverage</h3>
          <p>Nights, weekends, and holidays captured automatically.</p>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" className="mt-20 space-y-6">
        <h2 className="text-3xl font-semibold">How it works</h2>
        <ol className="list-decimal pl-6 space-y-2">
          <li>Patient calls your clinic</li>
          <li>AI answers immediately</li>
          <li>Appointment is booked or message captured</li>
          <li>Patient receives SMS confirmation</li>
          <li>Your staff sees it in the dashboard</li>
        </ol>
      </section>

      {/* ROI */}
      <section className="mt-20 space-y-4">
        <h2 className="text-3xl font-semibold">Proven ROI</h2>
        <p>
          Clinics see <strong>+25–45%</strong> more appointments,{" "}
          <strong>−60%</strong> front-desk overload, and{" "}
          <strong>0 missed after-hours calls</strong>.
        </p>
      </section>

      {/* PRICING */}
      <section className="mt-20 rounded-2xl border p-8 space-y-4">
        <h2 className="text-3xl font-semibold">Medical Clinic Plan</h2>
        <p className="text-xl font-bold">$1,500 / month per provider</p>
        <p>Setup fee: $500 (one-time)</p>
        <ul className="list-disc pl-6">
          <li>24/7 AI voice receptionist</li>
          <li>Appointment scheduling</li>
          <li>SMS confirmations & reminders</li>
          <li>Call summaries & transcripts</li>
          <li>Analytics dashboard</li>
          <li>Priority support</li>
        </ul>
        <Link
          href="/demo"
          className="inline-block rounded-lg bg-primary px-6 py-3 text-white font-semibold"
        >
          Book Your Medical Clinic Demo
        </Link>
      </section>

      {/* COMPLIANCE */}
      <section className="mt-16 text-sm text-muted-foreground">
        FrontDesk Agents does not provide medical advice or diagnoses. Workflows
        are configurable to meet clinic compliance standards.
      </section>
    </main>
  );
}
