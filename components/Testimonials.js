'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { testimonials, guarantee } from '@/lib/storeConfig';

export default function Testimonials() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % testimonials.length), 4500);
    return () => clearInterval(id);
  }, []);

  return (
    <section id="testimoni" className="bg-pastel-amber/20 py-14 md:py-20 scroll-mt-20">
      <div className="max-w-4xl mx-auto px-4 md:px-8">
        <h2 className="text-2xl md:text-3xl font-extrabold font-heading text-ink text-center">Kata Orang Tua yang Sudah Coba</h2>

        <div className="mt-8 relative min-h-[180px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.4 }}
              className="rounded-3xl bg-white p-6 md:p-8 shadow-md border border-pastel-amber/40 text-center"
            >
              <div className="text-amber-400 text-lg">{'★'.repeat(testimonials[index].rating)}</div>
              <p className="mt-3 text-base md:text-lg text-ink/70 italic max-w-xl mx-auto">&ldquo;{testimonials[index].text}&rdquo;</p>
              <p className="mt-4 text-sm font-bold text-ink">— {testimonials[index].name}</p>
            </motion.div>
          </AnimatePresence>

          <div className="mt-5 flex justify-center gap-2">
            {testimonials.map((t, i) => (
              <button
                key={t.name}
                onClick={() => setIndex(i)}
                aria-label={`Testimoni ${i + 1}`}
                className={`h-2 rounded-full transition-all ${i === index ? 'w-6 bg-coral' : 'w-2 bg-ink/15'}`}
              />
            ))}
          </div>
        </div>

        <div className="mt-10 rounded-3xl bg-white border-2 border-emerald-200 p-6 md:p-8 flex flex-col md:flex-row items-center gap-5 text-center md:text-left">
          <span className="text-5xl">🛡️</span>
          <div>
            <h3 className="text-xl font-extrabold font-heading text-ink">{guarantee.title}</h3>
            <p className="mt-1.5 text-sm text-ink/60">{guarantee.desc}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
