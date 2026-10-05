import Image from 'next/image';
import Link from 'next/link';
import { brand } from '@/lib/storeConfig';

export default function Footer() {
  return (
    <footer className="mt-4 bg-ink text-white/80">
      <div className="max-w-6xl mx-auto px-4 py-12 md:px-8 grid gap-8 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-2">
            <Image src={brand.logo} alt={brand.name} width={32} height={32} className="rounded-full" />
            <p className="text-lg font-extrabold font-heading text-white">{brand.name}</p>
          </div>
          <p className="mt-2 text-sm text-white/50">{brand.tagline}. Menemani tumbuh kembang si kecil lewat cerita-cerita seru.</p>
        </div>

        <div>
          <h4 className="text-sm font-bold text-white">Bantuan</h4>
          <ul className="mt-3 space-y-2 text-sm text-white/50">
            <li><Link href="/bantuan" className="hover:text-white">Pusat Bantuan & FAQ</Link></li>
            <li><Link href="/bantuan#privasi" className="hover:text-white">Kebijakan Privasi</Link></li>
            <li><Link href="/bantuan#syarat" className="hover:text-white">Syarat & Ketentuan</Link></li>
            <li><Link href="/blog" className="hover:text-white">Tips Parenting</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-bold text-white">Pembayaran</h4>
          <div className="mt-3 grid grid-cols-4 gap-2">
            <Image src="/icons/bca.svg" alt="bca" width={28} height={28} className="object-contain opacity-80" />
            <Image src="/icons/bri.svg" alt="bri" width={28} height={28} className="object-contain opacity-80" />
            <Image src="/icons/visa.svg" alt="visa" width={28} height={28} className="object-contain opacity-80" />
            <Image src="/icons/mastercard.svg" alt="mc" width={28} height={28} className="object-contain opacity-80" />
          </div>

          <h4 className="mt-5 text-sm font-bold text-white">Pengiriman</h4>
          <div className="mt-3 grid grid-cols-3 gap-2">
            <Image src="/icons/jne.svg" alt="jne" width={60} height={28} className="object-contain opacity-80" />
            <Image src="/icons/gosend.svg" alt="gosend" width={60} height={28} className="object-contain opacity-80" />
            <Image src="/icons/ninja.svg" alt="ninja" width={60} height={28} className="object-contain opacity-80" />
          </div>
        </div>

        <div>
          <h4 className="text-sm font-bold text-white">Kontak Kami</h4>
          <ul className="mt-3 space-y-2 text-sm text-white/50">
            <li><a href={`https://wa.me/${brand.whatsappNumber}`} target="_blank" rel="noreferrer" className="hover:text-white">💬 WhatsApp Admin</a></li>
            <li><a href={`https://instagram.com/${brand.instagram.replace('@', '')}`} target="_blank" rel="noreferrer" className="hover:text-white">📷 {brand.instagram}</a></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-6xl mx-auto px-4 py-5 md:px-8 flex flex-col md:flex-row items-center justify-between text-xs text-white/40 gap-2">
          <div>© {new Date().getFullYear()} {brand.name}. Hak Cipta Dilindungi.</div>
          <div>Dikirim dari Indonesia 🇮🇩</div>
        </div>
      </div>
    </footer>
  );
}
