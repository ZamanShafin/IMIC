import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const message = await db.contactMessage.create({
      data: {
        name: body.name,
        email: body.email,
        phone: body.phone,
        subject: body.subject || 'General Inquiry',
        message: body.message,
        status: 'NEW'
      }
    });

    return NextResponse.json({ success: true, messageId: message.id });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
