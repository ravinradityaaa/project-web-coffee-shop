// src/layouts/UserLayout.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // 1. Tambahkan import

const UserLayout = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate(); // 2. Inisialisasi navigate

  // Fungsi navigasi ke halaman ListProduk
  const handleNavMenu = () => {
    navigate('/menu'); // Pastikan path ini sesuai dengan di App.jsx
    setIsMenuOpen(false); // Tutup menu mobile jika terbuka
  };

  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden">
      {/* Header */}
      <header className="bg-[#1a1a1a] text-white py-4 px-6 md:px-12 flex items-center justify-between border-b border-[#333] sticky top-0 z-[100] backdrop-blur-md bg-opacity-95">
        
        {/* Logo - Klik ke Home */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/')}>
          <div className="text-amber-700 text-2xl md:text-3xl">☕</div>
          <div>
            <h1 className="text-lg md:text-xl font-bold tracking-wider leading-none">KOPI WAE</h1>
            <p className="text-[8px] md:text-[10px] tracking-[0.2em] text-gray-400 uppercase">Coffee & Roasters</p>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8 text-[11px] font-bold tracking-widest uppercase">
          <a href="#" className="hover:text-amber-600 transition">Our Story</a>
          {/* Tombol Menu Desktop */}
          <button 
            onClick={handleNavMenu} 
            className="hover:text-amber-600 transition tracking-widest font-bold uppercase"
          >
            Menu
          </button>
          <a href="#" className="hover:text-amber-600 transition">Shop Online</a>
          <a href="#" className="hover:text-amber-600 transition">Locations</a>
          <a href="#" className="hover:text-amber-600 transition">Daftar/Masuk</a>
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-3 md:gap-6">
          <button className="hidden sm:block hover:scale-110 transition">🔍</button>
          <button className="relative hover:scale-110 transition">
            🛒
            <span className="absolute -top-2 -right-2 bg-amber-700 text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold">3</span>
          </button>
          <button 
            onClick={handleNavMenu}
            className="hidden md:block bg-[#a87a55] px-6 py-2 rounded-full text-[11px] font-black tracking-widest uppercase hover:bg-amber-600 transition-all active:scale-95"
          >
            Pesan Sekarang
          </button>

          <button className="lg:hidden text-2xl p-1" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? '✕' : '☰'}
          </button>
        </div>
      </header>

      {/* Mobile Sidebar Menu */}
      <div className={`lg:hidden fixed inset-0 z-[90] bg-[#1a1a1a] transition-transform duration-500 ease-in-out ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <nav className="flex flex-col items-center justify-center h-full gap-8 text-xl font-black uppercase tracking-widest text-center">
          <a href="#" onClick={() => setIsMenuOpen(false)}>Our Story</a>
          {/* Tombol Menu Mobile */}
          <button onClick={handleNavMenu} className="text-amber-600 hover:text-white transition uppercase font-black">
            Menu
          </button>
          <a href="#" onClick={() => setIsMenuOpen(false)}>Shop Online</a>
          <a href="#" onClick={() => setIsMenuOpen(false)}>Locations</a>
          <a href="#" onClick={() => setIsMenuOpen(false)}>Daftar/Masuk</a>
          <button onClick={handleNavMenu} className="mt-4 bg-[#a87a55] px-10 py-4 rounded-full text-sm font-black uppercase tracking-[0.2em]">
            Order Now
          </button>
        </nav>
      </div>

      {/* Main Content Area */}
      <main className={`flex-grow transition-all duration-500 ${isMenuOpen ? 'blur-sm scale-95' : ''}`}>
        {children}
      </main>

      <footer className="bg-[#111] text-gray-500 py-8 text-center text-[10px] tracking-widest uppercase border-t border-[#222]">
        © 2026 Kopi Wae Indonesia — Crafted with Passion
      </footer>
    </div>
  );
};

export default UserLayout;