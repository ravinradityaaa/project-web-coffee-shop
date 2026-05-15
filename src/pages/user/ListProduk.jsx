import { useState } from 'react';

const PRODUCTS = [
  // --- COFFEE SERIES ---
  { id: 1, name: "Aren Latte", price: 22000, img: "https://images.unsplash.com/photo-1541167760496-1628856ab772?q=80&w=400&auto=format&fit=crop", cat: "Coffee", stock: true, isHot: false },
  { id: 2, name: "Cloud Brew", price: 25000, img: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?q=80&w=400&auto=format&fit=crop", cat: "Coffee", stock: true, isHot: false },
  { id: 6, name: "Cold White", price: 24000, img: "https://images.unsplash.com/photo-1494314671902-399b18174975?q=80&w=400&auto=format&fit=crop", cat: "Coffee", stock: true, isHot: false },
  { id: 7, name: "Caramel Macchiato", price: 32000, img: "https://images.unsplash.com/photo-1485808191679-5f86510681a2?q=80&w=400&auto=format&fit=crop", cat: "Coffee", stock: true, isHot: true },
  { id: 8, name: "Oatmilk Flat White", price: 35000, img: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?q=80&w=400&auto=format&fit=crop", cat: "Coffee", stock: true, isHot: false },
  { id: 9, name: "Black Charcoal Latte", price: 28000, img: "https://images.unsplash.com/photo-1534706936160-d5ee67737249?q=80&w=400&auto=format&fit=crop", cat: "Coffee", stock: true, isHot: true },

  // --- NON-COFFEE SERIES ---
  { id: 3, name: "Velvet Milk", price: 28000, img: "https://images.unsplash.com/photo-1553909489-cd47e0907980?q=80&w=400&auto=format&fit=crop", cat: "Non-Coffee", stock: true, isHot: true },
  { id: 5, name: "Matcha Zen", price: 26000, img: "https://images.unsplash.com/photo-1515823064-d6e0c04616a7?q=80&w=400&auto=format&fit=crop", cat: "Non-Coffee", stock: false, isHot: false },
  { id: 10, name: "Earl Grey Milk Tea", price: 24000, img: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?q=80&w=400&auto=format&fit=crop", cat: "Non-Coffee", stock: true, isHot: true },
  { id: 11, name: "Hibiscus Lemonade", price: 27000, img: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?q=80&w=400&auto=format&fit=crop", cat: "Non-Coffee", stock: true, isHot: false },

  // --- PASTRY & FOOD ---
  { id: 4, name: "Butter Croissant", price: 18000, img: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?q=80&w=400&auto=format&fit=crop", cat: "Pastry", stock: true, isHot: true },
  { id: 12, name: "Almond Pain au Choc", price: 24000, img: "https://images.unsplash.com/photo-1530610476181-d83430b64dcd?q=80&w=400&auto=format&fit=crop", cat: "Pastry", stock: true, isHot: true },
  { id: 13, name: "Cinnamon Roll", price: 22000, img: "https://images.unsplash.com/photo-1509365465985-25d11c17e812?q=80&w=400&auto=format&fit=crop", cat: "Pastry", stock: true, isHot: true },
  { id: 14, name: "Truffle Fries", price: 30000, img: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?q=80&w=400&auto=format&fit=crop", cat: "Pastry", stock: true, isHot: true },

  // --- DESSERT ---
  { id: 15, name: "Lotus Cheesecake", price: 38000, img: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?q=80&w=400&auto=format&fit=crop", cat: "Pastry", stock: true, isHot: false },
  { id: 16, name: "Double Choc Brownie", price: 20000, img: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?q=80&w=400&auto=format&fit=crop", cat: "Pastry", stock: true, isHot: false },

];

export default function ListProduk({ isDarkMode, onOrder }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const categories = ['All', 'Coffee', 'Non-Coffee', 'Pastry'];

  // Logic Pencarian & Filter Kategori
  const filteredProducts = PRODUCTS.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'All' || product.cat === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <section 
      className={`min-h-screen py-24 transition-colors duration-700 
      ${isDarkMode ? 'bg-[#1A1A1B]' : 'bg-white'}`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        
        {/* Kontrol: Search & Categories */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-10">
          <div className="max-w-md w-full">
            <span className="text-[#A67C52] font-black text-[10px] uppercase tracking-[0.4em] mb-2 inline-block">
              Selection
            </span>
            <h2 className={`text-5xl font-black tracking-tighter uppercase mb-6 
              ${isDarkMode ? 'text-white' : 'text-black'}`}>
              MENU <span className="text-[#A67C52]">KAMI</span>
            </h2>
            
            {/* Search Bar - No Italic, No Forced Caps */}
            <div className="relative">
              <input 
                type="text" 
                placeholder="Cari kopi favoritmu..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full bg-transparent border-b-2 py-4 outline-none transition-all text-lg font-medium
                  ${isDarkMode 
                    ? 'border-white/10 focus:border-[#A67C52] text-white placeholder:text-white/20' 
                    : 'border-black/10 focus:border-[#A67C52] text-black placeholder:text-black/20'}`}
              />
              <span className="absolute right-0 top-1/2 -translate-y-1/2 opacity-30">🔍</span>
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-3">
            {categories.map(cat => (
              <button 
                key={cat} 
                onClick={() => setActiveCategory(cat)}
                className={`px-8 py-3 rounded-full font-black text-[10px] uppercase tracking-widest transition-all duration-500
                  ${activeCategory === cat 
                    ? 'bg-[#A67C52] text-white shadow-xl shadow-[#A67C52]/30 scale-105' 
                    : isDarkMode 
                      ? 'bg-white/5 text-white/50 hover:bg-white/10' 
                      : 'bg-black/5 text-black/50 hover:bg-black/10'}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Grid Produk */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((p) => (
              <div 
                key={p.id} 
                className={`group relative rounded-[3.5rem] p-8 transition-all duration-700
                  ${isDarkMode ? 'bg-[#252525] hover:bg-[#2a2a2a]' : 'bg-gray-50 hover:bg-white hover:shadow-2xl'}`}
              >
                {/* Thumbnail */}
                <div className="relative h-64 w-full rounded-[2.5rem] overflow-hidden mb-8 shadow-sm">
                  {!p.stock && (
                    <div className="absolute inset-0 z-10 bg-black/60 backdrop-blur-[2px] flex items-center justify-center">
                      <span className="text-white font-black uppercase tracking-widest border-2 border-white/30 px-6 py-2 rounded-full text-[10px]">
                        Habis
                      </span>
                    </div>
                  )}
                  <img 
                    src={p.img} 
                    className={`h-full w-full object-cover transform transition-transform duration-1000 group-hover:scale-110 
                      ${!p.stock ? 'grayscale' : ''}`} 
                    alt={p.name} 
                  />
                  <div className="absolute top-4 left-4 flex gap-2">
                    {p.isHot && (
                      <span className="bg-orange-500 text-white text-[8px] font-black px-3 py-1 rounded-full uppercase tracking-tighter shadow-lg">
                        Hot Pick
                      </span>
                    )}
                    <span className={`text-[8px] font-black px-3 py-1 rounded-full uppercase tracking-tighter shadow-lg 
                      ${isDarkMode ? 'bg-black/50 text-white backdrop-blur-md' : 'bg-white/80 text-black backdrop-blur-md'}`}>
                      {p.cat}
                    </span>
                  </div>
                </div>

                {/* Content - Non-Italic Price */}
                <div className="flex justify-between items-end">
                  <div>
                    <h4 className={`text-2xl font-black mb-1 transition-colors group-hover:text-[#A67C52] 
                      ${isDarkMode ? 'text-white' : 'text-black'}`}>
                      {p.name}
                    </h4>
                    <p className="text-[#A67C52] text-xl font-bold">
                      Rp {p.price.toLocaleString('id-ID')}
                    </p>
                  </div>
                  
                  <button 
                    disabled={!p.stock}
                    onClick={() => onOrder(p.name)}
                    className={`h-14 w-14 rounded-2xl flex items-center justify-center text-2xl font-black transition-all duration-500
                      ${!p.stock 
                        ? 'bg-gray-300 cursor-not-allowed opacity-50' 
                        : 'bg-[#1A1A1B] text-white hover:bg-[#A67C52] hover:-rotate-12 active:scale-90 shadow-xl shadow-black/10'}`}
                  >
                    +
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full py-24 text-center">
              <p className="text-5xl mb-6">☕</p>
              <p className={`font-black uppercase tracking-widest opacity-20 ${isDarkMode ? 'text-white' : 'text-black'}`}>
                Menu tidak ditemukan...
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}