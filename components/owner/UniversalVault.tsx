import { useState } from "react";

type Secret = {
  name: string;
  value: string;
};

export default function UniversalVault() {
  const [secrets, setSecrets] = useState<Secret[]>([
    { name: "", value: "" }
  ]);

  const updateSecret = (index: number, updated: Secret) => {
    setSecrets((prev) =>
      prev.map((item, i) => (i === index ? updated : item))
    );
  };

  const addSecret = () => {
    setSecrets((prev) => [...prev, { name: "", value: "" }]);
  };

  return (
    <div className="space-y-6">
      <div className="text-lg font-semibold">
        Universal Vault
      </div>

      <div className="space-y-3">
        {secrets.map((s, i) => (
          <div key={i} className="flex gap-3">
            <input
              className="border px-3 py-2 rounded w-1/2"
              placeholder="SERVICE_KEY_NAME"
              value={s.name}
              onChange={(e) =>
                updateSecret(i, { ...s, name: e.target.value })
              }
            />
            <input
              className="border px-3 py-2 rounded w-1/2"
              placeholder="SERVICE_KEY_VALUE"
              value={s.value}
              onChange={(e) =>
                updateSecret(i, { ...s, value: e.target.value })
              }
            />
          </div>
        ))}
      </div>

      <button
        onClick={addSecret}
        className="px-4 py-2 bg-black text-white rounded"
      >
        Add Secret
      </button>
    </div>
  );
}
