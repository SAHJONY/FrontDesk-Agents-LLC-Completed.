export default function Home() {
  return (
    <main style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      backgroundColor: '#0f172a',
      color: '#e2e8f0',
      fontFamily: 'system-ui, sans-serif'
    }}>
      <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>
        Front Desk Agents LLC
      </h1>
      <p style={{ fontSize: '1.25rem' }}>
        Your trusted real estate partner.
      </p>
    </main>
  );
}
