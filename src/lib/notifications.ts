import nodemailer from 'nodemailer';

export interface SmsPayload {
  to: string;
  message: string;
}

export interface SmsGatewayProvider {
  sendSms(payload: SmsPayload): Promise<{ success: boolean; messageId?: string; error?: string }>;
}

// Pluggable SMS adapter for Bangladesh providers (SSL Wireless / Alpha SMS REST APIs)
export class GenericSmsAdapter implements SmsGatewayProvider {
  private apiUrl: string;
  private apiKey: string;

  constructor(apiUrl = process.env.SMS_API_URL || '', apiKey = process.env.SMS_API_KEY || '') {
    this.apiUrl = apiUrl;
    this.apiKey = apiKey;
  }

  async sendSms(payload: SmsPayload) {
    if (!this.apiUrl || !this.apiKey) {
      console.log(`[SMS Gateway Note] No SMS_API_URL configured. SMS to ${payload.to} logged.`);
      return { success: true, messageId: 'simulated-sms-' + Date.now() };
    }

    try {
      const res = await fetch(this.apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${this.apiKey}` },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      return { success: res.ok, messageId: data.messageId };
    } catch (err: any) {
      console.error('SMS Gateway Error:', err);
      return { success: false, error: err.message };
    }
  }
}

export async function sendEmailNotification({ to, subject, html }: { to: string; subject: string; html: string }) {
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass) {
    console.log(`[Email Note] No SMTP_HOST configured. Email to ${to} logged.`);
    return { success: true, simulated: true };
  }

  try {
    const transporter = nodemailer.createTransport({
      host,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: Number(process.env.SMTP_PORT) === 465,
      auth: { user, pass },
    });

    await transporter.sendMail({
      from: `"IMIC Patient Assistance" <${process.env.SMTP_FROM || user}>`,
      to,
      subject,
      html,
    });
    return { success: true };
  } catch (error: any) {
    console.error('SMTP Email Error:', error);
    return { success: false, error: error.message };
  }
}

export function generateWhatsAppUrl(phone = '+8801777995995', text?: string) {
  const cleanPhone = phone.replace(/[^0-9+]/g, '');
  const encodedText = text ? encodeURIComponent(text) : encodeURIComponent('Hello IMIC, I would like to inquire about medical treatment abroad.');
  return `https://wa.me/${cleanPhone}?text=${encodedText}`;
}
