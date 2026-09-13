import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { generateRefNumber } from '@/lib/utils';
import { sendEmailNotification, GenericSmsAdapter } from '@/lib/notifications';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const refNumber = generateRefNumber();

    const patientName = body.patientName || body.name || 'Valued Patient';
    const patientPhone = body.patientPhone || body.phone || '';
    const patientEmail = body.patientEmail || body.email || '';
    const destinationCountry = body.country || body.preferredCountry || 'Singapore';
    const specialtyText = body.specialty || body.medicalSpecialty || '';
    const hospitalText = body.hospital || body.preferredHospital || '';
    const timeframeText = body.timeframe ? `Preferred Timeframe: ${body.timeframe}` : '';
    const messageText = body.message || body.notes || '';

    // Match hospital by ID, name, or slug if passed
    let validHospitalId: string | null = null;
    if (hospitalText) {
      try {
        const foundHospital = await db.hospital.findFirst({
          where: {
            OR: [
              { id: hospitalText },
              { name: { contains: hospitalText, mode: 'insensitive' } },
              { slug: { equals: hospitalText } }
            ]
          }
        });
        if (foundHospital) {
          validHospitalId = foundHospital.id;
        }
      } catch (e) {
        console.error('Hospital lookup note:', e);
      }
    }

    // Match specialty by name if passed
    let validSpecialtyId: string | null = null;
    if (specialtyText) {
      try {
        const foundSpecialty = await db.specialty.findFirst({
          where: {
            OR: [
              { id: specialtyText },
              { name: { contains: specialtyText, mode: 'insensitive' } }
            ]
          }
        });
        if (foundSpecialty) {
          validSpecialtyId = foundSpecialty.id;
        }
      } catch (e) {
        console.error('Specialty lookup note:', e);
      }
    }

    // Compose comprehensive authentic patient notes
    const noteDetails = [
      specialtyText ? `Specialty: ${specialtyText}` : null,
      hospitalText ? `Hospital Choice: ${hospitalText}` : null,
      timeframeText ? timeframeText : null,
      messageText ? `Patient Notes / Symptoms: ${messageText}` : null
    ].filter(Boolean).join('\n\n');

    // Create booking record in Supabase Database
    let bookingId = 'bk_' + Date.now();
    try {
      const booking = await db.booking.create({
        data: {
          refNumber,
          patientName,
          patientPhone,
          patientEmail: patientEmail || null,
          whatsappNumber: body.whatsappNumber || patientPhone,
          dob: body.dob || null,
          gender: body.gender || 'Male',
          countryRes: body.countryRes || 'Bangladesh',
          country: destinationCountry,
          hospitalId: validHospitalId,
          specialtyId: validSpecialtyId,
          preferredDateStart: body.preferredDateStart || null,
          preferredDateEnd: body.preferredDateEnd || null,
          notes: noteDetails,
          status: 'PENDING'
        }
      });
      bookingId = booking.id;
    } catch (dbErr) {
      console.error('DB booking insert note (fallback mode):', dbErr);
    }

    // Also record into QuoteRequest table for backwards compatibility
    try {
      await db.quoteRequest.create({
        data: {
          name: patientName,
          phone: patientPhone,
          email: patientEmail || '',
          country: destinationCountry,
          specialty: specialtyText,
          timeframe: body.timeframe || 'Immediate',
          message: noteDetails,
          status: 'PENDING'
        }
      });
    } catch (qErr) {
      // ignore if already recorded
    }

    const attachments = (body.attachments || []) as Array<{
      filename: string;
      content: string;
      contentType?: string;
    }>;

    // 1. Notify IMIC Admin Desk (info@imic.com.bd) with all details & attachments
    try {
      const adminEmailHtml = `
        <div style="font-family: Arial, sans-serif; max-width: 650px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; color: #1e293b;">
          <div style="background-color: #0f172a; padding: 24px; color: #ffffff; text-align: center;">
            <h2 style="margin: 0; color: #0d9488; font-size: 20px; text-transform: uppercase; letter-spacing: 1px;">IMIC — New Appointment Booking</h2>
            <p style="margin: 6px 0 0 0; font-size: 13px; color: #cbd5e1;">Reference Code: <strong>${refNumber}</strong></p>
          </div>
          
          <div style="padding: 24px; background-color: #f8fafc;">
            <h3 style="margin-top: 0; color: #0f172a; border-bottom: 2px solid #0d9488; padding-bottom: 8px;">Patient & Consultation Details</h3>
            <table style="width: 100%; border-collapse: collapse; font-size: 14px; margin-bottom: 20px;">
              <tr>
                <td style="padding: 8px 0; font-weight: bold; width: 35%; color: #64748b;">Patient Name:</td>
                <td style="padding: 8px 0; font-weight: bold; color: #0f172a;">${patientName}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #64748b;">Phone / WhatsApp:</td>
                <td style="padding: 8px 0;"><a href="tel:${patientPhone}" style="color: #0d9488; font-weight: bold; text-decoration: none;">${patientPhone}</a></td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #64748b;">Email Address:</td>
                <td style="padding: 8px 0;">${patientEmail ? `<a href="mailto:${patientEmail}" style="color: #0d9488; text-decoration: none;">${patientEmail}</a>` : '<span style="color: #94a3b8;">Not provided</span>'}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #64748b;">Destination Country:</td>
                <td style="padding: 8px 0; font-weight: bold; color: #0f172a;">${destinationCountry}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #64748b;">Selected Hospital:</td>
                <td style="padding: 8px 0; color: #0f172a;">${hospitalText || 'Undecided / Recommend Best Hospital'}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #64748b;">Medical Specialty / Condition:</td>
                <td style="padding: 8px 0; color: #0f172a;">${specialtyText || 'Not specified'}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #64748b;">Preferred Timeframe:</td>
                <td style="padding: 8px 0; color: #0f172a;">${body.timeframe || 'Within 2 weeks'}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #64748b;">Uploaded Documents:</td>
                <td style="padding: 8px 0; font-weight: bold; color: ${attachments.length > 0 ? '#0d9488' : '#64748b'};">${attachments.length > 0 ? `${attachments.length} file(s) attached to this email` : 'None attached'}</td>
              </tr>
            </table>

            <div style="background-color: #ffffff; padding: 16px; border-radius: 8px; border: 1px solid #e2e8f0; margin-bottom: 20px;">
              <h4 style="margin: 0 0 8px 0; color: #0f172a; font-size: 13px; text-transform: uppercase;">Medical Notes & Symptoms:</h4>
              <p style="margin: 0; font-size: 14px; line-height: 1.6; color: #334155; white-space: pre-wrap;">${messageText || 'No additional notes provided.'}</p>
            </div>

            ${patientPhone ? `
              <div style="text-align: center; margin-top: 20px;">
                <a href="https://wa.me/${patientPhone.replace(/[^0-9]/g, '')}" style="display: inline-block; background-color: #25D366; color: #ffffff; font-weight: bold; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-size: 14px;">Contact Patient on WhatsApp</a>
              </div>
            ` : ''}
          </div>

          <div style="background-color: #f1f5f9; padding: 12px; text-align: center; font-size: 12px; color: #64748b;">
            This is an automated notification from the IMIC Patient Portal (imic.com.bd).
          </div>
        </div>
      `;

      await sendEmailNotification({
        to: 'info@imic.com.bd',
        subject: `🚨 New Appointment Booking: ${patientName} (${destinationCountry}) — Ref: ${refNumber}`,
        html: adminEmailHtml,
        attachments: attachments.map(att => ({
          filename: att.filename,
          content: att.content,
          contentType: att.contentType
        }))
      });
    } catch (adminNotifyErr) {
      console.error('Admin notification dispatch error:', adminNotifyErr);
    }

    // 2. Notify Patient via SMS & Email
    try {
      if (patientPhone) {
        const smsAdapter = new GenericSmsAdapter();
        await smsAdapter.sendSms({
          to: patientPhone,
          message: `Dear ${patientName}, your IMIC appointment booking request (${refNumber}) has been received. CPAC Dhaka will call you shortly.`
        });
      }

      if (patientEmail) {
        await sendEmailNotification({
          to: patientEmail,
          subject: `IMIC Appointment Booking Received — Ref: ${refNumber}`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #1e293b;">
              <div style="background-color: #0f172a; padding: 20px; color: #ffffff; text-align: center; border-radius: 8px 8px 0 0;">
                <h2 style="margin: 0; color: #0d9488;">IMIC Bangladesh</h2>
                <p style="margin: 4px 0 0 0; font-size: 13px;">International Medical Information Center</p>
              </div>
              <div style="padding: 24px; border: 1px solid #e2e8f0; border-top: none; border-radius: 0 0 8px 8px; background-color: #ffffff;">
                <p>Dear <strong>${patientName}</strong>,</p>
                <p>Thank you for submitting your appointment request. Your booking reference number is <strong style="color: #0d9488; font-size: 16px;">${refNumber}</strong>.</p>
                <p>Our international medical coordination desk in Banani, Dhaka has received your request and any attached documents. We will contact you within 2 hours with available doctor slots, hospital recommendations, and estimated costs.</p>
                <div style="margin-top: 20px; padding: 12px; background-color: #f8fafc; border-radius: 6px; font-size: 13px;">
                  <strong>24/7 CPAC Hotline:</strong> +8801710802000 | +8801777995995<br/>
                  <strong>Email:</strong> info@imic.com.bd
                </div>
              </div>
            </div>
          `
        });
      }
    } catch (notifyErr) {
      console.error('Patient notification dispatch note:', notifyErr);
    }

    return NextResponse.json({ success: true, refNumber, bookingId });
  } catch (error: any) {
    console.error('Booking API error:', error);
    return NextResponse.json({ error: error.message || 'Failed to submit appointment request' }, { status: 500 });
  }
}
