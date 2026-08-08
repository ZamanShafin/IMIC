import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const quote = await db.quoteRequest.create({
      data: {
        name: body.name,
        phone: body.phone,
        email: body.email,
        country: body.country,
        specialty: body.specialty,
        timeframe: body.timeframe || 'Within 2 weeks',
        message: body.message,
        status: 'NEW'
      }
    });

    return NextResponse.json({ success: true, quoteId: quote.id });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
