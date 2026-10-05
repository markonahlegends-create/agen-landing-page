// Script bantu testing koneksi Midtrans — JALANKAN DI KOMPUTERMU SENDIRI
// (bukan di sandbox AI), karena butuh akses internet penuh ke server Midtrans.
//
// Cara pakai:
//   1. Pastikan .env sudah diisi MIDTRANS_SERVER_KEY & MIDTRANS_CLIENT_KEY
//   2. Jalankan: npm run test:midtrans
//
// Script ini akan membuat 1 transaksi dummy (Rp10.000) ke Midtrans dan menampilkan
// hasilnya. Kalau berhasil dapat "Snap Token", artinya kredensial & koneksi sudah benar.

import 'dotenv/config';
import midtransClient from 'midtrans-client';

const SERVER_KEY = process.env.MIDTRANS_SERVER_KEY;
const CLIENT_KEY = process.env.MIDTRANS_CLIENT_KEY;
const IS_PRODUCTION = process.env.MIDTRANS_IS_PRODUCTION === 'true';

console.log('\n==============================================');
console.log('  TES KONEKSI MIDTRANS — Buku Mimpi');
console.log('==============================================\n');

if (!SERVER_KEY || !CLIENT_KEY) {
  console.error('❌ MIDTRANS_SERVER_KEY / MIDTRANS_CLIENT_KEY belum diisi di file .env');
  console.error('   Isi dulu sebelum menjalankan script ini.\n');
  process.exit(1);
}

console.log(`Mode        : ${IS_PRODUCTION ? '🔴 PRODUCTION (uang asli!)' : '🟡 SANDBOX (simulasi)'}`);
console.log(`Server Key  : ${SERVER_KEY.slice(0, 12)}...`);
console.log(`Client Key  : ${CLIENT_KEY.slice(0, 12)}...\n`);

if (IS_PRODUCTION) {
  console.log('⚠️  Kamu akan membuat transaksi PRODUCTION. Pastikan ini benar-benar disengaja.');
  console.log('    (Transaksi dummy ini tidak otomatis menagih siapa pun, tapi akan tercatat di dashboard.)\n');
}

const snap = new midtransClient.Snap({
  isProduction: IS_PRODUCTION,
  serverKey: SERVER_KEY,
  clientKey: CLIENT_KEY,
});

const orderId = `TEST-${Date.now()}`;

try {
  console.log(`Membuat transaksi tes (Order ID: ${orderId}, Rp10.000)...\n`);

  const transaction = await snap.createTransaction({
    transaction_details: { order_id: orderId, gross_amount: 10000 },
    item_details: [{ id: 'test-item', price: 10000, quantity: 1, name: 'Tes Koneksi Buku Mimpi' }],
    customer_details: { first_name: 'Tes Koneksi', phone: '081200000000' },
  });

  console.log('✅ BERHASIL! Koneksi & kredensial Midtrans valid.\n');
  console.log('Snap Token  :', transaction.token);
  console.log('Redirect URL:', transaction.redirect_url);
  console.log('\nBuka Redirect URL di atas pakai browser untuk melihat halaman pembayaran');
  console.log('(kalau mode sandbox, kamu bisa simulasikan pembayaran dengan kartu/akun tes Midtrans).');
  console.log('\nLangkah selanjutnya: coba alur checkout penuh lewat landing page (npm run dev),');
  console.log('lalu cek apakah status order berubah "paid" otomatis setelah bayar (butuh webhook via ngrok aktif).');
} catch (err) {
  console.error('❌ GAGAL membuat transaksi.\n');
  if (err?.ApiResponse) {
    console.error('Detail error dari Midtrans:', JSON.stringify(err.ApiResponse, null, 2));
  } else {
    console.error('Detail error:', err.message || err);
  }
  console.error('\nKemungkinan penyebab:');
  console.error('- Server Key / Client Key salah ketik atau tertukar (server key harus dimulai SB-Mid-server- / Mid-server-)');
  console.error('- MIDTRANS_IS_PRODUCTION tidak sesuai dengan jenis key yang dipakai (key sandbox dipakai di mode production atau sebaliknya)');
  console.error('- Akun Midtrans belum aktif/disetujui untuk mode Production\n');
  process.exit(1);
}
