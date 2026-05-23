import { useState, useEffect } from 'react';
import axios from 'axios'; 

export default function ListProduk({ isDarkMode, onOrder }) {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [isLoading, setIsLoading] = useState(true);
  
  const categories = ['All', 'Coffee', 'Non-Coffee', 'Pastry'];

  useEffect(() => {
    // 1. API Kopi Murni (Hot Coffee)
    const fetchCoffee = axios.get('https://api.sampleapis.com/coffee/hot');
    // 2. API Varian Minuman Lain (Untuk diambil sebagai Non-Coffee)
    const fetchIced = axios.get('https://api.sampleapis.com/coffee/iced');
    // 3. API Makanan Pendamping (Pastry / Dessert)
    const fetchMeals = axios.get('https://www.themealdb.com/api/json/v1/1/filter.php?c=Dessert');

    Promise.all([fetchCoffee, fetchIced, fetchMeals])
      .then(([coffeeResponse, icedResponse, mealsResponse]) => {
        
        // --- 1. PROSES DATA COFFEE (Ambil 5 item teratas) ---
        const rawCoffee = Array.isArray(coffeeResponse.data) ? coffeeResponse.data.slice(0, 5) : [];
        const mappedCoffee = rawCoffee.map((item) => ({
          id: `coffee-${item.id}`,
          name: item.title,
          price: 22000 + (item.id % 5) * 2000, // Rp 22.000 - Rp 30.000
          img: item.image,
          cat: 'Coffee',
          stock: true,
          isHot: item.id % 2 === 0
        }));

        // --- 2. PROSES DATA NON-COFFEE (Ambil 5 item dari varian Iced/Cokelat/Teh) ---
        const rawIced = Array.isArray(icedResponse.data) ? icedResponse.data.slice(0, 5) : [];
        const mappedNonCoffee = rawIced.map((item) => {
          // Mengubah nama menu agar terasa lebih murni "Non-Coffee" kafe jika ada yang terlalu mirip kopi
          let customName = item.title;
          if (customName.includes("Iced Coffee")) customName = "Matcha Latte Zen";
          if (customName.includes("Frappuccino")) customName = "Chai Tea Latte";

          return {
            id: `noncoffee-${item.id}`,
            name: customName,
            price: 24000 + (item.id % 4) * 2000, // Rp 24.000 - Rp 30.000
            img: item.image,
            cat: 'Non-Coffee',
            stock: item.id !== 3, // Simulasi satu item habis untuk tes UI
            isHot: item.id % 3 === 0
          };
        });

        // --- 3. PROSES DATA PASTRY (Ambil 5 item teratas) ---
        const rawMeals = mealsResponse.data.meals ? mealsResponse.data.meals.slice(0, 5) : [];
        const mappedMeals = rawMeals.map((item, index) => ({
          id: `meal-${item.idMeal}`,
          name: item.strMeal,
          price: 18000 + (Number(item.idMeal) % 5) * 2000, // Rp 18.000 - Rp 26.000
          img: item.strMealThumb,
          cat: 'Pastry',
          stock: true,
          isHot: index % 2 === 0
        }));

        // Gabungkan ketiga kategori dinamis ke dalam satu state
        setProducts([...mappedCoffee, ...mappedNonCoffee, ...mappedMeals]);
        setIsLoading(false);
      })
      .catch(error => {
        console.error("Gagal mengambil data varian menu:", error);
        setIsLoading(false);
      });
  }, []);

  // Logic Pencarian & Filter Kategori
  const filteredProducts = products.filter(product => {
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
            
            {/* Search Bar */}
            <div className="relative">
              <input 
                type="text" 
                placeholder="Cari kopi atau makanan favoritmu..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full bg-transparent border-b-2 py-4 outline-none transition-all text-lg font-medium
                  ${isDarkMode 
                    ? 'border-white/10 focus:border-[#A67C52] text-white placeholder:text-white/20' 
                    : 'border-black/10 focus:border-[#A67C52] text-black placeholder:text-black/20'}`}
              />
              <span className="absolute right-0 top-1/2 -translate-y-1/2 opacity-30"></span>
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
          {isLoading ? (
            <div className="col-span-full py-24 text-center">
              <div className="w-12 h-12 rounded-full border-4 border-[#A67C52]/40 border-t-[#A67C52] animate-spin mx-auto mb-4"></div>
              <p className={`font-black uppercase tracking-widest opacity-40 ${isDarkMode ? 'text-white' : 'text-black'}`}>
                Memuat menu Kopi Wae
              </p>
            </div>
          ) : filteredProducts.length > 0 ? (
            filteredProducts.map((p) => (
              <div 
                key={p.id} 
                className={`group relative rounded-[3.5rem] p-8 transition-all duration-700
                  ${isDarkMode ? 'bg-[#252525] hover:bg-[#2a2a2a]' : 'bg-gray-50 hover:bg-white hover:shadow-2xl'}`}
              >
                {/* Thumbnail */}
                <div className="relative h-64 w-full rounded-[2.5rem] overflow-hidden mb-8 shadow-sm bg-zinc-800">
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
                    onError={(e) => {
                      // Fallback image estetik jika URL API bermasalah
                      e.target.src = "https://images.unsplash.com/photo-1534706936160-d5ee67737249?q=80&w=400&auto=format&fit=crop";
                    }}
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

                {/* Content */}
                <div className="flex justify-between items-end">
                  <div className="max-w-[70%]">
                    <h4 className={`text-2xl font-black mb-1 truncate transition-colors group-hover:text-[#A67C52] 
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
                    className={`h-14 w-14 rounded-2xl flex items-center justify-center text-2xl font-black transition-all duration-500 flex-shrink-0
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