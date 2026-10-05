// Penyimpanan order sederhana berbasis file JSON.
// Cukup untuk testing/awal jualan di hosting Node biasa (VPS/Railway/Render).
//
// ⚠️ CATATAN KALAU DEPLOY KE VERCEL (serverless):
// Filesystem di Vercel bersifat "read-only" kecuali folder /tmp, dan /tmp tidak
// persisten antar request. Artinya data order BISA HILANG sewaktu-waktu di Vercel.
// Untuk produksi serius, ganti dengan database sungguhan (Supabase/Postgres/MongoDB).
// Yang penting: event Meta CAPI & notifikasi WhatsApp tetap terkirim real-time dari
// webhook tanpa bergantung ke store ini, jadi tracking iklan tidak akan macet.

import fs from 'fs';
import path from 'path';

const DB_FILE = path.join(process.env.VERCEL ? '/tmp' : process.cwd(), 'orders.json');

function readAll() {
  if (!fs.existsSync(DB_FILE)) return {};
  try {
    return JSON.parse(fs.readFileSync(DB_FILE, 'utf-8'));
  } catch {
    return {};
  }
}

function writeAll(data) {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
  } catch (err) {
    console.error('Gagal menyimpan order (non-fatal):', err.message);
  }
}

export function saveOrder(order) {
  const all = readAll();
  all[order.orderId] = order;
  writeAll(all);
  return order;
}

export function getOrder(orderId) {
  const all = readAll();
  return all[orderId];
}

export function updateOrderStatus(orderId, status, extra = {}) {
  const all = readAll();
  if (!all[orderId]) {
    // fallback: tetap buat entri minimal supaya webhook tidak gagal total
    all[orderId] = { orderId };
  }
  all[orderId] = { ...all[orderId], status, ...extra, updatedAt: new Date().toISOString() };
  writeAll(all);
  return all[orderId];
}
