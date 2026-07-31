import React from 'react';

export default function Blog({ onClose }) {
  return (
    <div className="fixed inset-0 z-[65] bg-black/85 backdrop-blur-md overflow-y-auto animate-[fadeIn_0.2s_ease-out]">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <button onClick={onClose} className="mb-6 inline-flex items-center gap-2 rounded-full border border-zinc-700 bg-zinc-900/80 px-4 py-2 text-sm font-semibold text-zinc-300">✕ Tutup</button>

        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/80 p-6">
          <h2 className="text-2xl font-black">Blog URBANSTORE</h2>
          <p className="mt-3 text-zinc-400">Artikel, tips produk, dan pengumuman toko untuk membantu Anda tetap up-to-date dengan koleksi dan promo kami.</p>

          <div className="mt-6 space-y-6">
            <article className="rounded-xl border border-zinc-800 bg-zinc-950/70 p-4">
              <h3 className="font-bold">Tips styling streetwear 2026</h3>
              <p className="mt-2 text-sm text-zinc-400">Perpaduan layer, tekstur, dan aksesoris membuat gaya streetwear tetap relevan. Pilih potongan oversized untuk kenyamanan dan tambahkan sneakers statement untuk finishing.</p>
              <p className="mt-3 text-xs text-zinc-500">Dipublikasikan: 12 Jul 2026</p>
            </article>

            <article className="rounded-xl border border-zinc-800 bg-zinc-950/70 p-4">
              <h3 className="font-bold">Panduan ukuran dan perawatan</h3>
              <p className="mt-2 text-sm text-zinc-400">Untuk hoodie dan jaket, kami sarankan mencuci terbalik dengan air dingin dan mengeringkan secara natural untuk menjaga warna dan bentuk.</p>
              <p className="mt-3 text-xs text-zinc-500">Dipublikasikan: 28 Jun 2026</p>
            </article>

            <aside className="rounded-xl border border-zinc-800 bg-zinc-950/70 p-4">
              <h4 className="font-semibold">Langganan</h4>
              <p className="mt-2 text-sm text-zinc-400">Dapatkan artikel dan promo terbaru ke email Anda.</p>
              <div className="mt-3 flex gap-2">
                <input placeholder="Email Anda" className="flex-1 rounded-xl bg-zinc-900/60 px-3 py-2 text-sm text-zinc-200" />
                <button className="rounded-xl bg-purple-600 px-4 py-2 font-semibold">Berlangganan</button>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
}
