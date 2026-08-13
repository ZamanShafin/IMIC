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
  const resendApiKey = process.env.RESEND_API_KEY;
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  // 1. Resend API Dispatch
  if (resendApiKey) {
    try {
      const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${resendApiKey}`
        },
        body: JSON.stringify({
          from: process.env.EMAIL_FROM || 'IMIC Patient Care <onboarding@resend.dev>',
          to: [to],
          subject,
          html
        })
      });

      const data = await res.json();
      if (res.ok) {
        console.log('Resend Email sent successfully:', data.id);
        return { success: true, emailId: data.id };
      } else {
        console.error('Resend Email Error:', data);
        return { success: false, error: data.message };
      }
    } catch (err: any) {
      console.error('Resend API Fetch Error:', err);
    }
  }

  // 2. Nodemailer SMTP Fallback
  if (host && user && pass) {
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

  console.log(`[Email Note] No RESEND_API_KEY or SMTP_HOST configured. Logged email to ${to}`);
  return { success: true, simulated: true };
}

export function generateWhatsAppUrl(phone = '+8801777995995', text?: string) {
  const cleanPhone = phone.replace(/[^0-9+]/g, '');
  const encodedText = text ? encodeURIComponent(text) : encodeURIComponent('Hello IMIC, I would like to inquire about medical treatment abroad.');
  return `https://wa.me/${cleanPhone}?text=${encodedText}`;
}
