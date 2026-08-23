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

    // Notify Patient via SMS & Email
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
          html: `<h3>Thank you for choosing IMIC</h3><p>Your appointment booking reference code is <strong>${refNumber}</strong>.</p><p>Our international medical coordination desk in Dhaka is coordinating with partner hospitals in ${destinationCountry} and will contact you directly within 2 hours.</p>`
        });
      }
    } catch (notifyErr) {
      console.error('Notification dispatch note:', notifyErr);
    }

    return NextResponse.json({ success: true, refNumber, bookingId });
  } catch (error: any) {
    console.error('Booking API error:', error);
    return NextResponse.json({ error: error.message || 'Failed to submit appointment request' }, { status: 500 });
  }
}
