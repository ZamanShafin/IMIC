import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { sendEmailNotification } from '@/lib/notifications';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const name = body.name || 'Valued Patient';
    const phone = body.phone || '';
    const email = body.email || '';
    const country = body.country || 'Singapore';
    const specialty = body.specialty || '';
    const timeframe = body.timeframe || 'Within 2 weeks';
    const message = body.message || '';

    const quote = await db.quoteRequest.create({
      data: {
        name,
        phone,
        email,
        country,
        specialty,
        timeframe,
        message,
        status: 'NEW'
      }
    });

    // Notify info@imic.com.bd
    try {
      const primaryAdmin = process.env.ADMIN_NOTIFICATION_EMAIL || 'info@imic.com.bd';
      const backupAdmin = process.env.BACKUP_ADMIN_NOTIFICATION_EMAIL || 'zamanshafin64@gmail.com';

      await sendEmailNotification({
        to: primaryAdmin,
        bcc: backupAdmin,
        subject: `New Medical Quote Request: ${name} (${country})`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; color: #1e293b;">
            <div style="background-color: #0f172a; padding: 20px; color: #ffffff; text-align: center;">
              <h2 style="margin: 0; color: #0d9488; font-size: 18px; text-transform: uppercase;">IMIC — New Quote Request</h2>
            </div>
            <div style="padding: 24px; background-color: #f8fafc;">
              <table style="width: 100%; border-collapse: collapse; font-size: 14px; margin-bottom: 16px;">
                <tr>
                  <td style="padding: 6px 0; font-weight: bold; width: 30%; color: #64748b;">Patient Name:</td>
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
                  <td style="padding: 6px 0; font-weight: bold; color: #64748b;">Target Country:</td>
                  <td style="padding: 6px 0; font-weight: bold; color: #0f172a;">${country}</td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; font-weight: bold; color: #64748b;">Specialty:</td>
                  <td style="padding: 6px 0; color: #0f172a;">${specialty}</td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; font-weight: bold; color: #64748b;">Timeframe:</td>
                  <td style="padding: 6px 0; color: #0f172a;">${timeframe}</td>
                </tr>
              </table>
              <div style="background-color: #ffffff; padding: 16px; border-radius: 8px; border: 1px solid #e2e8f0;">
                <h4 style="margin: 0 0 8px 0; color: #0f172a; font-size: 13px; text-transform: uppercase;">Inquiry Details:</h4>
                <p style="margin: 0; font-size: 14px; line-height: 1.6; color: #334155; white-space: pre-wrap;">${message}</p>
              </div>
            </div>
          </div>
        `
      });
    } catch (notifyErr) {
      console.error('Quote email notification error:', notifyErr);
    }

    return NextResponse.json({ success: true, quoteId: quote.id });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
