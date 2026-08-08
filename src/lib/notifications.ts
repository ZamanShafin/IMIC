import nodemailer from 'nodemailer';

export interface SmsPayload {
  to: string;
  message: string;
}

export interface SmsGatewayProvider {
  sendSms(payload: SmsPayload): Promise<{ success: boolean; messageId?: string; error?: string }>;
}

// Default pluggable SMS adapter for Bangladesh providers (SSL Wireless / Alpha SMS REST APIs)
export class GenericSmsAdapter implements SmsGatewayProvider {
  private apiUrl: string;
  private apiKey: string;

  constructor(apiUrl = process.env.SMS_API_URL || '', apiKey = process.env.SMS_API_KEY || '') {
    this.apiUrl = apiUrl;
    this.apiKey = apiKey;
  }

  async sendSms(payload: SmsPayload) {
    if (!this.apiUrl || !this.apiKey) {
      console.log(`[SMS Simulation] To: ${payload.to} | Message: ${payload.message}`);
      return { success: true, messageId: 'simulated-sms-id-' + Date.now() };
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
      return { success: false, error: err.message };
    }
  }
}

export async function sendEmailNotification({ to, subject, html }: { to: string; subject: string; html: string }) {
  if (!process.env.SMTP_HOST) {
    console.log(`[Email Simulation] To: ${to} | Subject: ${subject}`);
    return { success: true, simulated: true };
  }

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: `"IMIC Patient Assistance" <${process.env.SMTP_FROM || 'info@imic.com.bd'}>`,
      to,
      subject,
      html,
    });
    return { success: true };
  } catch (error: any) {
    console.error('Email notification error:', error);
    return { success: false, error: error.message };
  }
}

export function generateWhatsAppUrl(phone = '+8801777995995', text?: string) {
  const cleanPhone = phone.replace(/[^0-9+]/g, '');
  const encodedText = text ? encodeURIComponent(text) : encodeURIComponent('Hello IMIC, I would like to inquire about medical treatment abroad.');
  return `https://wa.me/${cleanPhone}?text=${encodedText}`;
}
