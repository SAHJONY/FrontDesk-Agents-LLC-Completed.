// app/page.tsx

export default function Home() {
  return (
    <main
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#0a0f1c',
        color: 'white',
        fontFamily: 'Inter, sans-serif',
        textAlign: 'center',
        flexDirection: 'column',
      }}
    >
      <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>
        FrontDesk Agents App Deployed Successfully!
      </h1>
      <p style={{ fontSize: '1.2rem', color: '#9ca3af' }}>
        Your AI Receptionist is now live and ready to handle appointments.
      </p>
    </main>
  );
}
