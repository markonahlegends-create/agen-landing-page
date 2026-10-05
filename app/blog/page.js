import Link from 'next/link';
import { brand } from '@/lib/storeConfig';

export const metadata = {
  title: `Tips Parenting — ${brand.name}`,
  description: 'Artikel ringan seputar literasi dan tumbuh kembang anak.',
};

const articles = [
  {
    title: '5 Cara Membuat Rutinitas Tidur Anak Jadi Menyenangkan',
    excerpt: 'Dongeng singkat tiap malam sebelum tidur bisa jadi ritual bonding yang bikin anak tidur lebih tenang dan teratur.',
    date: '2 Oktober 2026',
  },
  {
    title: 'Kenapa Dongeng Pengantar Tidur Penting untuk Anak?',
    excerpt: 'Cerita yang menenangkan membantu anak rileks, mengurangi screen time malam hari, dan melatih imajinasi lewat mimpi indah.',
    date: '20 September 2026',
  },
  {
    title: 'Tips Membacakan Dongeng Agar Anak Tidak Makin Melek',
    excerpt: 'Gunakan intonasi lembut dan pelan menjelang akhir cerita supaya anak terbawa suasana tenang, bukan makin bersemangat.',
    date: '8 September 2026',
  },
];

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-cream">
      <div className="max-w-3xl mx-auto px-4 py-10">
        <Link href="/" className="inline-flex items-center gap-2 rounded-full border border-ink/10 bg-white px-4 py-2 text-sm font-semibold text-ink/70 shadow-sm hover:bg-pastel-pink/20">
          ← Kembali ke Beranda
        </Link>

        <div className="mt-6 rounded-3xl bg-white p-6 md:p-8 shadow-sm">
          <h1 className="text-2xl font-extrabold font-heading text-ink">Tips Parenting — {brand.name}</h1>
          <p className="mt-2 text-sm text-ink/60">Artikel ringan seputar literasi dan tumbuh kembang anak.</p>

          <div className="mt-6 space-y-5">
            {articles.map((a) => (
              <article key={a.title} className="rounded-2xl bg-pastel-mint/10 p-5">
                <h3 className="font-bold text-ink">{a.title}</h3>
                <p className="mt-2 text-sm text-ink/60">{a.excerpt}</p>
                <p className="mt-3 text-xs text-ink/40">{a.date}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
