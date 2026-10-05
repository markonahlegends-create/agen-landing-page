'use client';

import { motion } from 'framer-motion';
import { faqs } from '@/lib/storeConfig';

export default function FAQ() {
  return (
    <section id="faq" className="bg-white py-14 md:py-20 scroll-mt-20">
      <div className="max-w-3xl mx-auto px-4 md:px-8">
        <h2 className="text-2xl md:text-3xl font-extrabold font-heading text-ink text-center">Pertanyaan yang Sering Ditanyakan</h2>

        <div className="mt-8 space-y-3">
          {faqs.map((item, i) => (
            <motion.details
              key={item.q}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: i * 0.05, duration: 0.4 }}
              className="group rounded-2xl border border-ink/10 bg-pastel-mint/10 p-4 open:bg-pastel-amber/20 open:border-coral/30 transition-colors"
            >
              <summary className="flex items-center justify-between cursor-pointer font-semibold text-ink text-sm md:text-base">
                {item.q}
                <span className="ml-3 text-ink/40 group-open:rotate-45 transition-transform text-xl leading-none">+</span>
              </summary>
              <p className="mt-2.5 text-sm text-ink/60">{item.a}</p>
            </motion.details>
          ))}
        </div>
      </div>
    </section>
  );
}
