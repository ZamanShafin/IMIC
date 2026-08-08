import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { generateRefNumber } from '@/lib/utils';
import { sendEmailNotification, GenericSmsAdapter } from '@/lib/notifications';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const refNumber = generateRefNumber();

    const booking = await db.booking.create({
      data: {
        refNumber,
        patientName: body.patientName,
        patientPhone: body.patientPhone,
        patientEmail: body.patientEmail,
        whatsappNumber: body.whatsappNumber || body.patientPhone,
        dob: body.dob || null,
        gender: body.gender || 'Male',
        countryRes: body.countryRes || 'Bangladesh',
        country: body.country,
        hospitalId: body.hospital || null,
        preferredDateStart: body.preferredDateStart || null,
        preferredDateEnd: body.preferredDateEnd || null,
        notes: body.notes || null,
        status: 'PENDING'
      }
    });

    // Notify Patient via SMS & Email simulation
    const smsAdapter = new GenericSmsAdapter();
    await smsAdapter.sendSms({
      to: body.patientPhone,
      message: `Dear ${body.patientName}, your IMIC appointment booking request (${refNumber}) is received. CPAC Dhaka will call you shortly.`
    });

    await sendEmailNotification({
      to: body.patientEmail,
      subject: `IMIC Booking Request Received — ${refNumber}`,
      html: `<h3>Thank you for choosing IMIC</h3><p>Your booking reference is <strong>${refNumber}</strong>.</p><p>We are coordinating with partner hospitals in ${body.country || 'abroad'} and will update your status shortly.</p>`
    });

    return NextResponse.json({ success: true, refNumber, bookingId: booking.id });
  } catch (error: any) {
    console.error('Booking error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
