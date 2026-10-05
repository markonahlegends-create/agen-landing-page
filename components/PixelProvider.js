'use client';

import { useEffect } from 'react';
import { initPixel, trackEvent } from '@/lib/pixel';

export default function PixelProvider() {
  useEffect(() => {
    initPixel();
    trackEvent('ViewContent', { content_name: 'Landing Page Buku Mimpi' });
  }, []);

  return null;
}
