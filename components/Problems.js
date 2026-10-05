'use client';

import { motion } from 'framer-motion';
import { problems } from '@/lib/storeConfig';

export default function Problems() {
  return (
    <section className="bg-white py-14 md:py-20">
      <div className="max-w-5xl mx-auto px-4 md:px-8 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5 }}
          className="text-2xl md:text-3xl font-extrabold font-heading text-ink"
        >
          {problems.title}
        </motion.h2>
        <div className="mt-10 grid md:grid-cols-3 gap-5">
          {problems.points.map((point, i) => (
            <motion.div
              key={point.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="rounded-3xl border border-pastel-pink/50 bg-pastel-pink/20 p-6 text-left hover:shadow-lg hover:-translate-y-1 transition-all"
            >
              <span className="text-3xl">{point.icon}</span>
              <h3 className="mt-3 font-bold font-heading text-ink">{point.title}</h3>
              <p className="mt-2 text-sm text-ink/60">{point.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
