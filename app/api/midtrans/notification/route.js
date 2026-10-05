import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { updateOrderStatus } from '@/lib/ordersStore';
import { sendCapiEvent } from '@/lib/metaCapi';

const MIDTRANS_SERVER_KEY = process.env.MIDTRANS_SERVER_KEY || '';
const DEMO_MODE = !MIDTRANS_SERVER_KEY || !process.env.MIDTRANS_CLIENT_KEY;

// Endpoint ini yang didaftarkan sebagai "Payment Notification URL" di dashboard Midtrans:
// https://domainmu.com/api/midtrans/notification
export async function POST(req) {
  if (DEMO_MODE) {
    return NextResponse.json({ error: 'Mode demo tidak memakai webhook ini' }, { status: 400 });
  }

  try {
    const notification = await req.json();
    const { order_id, status_code, gross_amount, signature_key, transaction_status, fraud_status } = notification;

    const expectedSignature = crypto
      .createHash('sha512')
      .update(order_id + status_code + gross_amount + MIDTRANS_SERVER_KEY)
      .digest('hex');

    if (signature_key !== expectedSignature) {
      return NextResponse.json({ error: 'Signature tidak valid' }, { status: 403 });
    }

    let newStatus = 'pending';
    if (transaction_status === 'capture' || transaction_status === 'settlement') {
      newStatus = fraud_status === 'accept' || !fraud_status ? 'paid' : 'pending_review';
    } else if (['cancel', 'deny', 'expire'].includes(transaction_status)) {
      newStatus = 'failed';
    }

    const order = updateOrderStatus(order_id, newStatus, { midtransStatus: transaction_status });

    if (newStatus === 'paid' && order) {
      await sendCapiEvent({
        eventName: 'Purchase',
        eventId: `purchase-${order_id}`,
        userData: { phone: order.customer?.phone },
        customData: { value: order.price, currency: 'IDR', content_name: order.packageName },
      });

      if (process.env.FONNTE_TOKEN && process.env.ADMIN_WHATSAPP_NUMBER) {
        try {
          await fetch('https://api.fonnte.com/send', {
            method: 'POST',
            headers: { Authorization: process.env.FONNTE_TOKEN, 'Content-Type': 'application/json' },
            body: JSON.stringify({
              target: process.env.ADMIN_WHATSAPP_NUMBER,
              message: `🎉 Pesanan baru LUNAS!\nOrder: ${order_id}\nPaket: ${order.packageName}\nNama: ${order.customer?.name}\nHP: ${order.customer?.phone}\nTotal: Rp${Number(order.price).toLocaleString('id-ID')}`,
            }),
          });
        } catch (e) {
          console.error('Gagal kirim notifikasi WA:', e.message);
        }
      }
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('Webhook error:', err);
    return NextResponse.json({ error: 'Gagal memproses notifikasi' }, { status: 500 });
  }
}
