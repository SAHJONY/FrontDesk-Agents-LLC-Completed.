type Props = {
  label: string;
  value: string;
  description: string;
};

export default function DashboardCard({ label, value, description }: Props) {
  return (
    <div className="fd-stat-card">
      <span className="fd-stat-label">{label}</span>
      <span className="fd-stat-value">{value}</span>
      <span className="fd-stat-description">{description}</span>
    </div>
  );
}
