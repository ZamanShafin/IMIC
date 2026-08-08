import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const refNumber = searchParams.get('refNumber');

    if (!refNumber) {
      return NextResponse.json({ error: 'Reference number is required' }, { status: 400 });
    }

    const booking = await db.booking.findUnique({
      where: { refNumber },
      include: {
        specialty: true,
        hospital: true,
        documents: true
      }
    });

    if (!booking) {
      return NextResponse.json({ error: 'Booking not found' }, { status: 404 });
    }

    return NextResponse.json({ booking });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
