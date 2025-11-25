import AISetupForm from "../components/AISetupForm";

export default function SetupPage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        background: "radial-gradient(circle at top, #020617, #000000 70%)",
        paddingTop: 40,
        paddingBottom: 40,
      }}
    >
      <AISetupForm />
    </main>
  );
}
