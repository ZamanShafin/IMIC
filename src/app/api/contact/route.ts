import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { sendEmailNotification } from '@/lib/notifications';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const name = body.name || 'Valued Patient';
    const email = body.email || '';
    const phone = body.phone || '';
    const subject = body.subject || 'General Inquiry';
    const messageContent = body.message || '';

    const message = await db.contactMessage.create({
      data: {
        name,
        email,
        phone,
        subject,
        message: messageContent,
        status: 'NEW'
      }
    });

    // Notify info@imic.com.bd
    try {
      const adminEmail = process.env.ADMIN_NOTIFICATION_EMAIL || 'info@imic.com.bd, zamanshafin64@gmail.com';
      await sendEmailNotification({
        to: adminEmail,
        subject: `[IMIC Inquiry] New Contact Message: ${name} — ${subject}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; color: #1e293b;">
            <div style="background-color: #0f172a; padding: 20px; color: #ffffff; text-align: center;">
              <h2 style="margin: 0; color: #0d9488; font-size: 18px; text-transform: uppercase;">IMIC — New Contact Message</h2>
            </div>
            <div style="padding: 24px; background-color: #f8fafc;">
              <table style="width: 100%; border-collapse: collapse; font-size: 14px; margin-bottom: 16px;">
                <tr>
                  <td style="padding: 6px 0; font-weight: bold; width: 30%; color: #64748b;">Sender Name:</td>
                  <td style="padding: 6px 0; font-weight: bold; color: #0f172a;">${name}</td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; font-weight: bold; color: #64748b;">Phone:</td>
                  <td style="padding: 6px 0;"><a href="tel:${phone}" style="color: #0d9488; font-weight: bold; text-decoration: none;">${phone}</a></td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; font-weight: bold; color: #64748b;">Email:</td>
                  <td style="padding: 6px 0;">${email ? `<a href="mailto:${email}" style="color: #0d9488; text-decoration: none;">${email}</a>` : '<span style="color: #94a3b8;">Not provided</span>'}</td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; font-weight: bold; color: #64748b;">Subject:</td>
                  <td style="padding: 6px 0; font-weight: bold; color: #0f172a;">${subject}</td>
                </tr>
              </table>
              <div style="background-color: #ffffff; padding: 16px; border-radius: 8px; border: 1px solid #e2e8f0;">
                <h4 style="margin: 0 0 8px 0; color: #0f172a; font-size: 13px; text-transform: uppercase;">Message:</h4>
                <p style="margin: 0; font-size: 14px; line-height: 1.6; color: #334155; white-space: pre-wrap;">${messageContent}</p>
              </div>
            </div>
          </div>
        `
      });
    } catch (notifyErr) {
      console.error('Contact email notification error:', notifyErr);
    }

    return NextResponse.json({ success: true, messageId: message.id });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
