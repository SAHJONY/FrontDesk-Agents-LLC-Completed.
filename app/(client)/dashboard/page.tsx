import GlobalHeader from '@/components/Layout/GlobalHeader';

export default function DashboardPage() {
  return (
    <>
      <GlobalHeader />

      <main className="p-10 bg-gray-50 min-h-screen">
        <section className="bg-white border border-gray-200 rounded-xl p-8">
          <h1 className="text-2xl font-semibold text-gray-900 mb-2">
            Autonomous Operations Dashboard
          </h1>

          <p className="text-gray-600 max-w-3xl">
            FrontDesk Agents operates autonomously in the cloud. Once configured,
            the platform continues handling calls, messages, compliance,
            automations, and revenue workflows — even when no user is logged in
            or connected from any device.
          </p>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="border rounded-lg p-4">
              <h3 className="font-medium">Always On</h3>
              <p className="text-sm text-gray-600">24/7 continuous execution</p>
            </div>

            <div className="border rounded-lg p-4">
              <h3 className="font-medium">Device-Agnostic</h3>
              <p className="text-sm text-gray-600">
                Desktop · Tablet · Mobile
              </p>
            </div>

            <div className="border rounded-lg p-4">
              <h3 className="font-medium">Zero Supervision</h3>
              <p className="text-sm text-gray-600">
                No user presence required
              </p>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
