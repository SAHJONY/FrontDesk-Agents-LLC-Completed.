import Link from "next/link";

export const metadata = {
  title: "AI Medical Receptionist | FrontDesk Agents",
  description:
    "24/7 AI receptionist for medical clinics. Answer every call, schedule appointments, and reduce no-shows.",
};

export default function MedicalClinicsLanding() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-16">
      <h1 className="text-4xl font-bold text-center">
        Every Missed Call Is a Missed Patient
      </h1>

      <p className="text-center text-lg mt-4">
        FrontDesk Agents answers calls instantly, schedules appointments,
        and routes urgent cases — 24/7.
      </p>

      <div className="flex justify-center mt-6">
        <Link
          href="/demo"
          className="bg-primary px-6 py-3 text-white rounded-lg font-semibold"
        >
          Get a Medical Clinic Demo
        </Link>
      </div>

      <section className="mt-16 grid md:grid-cols-3 gap-6">
        <div className="border p-6 rounded-xl">
          <h3 className="font-semibold mb-2">24/7 Call Answering</h3>
          <p>
            No more voicemail. Every patient speaks to a professional voice,
            anytime.
          </p>
        </div>

        <div className="border p-6 rounded-xl">
          <h3 className="font-semibold mb-2">Appointment Scheduling</h3>
          <p>
            Book, reschedule, and confirm appointments automatically via phone
            or SMS.
          </p>
        </div>

        <div className="border p-6 rounded-xl">
          <h3 className="font-semibold mb-2">Urgency Routing</h3>
          <p>
            Route urgent calls to on-call staff based on your clinic rules.
          </p>
        </div>
      </section>

      <section className="mt-16">
        <p>
          Medical clinics lose up to <strong>25–35%</strong> of inbound calls
          during peak hours and after hours. FrontDesk Agents captures every
          opportunity without adding staff.
        </p>
      </section>

      <section className="mt-12 text-sm text-muted-foreground">
        <p>
          FrontDesk Agents does not provide medical advice or diagnosis.
          Calls are handled and routed according to clinic-defined protocols.
        </p>
      </section>
    </main>
  );
}
