import Image from "next/image";

export default function IndustriesPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="max-w-6xl mx-auto px-4 pb-16 pt-10 space-y-10">
        <p className="text-xs font-semibold tracking-[0.25em] uppercase text-sky-400">
          Industries
        </p>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold max-w-3xl">
          Built for revenue-driven service businesses.
        </h1>
        <p className="text-base text-slate-300 max-w-2xl">
          FrontDesk Agents is optimized for any business where every missed call
          is real money: clinics, law firms, agencies, real estate, home
          services, and more.
        </p>

        <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-4 sm:p-6">
          <div className="relative w-full aspect-[16/10] overflow-hidden rounded-2xl bg-slate-950">
            <Image
              src="/images/premium/industries-dashboard.png"
              alt="FrontDesk Agents dashboard across different industries"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 text-sm text-slate-200">
          <div className="rounded-2xl border border-slate-800/80 bg-slate-900/60 p-4">
            <p className="font-semibold mb-1">Law firms</p>
            <p className="text-xs text-slate-400">
              Intake scripts that qualify cases and book with the right
              attorney.
            </p>
          </div>
          <div className="rounded-2xl border border-slate-800/80 bg-slate-900/60 p-4">
            <p className="font-semibold mb-1">Clinics & med spas</p>
            <p className="text-xs text-slate-400">
              Insurance capture, appointment booking, and reschedule handling.
            </p>
          </div>
          <div className="rounded-2xl border border-slate-800/80 bg-slate-900/60 p-4">
            <p className="font-semibold mb-1">Real estate</p>
            <p className="text-xs text-slate-400">
              Answer sign calls, qualify buyers/sellers, and send leads to your
              CRM instantly.
            </p>
          </div>
          <div className="rounded-2xl border border-slate-800/80 bg-slate-900/60 p-4">
            <p className="font-semibold mb-1">Home services</p>
            <p className="text-xs text-slate-400">
              Dispatch-ready bookings with address, issue, and time window.
            </p>
          </div>
          <div className="rounded-2xl border border-slate-800/80 bg-slate-900/60 p-4">
            <p className="font-semibold mb-1">Agencies</p>
            <p className="text-xs text-slate-400">
              Never miss a discovery call or inbound referral again.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
