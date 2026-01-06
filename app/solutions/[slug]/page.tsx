type Props = { params: { slug: string } };

const TITLES: Record<string, string> = {
  law: 'Solutions • Law Firms',
  'real-estate': 'Solutions • Real Estate',
};

export default function SolutionSlugPage({ params }: Props) {
  const title = TITLES[params.slug] ?? `Solutions • ${params.slug.replaceAll('-', ' ')}`;

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">{title}</h1>
      <p className="text-muted-foreground">
        This page exists to prevent broken internal links and to provide a clean landing for the solution bundle.
      </p>

      <div className="rounded-lg border border-border p-4">
        <div className="font-medium">Next step</div>
        <div className="text-sm text-muted-foreground">
          Add the premium hero image and the 3–5 key benefit blocks for this vertical.
        </div>
      </div>
    </div>
  );
}
