import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  try {
    const bookings = await db.booking.findMany({
      orderBy: { createdAt: 'desc' },
      include: { hospital: true, specialty: true }
    });

    const csvRows = [
      ['Ref Code', 'Patient Name', 'Phone', 'Email', 'Country', 'Hospital', 'Specialty', 'Status', 'Created At']
    ];

    for (const b of bookings) {
      csvRows.push([
        b.refNumber,
        `"${b.patientName.replace(/"/g, '""')}"`,
        b.patientPhone,
        b.patientEmail,
        b.country || '',
        `"${(b.hospital?.name || b.hospitalId || '').replace(/"/g, '""')}"`,
        `"${(b.specialty?.name || '').replace(/"/g, '""')}"`,
        b.status,
        new Date(b.createdAt).toISOString()
      ]);
    }

    const csvContent = csvRows.map((r) => r.join(',')).join('\n');

    return new NextResponse(csvContent, {
      status: 200,
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': `attachment; filename="IMIC_Analytics_Report_${new Date().toISOString().slice(0, 10)}.csv"`
      }
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
