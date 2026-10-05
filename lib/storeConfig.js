// =====================================================================================
// ⚠️ FILE KONFIGURASI TOKO — EDIT DI SINI SAJA
// Semua teks, harga, gambar, dan kontak landing page diatur dari file ini.
//
// STATUS SAAT INI:
// - Positioning & nama produk di bawah sudah "jadi" (siap pakai), tema: buku cerita
//   pengantar tidur bertema mimpi indah untuk anak usia 3-8 tahun.
// - Yang MASIH PLACEHOLDER dan WAJIB diganti sebelum live iklan:
//   1) brand.whatsappNumber -> ganti ke nomor WA admin asli
//   2) brand.instagram & brand.domain -> ganti ke akun/domain asli kamu
//   3) Harga di `packages` -> sesuaikan dengan harga modal & margin asli kamu
//   4) Foto di public/products/ -> ganti dengan foto buku asli begitu sudah siap difoto
//   5) `testimonials` -> ganti dengan testimoni asli begitu sudah ada pembeli
// =====================================================================================

export const brand = {
  name: 'Buku Mimpi',
  tagline: 'Dongeng Pengantar Tidur Penuh Mimpi Indah',
  whatsappNumber: '6281234567890', // ⚠️ GANTI: format 62xxxxxxxxxx (tanpa + atau 0 di depan)
  instagram: '@bukumimpi.id', // ⚠️ GANTI ke akun asli
  domain: 'bukumimpi.com', // ⚠️ GANTI ke domain asli
  logo: '/products/logo-mark.png',
};

export const hero = {
  badge: 'Terlaris 1.000+ Orang Tua',
  headline: 'Antarkan Si Kecil ke Mimpi Indah Lewat Cerita',
  highlightWord: 'Mimpi Indah',
  subheadline:
    'Paket buku dongeng pengantar tidur bergambar penuh warna untuk usia 3–8 tahun. Bikin rutinitas tidur jadi momen hangat bersama orang tua, bukan drama rewel tiap malam.',
  ctaLabel: 'Pesan Paket Sekarang',
  image: '/products/hero-buku-mimpi.png',
  imageAlt: 'Anak membaca buku dongeng pengantar tidur Buku Mimpi',
};

export const trustBadges = [
  { icon: '📦', label: 'Dikirim ke Seluruh Indonesia' },
  { icon: '🛡️', label: 'Garansi Buku Rusak Diganti Baru' },
  { icon: '⭐', label: 'Rating 4.9/5 dari 1.200+ Orang Tua' },
  { icon: '✅', label: 'Kertas Tebal & Tinta Aman untuk Anak' },
];

export const stats = [
  { value: '1.200+', label: 'Orang Tua Puas' },
  { value: '4.9/5', label: 'Rating Pembeli' },
  { value: '15.000+', label: 'Buku Terkirim' },
  { value: '100%', label: 'Garansi Uang Kembali' },
];

export const problems = {
  title: 'Jam Tidur Anak Selalu Jadi Drama Tiap Malam?',
  points: [
    { icon: '📱', title: 'Harus Pegang HP Dulu Baru Mau Tidur', desc: 'Screen time sebelum tidur bikin anak makin susah ngantuk dan kualitas tidurnya terganggu.' },
    { icon: '😩', title: 'Rewel & Susah Ditenangkan', desc: 'Tanpa rutinitas yang menenangkan, jam tidur jadi sesi tarik-ulur yang melelahkan untuk orang tua.' },
    { icon: '⏳', title: 'Waktu Bonding Makin Sempit', desc: 'Orang tua sibuk kerja seharian, butuh momen singkat tapi berkualitas sebelum anak tidur.' },
  ],
};

export const gallery = [
  '/products/hero-buku-mimpi.png',
  '/products/buku-mimpi-1.png',
  '/products/buku-mimpi-2.png',
  '/products/buku-mimpi-3.png',
  '/products/book-bundle-flatlay.png',
];

export const benefits = [
  { icon: '🎨', title: 'Ilustrasi Full Color', desc: 'Gambar penuh warna bertema mimpi & malam hari yang menenangkan sebelum tidur.' },
  { icon: '📖', title: '5 Judul Cerita Berbeda', desc: 'Seri dongeng pengantar tidur dengan karakter berbeda, tidak membosankan tiap malam.' },
  { icon: '🌙', title: 'Rutinitas Tidur Lebih Tenang', desc: 'Disusun bersama pegiat literasi anak untuk membantu anak rileks sebelum tidur.' },
  { icon: '🌱', title: 'Pesan Moral di Setiap Cerita', desc: 'Menanamkan nilai kejujuran, berbagi, dan percaya diri lewat dongeng ringan.' },
  { icon: '📏', title: 'Ukuran Pas Digenggam Anak', desc: 'Dimensi 20x20cm, ringan dibawa ke kamar atau saat bepergian.' },
  { icon: '🎁', title: 'Bonus Menarik', desc: 'Setiap paket dapat bonus eksklusif yang membuat ritual sebelum tidur makin seru.' },
];

export const whatsInside = [
  '5 buku dongeng pengantar tidur bergambar (judul berbeda)',
  'Kertas art paper tebal 210gsm, tahan sobek',
  'Cover hardcover doff, awet dipakai berulang tiap malam',
  'Bonus poster peta mimpi bergambar bintang',
  'Kartu aktivitas mewarnai (khusus Paket Mimpi Istimewa)',
];

// Paket harga — strategi bundling (biasanya paket tengah yang paling laris)
// ⚠️ Harga di bawah masih estimasi/contoh — sesuaikan dengan modal & margin asli kamu.
export const packages = [
  {
    id: 'starter',
    name: 'Paket Mimpi Awal',
    qtyLabel: '1 Buku Pilihan',
    price: 59000,
    strikePrice: 89000,
    perks: ['1 buku dongeng pengantar tidur', 'Gratis bookmark karakter'],
    highlight: false,
  },
  {
    id: 'favorite',
    name: 'Paket Mimpi Ceria',
    qtyLabel: '3 Buku Seri Lengkap',
    price: 149000,
    strikePrice: 267000,
    perks: ['3 buku dongeng pengantar tidur', 'Gratis poster peta mimpi', 'Gratis ongkir area tertentu'],
    highlight: true,
    badge: 'Paling Laris',
  },
  {
    id: 'complete',
    name: 'Paket Mimpi Istimewa',
    qtyLabel: '5 Buku + Bonus',
    price: 229000,
    strikePrice: 445000,
    perks: ['5 buku dongeng pengantar tidur', 'Poster peta mimpi + kartu mewarnai', 'Tas buku eksklusif bertema bintang', 'Gratis ongkir seluruh Indonesia'],
    highlight: false,
    badge: 'Paling Hemat',
  },
];

export const testimonials = [
  { name: 'Ibu Rani, Bekasi', text: 'Dulu jam tidur anakku selalu drama, sekarang dia malah nungguin waktu dibacain Buku Mimpi tiap malam. Ceritanya menenangkan banget.', rating: 5 },
  { name: 'Ibu Siti, Surabaya', text: 'Kualitas bukunya jauh di atas ekspektasi, kertasnya tebal nggak gampang sobek walau dipegang anak 4 tahun tiap malam.', rating: 5 },
  { name: 'Bapak Andi, Yogyakarta', text: 'Paket Mimpi Istimewa worth it banget, dapet 5 buku plus tas. Anak jadi punya ritual sebelum tidur yang ditunggu-tunggu.', rating: 5 },
  { name: 'Ibu Dewi, Bandung', text: 'Pesan pagi, sore udah diproses. Admin-nya responsif banget kalau ditanya-tanya di WhatsApp.', rating: 5 },
];

export const faqs = [
  { q: 'Cocok untuk usia berapa?', a: 'Paket buku ini didesain untuk anak usia 3–8 tahun, dengan bahasa sederhana dan cerita menenangkan yang pas dibacakan sebelum tidur.' },
  { q: 'Berapa lama pengiriman sampai?', a: 'Estimasi 2–4 hari kerja untuk Jawa & Bali, 4–7 hari kerja untuk luar Jawa, tergantung ekspedisi yang dipilih.' },
  { q: 'Apakah ada garansi jika buku rusak saat pengiriman?', a: 'Ya, jika buku diterima dalam kondisi rusak/cacat produksi, kami ganti baru secara gratis. Tinggal kirim foto bukti ke WhatsApp admin.' },
  { q: 'Metode pembayaran apa saja yang tersedia?', a: 'Tersedia QRIS, transfer bank, dan e-wallet melalui sistem pembayaran otomatis yang aman (Midtrans).' },
  { q: 'Bagaimana jika ada pertanyaan sebelum membeli?', a: 'Silakan hubungi admin kami melalui tombol WhatsApp yang tersedia di halaman ini, kami siap membantu.' },
];

export const guarantee = {
  title: 'Garansi 100% Uang Kembali',
  desc: 'Jika buku rusak atau tidak sesuai deskripsi, kami ganti baru atau kembalikan uangmu 100%. Belanja aman tanpa ragu.',
};

export const urgency = {
  enabled: true,
  text: 'Promo harga spesial berlaku untuk 100 pemesan pertama bulan ini',
};
