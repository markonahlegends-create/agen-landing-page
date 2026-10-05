import { NextResponse } from 'next/server';
import { updateOrderStatus } from '@/lib/ordersStore';
import { sendCapiEvent } from '@/lib/metaCapi';

const DEMO_MODE = !process.env.MIDTRANS_SERVER_KEY || !process.env.MIDTRANS_CLIENT_KEY;

export async function POST(req, { params }) {
  if (!DEMO_MODE) {
    return NextResponse.json({ error: 'Hanya tersedia di mode demo' }, { status: 400 });
  }

  const { orderId } = await params;
  const order = updateOrderStatus(orderId, 'paid');

  sendCapiEvent({
    eventName: 'Purchase',
    eventId: `purchase-${orderId}`,
    userData: { phone: order?.customer?.phone },
    customData: { value: order?.price, currency: 'IDR', content_name: order?.packageName },
  });

  return NextResponse.json(order);
}
