'use client';

import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import Header from './Header';
import Hero from './Hero';
import Problems from './Problems';
import Gallery from './Gallery';
import Packages from './Packages';
import Testimonials from './Testimonials';
import FAQ from './FAQ';
import StickyBuyBar from './StickyBuyBar';
import CheckoutModal from './CheckoutModal';
import Footer from './Footer';
import FinalCTA from './FinalCTA';
import WhatsAppFloatButton from './WhatsAppFloatButton';
import { packages } from '@/lib/storeConfig';
import useApiConfig from '@/lib/useApiConfig';

export default function HomeClient() {
  const [checkoutPackage, setCheckoutPackage] = useState(null);
  const apiConfig = useApiConfig();

  const openCheckout = (pkg) => {
    setCheckoutPackage(pkg || packages.find((p) => p.highlight) || packages[0]);
  };

  const closeCheckout = () => setCheckoutPackage(null);

  const scrollToPackages = () => {
    document.getElementById('paket')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="bg-cream text-ink min-h-screen">
      <Header onOrderClick={() => openCheckout()} />

      <main>
        <Hero onCtaClick={scrollToPackages} />
        <Problems />
        <Gallery />
        <Packages onSelect={openCheckout} />
        <Testimonials />
        <FAQ />
        <FinalCTA onCtaClick={scrollToPackages} />
      </main>

      <Footer />

      <StickyBuyBar onOrderClick={openCheckout} hidden={!!checkoutPackage} />

      <AnimatePresence>
        {checkoutPackage && (
          <CheckoutModal key={checkoutPackage.id} onClose={closeCheckout} initialPackage={checkoutPackage} apiConfig={apiConfig} />
        )}
      </AnimatePresence>

      <WhatsAppFloatButton />
    </div>
  );
}
