// app/components/DashboardCard.tsx

type DashboardCardProps = {
  title: string;
  value?: string | number;
  helperText?: string;
  badge?: string;
};

export default function DashboardCard({
  title,
  value,
  helperText,
  badge,
}: DashboardCardProps) {
  return (
    <section className="dashboard-card">
      <header className="dashboard-card-header">
        <div className="dashboard-card-title-row">
          <h3 className="dashboard-card-title">{title}</h3>
          {badge && <span className="dashboard-card-badge">{badge}</span>}
        </div>
      </header>

      {typeof value !== "undefined" && (
        <p className="dashboard-card-value">{value}</p>
      )}

      {helperText && (
        <p className="dashboard-card-helper">
          {helperText}
        </p>
      )}
    </section>
  );
}
