'use client';

import { motion } from 'framer-motion';

export default function FinalCTA({ onCtaClick }) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-coral to-amber-400 py-14 text-center">
      <div className="pointer-events-none absolute -top-10 left-10 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
      <div className="pointer-events-none absolute -bottom-10 right-10 h-48 w-48 rounded-full bg-white/10 blur-2xl" />
      <div className="max-w-2xl mx-auto px-4 relative">
        <h2 className="text-2xl md:text-3xl font-extrabold font-heading text-white">Yuk, Tumbuhkan Cinta Membaca Si Kecil Hari Ini</h2>
        <p className="mt-2 text-white/90 text-sm md:text-base">Stok terbatas, promo harga spesial bisa berakhir sewaktu-waktu.</p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.96 }}
          onClick={onCtaClick}
          className="mt-5 inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 font-bold text-coral-dark shadow-xl"
        >
          🛒 Pesan Sekarang
        </motion.button>
      </div>
    </section>
  );
}
