import { NextResponse } from 'next/server';

export async function GET() {
  const demoMode = !process.env.MIDTRANS_SERVER_KEY || !process.env.MIDTRANS_CLIENT_KEY;

  return NextResponse.json({
    demoMode,
    clientKey: process.env.MIDTRANS_CLIENT_KEY || null,
    isProduction: process.env.MIDTRANS_IS_PRODUCTION === 'true',
    pixelId: process.env.NEXT_PUBLIC_META_PIXEL_ID || null,
  });
}
