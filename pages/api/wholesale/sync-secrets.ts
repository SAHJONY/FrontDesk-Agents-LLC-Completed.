import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();

  const { key, value } = req.body;
  const VERCEL_PROJECT_ID = process.env.VERCEL_PROJECT_ID;
  const VERCEL_TOKEN = process.env.VERCEL_AUTH_TOKEN;

  try {
    // 1. Push to Vercel Environment Variables
    await fetch(
      `https://api.vercel.com/v10/projects/${VERCEL_PROJECT_ID}/env`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${VERCEL_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          key: key,
          value: value,
          type: 'secret',
          target: ['production', 'preview', 'development'],
        }),
      }
    );

    // 2. Optional: Trigger a redeploy to apply the new secret
    // await fetch(`https://api.vercel.com/v1/projects/${VERCEL_PROJECT_ID}/deployments`, ...);

    return res.status(200).json({ success: true });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to sync secret' });
  }
}
