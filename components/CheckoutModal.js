'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { packages, brand } from '@/lib/storeConfig';
import { trackEvent, makeEventId } from '@/lib/pixel';

// Catatan: komponen ini sengaja hanya di-mount oleh parent SAAT modal dibuka
// (lihat HomeClient.js) supaya state selalu mulai bersih tanpa perlu effect
// yang men-sync ulang state dari props (dihindari sesuai rekomendasi React).
export default function CheckoutModal({ onClose, initialPackage, apiConfig }) {
  const [pkg, setPkg] = useState(initialPackage || packages[0]);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [step, setStep] = useState('form');
  const [errorMsg, setErrorMsg] = useState('');
  const [orderId, setOrderId] = useState(null);

  useEffect(() => {
    trackEvent('AddToCart', { content_name: pkg.name, value: pkg.price, currency: 'IDR' });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!apiConfig || apiConfig.demoMode || !apiConfig.clientKey) return;
    if (document.getElementById('midtrans-snap-script')) return;
    const script = document.createElement('script');
    script.id = 'midtrans-snap-script';
    script.src = apiConfig.isProduction ? 'https://app.midtrans.com/snap/snap.js' : 'https://app.sandbox.midtrans.com/snap/snap.js';
    script.setAttribute('data-client-key', apiConfig.clientKey);
    document.body.appendChild(script);
  }, [apiConfig]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !address.trim()) {
      setErrorMsg('Mohon lengkapi semua data ya.');
      return;
    }
    setErrorMsg('');
    setStep('processing');

    trackEvent('InitiateCheckout', { content_name: pkg.name, value: pkg.price, currency: 'IDR' }, makeEventId('initiate'));

    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          packageId: pkg.id,
          packageName: pkg.name,
          qtyLabel: pkg.qtyLabel,
          price: pkg.price,
          customer: { name, phone, address },
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Gagal memproses pesanan');

      setOrderId(data.orderId);

      if (data.demoMode) {
        setTimeout(async () => {
          try {
            await fetch(`/api/demo/mark-paid/${data.orderId}`, { method: 'POST' });
          } catch {
            /* abaikan */
          }
          trackEvent('Purchase', { content_name: pkg.name, value: pkg.price, currency: 'IDR' }, `purchase-${data.orderId}`);
          setStep('success');
        }, 1800);
        return;
      }

      if (window.snap) {
        window.snap.pay(data.token, {
          onSuccess: () => {
            trackEvent('Purchase', { content_name: pkg.name, value: pkg.price, currency: 'IDR' }, `purchase-${data.orderId}`);
            setStep('success');
          },
          onPending: () => setStep('pending'),
          onError: () => {
            setErrorMsg('Pembayaran gagal diproses. Silakan coba lagi.');
            setStep('error');
          },
          onClose: () => setStep('form'),
        });
      } else {
        setErrorMsg('Sistem pembayaran belum siap, silakan refresh halaman dan coba lagi.');
        setStep('error');
      }
    } catch (err) {
      setErrorMsg(err.message || 'Terjadi kesalahan, coba lagi.');
      setStep('error');
    }
  };

  const waFollowUpLink = `https://wa.me/${brand.whatsappNumber}?text=${encodeURIComponent(
    `Halo, saya sudah pesan ${pkg.name} (Order ID: ${orderId || '-'}). Mohon info selanjutnya ya 🙏`
  )}`;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[70] bg-ink/60 backdrop-blur-sm flex items-end md:items-center justify-center overflow-y-auto"
    >
      <motion.div
        initial={{ y: 60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 40, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 28 }}
        className="w-full md:max-w-md bg-white rounded-t-[2rem] md:rounded-[2rem] p-6 md:p-7 max-h-[92vh] overflow-y-auto"
      >
        {step === 'form' && (
          <>
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-extrabold font-heading text-ink">Lengkapi Data Pemesanan</h3>
              <button onClick={onClose} className="text-ink/40 hover:text-ink text-xl leading-none">✕</button>
            </div>

            <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
              {packages.map((p) => (
                <button
                  key={p.id}
                  onClick={() => setPkg(p)}
                  className={`shrink-0 rounded-xl border px-3 py-2 text-xs font-semibold whitespace-nowrap transition-colors ${
                    pkg.id === p.id ? 'border-coral bg-coral/10 text-coral-dark' : 'border-ink/10 text-ink/50'
                  }`}
                >
                  {p.name} · Rp{p.price.toLocaleString('id-ID')}
                </button>
              ))}
            </div>

            <form onSubmit={handleSubmit} className="mt-5 space-y-3">
              <div>
                <label className="text-xs font-semibold text-ink/60">Nama Lengkap</label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Nama penerima"
                  className="mt-1 w-full rounded-xl border border-ink/10 px-3.5 py-2.5 text-sm focus:outline-none focus:border-coral"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-ink/60">Nomor WhatsApp</label>
                <input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="08xxxxxxxxxx"
                  inputMode="numeric"
                  className="mt-1 w-full rounded-xl border border-ink/10 px-3.5 py-2.5 text-sm focus:outline-none focus:border-coral"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-ink/60">Alamat Pengiriman</label>
                <textarea
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Alamat lengkap + kode pos"
                  rows={3}
                  className="mt-1 w-full rounded-xl border border-ink/10 px-3.5 py-2.5 text-sm focus:outline-none focus:border-coral"
                />
              </div>

              {errorMsg && <p className="text-xs font-semibold text-red-500">{errorMsg}</p>}

              <div className="rounded-xl bg-pastel-amber/30 border border-pastel-amber px-3.5 py-3 flex items-center justify-between">
                <span className="text-sm font-semibold text-ink/70">Total Bayar</span>
                <span className="text-lg font-extrabold font-heading text-ink">Rp{pkg.price.toLocaleString('id-ID')}</span>
              </div>

              <button
                type="submit"
                className="w-full rounded-full bg-coral py-3.5 font-bold text-white shadow-lg shadow-coral/30 hover:bg-coral-dark transition-colors"
              >
                Lanjutkan Pembayaran
              </button>
              <p className="text-center text-[11px] text-ink/40">Pembayaran aman via QRIS / Transfer / E-Wallet (Midtrans)</p>
            </form>
          </>
        )}

        {step === 'processing' && (
          <div className="py-10 text-center">
            <div className="mx-auto h-12 w-12 rounded-full border-4 border-coral/20 border-t-coral animate-spin" />
            <p className="mt-4 font-semibold text-ink/70">Memproses pesananmu...</p>
          </div>
        )}

        {step === 'success' && (
          <div className="py-6 text-center">
            <span className="text-5xl">🎉</span>
            <h3 className="mt-3 text-xl font-extrabold font-heading text-ink">Pesanan Berhasil!</h3>
            <p className="mt-2 text-sm text-ink/60">
              Order ID: <span className="font-semibold text-ink/80">{orderId}</span>
              <br />
              Terima kasih, pesanan {pkg.name} sedang kami siapkan.
            </p>
            <a
              href={waFollowUpLink}
              target="_blank"
              rel="noreferrer"
              className="mt-5 inline-flex items-center gap-2 rounded-full bg-emerald-500 px-5 py-3 text-sm font-bold text-white shadow-md"
            >
              💬 Konfirmasi via WhatsApp
            </a>
            <button onClick={onClose} className="mt-4 block w-full text-sm text-ink/40 hover:text-ink">Tutup</button>
          </div>
        )}

        {step === 'pending' && (
          <div className="py-6 text-center">
            <span className="text-5xl">⏳</span>
            <h3 className="mt-3 text-xl font-extrabold font-heading text-ink">Menunggu Pembayaran</h3>
            <p className="mt-2 text-sm text-ink/60">Selesaikan pembayaran sesuai instruksi. Order ID: {orderId}</p>
            <a
              href={waFollowUpLink}
              target="_blank"
              rel="noreferrer"
              className="mt-5 inline-flex items-center gap-2 rounded-full bg-emerald-500 px-5 py-3 text-sm font-bold text-white shadow-md"
            >
              💬 Hubungi Admin
            </a>
            <button onClick={onClose} className="mt-4 block w-full text-sm text-ink/40 hover:text-ink">Tutup</button>
          </div>
        )}

        {step === 'error' && (
          <div className="py-6 text-center">
            <span className="text-5xl">😕</span>
            <h3 className="mt-3 text-xl font-extrabold font-heading text-ink">Ada Kendala</h3>
            <p className="mt-2 text-sm text-ink/60">{errorMsg || 'Silakan coba lagi beberapa saat lagi.'}</p>
            <button onClick={() => setStep('form')} className="mt-5 inline-flex items-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-bold text-white">
              Coba Lagi
            </button>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}
