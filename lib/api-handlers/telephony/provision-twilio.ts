// lib/api-handlers/telephony/provision-twilio.ts

import "server-only"
import type { NextApiRequest, NextApiResponse } from "next"
import twilio from "twilio"

// Force Node.js runtime (Twilio is not Edge-compatible)
export const config = {
  runtime: "nodejs",
}

const {
  TWILIO_ACCOUNT_SID,
  TWILIO_AUTH_TOKEN,
  TWILIO_FROM_NUMBER,
} = process.env

if (!TWILIO_ACCOUNT_SID || !TWILIO_AUTH_TOKEN || !TWILIO_FROM_NUMBER) {
  throw new Error("Missing Twilio environment variables")
}

const twilioClient = twilio(
  TWILIO_ACCOUNT_SID,
  TWILIO_AUTH_TOKEN
)

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" })
  }

  const { to } = req.body

  if (!to) {
    return res.status(400).json({ error: "Missing destination number" })
  }

  try {
    const call = await twilioClient.calls.create({
      to,
      from: TWILIO_FROM_NUMBER,
      url: "https://handler.twilio.com/twiml/EHXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    })

    return res.status(200).json({ success: true, sid: call.sid })
  } catch (error: any) {
    return res.status(500).json({
      error: "Twilio provisioning failed",
      details: error?.message,
    })
  }
}
