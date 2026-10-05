'use client';

import { motion } from 'framer-motion';
import { brand } from '@/lib/storeConfig';

export default function WhatsAppFloatButton() {
  return (
    <motion.a
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 0.6, type: 'spring', stiffness: 260 }}
      whileHover={{ scale: 1.1 }}
      href={`https://wa.me/${brand.whatsappNumber}`}
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-20 md:bottom-6 right-4 z-30 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500 text-2xl text-white shadow-xl shadow-emerald-400/40"
      aria-label="Chat WhatsApp"
    >
      💬
    </motion.a>
  );
}
