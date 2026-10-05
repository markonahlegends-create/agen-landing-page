'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { packages } from '@/lib/storeConfig';

export default function StickyBuyBar({ onOrderClick, hidden }) {
  const [visible, setVisible] = useState(false);
  const featured = packages.find((p) => p.highlight) || packages[0];

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 420);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && !hidden && (
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          exit={{ y: 100 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="fixed bottom-0 left-0 right-0 z-30 bg-white border-t border-pastel-pink/60 shadow-[0_-8px_24px_rgba(0,0,0,0.08)] px-4 py-3 md:hidden"
        >
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-[11px] text-ink/50">{featured.name}</p>
              <p className="text-base font-extrabold font-heading text-ink">Rp{featured.price.toLocaleString('id-ID')}</p>
            </div>
            <button
              onClick={() => onOrderClick(featured)}
              className="flex-1 max-w-[60%] rounded-full bg-coral py-3 text-sm font-bold text-white shadow-md"
            >
              Pesan Sekarang
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
