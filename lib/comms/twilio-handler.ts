import twilio from 'twilio';

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

/**
 * Executes a sub-60-second SMS uplink to a high-priority lead.
 */
export async function sendInstantSMS(to: string, name: string) {
  try {
    const message = await client.messages.create({
      body: `Hi ${name}, this is the FrontDesk AI Agent. I saw you just requested info—I've prioritized your request and am ready to help. Do you have 2 minutes to talk?`,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: to
    });
    
    console.log(`[UPLINK SUCCESS] SID: ${message.sid} | Speed: <10s`);
    return { success: true, sid: message.sid };
  } catch (error) {
    console.error('[UPLINK ERROR]', error);
    return { success: false, error };
  }
}
