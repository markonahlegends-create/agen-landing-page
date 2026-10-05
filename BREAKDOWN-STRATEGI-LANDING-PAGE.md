# Breakdown: Lynk.id vs Landing Page Sendiri — Jualan Buku Anak via Meta/Facebook Ads

## 0. Konteks project yang sudah ada di repo ini
Di repo ini **sudah ada prototipe landing page custom** (React + Vite + Tailwind) yang gayanya memang meniru pola "toko mini" ala Lynk.id:
- Header + search + kategori produk
- Grid produk → halaman detail produk (gambar, deskripsi, highlight, tab deskripsi/ulasan)
- Keranjang belanja + checkout (nama, HP, alamat, metode kirim, metode bayar: QRIS/E-wallet/Bank)
- Halaman status pesanan (simulasi "menunggu bayar → lunas")
- Halaman Blog & Bantuan
- Footer dengan ikon bank/kurir (BCA, BRI, JNE, Ninja, GoSend, dll)

**Catatan penting:** semua ini masih *front-end simulasi* — belum ada payment gateway sungguhan (Midtrans/Xendit/dll), belum ada backend/database order, dan isi produknya masih contoh baju streetwear (hoodie, jaket, dll), bukan buku anak. Jadi ini bisa jadi fondasi kalau kita pilih opsi "landing page sendiri", tapi perlu dirombak kontennya + disambungkan ke pembayaran & tracking asli.

Satu hal yang perlu diluruskan dulu: **"100% sama persis seperti lynk.id"** — maksudnya gaya tampilan/alur (bersih, mobile-first, fokus ke 1-2 produk, checkout simpel) kan? Bukan mengkloning platform Lynk.id itu sendiri (nama, logo, branding mereka)? Kalau sampai meniru identitas visual/merek Lynk.id secara identik untuk dipakai publik, itu berisiko dari sisi merek dagang. Yang aman & memang itu yang biasanya dimaksud: **meniru pola UX-nya**, bukan brandingnya.

---

## 1. Dua opsi yang kamu punya

### Opsi A — Pakai Lynk.id langsung (platform siap pakai)
Daftar di lynk.id, upload produk, atur halaman, lalu link itu yang diarahkan dari iklan Facebook/Meta.

### Opsi B — Bangun landing page sendiri (custom code, seperti starter di repo ini)
Landing page dengan domain sendiri, desain & copy dikontrol penuh, dihubungkan ke payment gateway lokal (Midtrans/Xendit/dll), dan dipasangi Meta Pixel + Conversions API sendiri.

---

## 2. Perbandingan langsung (fokus kebutuhan: **jualan buku anak fisik + iklan Meta Ads**)

| Kriteria | **Lynk.id** | **Landing Page Sendiri** |
|---|---|---|
| Kecepatan mulai jualan | ⭐⭐⭐⭐⭐ Bisa live dalam hitungan menit | ⭐⭐ Butuh waktu build & testing (hari–minggu) |
| Biaya awal | Gratis bisa jalan, tapi fitur penting (Pixel, custom domain) **hanya ada di paket Pro ±Rp99rb/bln** | Variatif: domain (~Rp150rb/thn) + hosting (bisa gratis–murah) + payment gateway (biaya per transaksi ~1.5-3%) |
| Biaya transaksi | **5% per transaksi (Free) / 3% (Pro)** — dipotong platform, di luar biaya payment gateway | Hanya biaya payment gateway (±1.5–2.9% tergantung provider), tidak ada potongan platform tambahan |
| **Kontrol Meta Pixel + Conversions API (server-side)** | Terbatas — hanya pixel dasar di paket Pro, **tidak ada Conversions API server-side**. Untuk Meta Ads modern (apalagi setelah iOS14/Advantage+), data signal yang lemah = iklan lebih boros & sulit dioptimasi | Penuh — bisa pasang Pixel + CAPI, custom event (ViewContent, AddToCart, Purchase dgn value akurat), ini **krusial untuk menurunkan CPA** seiring scaling |
| Domain sendiri & Business verification Meta | Hanya di paket Pro, masih subdomain-feel | Full — domain sendiri bisa diverifikasi di Meta Business Manager, penting untuk trust & Advantage+ catalog ads |
| Katalog produk kompleks (varian, stok, banyak SKU) | Dirancang untuk **beberapa produk andalan**, bukan katalog besar — kurang cocok kalau mau jual puluhan judul buku dengan variasi | Bebas sesuai kebutuhan: filter kategori, bundling, varian umur anak, dll |
| Ongkos kirim produk fisik (buku = berat, perlu hitung ongkir per kota) | Fitur ongkir real-time terbatas/kaku | Bisa integrasi API ongkir (RajaOngkir/Biteship) sesuai kebutuhan |
| Kecepatan halaman (ngaruh ke Quality/Relevance Score iklan) | Tergantung infrastruktur mereka, tidak bisa dioptimasi sendiri | Bisa dioptimasi penuh (gambar, lazy load, CDN) → iklan lebih murah |
| A/B testing landing page utk iklan | Sangat terbatas | Bebas bikin banyak varian landing page per audiens/kreatif iklan |
| Branding & kepercayaan (penting utk produk anak — ortu lebih hati-hati) | Halaman terasa generik "link-in-bio", ada watermark Lynk.id di versi gratis | Bisa dibuat terasa seperti toko resmi/brand sendiri → meningkatkan trust ortu |
| SEO & retargeting jangka panjang | Minim | Bisa pasang GA4, pixel, email capture, retargeting penuh |
| Risiko "rented land" (platform ubah aturan/tutup/banned) | Bisnis bergantung penuh ke pihak ketiga | Aset (kode, domain, data pelanggan) milikmu sendiri |
| Maintenance teknis | Tidak perlu | Perlu (atau pakai jasa dev/agent seperti sekarang) |
| Cocok untuk | Validasi cepat ide produk, jualan skala kecil-menengah, produk digital | Scaling serius dengan iklan berbayar, produk fisik, butuh data akurat untuk optimasi iklan |

---

## 3. Pertimbangan khusus untuk niche "buku anak"
1. **Kepercayaan orang tua** — pembeli adalah orang tua, bukan anak. Mereka butuh sinyal kepercayaan: testimoni, foto real produk, info penerbit/ISBN, garansi, kontak jelas. Landing page custom lebih leluasa menampilkan ini secara meyakinkan dibanding halaman link-in-bio.
2. **Kebijakan iklan Meta tentang anak-anak** — karena produk *untuk* anak tapi *ditargetkan ke* orang tua, ini umumnya aman asalkan: tidak menargetkan usia di bawah 18 sebagai audiens, tidak ada klaim kesehatan/pendidikan berlebihan, dan foto anak (jika dipakai) sewajarnya stock/ilustrasi yang wajar. Perlu disiapkan di landing page: kebijakan privasi, syarat & ketentuan, info bisnis jelas — ini jadi bagian dari verifikasi domain & review iklan.
3. **Average order value rendah** — buku anak biasanya harga per-item tidak besar, sehingga strategi **bundling** (misal paket 3-5 buku, seri lengkap) sangat membantu profitabilitas iklan. Ini lebih gampang diatur di landing page sendiri (ada bundle, cross-sell, upsell di checkout) dibanding di Lynk.id yang antarmukanya satu produk per link.
4. **Tracking value per pembelian itu penting** — kalau mau pakai Meta Ads dengan strategi optimasi "Purchase" / nilai pembelian (value-based bidding), Meta butuh sinyal akurat dari Pixel+CAPI. Ini signifikan ngaruh ke efisiensi budget iklan dalam 1-2 bulan ke depan.

---

## 4. Rekomendasi

**Kalau tujuannya sekadar validasi cepat** (mau tes dulu apakah ada yang mau beli, budget iklan kecil <Rp2-3 juta, belum yakin produk/pasar): → **mulai dari Lynk.id Pro** dulu (karena versi free tidak ada pixel sama sekali). Cepat, murah, risiko kecil. Tapi siap-siap data iklan kurang maksimal untuk dioptimasi.

**Kalau sudah niat serius mau scaling iklan dalam beberapa bulan ke depan** (ini sepertinya kondisimu, karena sudah mulai bangun kode sendiri): → **lanjutkan landing page sendiri**. Alasan utama: kontrol penuh Pixel+Conversions API (paling berpengaruh ke efisiensi biaya iklan saat scaling), bisa bikin banyak varian halaman untuk A/B test kreatif iklan, branding lebih dipercaya orang tua, dan tidak ada potongan komisi 3-5% per transaksi dari platform.

**Jalan tengah yang realistis:** Jalankan keduanya paralel di awal — pasang Lynk.id Pro sebagai cadangan/cepat sambil landing page custom-nya disiapkan (ganti konten jadi buku anak, sambungkan payment gateway asli, pasang Pixel+CAPI) — lalu alihkan budget iklan ke landing page sendiri begitu sudah siap & teruji.

---

## 5. Yang perlu disiapkan kalau lanjut opsi "Landing Page Sendiri"
1. **Katalog buku anak final** — judul, harga, usia target, foto asli produk (bukan stok internet kalau bisa, untuk kredibilitas).
2. **Payment gateway** — pilih Midtrans / Xendit / Tripay (QRIS, VA, e-wallet) agar pembayaran benar-benar jalan, bukan simulasi.
3. **Ongkir** — mau pakai flat ongkir, gratis ongkir (dimasukin ke harga), atau hitung real-time (RajaOngkir/Biteship)?
4. **Domain** — nama domain untuk toko (mis. `tokobukuanak.com`), untuk dipasang di Meta Business Manager.
5. **Meta Pixel + Conversions API** — akun Meta Business Manager, Pixel ID, access token.
6. **Kebijakan Privasi & Syarat Layanan** — wajib untuk approval iklan Meta & kepercayaan pembeli.
7. **Hosting** — Vercel/Netlify (gratis untuk mulai) atau hosting lain.

---

### Pertanyaan balik buat kamu (biar aku bisa eksekusi sesuai kebutuhan)
Setelah kamu review breakdown ini, boleh kasih tahu aku:
- Mau pilih opsi mana? (Lynk.id Pro / Landing page sendiri / hybrid dulu)
- Kalau landing page sendiri: sudah ada payment gateway pilihan (Midtrans/Xendit/lainnya) atau belum ada sama sekali?
- Berapa kira-kira jumlah judul buku & range harga yang mau dijual (1 produk unggulan vs katalog banyak judul)?
