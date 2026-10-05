'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { gallery, benefits, whatsInside } from '@/lib/storeConfig';

export default function Gallery() {
  return (
    <section className="bg-gradient-to-b from-white to-pastel-mint/30 py-14 md:py-20">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <div className="grid md:grid-cols-2 gap-8 items-start">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-2 gap-3"
          >
            {gallery.slice(0, 4).map((src, i) => (
              <div key={src} className={`overflow-hidden rounded-2xl border-4 border-white shadow-lg ${i === 0 ? 'col-span-2' : ''}`}>
                <Image
                  src={src}
                  alt={`Contoh buku ${i + 1}`}
                  width={500}
                  height={500}
                  className="w-full h-full object-cover aspect-square hover:scale-105 transition-transform duration-500"
                />
              </div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl md:text-3xl font-extrabold font-heading text-ink">Apa Saja Isi Paketnya?</h2>
            <ul className="mt-4 space-y-2.5">
              {whatsInside.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm md:text-base text-ink/70">
                  <span className="mt-0.5 text-emerald-500">✔</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 grid grid-cols-2 gap-3">
              {benefits.map((b) => (
                <div key={b.title} className="rounded-xl bg-white border border-pastel-amber/60 p-3.5 shadow-sm hover:shadow-md transition-shadow">
                  <span className="text-xl">{b.icon}</span>
                  <p className="mt-1.5 text-xs md:text-sm font-bold text-ink">{b.title}</p>
                  <p className="text-[11px] md:text-xs text-ink/60 mt-0.5">{b.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
