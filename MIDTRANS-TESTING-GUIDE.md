# Panduan Setup & Testing Midtrans — Buku Mimpi

> ⚠️ **Jalankan semua langkah di bawah di komputermu sendiri** (bukan di sandbox AI), karena
> sandbox ini hanya boleh mengakses internet ke domain terbatas (GitHub, npm) dan **tidak bisa**
> konek ke server Midtrans. Ini batasan keamanan sandbox, bukan masalah di kode kamu.

## Langkah 0 — Ambil kode terbaru
Pastikan kamu sudah menarik (pull) semua perubahan terbaru dari branch `arena/01a10a27-agen-landing-page`
ke komputermu, lalu install dependency:

```bash
npm install
```

## Langkah 1 — Cek status akun Midtrans
1. Buka **dashboard.midtrans.com** → login.
2. Lihat toggle di pojok kiri atas: **Sandbox** / **Production**.
3. Klik **Settings → Access Keys**.
   - Kalau di mode **Sandbox**, kamu akan lihat `Server Key` (diawali `SB-Mid-server-`) dan
     `Client Key` (diawali `SB-Mid-client-`).
   - Kalau menu **Production** masih menampilkan tombol "Ajukan Aktivasi" / "Lengkapi Profil Bisnis",
     berarti akunmu baru Sandbox — itu **tidak masalah**, kita mulai dari situ dulu.

## Langkah 2 — Isi `.env` dengan key Sandbox
Buka file `.env` di root project, isi:

```
MIDTRANS_SERVER_KEY=SB-Mid-server-xxxxxxxxxxxxxxxxxxxxx
MIDTRANS_CLIENT_KEY=SB-Mid-client-xxxxxxxxxxxxxxxxxxxxx
MIDTRANS_IS_PRODUCTION=false
```

## Langkah 3 — Jalankan tes koneksi otomatis
```bash
npm run test:midtrans
```
- ✅ Kalau muncul **"BERHASIL! Koneksi & kredensial Midtrans valid"** beserta Snap Token → lanjut ke Langkah 4.
- ❌ Kalau gagal, baca pesan errornya — biasanya karena key salah ketik atau tertukar server/client key.
  Kirim pesan errornya ke saya, nanti saya bantu diagnosis.

## Langkah 4 — Tes alur checkout penuh di browser
```bash
npm run dev
```
Buka `http://localhost:3000`, klik **Pesan Sekarang**, isi form, klik **Lanjutkan Pembayaran**.
Popup Midtrans Snap akan muncul dengan pilihan QRIS/VA/kartu **simulasi** (karena masih Sandbox, bukan uang asli).

Untuk simulasi pembayaran sandbox:
- **Kartu kredit test**: gunakan nomor kartu test dari dokumentasi Midtrans
  (https://docs.midtrans.com/docs/testing-payment-on-sandbox) — contoh `4811 1111 1111 1114`, CVV `123`, expiry bebas (masa depan), OTP `112233`.
- **QRIS/VA simulasi**: Midtrans Sandbox menyediakan simulator pembayaran di halaman yang sama.

## Langkah 5 — Tes webhook (supaya status order auto-update)
Status pesanan baru akan otomatis berubah jadi "paid" kalau Midtrans berhasil mengirim notifikasi
ke endpoint `/api/midtrans/notification`. Di localhost, Midtrans tidak bisa mengirim ke `localhost`,
jadi perlu "jembatan" pakai **ngrok**:

```bash
# install ngrok dulu kalau belum: https://ngrok.com/download
ngrok http 3000
```

Ngrok akan kasih URL publik seperti `https://abcd1234.ngrok-free.app`. Lalu:
1. Buka **dashboard.midtrans.com → Settings → Configuration**.
2. Isi **Payment Notification URL** dengan: `https://abcd1234.ngrok-free.app/api/midtrans/notification`
3. Simpan, lalu ulangi tes checkout di Langkah 4.
4. Perhatikan terminal `npm run dev` — setelah pembayaran sandbox berhasil, harusnya muncul log dari
   webhook dan status order berubah "paid" (cek lewat `curl http://localhost:3000/api/order/<orderId>`).

## Langkah 6 — Baru pindah ke Production
Setelah semua di atas lolos tanpa masalah:
1. Ajukan/selesaikan aktivasi akun Production di dashboard Midtrans (perlu dokumen bisnis/KTP sesuai
   jenis akun kamu).
2. Ganti `.env`:
   ```
   MIDTRANS_SERVER_KEY=Mid-server-xxxxxxxxxxxxxxxxxxxxx
   MIDTRANS_CLIENT_KEY=Mid-client-xxxxxxxxxxxxxxxxxxxxx
   MIDTRANS_IS_PRODUCTION=true
   ```
3. Jalankan `npm run test:midtrans` lagi untuk pastikan key production valid.
4. Set ulang **Payment Notification URL** di dashboard Production (bukan Sandbox) ke domain asli kamu
   setelah deploy, misal `https://bukumimpi.com/api/midtrans/notification`.
5. Lakukan **1 transaksi kecil nyata** (Rp1.000–Rp5.000, bayar pakai uangmu sendiri) untuk pastikan
   betul-betul realtime sebelum menjalankan iklan ke publik.

## Kalau ada error, kirim ke saya:
- Screenshot/teks pesan error dari `npm run test:midtrans`
- Screenshot error di popup Snap (kalau ada)
- Log terminal `npm run dev` saat mencoba checkout

Saya bisa bantu diagnosis dari situ tanpa perlu kamu share Server Key/Client Key secara langsung di chat
(kalau perlu debug lebih dalam, cukup kirim 6 karakter pertamanya saja untuk memastikan formatnya benar).
