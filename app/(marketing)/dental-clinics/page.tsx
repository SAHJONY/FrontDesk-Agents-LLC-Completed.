import Link from "next/link";

export const metadata = {
  title: "AI Dental Receptionist | FrontDesk Agents",
  description: "24/7 AI receptionist for dental clinics. Answer every call and book more appointments instantly.",
};

export default function DentalLanding() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-16">
      <h1 className="text-4xl font-bold text-center">
        Never Miss Another Dental Appointment
      </h1>
      <p className="text-center text-lg mt-4">
        Your AI dental receptionist answers every call, books appointments, and
        confirms patients automatically.
      </p>

      <div className="flex justify-center mt-6">
        <Link href="/demo" className="bg-primary px-6 py-3 text-white rounded-lg font-semibold">
          Get a Dental Demo
        </Link>
      </div>

      <section className="mt-16 grid md:grid-cols-3 gap-6">
        <div className="border p-6 rounded-xl">24/7 Call Answering</div>
        <div className="border p-6 rounded-xl">Appointment Booking</div>
        <div className="border p-6 rounded-xl">SMS Reminders</div>
      </section>

      <section className="mt-16">
        <p>
          Dental offices lose up to <strong>30%</strong> of calls. FrontDesk Agents
          captures every new patient, even after hours.
        </p>
      </section>
    </main>
  );
}
