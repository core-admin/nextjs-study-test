import { NextResponse } from 'next/server';

export async function GET() {
  console.log('GET >>> /api/limiter/on');
  return NextResponse.json({ data: 'limiter/on' });
}
