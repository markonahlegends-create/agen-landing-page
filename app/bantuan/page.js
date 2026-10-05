import Link from 'next/link';
import { brand, faqs } from '@/lib/storeConfig';

export const metadata = {
  title: `Pusat Bantuan — ${brand.name}`,
  description: 'Jawaban seputar pemesanan, pembayaran, pengiriman, kebijakan privasi, dan syarat & ketentuan.',
};

export default function BantuanPage() {
  return (
    <div className="min-h-screen bg-cream">
      <div className="max-w-3xl mx-auto px-4 py-10">
        <Link href="/" className="inline-flex items-center gap-2 rounded-full border border-ink/10 bg-white px-4 py-2 text-sm font-semibold text-ink/70 shadow-sm hover:bg-pastel-pink/20">
          ← Kembali ke Beranda
        </Link>

        <div className="mt-6 rounded-3xl bg-white p-6 md:p-8 space-y-10 shadow-sm">
          <section>
            <h1 className="text-2xl font-extrabold font-heading text-ink">Pusat Bantuan</h1>
            <p className="mt-2 text-sm text-ink/60">Jawaban cepat seputar pemesanan, pembayaran, dan pengiriman.</p>
            <div className="mt-4 space-y-2">
              {faqs.map((item) => (
                <details key={item.q} className="rounded-xl bg-pastel-mint/10 p-4">
                  <summary className="font-semibold text-sm text-ink cursor-pointer">{item.q}</summary>
                  <p className="mt-2 text-sm text-ink/60">{item.a}</p>
                </details>
              ))}
            </div>
          </section>

          <section id="privasi">
            <h2 className="text-xl font-extrabold font-heading text-ink">Kebijakan Privasi</h2>
            <div className="mt-2 space-y-2 text-sm text-ink/60">
              <p>
                {brand.name} menghormati privasi pelanggan. Data pribadi (nama, nomor WhatsApp, alamat) yang kamu berikan saat
                checkout hanya digunakan untuk memproses pesanan, pengiriman, dan komunikasi terkait transaksi — tidak
                dibagikan ke pihak ketiga selain mitra logistik dan payment gateway yang memproses pesananmu.
              </p>
              <p>
                Kami menggunakan teknologi analitik (termasuk Meta Pixel) untuk mengukur efektivitas iklan. Data yang dikirim
                ke Meta telah melalui proses hashing untuk melindungi identitas pribadimu sesuai kebijakan Meta.
              </p>
              <p>
                Pembayaran diproses melalui payment gateway pihak ketiga tersertifikasi (Midtrans) sehingga detail kartu/akun
                pembayaranmu tidak pernah disimpan di server kami.
              </p>
            </div>
          </section>

          <section id="syarat">
            <h2 className="text-xl font-extrabold font-heading text-ink">Syarat & Ketentuan</h2>
            <ul className="mt-2 list-disc ml-5 space-y-1.5 text-sm text-ink/60">
              <li>Harga yang tertera adalah harga final per paket, belum termasuk ongkos kirim kecuali disebutkan gratis ongkir.</li>
              <li>Pesanan diproses setelah pembayaran terkonfirmasi oleh sistem.</li>
              <li>Estimasi pengiriman 2–7 hari kerja tergantung lokasi dan ekspedisi.</li>
              <li>Produk cacat produksi dapat diganti baru dalam 7 hari sejak barang diterima — hubungi admin dengan bukti foto/video.</li>
              <li>Produk ini ditujukan untuk dibaca bersama orang tua/wali untuk anak di bawah 5 tahun.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-extrabold font-heading text-ink">Hubungi Kami</h2>
            <p className="mt-2 text-sm text-ink/60">
              WhatsApp: <a className="text-coral-dark font-semibold" href={`https://wa.me/${brand.whatsappNumber}`}>+{brand.whatsappNumber}</a>
              <br />
              Instagram: {brand.instagram}
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
