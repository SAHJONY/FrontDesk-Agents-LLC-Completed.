import Link from 'next/link';

export default function SolutionsPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Solutions</h1>
      <p className="text-muted-foreground">
        Industry-ready AI receptionist bundles with analytics, routing, and compliance defaults.
      </p>

      <div className="grid gap-3 md:grid-cols-2">
        <Link className="rounded-lg border border-border p-4 hover:bg-muted/40" href="/solutions/law">
          <div className="font-medium">Law Firms</div>
          <div className="text-sm text-muted-foreground">Intake, scheduling, case-type routing, after-hours coverage.</div>
        </Link>

        <Link className="rounded-lg border border-border p-4 hover:bg-muted/40" href="/solutions/real-estate">
          <div className="font-medium">Real Estate</div>
          <div className="text-sm text-muted-foreground">Lead capture, qualification, follow-up, calendar sync.</div>
        </Link>
      </div>
    </div>
  );
}
