import { NextResponse } from 'next/server';
import { getOrder } from '@/lib/ordersStore';

export async function GET(req, { params }) {
  const { orderId } = await params;
  const order = getOrder(orderId);
  if (!order) return NextResponse.json({ error: 'Order tidak ditemukan' }, { status: 404 });
  return NextResponse.json(order);
}
