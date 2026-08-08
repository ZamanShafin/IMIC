import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const status = searchParams.get('status');
    const search = searchParams.get('search');

    const where: any = {};
    if (status) where.status = status;
    if (search) {
      where.OR = [
        { patientName: { contains: search } },
        { refNumber: { contains: search } },
        { patientPhone: { contains: search } }
      ];
    }

    const bookings = await db.booking.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      include: {
        specialty: true,
        hospital: true,
        documents: true
      }
    });

    return NextResponse.json({ bookings });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
