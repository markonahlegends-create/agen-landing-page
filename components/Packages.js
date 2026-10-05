'use client';

import { motion } from 'framer-motion';
import { packages } from '@/lib/storeConfig';
import CountdownBadge from './CountdownBadge';

export default function Packages({ onSelect }) {
  return (
    <section id="paket" className="bg-white py-14 md:py-20 scroll-mt-20">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <div className="text-center max-w-xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-extrabold font-heading text-ink">Pilih Paket Buku Favoritmu</h2>
          <p className="mt-2 text-sm md:text-base text-ink/60">Makin banyak buku, makin hemat per bukunya!</p>
          <div className="mt-4 flex justify-center">
            <CountdownBadge />
          </div>
        </div>

        <div className="mt-10 grid md:grid-cols-3 gap-5 md:gap-6 items-stretch">
          {packages.map((pkg, i) => (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              whileHover={{ y: -6 }}
              className={`relative flex flex-col rounded-[2rem] p-6 border-2 transition-shadow ${
                pkg.highlight
                  ? 'border-coral bg-gradient-to-b from-pastel-pink/40 to-pastel-amber/30 shadow-2xl shadow-coral/20 md:-translate-y-3'
                  : 'border-ink/5 bg-pastel-mint/10 hover:shadow-xl'
              }`}
            >
              {pkg.badge && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-coral text-white text-xs font-bold px-3 py-1 shadow-md whitespace-nowrap">
                  {pkg.badge}
                </span>
              )}

              <h3 className="text-lg font-bold font-heading text-ink text-center mt-2">{pkg.name}</h3>
              <p className="text-center text-sm text-ink/60 mt-1">{pkg.qtyLabel}</p>

              <div className="text-center mt-4">
                {pkg.strikePrice && <p className="text-sm text-ink/40 line-through">Rp{pkg.strikePrice.toLocaleString('id-ID')}</p>}
                <p className="text-3xl font-extrabold font-heading text-ink">Rp{pkg.price.toLocaleString('id-ID')}</p>
              </div>

              <ul className="mt-5 space-y-2 flex-1">
                {pkg.perks.map((perk) => (
                  <li key={perk} className="flex items-start gap-2 text-sm text-ink/70">
                    <span className="text-emerald-500 mt-0.5">✔</span>
                    <span>{perk}</span>
                  </li>
                ))}
              </ul>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => onSelect(pkg)}
                className={`mt-6 w-full rounded-full py-3 font-bold text-sm md:text-base transition-colors ${
                  pkg.highlight ? 'bg-coral text-white shadow-md shadow-coral/30 hover:bg-coral-dark' : 'bg-ink text-white hover:bg-ink/80'
                }`}
              >
                Pilih {pkg.name}
              </motion.button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
