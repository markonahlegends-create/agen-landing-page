import React from 'react';

export default function App() {
  const products = [
    { id: 1, name: 'Oversized Hoodie Black', price: 'Rp 299.000', image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=600&q=80' },
    { id: 2, name: 'Urban Street Jacket', price: 'Rp 399.000', image: 'https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&w=600&q=80' },
    { id: 3, name: 'Graphic Tee Statement', price: 'Rp 149.000', image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=600&q=80' },
  ];

  return (
    <div className="bg-zinc-950 text-white min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 md:px-8 overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center relative z-10 w-full py-16">
          <div className="flex flex-col space-y-6 text-left">
            <span className="px-3.5 py-1.5 bg-zinc-800 text-zinc-300 text-xs font-semibold uppercase tracking-widest rounded-full w-fit">
              New Collection 2026
            </span>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight">
              Elevate Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">Streetwear</span> Identity.
            </h1>
            <p className="text-zinc-400 text-base md:text-lg max-w-lg">
              Koleksi eksklusif hoodie dan apparel premium dengan desain bold untuk gaya hidup urban masa kini.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <a href="#shop" className="px-8 py-4 bg-white text-black font-bold text-center rounded-xl hover:bg-zinc-200 transition-all">
                Beli Sekarang
              </a>
            </div>
          </div>

          <div className="relative flex justify-center">
            <div className="w-full h-[450px] md:h-[550px] bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?auto=format&fit=crop&w=800&q=80"
                alt="Streetwear Model"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Catalog Section */}
      <section id="shop" className="py-20 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Featured Products</h2>
          <p className="text-zinc-400 mt-2">Pilih gaya favoritmu dan langsung pesan via WhatsApp.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {products.map((item) => (
            <div key={item.id} className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden group hover:border-zinc-700 transition-all">
              <div className="h-72 overflow-hidden">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-6 flex flex-col space-y-4">
                <h3 className="text-lg font-bold">{item.name}</h3>
                <p className="text-purple-400 font-semibold">{item.price}</p>
                <a
                  href={`https://wa.me/6281927157103?text=Halo,%20saya%20tertarik%20pesan%20${encodeURIComponent(item.name)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 bg-purple-600 hover:bg-purple-500 text-white font-medium rounded-xl text-center transition-all"
                >
                  Pesan via WhatsApp
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}