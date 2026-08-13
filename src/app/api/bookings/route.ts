import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { generateRefNumber } from '@/lib/utils';
import { sendEmailNotification, GenericSmsAdapter } from '@/lib/notifications';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const refNumber = generateRefNumber();

    // Match hospital by ID, name, or slug if passed
    let validHospitalId: string | null = null;
    if (body.hospital) {
      try {
        const foundHospital = await db.hospital.findFirst({
          where: {
            OR: [
              { id: body.hospital },
              { name: { equals: body.hospital } },
              { slug: { equals: body.hospital } }
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
    if (body.specialty) {
      try {
        const foundSpecialty = await db.specialty.findFirst({
          where: {
            OR: [
              { id: body.specialty },
              { name: { contains: body.specialty } }
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
      body.specialty ? `Specialty: ${body.specialty}` : null,
      body.hospital ? `Hospital Choice: ${body.hospital}` : null,
      body.doctor ? `Doctor Choice: ${body.doctor}` : null,
      body.notes ? `Additional Medical Notes: ${body.notes}` : null
    ].filter(Boolean).join('\n');

    // Create authentic booking record in Supabase Database
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
        country: body.country || 'Singapore',
        hospitalId: validHospitalId,
        specialtyId: validSpecialtyId,
        preferredDateStart: body.preferredDateStart || null,
        preferredDateEnd: body.preferredDateEnd || null,
        notes: noteDetails,
        status: 'PENDING'
      }
    });

    // Notify Patient via SMS & Email
    try {
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
    } catch (notifyErr) {
      console.error('Notification dispatch note:', notifyErr);
    }

    return NextResponse.json({ success: true, refNumber, bookingId: booking.id });
  } catch (error: any) {
    console.error('Booking creation error:', error);
    return NextResponse.json({ error: error.message || 'Failed to submit booking' }, { status: 500 });
  }
}
