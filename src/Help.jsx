import React from 'react';

export default function Help({ onClose }) {
  return (
    <div className="fixed inset-0 z-[65] bg-black/85 backdrop-blur-md overflow-y-auto animate-[fadeIn_0.2s_ease-out]">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <button onClick={onClose} className="mb-6 inline-flex items-center gap-2 rounded-full border border-zinc-700 bg-zinc-900/80 px-4 py-2 text-sm font-semibold text-zinc-300">✕ Tutup</button>

        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/80 p-6">
          <h2 className="text-2xl font-black">Pusat Bantuan</h2>
          <p className="mt-3 text-zinc-400">Temukan jawaban cepat untuk pertanyaan umum tentang pemesanan, pembayaran, pengiriman, dan pengembalian.</p>

          <div className="mt-6 space-y-6">
            <section className="rounded-xl border border-zinc-800 bg-zinc-950/70 p-4">
              <h3 className="font-semibold">Cara memesan</h3>
              <ol className="mt-2 ml-4 list-decimal text-sm text-zinc-400">
                <li>Pilih produk lalu klik <strong>Beli Sekarang</strong> atau <strong>+ Keranjang</strong>.</li>
                <li>Di keranjang, tinjau jumlah dan pilih <strong>Checkout</strong>.</li>
                <li>Isi nama, nomor telepon, dan alamat pengiriman lalu pilih metode pengiriman.</li>
                <li>Pilih metode pembayaran (QRIS / E-Wallet / Transfer Bank) dan konfirmasi pesanan.</li>
              </ol>
            </section>

            <section className="rounded-xl border border-zinc-800 bg-zinc-950/70 p-4">
              <h3 className="font-semibold">Metode pembayaran yang didukung</h3>
              <ul className="mt-2 ml-4 list-disc text-sm text-zinc-400">
                <li><strong>QRIS</strong>: Scan kode QR di halaman pembayaran menggunakan aplikasi bank atau e-wallet Anda.</li>
                <li><strong>E-Wallet</strong>: Pilih provider lalu selesaikan pembayaran melalui aplikasi terkait.</li>
                <li><strong>Transfer Bank</strong>: Transfer manual ke nomor rekening yang ditampilkan; upload bukti jika diperlukan.</li>
              </ul>
            </section>

            <section className="rounded-xl border border-zinc-800 bg-zinc-950/70 p-4">
              <h3 className="font-semibold">Pertanyaan Umum (FAQ)</h3>
              <div className="mt-3 space-y-2 text-sm text-zinc-400">
                <details className="rounded-md bg-zinc-900/60 p-3"><summary className="font-medium">Bagaimana cara cek status pesanan?</summary><p className="mt-2 text-xs">Klik tombol "Lihat status pesanan" pada notifikasi pesanan atau buka panel Status Pesanan di akun Anda.</p></details>
                <details className="rounded-md bg-zinc-900/60 p-3"><summary className="font-medium">Apa kebijakan pengembalian?</summary><p className="mt-2 text-xs">Pengembalian diterima dalam 7 hari jika barang rusak atau tidak sesuai deskripsi; hubungi support untuk panduan.</p></details>
                <details className="rounded-md bg-zinc-900/60 p-3"><summary className="font-medium">Berapa lama pengiriman?</summary><p className="mt-2 text-xs">Estimasi pengiriman 2–7 hari kerja tergantung metode pengiriman dan lokasi.</p></details>
              </div>
            </section>

            <section className="rounded-xl border border-zinc-800 bg-zinc-950/70 p-4">
              <h3 className="font-semibold">Hubungi Kami</h3>
              <p className="mt-2 text-sm text-zinc-400">Email: support@urbanstore.example<br/>WhatsApp: +62 812-3456-7890 (09:00–18:00 WIB)</p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
