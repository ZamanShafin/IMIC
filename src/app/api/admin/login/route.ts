import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { cookies } from 'next/headers';

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    // Check user in database
    const user = await db.user.findUnique({
      where: { email }
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 401 });
    }

    // Set cookie session
    const cookieStore = cookies();
    cookieStore.set('imic_admin_session', JSON.stringify({ id: user.id, email: user.email, role: user.role, name: user.name }), {
      httpOnly: true,
      secure: false,
      path: '/',
      maxAge: 60 * 60 * 24 * 7 // 7 days
    });

    return NextResponse.json({ success: true, user: { id: user.id, name: user.name, role: user.role } });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
