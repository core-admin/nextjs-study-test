import { NextResponse } from 'next/server';

export async function GET() {
  console.log('GET >>> /api/limiter/off');
  return NextResponse.json({ data: 'limiter/off' });
}
