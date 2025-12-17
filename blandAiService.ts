// PRODUCCIÓN — BLAND AI SERVICE — ENV DIRECTO (NEXT / VERCEL SAFE)

const BLAND_API_BASE = "https://api.bland.ai/v1";

type BlandCallPayload = {
  phoneNumber: string;
  prompt: string;
};

export async function initiateBlandCall(
  payload: BlandCallPayload
): Promise<{ success: boolean; data?: unknown; error?: string }> {
  const apiKey = process.env.BLAND_API_KEY;

  if (!apiKey) {
    return {
      success: false,
      error: "BLAND_API_KEY is not defined in environment variables",
    };
  }

  try {
    const response = await fetch(`${BLAND_API_BASE}/calls`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        phone_number: payload.phoneNumber,
        prompt: payload.prompt,
      }),
    });

    if (!response.ok) {
      const text = await response.text();
      return { success: false, error: text };
    }

    const data = await response.json();
    return { success: true, data };
  } catch (err) {
    return { success: false, error: String(err) };
  }
}
