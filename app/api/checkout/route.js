import { NextResponse } from 'next/server';
import midtransClient from 'midtrans-client';
import { saveOrder } from '@/lib/ordersStore';
import { sendCapiEvent } from '@/lib/metaCapi';

const MIDTRANS_SERVER_KEY = process.env.MIDTRANS_SERVER_KEY || '';
const MIDTRANS_CLIENT_KEY = process.env.MIDTRANS_CLIENT_KEY || '';
const IS_PRODUCTION = process.env.MIDTRANS_IS_PRODUCTION === 'true';
const DEMO_MODE = !MIDTRANS_SERVER_KEY || !MIDTRANS_CLIENT_KEY;

function getSnapClient() {
  return new midtransClient.Snap({
    isProduction: IS_PRODUCTION,
    serverKey: MIDTRANS_SERVER_KEY,
    clientKey: MIDTRANS_CLIENT_KEY,
  });
}

export async function POST(req) {
  try {
    const body = await req.json();
    const { packageId, packageName, qtyLabel, price, customer } = body;

    if (!packageId || !price || !customer?.name || !customer?.phone) {
      return NextResponse.json({ error: 'Data pesanan tidak lengkap.' }, { status: 400 });
    }

    const orderId = `BM-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

    const order = {
      orderId,
      packageId,
      packageName,
      qtyLabel,
      price,
      customer,
      status: 'pending',
      createdAt: new Date().toISOString(),
    };

    if (DEMO_MODE) {
      saveOrder({ ...order, demo: true });
      return NextResponse.json({
        demoMode: true,
        orderId,
        message: 'Mode demo aktif: transaksi disimulasikan (belum ada payment gateway asli terpasang).',
      });
    }

    const snap = getSnapClient();

    const parameter = {
      transaction_details: { order_id: orderId, gross_amount: price },
      item_details: [
        { id: packageId, price, quantity: 1, name: `${packageName} - ${qtyLabel}`.slice(0, 50) },
      ],
      customer_details: {
        first_name: customer.name,
        phone: customer.phone,
        shipping_address: { address: customer.address || '-' },
      },
    };

    const transaction = await snap.createTransaction(parameter);
    saveOrder({ ...order, snapToken: transaction.token });

    sendCapiEvent({
      eventName: 'InitiateCheckout',
      eventId: `initiate-${orderId}`,
      eventSourceUrl: req.headers.get('referer'),
      userData: {
        phone: customer.phone,
        ip: req.headers.get('x-forwarded-for'),
        userAgent: req.headers.get('user-agent'),
      },
      customData: { value: price, currency: 'IDR', content_name: packageName },
    });

    return NextResponse.json({
      demoMode: false,
      orderId,
      token: transaction.token,
      redirectUrl: transaction.redirect_url,
    });
  } catch (err) {
    console.error('Checkout error:', err);
    return NextResponse.json({ error: 'Gagal membuat transaksi. Coba lagi.' }, { status: 500 });
  }
}
