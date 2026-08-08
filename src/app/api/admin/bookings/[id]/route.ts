import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  try {
    const body = await req.json();

    const booking = await db.booking.update({
      where: { id: params.id },
      data: {
        status: body.status,
        staffNotes: body.staffNotes,
        staffHandlerId: body.staffHandlerId
      }
    });

    return NextResponse.json({ success: true, booking });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
