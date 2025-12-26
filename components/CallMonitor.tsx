useEffect(() => {
  if (!callId) return;

  const pollStatus = async () => {
    try {
      const res = await fetch(`/api/voice/status/${callId}`);
      const data = await res.json();
      if (data.success) {
        setStatus(data.status);
        setTranscript(data.transcript); // If you add a transcript state
      }
    } catch (err) {
      console.error("Telemetry sync failed");
    }
  };

  const interval = setInterval(pollStatus, 2000); // Poll every 2 seconds
  return () => clearInterval(interval);
}, [callId]);
