import { useState, useEffect } from 'react';

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const [activeCategory, setActiveCategory] = useState('All');
  const [isOrdering, setIsOrdering] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const categories = ['All', 'Coffee', 'Non-Coffee', 'Pastry'];

  const handleOrder = () => {
    setIsOrdering(true);
    setTimeout(() => setIsOrdering(false), 3000);
  };

  const slides = [
    { 
      id: 1,
      title: "Signature Latte", 
      tagline: "Experience the Gold Standard",
      desc: "Sensasi creamy dalam setiap tegukan untuk memulai hari Anda.", 
      img: "https://images.unsplash.com/photo-1541167760496-1628856ab772?q=80&w=1000&auto=format&fit=crop" 
    },
    { 
      id: 2,
      title: "Dark Espresso", 
      tagline: "Awaken Your Senses",
      desc: "Energi murni dari biji pilihan dengan aroma yang sangat kuat.", 
      img: "https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?q=80&w=1000&auto=format&fit=crop" 
    },
  ];

  const allProducts = [
    { id: 1, name: "Aren Latte", price: "22k", img: "https://images.unsplash.com/photo-1541167760496-1628856ab772?q=80&w=400&auto=format&fit=crop", cat: "Coffee", rate: 4.8, large: true },
    { id: 2, name: "Cloud Brew", price: "25k", img: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?q=80&w=400&auto=format&fit=crop", cat: "Coffee", rate: 4.9, large: false },
    { id: 3, name: "Velvet Milk", price: "28k", img: "https://images.unsplash.com/photo-1553909489-cd47e0907980?q=80&w=400&auto=format&fit=crop", cat: "Non-Coffee", rate: 4.7, large: false },
    { id: 4, name: "Butter Croissant", price: "18k", img: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?q=80&w=400&auto=format&fit=crop", cat: "Pastry", rate: 4.6, large: true },
  ];

  const testimonials = [
    { id: 1, name: "Andi Wijaya", role: "Coffee Enthusiast", text: "Aren Latte-nya juara! Rasa kopinya tetap kuat meski dicampur susu yang creamy.", img: "https://i.pravatar.cc/150?u=1" },
    { id: 2, name: "Siska Putri", role: "Freelancer", text: "Tempat terbaik buat kerja. Kopinya enak, suasananya tenang banget.", img: "https://i.pravatar.cc/150?u=2" },
    { id: 3, name: "Budi Santoso", role: "Graphic Designer", text: "Visual produknya sebanding dengan rasanya. Sangat estetik!", img: "https://i.pravatar.cc/150?u=3" },
  ];

  const news = [
    { id: 1, date: "12 Mei 2026", title: "Pembukaan Cabang Baru di Magelang", category: "Update", img: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=400&auto=format&fit=crop" },
    { id: 2, date: "05 Mei 2026", title: "Kolaborasi Spesial: Kopi & Seni Lokal", category: "Event", img: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=400&auto=format&fit=crop" },
  ];

  const filteredProducts = activeCategory === 'All' 
    ? allProducts 
    : allProducts.filter(p => p.cat === activeCategory);

  useEffect(() => {
    const timer = setInterval(() => setCurrentSlide(s => (s + 1) % slides.length), 7000);
    const popupTimer = setTimeout(() => setShowPopup(true), 4000);
    return () => { clearInterval(timer); clearTimeout(popupTimer); };
  }, [slides.length]);

  return (
    <div className={`min-h-screen transition-colors duration-700 font-sans tracking-tight ${
      isDarkMode ? 'bg-[#1A1A1B] text-white' : 'bg-[#F5F5DC] text-[#1A1A1B]'
    }`}>
      
      {/* --- NIGHT MODE SWITCH --- */}
      <button 
        onClick={() => setIsDarkMode(!isDarkMode)}
        className="fixed top-8 right-8 z-[120] h-14 w-14 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center shadow-2xl"
      >
        {isDarkMode ? '☀️' : '🌙'}
      </button>

      {/* --- HERO SECTION --- */}
      <section className="relative h-screen flex flex-col md:flex-row items-center overflow-hidden">
        <div className="w-full md:w-1/2 px-10 md:px-20 z-20 mt-28 md:mt-0">
          <span className="inline-block text-[#A67C52] font-bold tracking-[0.4em] text-xs uppercase mb-4">
            {slides[currentSlide].tagline}
          </span>
          <h1 className={`text-7xl md:text-9xl font-black mb-8 leading-[0.8] tracking-tighter transition-colors duration-700 uppercase`}>
            {slides[currentSlide].title.split(' ')[0]} <br />
            <span className="text-[#A67C52]">{slides[currentSlide].title.split(' ')[1]}</span>
          </h1>
          <p className="text-lg max-w-sm mb-10 leading-relaxed font-medium opacity-60">
            {slides[currentSlide].desc}
          </p>
          <div className="flex items-center space-x-6">
            <button className={`h-16 w-16 rounded-full flex items-center justify-center hover:bg-[#A67C52] transition-all duration-500 shadow-2xl ${
              isDarkMode ? 'bg-white text-[#1A1A1B]' : 'bg-[#1A1A1B] text-white'
            }`}>
              <span className="text-2xl">→</span>
            </button>
            <span className="text-sm font-black uppercase tracking-widest opacity-40">Mulai Jelajah</span>
          </div>
        </div>

        <div className="w-full md:w-1/2 h-full relative p-10 md:p-20">
          <div className="relative h-full w-full rounded-[4rem] md:rounded-[6rem] overflow-hidden shadow-2xl border-4 border-white/10">
            <img src={slides[currentSlide].img} className="w-full h-full object-cover" alt="Hero" />
            <div className="absolute top-10 left-10 bg-white/10 backdrop-blur-md border border-white/10 p-6 rounded-[2rem] text-white">
               <p className="text-xs font-bold opacity-70 uppercase mb-1">Standard</p>
               <p className="text-2xl font-black italic">Gold</p>
            </div>
          </div>
        </div>
      </section>

      {/* --- ABOUT US: STORY SECTION --- */}
      <section className="py-40 px-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-24 items-center">
          <div className="relative">
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase leading-none mb-10">
              CERITA <br /> <span className="text-[#A67C52]">KOPI WAE</span>
            </h2>
            <p className="text-xl leading-relaxed opacity-70 mb-8 font-medium italic">
              "Kami tidak hanya menyajikan kopi, kami menyajikan semangat pagi dalam setiap tetesnya."
            </p>
            <p className="text-md leading-relaxed opacity-60 mb-10 max-w-md">
              Dimulai dari sebuah ruko kecil di Magelang, Kopi Wae kini tumbuh menjadi wadah kreativitas dan kolaborasi komunitas lokal melalui aroma biji kopi pilihan.
            </p>
            <div className="grid grid-cols-2 gap-8 border-t border-current/10 pt-10">
              <div>
                <p className="text-4xl font-black text-[#A67C52]">2024</p>
                <p className="text-xs uppercase font-bold tracking-widest opacity-50">Tahun Berdiri</p>
              </div>
              <div>
                <p className="text-4xl font-black text-[#A67C52]">100%</p>
                <p className="text-xs uppercase font-bold tracking-widest opacity-50">Biji Lokal</p>
              </div>
            </div>
          </div>
          <div className="relative h-[600px] rounded-[5rem] overflow-hidden shadow-2xl rotate-2">
             <img src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=600&auto=format&fit=crop" className="w-full h-full object-cover" alt="Barista" />
             <div className="absolute bottom-10 left-1/2 -translate-x-1/2 bg-white px-8 py-4 rounded-full shadow-xl">
                <p className="text-[#1A1A1B] font-black text-sm uppercase tracking-tighter">Premium Roastery</p>
             </div>
          </div>
        </div>
      </section>

      {/* --- MENU SECTION: BENTO STYLE --- */}
      <section className={`py-32 rounded-t-[5rem] md:rounded-t-[8rem] relative z-30 transition-colors duration-700 ${
        isDarkMode ? 'bg-[#252525]' : 'bg-white shadow-[0_-50px_100px_rgba(0,0,0,0.05)]'
      }`}>
        <div className="max-w-7xl mx-auto px-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-8">
            <div>
              <h2 className="text-5xl md:text-6xl font-black tracking-tighter uppercase leading-none mb-4">MENU <span className="text-[#A67C52]">ANDALAN</span></h2>
              <p className="opacity-50 font-medium">Pilih kategori yang sesuai dengan mood-mu hari ini.</p>
            </div>
            <div className="flex flex-wrap gap-3">
              {categories.map(cat => (
                <button key={cat} onClick={() => setActiveCategory(cat)} className={`px-8 py-3 rounded-full font-bold text-xs uppercase tracking-widest transition-all ${activeCategory === cat ? 'bg-[#A67C52] text-white shadow-xl shadow-[#A67C52]/40' : 'bg-[#F5F5DC] text-[#1A1A1B]'}`}>{cat}</button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
            {filteredProducts.map((p) => (
              <div key={p.id} className={`group bg-gray-50 rounded-[4rem] p-10 hover:shadow-2xl transition-all duration-700 relative overflow-hidden ${p.large ? 'md:col-span-2' : ''}`}>
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#A67C52]/10 -mr-16 -mt-16 rounded-full transition-transform group-hover:scale-[6] duration-1000"></div>
                <div className="relative z-10">
                  <div className={`mb-10 rounded-[3rem] overflow-hidden shadow-lg ${p.large ? 'h-64' : 'h-40'}`}>
                    <img src={p.img} className="h-full w-full object-cover transform group-hover:scale-110 transition-transform duration-700" alt={p.name} />
                  </div>
                  <div className="flex justify-between items-end">
                    <div>
                      <h4 className="text-2xl font-black mb-1 group-hover:text-[#A67C52] transition-colors">{p.name}</h4>
                      <p className="text-xl font-bold italic opacity-70">Rp {p.price}</p>
                    </div>
                    <button onClick={handleOrder} className="h-14 w-14 bg-[#1A1A1B] text-white rounded-2xl font-black hover:bg-[#A67C52] transition-all">+</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- TESTIMONIALS SECTION --- */}
      <section className="py-40 px-10 max-w-7xl mx-auto overflow-hidden">
        <div className="flex flex-col items-center mb-20 text-center">
           <span className="text-[#A67C52] font-black text-xs uppercase tracking-[0.5em] mb-4">Feedback</span>
           <h2 className="text-5xl md:text-6xl font-black tracking-tighter uppercase italic">KATA <span className="text-[#A67C52]">MEREKA</span></h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {testimonials.map(t => (
            <div key={t.id} className="p-12 rounded-[4rem] bg-[#A67C52]/5 border border-[#A67C52]/10 hover:bg-[#1A1A1B] hover:text-white transition-all duration-700 group">
              <p className="text-xl font-medium leading-relaxed mb-10 italic">"{t.text}"</p>
              <div className="flex items-center space-x-5">
                <img src={t.img} className="w-14 h-14 rounded-full grayscale group-hover:grayscale-0 transition-all shadow-xl" alt={t.name} />
                <div>
                  <p className="font-black leading-none text-lg">{t.name}</p>
                  <p className="text-xs font-bold uppercase tracking-widest opacity-40 mt-1">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* --- NEWS/NEWSLETTER SECTION --- */}
      <section className={`py-32 rounded-t-[5rem] transition-all duration-1000 ${isDarkMode ? 'bg-[#121212]' : 'bg-[#1A1A1B] text-white'}`}>
        <div className="max-w-7xl mx-auto px-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-20 gap-8">
            <div>
              <h2 className="text-5xl font-black tracking-tighter uppercase mb-4 italic leading-none">Warta <br /> <span className="text-[#A67C52]">Kopi Wae</span></h2>
              <p className="opacity-50">Update terbaru seputar komunitas dan event kami.</p>
            </div>
            <button className="px-10 py-4 rounded-full border-2 border-[#A67C52] text-[#A67C52] font-black text-xs uppercase tracking-widest hover:bg-[#A67C52] hover:text-white transition-all">Lihat Semua</button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {news.map(n => (
              <div key={n.id} className="group flex flex-col md:flex-row gap-8 items-center bg-white/5 p-8 rounded-[4rem] hover:bg-white/10 transition-all border border-white/5">
                <div className="w-full md:w-56 h-56 rounded-[3rem] overflow-hidden flex-shrink-0">
                  <img src={n.img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={n.title} />
                </div>
                <div className="pr-4">
                  <span className="text-[10px] font-black bg-[#A67C52] px-4 py-1.5 rounded-full text-white mb-6 inline-block uppercase tracking-widest">{n.category}</span>
                  <p className="text-[10px] opacity-40 mb-3 font-bold uppercase">{n.date}</p>
                  <h4 className="text-2xl font-black tracking-tight leading-snug mb-6 group-hover:text-[#A67C52] transition-colors">{n.title}</h4>
                  <p className="text-sm opacity-50 font-medium leading-relaxed">Klik untuk membaca detail mengenai kegiatan terbaru kami...</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- FOOTER SECTION --- */}
      <footer className={`py-24 px-10 transition-colors duration-700 ${isDarkMode ? 'bg-[#121212] text-white' : 'bg-[#FDFDF7] text-[#1A1A1B]'}`}>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
            
            {/* Kolom 1: Brand Info */}
            <div className="md:col-span-1">
              <h3 className="text-3xl font-black tracking-tighter mb-6 uppercase italic">Kopi <span className="text-[#A67C52]">Wae</span></h3>
              <p className="text-sm opacity-60 leading-relaxed mb-8">
                Menyajikan kehangatan dari biji kopi pilihan langsung dari tanah Magelang. Kami percaya setiap tetes kopi memiliki cerita dan semangat yang berbeda.
              </p>
              <div className="flex gap-4">
                <a href="#" className="h-10 w-10 rounded-full border border-current/20 flex items-center justify-center hover:bg-[#A67C52] hover:text-white transition-all">IG</a>
                <a href="#" className="h-10 w-10 rounded-full border border-current/20 flex items-center justify-center hover:bg-[#A67C52] hover:text-white transition-all">FB</a>
                <a href="#" className="h-10 w-10 rounded-full border border-current/20 flex items-center justify-center hover:bg-[#A67C52] hover:text-white transition-all">TW</a>
              </div>
            </div>

            {/* Kolom 2: Quick Links */}
            <div>
              <h4 className="text-xs font-black uppercase tracking-[0.3em] text-[#A67C52] mb-8">Tautan Cepat</h4>
              <ul className="space-y-4 text-sm font-bold uppercase tracking-widest opacity-70">
                <li className="hover:text-[#A67C52] transition-colors"><a href="#">Beranda</a></li>
                <li className="hover:text-[#A67C52] transition-colors"><a href="#">Menu Kami</a></li>
                <li className="hover:text-[#A67C52] transition-colors"><a href="#">Tentang Kami</a></li>
                <li className="hover:text-[#A67C52] transition-colors"><a href="#">Kontak</a></li>
              </ul>
            </div>

            {/* Kolom 3: Contact & Address */}
            <div>
              <h4 className="text-xs font-black uppercase tracking-[0.3em] text-[#A67C52] mb-8">Lokasi & Kontak</h4>
              <div className="text-sm space-y-6 opacity-70">
                <div>
                  <p className="font-black uppercase mb-1">Workshop Magelang</p>
                  <p className="leading-relaxed italic">Jl. Glondong No. 12, Magelang Utara, Jawa Tengah, Indonesia.</p>
                </div>
                <div>
                  <p className="font-black uppercase mb-1">Email</p>
                  <p className="italic">hello@kopiwae.id</p>
                </div>
                <div>
                  <p className="font-black uppercase mb-1">WhatsApp</p>
                  <p className="italic">+62 812-3456-7890</p>
                </div>
              </div>
            </div>

            {/* Kolom 4: Newsletter */}
            <div>
              <h4 className="text-xs font-black uppercase tracking-[0.3em] text-[#A67C52] mb-8">Berlangganan</h4>
              <p className="text-sm opacity-60 mb-6">Dapatkan info promo dan menu musiman terbaru.</p>
              <div className="relative">
                <input 
                  type="email" 
                  placeholder="Email anda..." 
                  className="w-full bg-transparent border-b-2 border-current/20 py-3 text-sm focus:border-[#A67C52] outline-none transition-all italic"
                />
                <button className="absolute right-0 top-1/2 -translate-y-1/2 text-[10px] font-black uppercase tracking-widest text-[#A67C52]">Kirim</button>
              </div>
            </div>

          </div>

          {/* Bottom Bar */}
          <div className="pt-10 border-t border-current/10 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-[10px] font-black uppercase tracking-[0.4em] opacity-30">
              © 2026 Kopi Wae Indonesia — Est. Magelang
            </p>
            <div className="flex gap-8 text-[10px] font-black uppercase tracking-[0.2em] opacity-30">
              <a href="#" className="hover:opacity-100 transition-opacity">Privacy Policy</a>
              <a href="#" className="hover:opacity-100 transition-opacity">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>

      {/* --- FLOATING ORDER TRACKER --- */}
      {isOrdering && (
        <div className="fixed bottom-12 left-1/2 -translate-x-1/2 z-[130] bg-[#1A1A1B] text-white px-10 py-5 rounded-full shadow-2xl flex items-center space-x-5 animate-in fade-in slide-in-from-bottom duration-500">
          <div className="w-8 h-8 rounded-full border-4 border-[#A67C52]/40 border-t-[#A67C52] animate-spin"></div>
          <p className="font-black text-sm uppercase tracking-widest mt-1">Sabar, kopimu sedang disiapkan... ☕</p>
        </div>
      )}

      {/* --- POP-UP PROMO --- */}
      {showPopup && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 backdrop-blur-xl bg-black/40 animate-in fade-in duration-700">
          <div className={`max-w-sm w-full rounded-[5rem] p-16 text-center border-b-[20px] border-[#A67C52] relative shadow-2xl transition-all ${isDarkMode ? 'bg-[#252525]' : 'bg-[#F5F5DC]'}`}>
             <button onClick={() => setShowPopup(false)} className="absolute top-10 right-10 opacity-30 hover:opacity-100 font-bold">✕</button>
             <h2 className="text-3xl font-black mb-2 tracking-tighter uppercase">KOPI WAE</h2>
             <p className="text-6xl font-black text-[#A67C52] my-10 leading-none">30% OFF</p>
             <p className="text-xs font-bold opacity-50 uppercase tracking-widest mb-10 leading-relaxed">Klaim diskon khusus untuk <br /> kunjungan pertamamu!</p>
             <button onClick={() => setShowPopup(false)} className="w-full py-6 rounded-[2.5rem] font-black bg-[#1A1A1B] text-white hover:bg-[#A67C52] transition-all shadow-xl shadow-[#1A1A1B]/20">AMBIL DISKON</button>
          </div>
        </div>
      )}
    </div>
  );
}