import '@fontsource/baloo-2/500.css';
import '@fontsource/baloo-2/600.css';
import '@fontsource/baloo-2/700.css';
import '@fontsource/baloo-2/800.css';
import '@fontsource/nunito/400.css';
import '@fontsource/nunito/600.css';
import '@fontsource/nunito/700.css';
import '@fontsource/nunito/800.css';
import './globals.css';
import { brand } from '@/lib/storeConfig';
import PixelProvider from '@/components/PixelProvider';

export const metadata = {
  metadataBase: new URL(`https://${brand.domain}`),
  title: `${brand.name} — Paket Dongeng Pengantar Tidur Bergambar untuk Anak`,
  description:
    'Antarkan si kecil ke mimpi indah dengan paket buku dongeng pengantar tidur bergambar penuh warna untuk usia 3–8 tahun. Kertas tebal aman, cerita menenangkan, pesan moral kuat.',
  openGraph: {
    title: `${brand.name} — Paket Dongeng Pengantar Tidur Bergambar untuk Anak`,
    description: 'Paket buku dongeng pengantar tidur untuk usia 3–8 tahun. Kertas tebal aman untuk anak, cerita menenangkan, pesan moral kuat.',
    type: 'website',
    locale: 'id_ID',
    images: ['/products/hero-buku-mimpi.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${brand.name} — Paket Dongeng Pengantar Tidur Bergambar untuk Anak`,
    description: 'Paket buku dongeng pengantar tidur untuk usia 3–8 tahun.',
    images: ['/products/hero-buku-mimpi.png'],
  },
  icons: {
    icon: '/favicon.svg',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body className="min-h-screen antialiased">
        <PixelProvider />
        {children}
      </body>
    </html>
  );
}
