'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { hero, trustBadges, stats } from '@/lib/storeConfig';

export default function Hero({ onCtaClick }) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-pastel-amber/60 via-cream to-cream">
      <div className="pointer-events-none absolute -top-10 -left-10 h-56 w-56 rounded-full bg-pastel-pink/60 blur-3xl" />
      <div className="pointer-events-none absolute top-20 right-0 h-64 w-64 rounded-full bg-pastel-mint/60 blur-3xl" />

      <div className="max-w-6xl mx-auto px-4 md:px-8 pt-10 md:pt-16 pb-10 md:pb-16 grid md:grid-cols-2 gap-10 md:gap-12 items-center relative">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="order-2 md:order-1 text-center md:text-left"
        >
          <span className="inline-flex items-center gap-1.5 rounded-full bg-coral/10 text-coral-dark text-xs md:text-sm font-bold px-3 py-1.5 mb-4">
            🔥 {hero.badge}
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold font-heading text-ink leading-tight tracking-tight">
            Bikin Anak{' '}
            <span className="relative inline-block text-coral-dark">
              {hero.highlightWord}
              <svg className="absolute left-0 -bottom-1 w-full" height="10" viewBox="0 0 200 10" preserveAspectRatio="none">
                <path d="M0,8 Q50,0 100,6 T200,4" stroke="#FF6B5D" strokeWidth="5" fill="none" strokeLinecap="round" />
              </svg>
            </span>{' '}
            Sejak Dini
          </h1>
          <p className="mt-4 text-ink/60 text-sm md:text-lg max-w-md mx-auto md:mx-0">{hero.subheadline}</p>

          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            onClick={onCtaClick}
            className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-coral px-7 py-3.5 text-base md:text-lg font-bold text-white shadow-xl shadow-coral/30 hover:bg-coral-dark transition-colors"
          >
            🛒 {hero.ctaLabel}
          </motion.button>

          <div className="mt-8 grid grid-cols-2 gap-3 max-w-md mx-auto md:mx-0">
            {trustBadges.map((badge, i) => (
              <motion.div
                key={badge.label}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 + i * 0.08, duration: 0.5 }}
                className="flex items-center gap-2 rounded-xl bg-white/80 border border-white px-3 py-2.5 text-left shadow-sm"
              >
                <span className="text-xl">{badge.icon}</span>
                <span className="text-[11px] md:text-xs font-semibold text-ink/70 leading-tight">{badge.label}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="order-1 md:order-2"
        >
          <div className="relative mx-auto max-w-sm md:max-w-none animate-floaty">
            <Image
              src={hero.image}
              alt={hero.imageAlt}
              width={640}
              height={640}
              priority
              className="relative rounded-[2rem] shadow-2xl shadow-coral/20 border-4 border-white w-full h-auto object-cover"
            />
          </div>
        </motion.div>
      </div>

      <div className="max-w-6xl mx-auto px-4 md:px-8 pb-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 rounded-3xl bg-white/70 backdrop-blur-sm border border-white p-4 md:p-6">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <p className="text-xl md:text-3xl font-extrabold font-heading text-coral-dark">{s.value}</p>
              <p className="text-[11px] md:text-sm text-ink/60 mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
