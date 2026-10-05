'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { brand } from '@/lib/storeConfig';

export default function Header({ onOrderClick }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const waLink = `https://wa.me/${brand.whatsappNumber}?text=${encodeURIComponent('Halo, saya mau tanya-tanya soal paket buku anak 🙂')}`;

  const navLinks = [
    { href: '#paket', label: 'Paket & Harga' },
    { href: '#testimoni', label: 'Testimoni' },
    { href: '#faq', label: 'FAQ' },
    { href: '/blog', label: 'Tips Parenting' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-cream/90 backdrop-blur-md border-b border-pastel-pink/60">
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-4 px-4 md:px-8 py-3">
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <Image src={brand.logo} alt={brand.name} width={34} height={34} className="rounded-full" />
          <div className="leading-tight">
            <p className="text-base md:text-lg font-bold font-heading text-ink">{brand.name}</p>
            <p className="text-[10px] md:text-xs text-ink/50 -mt-0.5">{brand.tagline}</p>
          </div>
        </Link>

        <nav className="hidden lg:flex items-center gap-6">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className="text-sm font-semibold text-ink/70 hover:text-coral transition-colors">
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={waLink}
            target="_blank"
            rel="noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs md:text-sm font-semibold text-emerald-700 hover:bg-emerald-100 transition-colors"
          >
            💬 Tanya Admin
          </a>
          <button
            onClick={onOrderClick}
            className="rounded-full bg-coral px-4 py-2 text-xs md:text-sm font-bold text-white shadow-md shadow-coral/30 hover:shadow-lg hover:-translate-y-0.5 hover:bg-coral-dark transition-all"
          >
            Pesan Sekarang
          </button>
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="lg:hidden rounded-full border border-ink/10 p-2 text-ink"
            aria-label="Menu"
          >
            {menuOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav className="lg:hidden border-t border-pastel-pink/60 bg-cream px-4 py-3 flex flex-col gap-3">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="text-sm font-semibold text-ink/70 hover:text-coral transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
