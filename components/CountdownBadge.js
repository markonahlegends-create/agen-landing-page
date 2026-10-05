'use client';

import { useEffect, useState } from 'react';

// Countdown visual untuk kesan urgency — reset otomatis tiap hari jam 23:59:59
// supaya tidak perlu diatur manual tiap saat.
export default function CountdownBadge() {
  const [timeLeft, setTimeLeft] = useState(null);

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      const end = new Date();
      end.setHours(23, 59, 59, 999);
      const diff = Math.max(0, end.getTime() - now.getTime());

      const h = Math.floor(diff / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      const s = Math.floor((diff % 60000) / 1000);
      setTimeLeft({ h, m, s });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  if (!timeLeft) return null;

  const pad = (n) => String(n).padStart(2, '0');

  return (
    <div className="inline-flex items-center gap-2 rounded-full bg-red-50 border border-red-100 px-4 py-2 text-red-600 text-xs md:text-sm font-bold">
      ⏰ Promo berakhir dalam
      <span className="font-mono tabular-nums">
        {pad(timeLeft.h)}:{pad(timeLeft.m)}:{pad(timeLeft.s)}
      </span>
    </div>
  );
}
