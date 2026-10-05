# Buku Mimpi — Landing Page Jualan Buku Anak (Next.js)

Landing page single-offer modern & interaktif untuk jualan paket buku cerita anak, dibangun dengan **Next.js**
supaya cepat, SEO/Open Graph-nya rapi, dan ramah untuk trafik iklan Facebook/Meta Ads.

> 📄 Baca juga `BREAKDOWN-STRATEGI-LANDING-PAGE.md` untuk analisis awal (Lynk.id vs landing page sendiri) dan
> folder `concepts/` untuk 3 opsi gaya visual yang pernah direview sebelum tema final (kombinasi pastel + aksen bold) dipilih.

## Kenapa pindah ke Next.js?
- Open Graph/meta tags di-render di server → preview iklan Meta lebih akurat
- Image optimization & code-splitting otomatis → Core Web Vitals lebih baik (berpengaruh ke kualitas iklan)
- Frontend + backend (checkout, webhook Midtrans) jadi satu project, satu kali deploy

## Struktur Project

```
app/
  page.js                 Halaman utama (merender HomeClient)
  bantuan/page.js          Halaman FAQ + Kebijakan Privasi + Syarat & Ketentuan
  blog/page.js             Artikel tips parenting
  api/checkout/            Membuat transaksi Midtrans Snap
  api/midtrans/notification/  Webhook Midtrans (update status order realtime)
  api/demo/mark-paid/      Simulasi pelunasan (hanya aktif saat mode demo)
  api/config/              Info konfigurasi publik (demoMode, client key, dst)
components/                Semua komponen UI (Hero, Packages, CheckoutModal, dll — interaktif dgn Framer Motion)
lib/
  storeConfig.js           ⚠️ SEMUA konten (brand, harga, paket, testimoni, FAQ, no. WA) — edit di sini
  pixel.js                 Meta Pixel (client-side)
  metaCapi.js              Meta Conversions API (server-side)
  ordersStore.js           Penyimpanan order sederhana (file JSON — lihat catatan di dalam file)
public/products/           Gambar produk (masih contoh/placeholder, ganti dengan foto asli)
```

## Menjalankan di Lokal

```bash
npm install
cp .env.example .env     # isi kredensial kalau sudah siap, atau biarkan kosong untuk mode demo
npm run dev              # buka http://localhost:3000
```

Selama `.env` kosong, checkout berjalan dalam **MODE DEMO**: alur pemesanan bisa dicoba end-to-end tanpa
transaksi uang sungguhan.

## ⚠️ Checklist sebelum testing Midtrans secara realtime
Karena akun Midtrans kamu belum pernah dicoba transaksi sungguhan, ikuti urutan ini supaya aman:
1. Cek status akun di **dashboard.midtrans.com** (pojok kiri atas): toggle **Sandbox** vs **Production**.
   Kalau menu Production belum bisa diakses / masih ada tombol "Ajukan Aktivasi", berarti baru Sandbox.
2. Mulai dari **Sandbox dulu**: isi `MIDTRANS_SERVER_KEY` & `MIDTRANS_CLIENT_KEY` dari dashboard Sandbox,
   biarkan `MIDTRANS_IS_PRODUCTION=false`. Coba checkout di landing page — Snap popup akan muncul dengan
   kartu/VA/QRIS simulasi (bukan uang asli).
3. Set **Payment Notification URL** di dashboard Midtrans (Settings > Configuration) ke:
   `https://domainmu.com/api/midtrans/notification` — untuk testing lokal butuh tunnel (mis. `ngrok http 3000`).
4. Setelah alur Sandbox lolos (status order auto berubah "paid"), baru pindah ke kredensial **Production**
   dan set `MIDTRANS_IS_PRODUCTION=true`.
5. Lakukan **1 transaksi kecil nyata** (Rp1.000–Rp5.000, uangmu sendiri) untuk memastikan benar-benar
   realtime sebelum menjalankan iklan ke publik.

## Checklist Go-Live lainnya
1. Ganti semua data contoh di `lib/storeConfig.js` (nama brand, nomor WhatsApp, harga, foto buku asli di
   `public/products/`, testimoni asli).
2. Buat **Meta Pixel** di Events Manager, isi `NEXT_PUBLIC_META_PIXEL_ID`, dan buat token **Conversions API**
   untuk diisi ke `META_CAPI_ACCESS_TOKEN` (penting untuk akurasi tracking iklan).
3. (Opsional) Notifikasi WhatsApp otomatis: daftar Fonnte/Wablas, isi `FONNTE_TOKEN` & `ADMIN_WHATSAPP_NUMBER`.
4. Deploy ke **Vercel** (`vercel deploy`) — paling mudah karena project ini Next.js native.
   ⚠️ Catatan: penyimpanan order berbasis file (`lib/ordersStore.js`) tidak persisten di Vercel serverless.
   Untuk volume order tinggi, ganti dengan database (Supabase/Postgres). Tracking iklan (Pixel/CAPI) & notifikasi
   WhatsApp tetap jalan realtime walau tanpa database, karena dikirim langsung dari webhook.
5. Verifikasi domain di **Meta Business Manager** untuk hasil tracking & Advantage+ campaign yang optimal.

## Pindah ke repo "Buku-Mimpi" di GitHub
Sesi ini terkunci ke repo `agen-landing-page`, jadi untuk memindahkan kode final ini ke
`github.com/markonahlegends-create/Buku-Mimpi`, jalankan di komputermu sendiri (setelah clone/pull branch ini):

```bash
git remote add buku-mimpi https://github.com/markonahlegends-create/Buku-Mimpi.git
git push buku-mimpi arena/01a10a27-agen-landing-page:main
```
