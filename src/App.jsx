import React, { useEffect, useState } from 'react';
import Footer from './Footer';
import Help from './Help';
import Blog from './Blog';

const categories = ['Semua', 'Hoodie', 'Jacket', 'T-Shirt', 'Pants', 'Accessories'];

const products = [
  { id: 1, name: 'Oversized Hoodie Black', category: 'Hoodie', price: 299000, image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=600&q=80', rating: '4.9 (120 terjual)', description: 'Hoodie oversized dengan bahan fleece lembut yang nyaman dipakai sehari-hari dan cocok untuk tampilan streetwear modern.', highlights: ['Bahan fleece premium', 'Cut oversized', 'Warna hitam timeless'] },
  { id: 2, name: 'Urban Street Jacket', category: 'Jacket', price: 399000, image: 'https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&w=600&q=80', rating: '4.8 (85 terjual)', description: 'Jaket luar yang ringan namun hangat, ideal untuk perjalanan kota dan tampilan santai yang stylish.', highlights: ['Lapisan ringan', 'Tahan angin', 'Detail warna premium'] },
  { id: 3, name: 'Graphic Tee Statement', category: 'T-Shirt', price: 149000, image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=600&q=80', rating: '5.0 (310 terjual)', description: 'Kaos graphic dengan desain statement yang kuat dan nyaman dipakai untuk aktivitas harian.', highlights: ['Bahan katun lembut', 'Desain bold', 'Sesuai untuk layering'] },
  { id: 4, name: 'Cargo Street Pants', category: 'Pants', price: 349000, image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=600&q=80', rating: '4.7 (95 terjual)', description: 'Celana cargo dengan potongan relaxed yang memberi nuansa urban dan banyak ruang untuk aksesori.', highlights: ['Potongan roomy', 'Kantong serbaguna', 'Material kuat'] },
  { id: 5, name: 'Minimalist Hoodie Grey', category: 'Hoodie', price: 289000, image: 'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=600&q=80', rating: '4.9 (210 terjual)', description: 'Hoodie minimalis dengan warna netral yang mudah dipadupadankan dalam berbagai outfit.', highlights: ['Warna neutral', 'Nyaman dipakai', 'Cocok untuk semua style'] },
  { id: 6, name: 'Vintage Windbreaker', category: 'Jacket', price: 429000, image: 'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=600&q=80', rating: '4.9 (64 terjual)', description: 'Windbreaker vintage dengan nuansa retro yang unik dan cocok untuk cuaca berubah-ubah.', highlights: ['Tampilan retro', 'Ringan dan praktis', 'Tahan angin'] },
  { id: 7, name: 'Streetwear Cap Limited', category: 'Accessories', price: 129000, image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=600&q=80', rating: '5.0 (40 terjual)', description: 'Topi streetwear dengan desain limited edition yang memantapkan tampilan casual Anda.', highlights: ['Desain limited', 'Nyaman dipakai', 'Detail premium'] },
];

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Semua');
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [detailQty, setDetailQty] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState('qris');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [shippingMethod, setShippingMethod] = useState('reguler');
  const [checkoutMessage, setCheckoutMessage] = useState('');
  const [paymentPending, setPaymentPending] = useState(false);
  const [activeOrder, setActiveOrder] = useState(null);
  const [paymentStatus, setPaymentStatus] = useState('pending');
  const [orderStatusView, setOrderStatusView] = useState(false);
  const [detailTab, setDetailTab] = useState('deskripsi');
  const [isStickyBuyVisible, setIsStickyBuyVisible] = useState(false);
  const [currentRoute, setCurrentRoute] = useState(null);

  // Filter produk berdasarkan pencarian & kategori
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'Semua' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  useEffect(() => {
    const syncProductFromHash = () => {
      const rawHash = window.location.hash.replace('#', '');
      const hash = rawHash.startsWith('/') ? rawHash.slice(1) : rawHash;

      // product detail route
      if (hash.startsWith('product/')) {
        setCurrentRoute(null);
        const productId = Number(hash.split('/')[1]);
        const foundProduct = products.find((item) => item.id === productId);
        setSelectedProduct(foundProduct || null);
        return;
      }

      // internal pages
      if (hash === 'help') {
        setSelectedProduct(null);
        setCurrentRoute('help');
        return;
      }

      if (hash === 'blog') {
        setSelectedProduct(null);
        setCurrentRoute('blog');
        return;
      }

      // default: clear overlays
      setSelectedProduct(null);
      setCurrentRoute(null);
    };

    const handleScroll = () => {
      setIsStickyBuyVisible(window.scrollY > 220);
    };

    syncProductFromHash();
    handleScroll();
    window.addEventListener('hashchange', syncProductFromHash);
    window.addEventListener('popstate', syncProductFromHash);
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('hashchange', syncProductFromHash);
      window.removeEventListener('popstate', syncProductFromHash);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const openProductDetail = (product) => {
    setSelectedProduct(product);
    setDetailQty(1);
    window.history.pushState({}, '', `#/product/${product.id}`);
  };

  const closeProductDetail = () => {
    setSelectedProduct(null);
    setDetailQty(1);
    window.history.pushState({}, '', window.location.pathname + window.location.search);
    setCurrentRoute(null);
  };

  const closeCurrentRoute = () => {
    setCurrentRoute(null);
    window.history.pushState({}, '', window.location.pathname + window.location.search);
  };

  // Tambah ke keranjang
  const addToCart = (product, qty = 1) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) => item.id === product.id ? { ...item, qty: item.qty + qty } : item);
      }

      return [...prevCart, { ...product, qty }];
    });
    setIsCartOpen(true);
  };

  // Ubah jumlah item di keranjang
  const updateQty = (id, delta) => {
    setCart((prevCart) => prevCart.map((item) => {
      if (item.id === id) {
        const newQty = item.qty + delta;
        return newQty > 0 ? { ...item, qty: newQty } : null;
      }
      return item;
    }).filter(Boolean));
  };

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
  const shippingFee = cart.length === 0 ? 0 : shippingMethod === 'express' ? 20000 : 12000;
  const serviceFee = cart.length === 0 ? 0 : 2500;
  const grandTotal = subtotal + shippingFee + serviceFee;

  const paymentMethodLabel = paymentMethod === 'qris' ? 'QRIS' : paymentMethod === 'ewallet' ? 'E-Wallet' : 'Bank Lokal';

  const handleCheckout = () => {
    if (cart.length === 0) return;

    const order = {
      id: `URB-${Math.floor(100000 + Math.random() * 900000)}`,
      items: cart,
      paymentMethod,
      paymentMethodLabel,
      customerName: customerName || 'Customer',
      customerPhone: customerPhone || '08xxxxxx',
      customerAddress: customerAddress || 'Alamat belum diisi',
      shippingMethod,
      subtotal,
      shippingFee,
      serviceFee,
      grandTotal,
    };

    setActiveOrder(order);
    setCheckoutMessage('Pesanan berhasil dibuat. Silakan selesaikan pembayaran Anda.');
    setIsCartOpen(false);
    setPaymentPending(true);
    setOrderStatusView(false);
    setPaymentStatus('pending');

    window.setTimeout(() => {
      setPaymentStatus('paid');
    }, 2200);
  };

  const openOrderStatusView = () => {
    if (!activeOrder) return;
    setPaymentPending(false);
    setOrderStatusView(true);
    window.history.pushState({}, '', `#/order/${activeOrder.id}`);
  };

  const closeOrderStatusView = () => {
    setOrderStatusView(false);
    window.history.pushState({}, '', window.location.pathname + window.location.search);
  };

  return (
    <div className="bg-zinc-950 text-white min-h-screen font-sans">
      {/* Navbar ala E-Commerce */}
      <header className="sticky top-0 z-40 bg-zinc-900/80 backdrop-blur-md border-b border-zinc-800 px-4 md:px-8 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <button onClick={() => { setSelectedProduct(null); window.history.pushState({}, '', window.location.pathname + window.location.search); }} className="text-xl font-black tracking-wider bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
            URBANSTORE.ID
          </button>

          <div className="flex-1 max-w-md hidden md:block">
            <input
              type="text"
              placeholder="Cari hoodie, jacket, atau streetwear..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-purple-500 transition-all"
            />
          </div>

          <button
            onClick={() => setIsCartOpen(true)}
            className="relative p-2 bg-zinc-800 hover:bg-zinc-700 rounded-xl transition-all flex items-center gap-2 px-4"
          >
            <span>🛒 Keranjang</span>
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-pink-600 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center">
                {cart.reduce((sum, item) => sum + item.qty, 0)}
              </span>
            )}
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        {/* Banner Promo */}
        <div className="w-full h-48 md:h-64 bg-gradient-to-r from-purple-900 via-zinc-900 to-zinc-900 rounded-3xl p-6 md:p-10 flex flex-col justify-center border border-zinc-800 mb-8 relative overflow-hidden">
          <div className="absolute right-0 bottom-0 opacity-20 md:opacity-40 pointer-events-none">
            <img src="https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?auto=format&fit=crop&w=400&q=80" alt="Banner" className="h-64 object-cover" />
          </div>
          <span className="px-3 py-1 bg-purple-600/30 text-purple-400 text-xs font-semibold rounded-full w-fit mb-3">Flash Sale 2026</span>
          <h2 className="text-2xl md:text-4xl font-extrabold tracking-tight">Elevate Your Streetwear Identity</h2>
          <p className="text-zinc-400 text-sm mt-2 max-w-md">Diskon spesial hingga 40% untuk koleksi urban fashion pilihan minggu ini.</p>
        </div>

        {/* Filter Kategori */}
        <div className="flex gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2.5 rounded-xl text-sm font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30' : 'bg-zinc-900 text-zinc-400 hover:bg-zinc-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid Produk */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden flex flex-col group hover:border-zinc-700 transition-all duration-300 ease-out cursor-pointer hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(168,85,247,0.12)]"
              onClick={() => openProductDetail(product)}
              role="button"
              tabIndex={0}
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault();
                  openProductDetail(product);
                }
              }}
            >
              <div className="h-48 md:h-60 overflow-hidden relative">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105" />
                <span className="absolute top-3 left-3 bg-black/60 backdrop-blur-md text-xs px-2.5 py-1 rounded-lg text-zinc-300">
                  {product.category}
                </span>
              </div>
              <div className="p-4 flex flex-col flex-1 justify-between gap-4">
                <div>
                  <h3 className="font-bold text-sm md:text-base line-clamp-1">{product.name}</h3>
                  <p className="text-xs text-zinc-400 mt-1">⭐ {product.rating}</p>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-purple-400 font-bold text-sm md:text-base">
                    Rp {product.price.toLocaleString('id-ID')}
                  </span>
                </div>
                <button
                  onClick={(event) => {
                    event.stopPropagation();
                    addToCart(product);
                  }}
                  className="w-full py-2.5 bg-zinc-800 hover:bg-purple-600 text-white text-xs md:text-sm font-semibold rounded-xl transition-all duration-300 ease-out"
                >
                  + Keranjang
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>

      {selectedProduct && (
        <div className="fixed inset-0 z-[60] bg-black/85 backdrop-blur-md overflow-y-auto animate-[fadeIn_0.25s_ease-out]">
          <div className="mx-auto max-w-7xl px-4 py-6 md:px-8 animate-[slideUp_0.3s_ease-out]">
            <button
              onClick={closeProductDetail}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-zinc-700 bg-zinc-900/80 px-4 py-2 text-sm font-semibold text-zinc-300 transition-all duration-300 ease-out hover:bg-zinc-800 hover:-translate-y-0.5"
            >
              ← Kembali ke katalog
            </button>

            <div className="rounded-[2rem] border border-zinc-800 bg-zinc-900/80 p-4 md:p-6">
              <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
                <div className="space-y-4">
                  <div className="group rounded-[1.75rem] border border-zinc-800 bg-zinc-950 p-3 md:p-4">
                    <div className="overflow-hidden rounded-[1.5rem]">
                      <img src={selectedProduct.image} alt={selectedProduct.name} className="h-[420px] md:h-[520px] w-full rounded-[1.5rem] object-cover transition-transform duration-700 ease-out group-hover:scale-110" />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    {[selectedProduct.image, selectedProduct.image, selectedProduct.image].map((image, index) => (
                      <div key={`${selectedProduct.id}-${index}`} className="rounded-[1.2rem] border border-zinc-800 bg-zinc-950 p-2">
                        <img src={image} alt={`${selectedProduct.name} ${index + 1}`} className="h-24 w-full rounded-[1rem] object-cover" />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-4 lg:sticky lg:top-6">
                  <div className="rounded-[1.75rem] border border-zinc-800 bg-zinc-950/80 p-5 md:p-6">
                    <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-purple-400">
                      <span>{selectedProduct.category}</span>
                      <span className="rounded-full bg-purple-600/20 px-2.5 py-1">Official Store</span>
                    </div>

                    <h2 className="mt-3 text-2xl font-black md:text-3xl">{selectedProduct.name}</h2>

                    <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-zinc-400">
                      <span className="rounded-full bg-zinc-800 px-2.5 py-1">⭐ {selectedProduct.rating}</span>
                      <span>• 1,2 rb terjual</span>
                      <span>• 99% pesanan selesai</span>
                    </div>

                    <div className="mt-5 rounded-[1.5rem] border border-purple-500/20 bg-gradient-to-br from-purple-600/15 to-pink-500/10 p-4">
                      <p className="text-sm text-zinc-400">Harga</p>
                      <div className="mt-1 flex flex-wrap items-end gap-3">
                        <span className="text-4xl font-black text-purple-400">
                          Rp {selectedProduct.price.toLocaleString('id-ID')}
                        </span>
                        <span className="mb-1 rounded-full bg-emerald-500/15 px-2.5 py-1 text-xs font-semibold text-emerald-400">Diskon 15%</span>
                      </div>
                      <div className="mt-3 flex flex-wrap gap-2">
                        <span className="rounded-full bg-emerald-600/20 px-2.5 py-1 text-xs font-semibold text-emerald-400">Gratis Ongkir</span>
                        <span className="rounded-full bg-amber-500/10 px-2.5 py-1 text-xs font-semibold text-amber-400">Bisa COD</span>
                        <span className="rounded-full bg-cyan-500/10 px-2.5 py-1 text-xs font-semibold text-cyan-400">Cashback 5%</span>
                      </div>
                    </div>

                    <div className="mt-5 rounded-[1.25rem] border border-zinc-800 bg-zinc-900/70 p-4">
                      <div className="flex items-center justify-between text-sm text-zinc-400">
                        <span>Jumlah</span>
                        <span>Stok tersedia</span>
                      </div>
                      <div className="mt-3 flex items-center gap-3">
                        <button onClick={() => setDetailQty((prev) => prev > 1 ? prev - 1 : 1)} className="h-10 w-10 rounded-xl bg-zinc-800 text-xl font-bold transition-all duration-200 ease-out hover:bg-zinc-700">−</button>
                        <span className="min-w-10 text-center text-lg font-bold">{detailQty}</span>
                        <button onClick={() => setDetailQty((prev) => prev + 1)} className="h-10 w-10 rounded-xl bg-zinc-800 text-xl font-bold transition-all duration-200 ease-out hover:bg-zinc-700">+</button>
                      </div>
                    </div>

                    <div className="mt-5 grid gap-3 sm:grid-cols-2">
                      <button
                        onClick={() => addToCart(selectedProduct, detailQty)}
                        className="w-full rounded-2xl bg-zinc-800 py-3.5 font-semibold text-white transition-all duration-300 ease-out hover:bg-purple-600 hover:-translate-y-0.5"
                      >
                        + Keranjang
                      </button>
                      <button
                        onClick={() => {
                          addToCart(selectedProduct, detailQty);
                          setIsCartOpen(true);
                          closeProductDetail();
                        }}
                        className="w-full rounded-2xl bg-red-600 py-3.5 font-semibold text-white transition-all duration-300 ease-out hover:bg-red-500 hover:-translate-y-0.5"
                      >
                        Beli Sekarang
                      </button>
                    </div>
                  </div>

                  <div className="rounded-[1.75rem] border border-zinc-800 bg-zinc-950/80 p-5">
                    <div className="flex items-center gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-pink-500 text-xl">🏪</div>
                      <div>
                        <p className="font-semibold">Urban Store Official</p>
                        <p className="text-sm text-zinc-400">Online 12 jam lalu • 4.9/5 rating toko</p>
                      </div>
                    </div>
                    <div className="mt-4 grid gap-3 sm:grid-cols-3">
                      <div className="rounded-2xl border border-zinc-800 bg-zinc-900/70 p-3 text-center">
                        <p className="text-xl font-black text-white">4.9</p>
                        <p className="text-xs text-zinc-400">Rating</p>
                      </div>
                      <div className="rounded-2xl border border-zinc-800 bg-zinc-900/70 p-3 text-center">
                        <p className="text-xl font-black text-white">95%</p>
                        <p className="text-xs text-zinc-400">Responsif</p>
                      </div>
                      <div className="rounded-2xl border border-zinc-800 bg-zinc-900/70 p-3 text-center">
                        <p className="text-xl font-black text-white">24 jam</p>
                        <p className="text-xs text-zinc-400">Chat</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
                <div className={`fixed bottom-4 right-4 z-[90] transition-all duration-300 lg:hidden ${isStickyBuyVisible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0'}`}>
                  <button
                    onClick={() => {
                      addToCart(selectedProduct, detailQty);
                      setIsCartOpen(true);
                      closeProductDetail();
                    }}
                    className="rounded-2xl bg-red-600 px-5 py-3.5 font-semibold text-white shadow-lg shadow-red-600/20"
                  >
                    Beli Sekarang
                  </button>
                </div>
                <div className="rounded-[1.75rem] border border-zinc-800 bg-zinc-950/80 p-5">
                  <div className="flex gap-2 overflow-x-auto pb-2">
                    {[
                      { key: 'deskripsi', label: 'Deskripsi' },
                      { key: 'spesifikasi', label: 'Spesifikasi' },
                      { key: 'ulasan', label: 'Ulasan' },
                    ].map((tab) => (
                      <button
                        key={tab.key}
                        onClick={() => setDetailTab(tab.key)}
                        className={`rounded-full px-3 py-1.5 text-sm font-semibold transition-all ${detailTab === tab.key ? 'bg-purple-600 text-white' : 'bg-zinc-800 text-zinc-400'}`}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>

                  <div className="mt-4 space-y-3">
                    {detailTab === 'deskripsi' && (
                      <>
                        <h3 className="text-lg font-black">Deskripsi Produk</h3>
                        <p className="text-sm leading-7 text-zinc-400">{selectedProduct.description}</p>
                        <ul className="space-y-2 text-sm text-zinc-300">
                          {selectedProduct.highlights.map((highlight) => (
                            <li key={highlight} className="flex items-center gap-2">
                              <span className="h-2.5 w-2.5 rounded-full bg-purple-500" />
                              {highlight}
                            </li>
                          ))}
                        </ul>
                      </>
                    )}

                    {detailTab === 'spesifikasi' && (
                      <div className="rounded-2xl border border-zinc-800 bg-zinc-900/70 p-4 text-sm text-zinc-300">
                        <div className="flex items-center justify-between border-b border-zinc-800 py-2">
                          <span className="text-zinc-400">Kategori</span>
                          <span>{selectedProduct.category}</span>
                        </div>
                        <div className="flex items-center justify-between border-b border-zinc-800 py-2">
                          <span className="text-zinc-400">Material</span>
                          <span>Premium cotton blend</span>
                        </div>
                        <div className="flex items-center justify-between py-2">
                          <span className="text-zinc-400">Ukuran</span>
                          <span>XS - XL</span>
                        </div>
                      </div>
                    )}

                    {detailTab === 'ulasan' && (
                      <div className="rounded-2xl border border-zinc-800 bg-zinc-900/70 p-4 text-sm text-zinc-300">
                        <p className="font-semibold text-white">“Kualitas bagus, warna sesuai foto, proses pengiriman cepat.”</p>
                        <p className="mt-2 text-zinc-400">- Rina, 2 jam lalu</p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="rounded-[1.75rem] border border-zinc-800 bg-zinc-950/80 p-5">
                  <h3 className="text-lg font-black">Info Pengiriman</h3>
                  <div className="mt-4 space-y-3 text-sm text-zinc-400">
                    <div className="rounded-2xl border border-zinc-800 bg-zinc-900/70 p-3">📦 Pengiriman 1–3 hari kerja</div>
                    <div className="rounded-2xl border border-zinc-800 bg-zinc-900/70 p-3">🛡️ Garansi 100% original</div>
                    <div className="rounded-2xl border border-zinc-800 bg-zinc-900/70 p-3">💬 Bisa tanya sebelum checkout</div>
                  </div>
                </div>
              </div>

              <div className="mt-8 rounded-[2rem] border border-zinc-800 bg-zinc-900/80 p-5 md:p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-black">Rekomendasi Produk</h3>
                    <p className="mt-1 text-sm text-zinc-400">Produk serupa yang mungkin Anda suka</p>
                  </div>
                  <button className="rounded-full border border-zinc-700 bg-zinc-950 px-3 py-1.5 text-sm font-semibold text-zinc-300">
                    Lihat Semua
                  </button>
                </div>

                <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  {products
                    .filter((item) => item.id !== selectedProduct.id)
                    .slice(0, 4)
                    .map((item) => (
                      <div key={item.id} className="rounded-[1.4rem] border border-zinc-800 bg-zinc-950/70 p-3 transition-all duration-300 hover:-translate-y-1 hover:border-purple-500/40">
                        <img src={item.image} alt={item.name} className="h-36 w-full rounded-[1rem] object-cover" />
                        <div className="mt-3">
                          <p className="text-sm font-semibold text-white">{item.name}</p>
                          <p className="mt-1 text-xs text-zinc-400">{item.category}</p>
                          <p className="mt-2 text-sm font-black text-purple-400">Rp {item.price.toLocaleString('id-ID')}</p>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

          {currentRoute === 'help' && (
            <Help onClose={closeCurrentRoute} />
          )}

          {currentRoute === 'blog' && (
            <Blog onClose={closeCurrentRoute} />
          )}

          {paymentPending && activeOrder && (
        <div className="fixed inset-0 z-[70] bg-zinc-950/95 backdrop-blur-xl overflow-y-auto">
          <div className="mx-auto flex max-w-5xl flex-col gap-6 px-4 py-6 md:px-8 lg:px-10">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-purple-400">Pembayaran</p>
                <h2 className="text-2xl font-black">Status Pesanan</h2>
              </div>
              <button onClick={() => setPaymentPending(false)} className="rounded-full border border-zinc-700 bg-zinc-900 px-4 py-2 text-sm font-semibold text-zinc-300 hover:bg-zinc-800">
                ✕ Tutup
              </button>
            </div>

            <div className="rounded-[2rem] border border-zinc-800 bg-zinc-900/80 p-5 md:p-8">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-sm text-zinc-400">Order ID</p>
                  <h3 className="text-xl font-black">{activeOrder.id}</h3>
                </div>
                <span className={`rounded-full border px-3 py-1 text-sm font-semibold transition-all duration-500 ${paymentStatus === 'paid' ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-300 animate-pulse' : 'border-amber-500/40 bg-amber-500/10 text-amber-300'}`}>
                  {paymentStatus === 'paid' ? 'Sudah Dibayar' : 'Menunggu Pembayaran'}
                </span>
              </div>

              <div className="mt-5 rounded-[1.5rem] border border-zinc-800 bg-zinc-950/80 p-4 md:p-5">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-zinc-400">Estimasi Pengiriman</p>
                    <p className="mt-1 text-lg font-bold text-white">{activeOrder.shippingMethod === 'express' ? '1 hari kerja' : '2–3 hari kerja'}</p>
                  </div>
                  <div className="rounded-full bg-purple-600/10 px-3 py-1 text-sm font-semibold text-purple-400">
                    {activeOrder.shippingMethod === 'express' ? 'Express' : 'Reguler'}
                  </div>
                </div>

                <div className="mt-4 grid gap-3 md:grid-cols-3">
                  {[
                    { label: 'Pembayaran', active: true, done: paymentStatus === 'paid' || paymentStatus === 'pending' },
                    { label: 'Diproses', active: paymentStatus === 'paid', done: paymentStatus === 'paid' },
                    { label: 'Dikirim', active: paymentStatus === 'paid', done: false },
                  ].map((step, index) => (
                    <div key={step.label} className={`rounded-2xl border px-3 py-3 text-sm ${step.active ? 'border-purple-500/40 bg-purple-500/10 text-white' : 'border-zinc-800 bg-zinc-900/70 text-zinc-400'}`}>
                      <div className="flex items-center gap-2 font-semibold">
                        <span className={`h-2.5 w-2.5 rounded-full ${step.done ? 'bg-emerald-400' : step.active ? 'bg-purple-400' : 'bg-zinc-600'}`} />
                        {step.label}
                      </div>
                      <p className="mt-2 text-xs text-zinc-400">{index === 0 ? 'Pembayaran sedang dipantau' : index === 1 ? 'Pesanan sedang disiapkan' : 'Menunggu kurir'}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
                <div className="rounded-[1.5rem] border border-zinc-800 bg-zinc-950/80 p-4 md:p-6">
                  <p className="text-sm font-semibold text-zinc-400">Total Yang Harus Dibayar</p>
                  <p className={`mt-2 text-3xl font-black transition-all duration-500 ${paymentStatus === 'paid' ? 'text-emerald-400 scale-105' : 'text-purple-400'}`}>Rp {activeOrder.grandTotal.toLocaleString('id-ID')}</p>
                  <p className="mt-4 text-sm text-zinc-400">Metode pembayaran dipilih: <span className="font-semibold text-white">{activeOrder.paymentMethodLabel}</span></p>

                  {paymentStatus === 'paid' && (
                    <div className="mt-4 rounded-2xl border border-emerald-500/40 bg-emerald-500/10 p-3 text-sm text-emerald-300 animate-[fadeIn_0.4s_ease-out]">
                      Pembayaran berhasil diverifikasi. Pesanan Anda sedang diproses.
                    </div>
                  )}

                  <div className="mt-6 rounded-2xl border border-zinc-800 bg-zinc-900/80 p-4">
                    {activeOrder.paymentMethod === 'qris' ? (
                      <>
                        <p className="text-sm font-semibold">Scan QR Code Dummy</p>
                        <div className="mt-4 grid grid-cols-8 gap-1 rounded-2xl bg-white p-4">
                          {Array.from({ length: 64 }).map((_, index) => {
                            const isDark = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63].includes(index) ? false : ((index + Math.floor(index / 8)) % 2 === 0);
                            return <div key={index} className={`h-3 w-3 rounded-sm ${isDark ? 'bg-zinc-950' : 'bg-white'}`} />;
                          })}
                        </div>
                        <p className="mt-4 text-xs text-zinc-400">Simulasi QRIS visual. Pembayaran akan diverifikasi secara otomatis.</p>
                      </>
                    ) : activeOrder.paymentMethod === 'ewallet' ? (
                      <>
                        <p className="text-sm font-semibold">Bayar via E-Wallet</p>
                        <div className="mt-4 space-y-2 text-sm text-zinc-300">
                          <div className="rounded-xl border border-zinc-800 bg-zinc-950/70 px-3 py-2">GoPay: 0812-3456-7890</div>
                          <div className="rounded-xl border border-zinc-800 bg-zinc-950/70 px-3 py-2">OVO: 0812-3456-7890</div>
                          <div className="rounded-xl border border-zinc-800 bg-zinc-950/70 px-3 py-2">DANA: 0812-3456-7890</div>
                        </div>
                      </>
                    ) : (
                      <>
                        <p className="text-sm font-semibold">Transfer ke Rekening Dummy</p>
                        <div className="mt-4 space-y-2 text-sm text-zinc-300">
                          <div className="rounded-xl border border-zinc-800 bg-zinc-950/70 px-3 py-2">BCA: 1234567890</div>
                          <div className="rounded-xl border border-zinc-800 bg-zinc-950/70 px-3 py-2">BRI: 0987654321</div>
                          <div className="rounded-xl border border-zinc-800 bg-zinc-950/70 px-3 py-2">Mandiri: 1122334455</div>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="rounded-[1.5rem] border border-zinc-800 bg-zinc-950/80 p-4 md:p-6">
                    <h3 className="text-lg font-bold">Detail Pesanan</h3>
                    <div className="mt-4 space-y-2 text-sm text-zinc-400">
                      <div className="flex items-center justify-between"><span>Nama</span><span className="text-white">{activeOrder.customerName}</span></div>
                      <div className="flex items-center justify-between"><span>HP</span><span className="text-white">{activeOrder.customerPhone}</span></div>
                      <div className="flex items-center justify-between"><span>Alamat</span><span className="text-white text-right max-w-[12rem]">{activeOrder.customerAddress}</span></div>
                      <div className="flex items-center justify-between"><span>Pengiriman</span><span className="text-white">{activeOrder.shippingMethod === 'express' ? 'Express' : 'Reguler'}</span></div>
                    </div>
                  </div>

                  <div className="rounded-[1.5rem] border border-zinc-800 bg-zinc-950/80 p-4 md:p-6">
                    <h3 className="text-lg font-bold">Daftar Produk</h3>
                    <div className="mt-4 space-y-3">
                      {activeOrder.items.map((item) => (
                        <div key={item.id} className="flex items-center justify-between rounded-2xl border border-zinc-800 bg-zinc-900/70 px-3 py-3 text-sm">
                          <div>
                            <p className="font-semibold text-white">{item.name}</p>
                            <p className="text-zinc-400">{item.qty}x • Rp {item.price.toLocaleString('id-ID')}</p>
                          </div>
                          <span className="text-purple-400">Rp {(item.price * item.qty).toLocaleString('id-ID')}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={openOrderStatusView}
                    className="group flex w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-500 py-3.5 font-semibold text-white shadow-lg shadow-purple-600/20 transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-purple-500/30"
                  >
                    <span className="text-lg transition-transform duration-300 group-hover:translate-x-0.5">📦</span>
                    <span>Lihat Status Pesanan</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {orderStatusView && activeOrder && (
        <div className="fixed inset-0 z-[80] bg-zinc-950/95 backdrop-blur-xl overflow-y-auto">
          <div className="mx-auto flex max-w-5xl flex-col gap-6 px-4 py-6 md:px-8 lg:px-10">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-purple-400">Status Pesanan</p>
                <h2 className="text-2xl font-black">Lacak pesanan Anda</h2>
              </div>
              <button onClick={closeOrderStatusView} className="rounded-full border border-zinc-700 bg-zinc-900 px-4 py-2 text-sm font-semibold text-zinc-300 hover:bg-zinc-800">
                ✕ Tutup
              </button>
            </div>

            <div className="rounded-[2rem] border border-zinc-800 bg-zinc-900/80 p-5 md:p-8">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-sm text-zinc-400">Order ID</p>
                  <h3 className="text-xl font-black">{activeOrder.id}</h3>
                </div>
                <span className={`rounded-full border px-3 py-1 text-sm font-semibold transition-all duration-500 ${paymentStatus === 'paid' ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-300 animate-pulse' : 'border-amber-500/40 bg-amber-500/10 text-amber-300'}`}>
                  {paymentStatus === 'paid' ? 'Sudah Dibayar' : 'Menunggu Pembayaran'}
                </span>
              </div>

              <div className="mt-5 rounded-[1.5rem] border border-zinc-800 bg-zinc-950/80 p-4 md:p-5">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-zinc-400">Estimasi Pengiriman</p>
                    <p className="mt-1 text-lg font-bold text-white">{activeOrder.shippingMethod === 'express' ? '1 hari kerja' : '2–3 hari kerja'}</p>
                  </div>
                  <div className="rounded-full bg-purple-600/10 px-3 py-1 text-sm font-semibold text-purple-400">
                    {activeOrder.shippingMethod === 'express' ? 'Express' : 'Reguler'}
                  </div>
                </div>

                <div className="mt-4 grid gap-3 md:grid-cols-3">
                  {[
                    { label: 'Pembayaran', active: true, done: paymentStatus === 'paid' || paymentStatus === 'pending' },
                    { label: 'Diproses', active: paymentStatus === 'paid', done: paymentStatus === 'paid' },
                    { label: 'Dikirim', active: paymentStatus === 'paid', done: false },
                  ].map((step, index) => (
                    <div key={step.label} className={`rounded-2xl border px-3 py-3 text-sm ${step.active ? 'border-purple-500/40 bg-purple-500/10 text-white' : 'border-zinc-800 bg-zinc-900/70 text-zinc-400'}`}>
                      <div className="flex items-center gap-2 font-semibold">
                        <span className={`h-2.5 w-2.5 rounded-full ${step.done ? 'bg-emerald-400' : step.active ? 'bg-purple-400' : 'bg-zinc-600'}`} />
                        {step.label}
                      </div>
                      <p className="mt-2 text-xs text-zinc-400">{index === 0 ? 'Pembayaran sedang dipantau' : index === 1 ? 'Pesanan sedang disiapkan' : 'Menunggu kurir'}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
                <div className="rounded-[1.5rem] border border-zinc-800 bg-zinc-950/80 p-4 md:p-6">
                  <p className="text-sm font-semibold text-zinc-400">Total Yang Harus Dibayar</p>
                  <p className={`mt-2 text-3xl font-black transition-all duration-500 ${paymentStatus === 'paid' ? 'text-emerald-400 scale-105' : 'text-purple-400'}`}>Rp {activeOrder.grandTotal.toLocaleString('id-ID')}</p>
                  <p className="mt-4 text-sm text-zinc-400">Metode pembayaran dipilih: <span className="font-semibold text-white">{activeOrder.paymentMethodLabel}</span></p>

                  {paymentStatus === 'paid' && (
                    <div className="mt-4 rounded-2xl border border-emerald-500/40 bg-emerald-500/10 p-3 text-sm text-emerald-300 animate-[fadeIn_0.4s_ease-out]">
                      Pembayaran berhasil diverifikasi. Pesanan Anda sedang diproses.
                    </div>
                  )}
                </div>

                <div className="space-y-4">
                  <div className="rounded-[1.5rem] border border-zinc-800 bg-zinc-950/80 p-4 md:p-6">
                    <h3 className="text-lg font-bold">Detail Pesanan</h3>
                    <div className="mt-4 space-y-2 text-sm text-zinc-400">
                      <div className="flex items-center justify-between"><span>Nama</span><span className="text-white">{activeOrder.customerName}</span></div>
                      <div className="flex items-center justify-between"><span>HP</span><span className="text-white">{activeOrder.customerPhone}</span></div>
                      <div className="flex items-center justify-between"><span>Alamat</span><span className="text-white text-right max-w-[12rem]">{activeOrder.customerAddress}</span></div>
                      <div className="flex items-center justify-between"><span>Pengiriman</span><span className="text-white">{activeOrder.shippingMethod === 'express' ? 'Express' : 'Reguler'}</span></div>
                    </div>
                  </div>

                  <div className="rounded-[1.5rem] border border-zinc-800 bg-zinc-950/80 p-4 md:p-6">
                    <h3 className="text-lg font-bold">Daftar Produk</h3>
                    <div className="mt-4 space-y-3">
                      {activeOrder.items.map((item) => (
                        <div key={item.id} className="flex items-center justify-between rounded-2xl border border-zinc-800 bg-zinc-900/70 px-3 py-3 text-sm">
                          <div>
                            <p className="font-semibold text-white">{item.name}</p>
                            <p className="text-zinc-400">{item.qty}x • Rp {item.price.toLocaleString('id-ID')}</p>
                          </div>
                          <span className="text-purple-400">Rp {(item.price * item.qty).toLocaleString('id-ID')}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Cart & Checkout Page */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 bg-zinc-950/95 backdrop-blur-xl overflow-y-auto">
          <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-6 md:px-8 lg:px-10">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-purple-400">Keranjang & Checkout</p>
                <h2 className="text-2xl font-black">Belanja yang siap dibayar</h2>
              </div>
              <button onClick={() => setIsCartOpen(false)} className="rounded-full border border-zinc-700 bg-zinc-900 px-4 py-2 text-sm font-semibold text-zinc-300 hover:bg-zinc-800">
                ✕ Tutup
              </button>
            </div>

            {checkoutMessage && (
              <div className="rounded-2xl border border-emerald-700/40 bg-emerald-900/30 px-4 py-3 text-sm text-emerald-300">
                {checkoutMessage}
              </div>
            )}

            <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
              <div className="space-y-4">
                <div className="rounded-[1.75rem] border border-zinc-800 bg-zinc-900/80 p-4 md:p-6">
                  <div className="mb-4 flex items-center justify-between">
                    <h3 className="text-lg font-bold">Produk di Keranjang</h3>
                    <span className="text-sm text-zinc-400">{cart.length} item</span>
                  </div>

                  {cart.length === 0 ? (
                    <div className="rounded-2xl border border-dashed border-zinc-700 bg-zinc-950/70 p-8 text-center text-zinc-500">
                      Keranjang masih kosong. Kembali ke katalog untuk pilih produk.
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {cart.map((item) => (
                        <div key={item.id} className="flex flex-col gap-3 rounded-2xl border border-zinc-800 bg-zinc-950/80 p-3 sm:flex-row sm:items-center">
                          <img src={item.image} alt={item.name} className="h-24 w-full rounded-xl object-cover sm:w-24" />
                          <div className="flex-1">
                            <h4 className="font-semibold">{item.name}</h4>
                            <p className="mt-1 text-sm text-zinc-400">{item.category}</p>
                            <p className="mt-2 text-sm font-bold text-purple-400">Rp {item.price.toLocaleString('id-ID')}</p>
                          </div>
                          <div className="flex items-center justify-between gap-3 rounded-xl border border-zinc-800 bg-zinc-900 px-3 py-2 sm:justify-center">
                            <button onClick={() => updateQty(item.id, -1)} className="text-zinc-400 hover:text-white">−</button>
                            <span className="min-w-5 text-center text-sm font-bold">{item.qty}</span>
                            <button onClick={() => updateQty(item.id, 1)} className="text-zinc-400 hover:text-white">+</button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="rounded-[1.75rem] border border-zinc-800 bg-zinc-900/80 p-4 md:p-6">
                  <h3 className="mb-4 text-lg font-bold">Data Pembeli</h3>
                  <div className="grid gap-3 md:grid-cols-2">
                    <label className="text-sm text-zinc-400">
                      <span className="mb-2 block">Nama Lengkap</span>
                      <input value={customerName} onChange={(e) => setCustomerName(e.target.value)} className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-3 py-2.5 text-white outline-none focus:border-purple-500" placeholder="Contoh: Budi Santoso" />
                    </label>
                    <label className="text-sm text-zinc-400">
                      <span className="mb-2 block">Nomor HP</span>
                      <input value={customerPhone} onChange={(e) => setCustomerPhone(e.target.value)} className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-3 py-2.5 text-white outline-none focus:border-purple-500" placeholder="08xxxxxxxxxx" />
                    </label>
                  </div>
                  <label className="mt-3 block text-sm text-zinc-400">
                    <span className="mb-2 block">Alamat Pengiriman</span>
                    <textarea value={customerAddress} onChange={(e) => setCustomerAddress(e.target.value)} className="min-h-24 w-full rounded-xl border border-zinc-700 bg-zinc-950 px-3 py-2.5 text-white outline-none focus:border-purple-500" placeholder="Tuliskan alamat lengkap Anda" />
                  </label>
                </div>
              </div>

              <div className="space-y-4">
                <div className="rounded-[1.75rem] border border-zinc-800 bg-zinc-900/80 p-4 md:p-6">
                  <h3 className="text-lg font-bold">Ringkasan Belanja</h3>
                  <div className="mt-4 space-y-3 text-sm text-zinc-400">
                    <div className="flex items-center justify-between">
                      <span>Subtotal</span>
                      <span className="text-white">Rp {subtotal.toLocaleString('id-ID')}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Ongkir</span>
                      <span className="text-white">Rp {shippingFee.toLocaleString('id-ID')}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Biaya Layanan</span>
                      <span className="text-white">Rp {serviceFee.toLocaleString('id-ID')}</span>
                    </div>
                    <div className="mt-2 border-t border-zinc-800 pt-3 flex items-center justify-between text-base font-semibold text-white">
                      <span>Total</span>
                      <span className="text-purple-400">Rp {grandTotal.toLocaleString('id-ID')}</span>
                    </div>
                  </div>
                </div>

                <div className="rounded-[1.75rem] border border-zinc-800 bg-zinc-900/80 p-4 md:p-6">
                  <h3 className="text-lg font-bold">Metode Pengiriman</h3>
                  <div className="mt-3 grid gap-2">
                    <button onClick={() => setShippingMethod('reguler')} className={`rounded-2xl border px-4 py-3 text-left text-sm transition-all ${shippingMethod === 'reguler' ? 'border-purple-500 bg-purple-600/10 text-white' : 'border-zinc-800 bg-zinc-950/70 text-zinc-400'}`}>
                      <div className="font-semibold">Reguler</div>
                      <div className="mt-1 text-xs">Estimasi 2–3 hari, biaya Rp 12.000</div>
                    </button>
                    <button onClick={() => setShippingMethod('express')} className={`rounded-2xl border px-4 py-3 text-left text-sm transition-all ${shippingMethod === 'express' ? 'border-purple-500 bg-purple-600/10 text-white' : 'border-zinc-800 bg-zinc-950/70 text-zinc-400'}`}>
                      <div className="font-semibold">Express</div>
                      <div className="mt-1 text-xs">Estimasi 1 hari, biaya Rp 20.000</div>
                    </button>
                  </div>
                </div>

                <div className="rounded-[1.75rem] border border-zinc-800 bg-zinc-900/80 p-4 md:p-6">
                  <h3 className="text-lg font-bold">Metode Pembayaran</h3>
                  <div className="mt-3 grid gap-2">
                    <button onClick={() => setPaymentMethod('qris')} className={`rounded-2xl border px-4 py-3 text-left transition-all ${paymentMethod === 'qris' ? 'border-purple-500 bg-purple-600/10 text-white' : 'border-zinc-800 bg-zinc-950/70 text-zinc-400'}`}>
                      <div className="font-semibold">📱 QRIS</div>
                      <div className="mt-1 text-xs">Bayar via QRIS dari aplikasi e-wallet atau mobile banking.</div>
                    </button>
                    <button onClick={() => setPaymentMethod('ewallet')} className={`rounded-2xl border px-4 py-3 text-left transition-all ${paymentMethod === 'ewallet' ? 'border-purple-500 bg-purple-600/10 text-white' : 'border-zinc-800 bg-zinc-950/70 text-zinc-400'}`}>
                      <div className="font-semibold">💳 E-Wallet</div>
                      <div className="mt-1 text-xs">GoPay, OVO, DANA, ShopeePay.</div>
                    </button>
                    <button onClick={() => setPaymentMethod('bank')} className={`rounded-2xl border px-4 py-3 text-left transition-all ${paymentMethod === 'bank' ? 'border-purple-500 bg-purple-600/10 text-white' : 'border-zinc-800 bg-zinc-950/70 text-zinc-400'}`}>
                      <div className="font-semibold">🏦 Transfer Bank Lokal</div>
                      <div className="mt-1 text-xs">BCA, BRI, Mandiri, BNI, dan bank lokal lainnya.</div>
                    </button>
                  </div>
                </div>

                <button
                  onClick={handleCheckout}
                  disabled={cart.length === 0}
                  className="w-full rounded-2xl bg-red-600 py-3.5 font-semibold text-white transition-all duration-300 ease-out hover:bg-red-500 disabled:bg-zinc-800 disabled:text-zinc-600"
                >
                  Buat Pesanan Sekarang
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
}