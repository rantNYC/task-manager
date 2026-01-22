import { NextResponse } from 'next/server';
import { createUser } from '@/lib/core/core';

export async function POST(req: Request) {
  try {
    const { email, name, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
    }

    const user = await createUser(email, password, name);

    return NextResponse.json({ success: true, user }, { status: 201 });
  } catch (err) {
    console.error('Error creating user', err);
    const error = err as Error;
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}