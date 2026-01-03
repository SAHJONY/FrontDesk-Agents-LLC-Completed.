// Inside components/owner/UniversalVault.tsx
const [secrets, setSecrets] = useState([{ key: '', value: '' }]);

const addRow = () => setSecrets([...secrets, { key: '', value: '' }]);

const syncAll = async () => {
  // Loops through the array and pushes every secret to Vercel and the Platform
  const response = await fetch('/api/wholesale/sync-bulk-secrets', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ secrets })
  });
};
