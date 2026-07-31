import React from 'react';

export default function Footer() {
  return (
    <footer className="mt-12 bg-zinc-900 border-t border-zinc-800 text-zinc-300">
      <div className="max-w-7xl mx-auto px-4 py-10 md:px-8 grid gap-6 md:grid-cols-5">
        <div>
          <h4 className="text-sm font-bold text-white">Layanan Pelanggan</h4>
          <ul className="mt-3 space-y-2 text-sm text-zinc-400">
            <li><a href="#/help" className="hover:text-white">Bantuan</a></li>
            <li><a href="#" className="hover:text-white">Metode Pembayaran</a></li>
            <li><a href="#" className="hover:text-white">ShopeePay</a></li>
            <li><a href="#" className="hover:text-white">Gratis Ongkir</a></li>
            <li><a href="#" className="hover:text-white">Hubungi Kami</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-bold text-white">Jelajahi</h4>
          <ul className="mt-3 space-y-2 text-sm text-zinc-400">
            <li><a href="#" className="hover:text-white">Tentang Kami</a></li>
            <li><a href="#/blog" className="hover:text-white">Blog</a></li>
            <li><a href="#" className="hover:text-white">Seller Centre</a></li>
            <li><a href="#" className="hover:text-white">Flash Sale</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-bold text-white">Pembayaran</h4>
          <div className="mt-3 grid grid-cols-4 gap-2">
            <img src="/icons/visa.svg" alt="visa" className="h-8 w-8 object-contain" />
            <img src="/icons/mastercard.svg" alt="mc" className="h-8 w-8 object-contain" />
            <img src="/icons/bca.svg" alt="bca" className="h-8 w-8 object-contain" />
            <img src="/icons/bri.svg" alt="bri" className="h-8 w-8 object-contain" />
          </div>

          <h4 className="mt-4 text-sm font-bold text-white">Pengiriman</h4>
          <div className="mt-3 grid grid-cols-3 gap-2">
            <img src="/icons/jne.svg" alt="jne" className="h-8 w-full object-contain" />
            <img src="/icons/gosend.svg" alt="gosend" className="h-8 w-full object-contain" />
            <img src="/icons/ninja.svg" alt="ninja" className="h-8 w-full object-contain" />
          </div>
        </div>

        <div>
          <h4 className="text-sm font-bold text-white">Ikuti Kami</h4>
          <ul className="mt-3 space-y-2 text-sm text-zinc-400">
            <li><a href="/social/facebook" className="flex items-center gap-2 hover:text-white"><img src="/icons/facebook.svg" alt="fb" className="h-4 w-4"/> Facebook</a></li>
            <li><a href="/social/instagram" className="flex items-center gap-2 hover:text-white"><img src="/icons/instagram.svg" alt="ig" className="h-4 w-4"/> Instagram</a></li>
            <li><a href="/social/twitter" className="flex items-center gap-2 hover:text-white"><img src="/icons/twitter.svg" alt="tw" className="h-4 w-4"/> Twitter</a></li>
            <li><a href="/social/linkedin" className="flex items-center gap-2 hover:text-white"><img src="/icons/linkedin.svg" alt="li" className="h-4 w-4"/> LinkedIn</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-bold text-white">Download Aplikasi</h4>
          <div className="mt-3 flex items-start gap-3">
            <a href="/apps/app-store" className="block"><img src="/icons/app-store.svg" alt="App Store" className="h-10"/></a>
            <a href="/apps/google-play" className="block"><img src="/icons/google-play.svg" alt="Google Play" className="h-10"/></a>
          </div>
        </div>
      </div>

      <div className="border-t border-zinc-800 mt-6">
        <div className="max-w-7xl mx-auto px-4 py-6 md:px-8 flex flex-col md:flex-row items-center justify-between text-sm text-zinc-500">
          <div>© URBANSTORE 2026. Hak Cipta Dilindungi</div>
          <div className="mt-3 md:mt-0">Negara: Indonesia • Thailand • Malaysia • Vietnam</div>
        </div>
      </div>
    </footer>
  );
}
