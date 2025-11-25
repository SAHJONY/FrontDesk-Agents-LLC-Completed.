type StatCardProps = {
  label: string;
  value: string;
  sublabel?: string;
};

function StatCard({ label, value, sublabel }: StatCardProps) {
  return (
    <div className="stat-card">
      <div className="stat-label">{label}</div>
      <div className="stat-value">{value}</div>
      {sublabel && <div className="stat-sublabel">{sublabel}</div>}
    </div>
  );
}

export default function DashboardPage() {
  return (
    <main className="dashboard">
      <div className="dashboard-inner">
        <header className="dashboard-header">
          <div>
            <h1>FrontDesk Agents – Command Center
