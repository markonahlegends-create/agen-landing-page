// Mengirim event ke Meta (Facebook) Conversions API — tracking server-side.
// Kenapa perlu server-side (bukan cuma pixel di browser)?
// Karena ad blocker / Safari ITP / iOS14+ banyak memblokir pixel browser,
// sehingga data konversi yang sampai ke Meta jadi tidak akurat & iklan susah dioptimasi.
// Dokumentasi: https://developers.facebook.com/docs/marketing-api/conversions-api

import crypto from 'crypto';

const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID;
const ACCESS_TOKEN = process.env.META_CAPI_ACCESS_TOKEN;

function hash(value) {
  if (!value) return undefined;
  return crypto.createHash('sha256').update(String(value).trim().toLowerCase()).digest('hex');
}

export async function sendCapiEvent({ eventName, eventId, eventSourceUrl, userData = {}, customData = {}, actionSource = 'website' }) {
  if (!PIXEL_ID || !ACCESS_TOKEN) {
    console.warn(`[Meta CAPI] Dilewati (belum dikonfigurasi). Event "${eventName}" tidak dikirim.`);
    return { skipped: true };
  }

  const payload = {
    data: [
      {
        event_name: eventName,
        event_time: Math.floor(Date.now() / 1000),
        event_id: eventId,
        event_source_url: eventSourceUrl,
        action_source: actionSource,
        user_data: {
          ph: userData.phone ? [hash(userData.phone)] : undefined,
          client_ip_address: userData.ip,
          client_user_agent: userData.userAgent,
          fbp: userData.fbp,
          fbc: userData.fbc,
        },
        custom_data: customData,
      },
    ],
  };

  try {
    const res = await fetch(`https://graph.facebook.com/v20.0/${PIXEL_ID}/events?access_token=${ACCESS_TOKEN}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    const json = await res.json();
    if (!res.ok) {
      console.error('[Meta CAPI] Gagal mengirim event:', json);
    }
    return json;
  } catch (err) {
    console.error('[Meta CAPI] Error:', err.message);
    return { error: err.message };
  }
}
