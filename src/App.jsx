import React, { useState } from 'react';

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Semua');
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const categories = ['Semua', 'Hoodie', 'Jacket', 'T-Shirt', 'Pants', 'Accessories'];

  const products = [
    { id: 1, name: 'Oversized Hoodie Black', category: 'Hoodie', price: 299000, image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=600&q=80', rating: '4.9 (120 terjual)' },
    { id: 2, name: 'Urban Street Jacket', category: 'Jacket', price: 399000, image: 'https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&w=600&q=80', rating: '4.8 (85 terjual)' },
    { id: 3, name: 'Graphic Tee Statement', category: 'T-Shirt', price: 149000, image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=600&q=80', rating: '5.0 (310 terjual)' },
    { id: 4, name: 'Cargo Street Pants', category: 'Pants', price: 349000, image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=600&q=80', rating: '4.7 (95 terjual)' },
    { id: 5, name: 'Minimalist Hoodie Grey', category: 'Hoodie', price: 289000, image: 'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=600&q=80', rating: '4.9 (210 terjual)' },
    { id: 6, name: 'Vintage Windbreaker', category: 'Jacket', price: 429000, image: 'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=600&q=80', rating: '4.9 (64 terjual)' },
    { id: 7, name: 'Streetwear Cap Limited', category: 'Accessories', price: 129000, image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=600&q=80', rating: '5.0 (40 terjual)' },
  ];

  // Filter produk berdasarkan pencarian & kategori
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'Semua' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Tambah ke keranjang
  const addToCart = (product) => {
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
      setCart(cart.map(item => item.id === product.id ? { ...item, qty: item.qty + 1 } : item));
    } else {
      setCart([...cart, { ...product, qty: 1 }]);
    }
    setIsCartOpen(true);
  };

  // Ubah jumlah item di keranjang
  const updateQty = (id, delta) => {
    setCart(cart.map(item => {
      if (item.id === id) {
        const newQty = item.qty + delta;
        return newQty > 0 ? { ...item, qty: newQty } : null;
      }
      return item;
    }).filter(Boolean));
  };

  const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);

  // Checkout ke WhatsApp
  const handleCheckout = () => {
    if (cart.length === 0) return;
    let message = "Halo, saya ingin memesan produk berikut:%0A";
    cart.forEach(item => {
      message += `- ${item.name} (${item.qty}x) - Rp ${item.price.toLocaleString('id-ID')}%0A`;
    });
    message += `%0A*Total Pembayaran: Rp ${totalPrice.toLocaleString('id-ID')}*`;
    window.open(`https://wa.me/628123456789?text=${message}`, '_blank');
  };

  return (
    <div className="bg-zinc-950 text-white min-h-screen font-sans">
      {/* Navbar ala E-Commerce */}
      <header className="sticky top-0 z-40 bg-zinc-900/80 backdrop-blur-md border-b border-zinc-800 px-4 md:px-8 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <h1 className="text-xl font-black tracking-wider bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
            URBANSTORE.ID
          </h1>
          
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
            <div key={product.id} className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden flex flex-col group hover:border-zinc-700 transition-all">
              <div className="h-48 md:h-60 overflow-hidden relative">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
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
                  onClick={() => addToCart(product)}
                  className="w-full py-2.5 bg-zinc-800 hover:bg-purple-600 text-white text-xs md:text-sm font-semibold rounded-xl transition-all"
                >
                  + Keranjang
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Cart Drawer / Modal */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex justify-end">
          <div className="w-full max-w-md bg-zinc-900 h-full p-6 flex flex-col justify-between border-l border-zinc-800 animate-in slide-in-from-right">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
                <h2 className="text-lg font-bold">Keranjang Belanja</h2>
                <button onClick={() => setIsCartOpen(false)} className="text-zinc-400 hover:text-white">✕</button>
              </div>

              <div className="py-4 space-y-4 overflow-y-auto max-h-[60vh]">
                {cart.length === 0 ? (
                  <p className="text-center text-zinc-500 py-12">Keranjang masih kosong.</p>
                ) : (
                  cart.map(item => (
                    <div key={item.id} className="flex items-center justify-between gap-4 bg-zinc-950 p-3 rounded-xl border border-zinc-800">
                      <img src={item.image} alt={item.name} className="w-14 h-14 object-cover rounded-lg" />
                      <div className="flex-1">
                        <h4 className="text-sm font-bold line-clamp-1">{item.name}</h4>
                        <p className="text-xs text-purple-400 font-semibold mt-1">Rp {item.price.toLocaleString('id-ID')}</p>
                      </div>
                      <div className="flex items-center gap-2 bg-zinc-900 px-2 py-1 rounded-lg border border-zinc-800">
                        <button onClick={() => updateQty(item.id, -1)} className="text-zinc-400 hover:text-white px-1">-</button>
                        <span className="text-xs font-bold">{item.qty}</span>
                        <button onClick={() => updateQty(item.id, 1)} className="text-zinc-400 hover:text-white px-1">+</button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            <div className="pt-4 border-t border-zinc-800 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-zinc-400 text-sm">Total Belanja:</span>
                <span className="text-lg font-bold text-purple-400">Rp {totalPrice.toLocaleString('id-ID')}</span>
              </div>
              <button
                onClick={handleCheckout}
                disabled={cart.length === 0}
                className="w-full py-3.5 bg-red-600 hover:bg-red-500 disabled:bg-zinc-800 disabled:text-zinc-600 text-white font-bold rounded-xl transition-all shadow-lg shadow-red-600/20"
              >
                Checkout via WhatsApp 📲
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}