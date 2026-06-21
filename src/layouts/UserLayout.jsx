import React, { useState, useEffect } from 'react';
import { useNavigate, Link, Outlet } from 'react-router-dom';

// 1. Terima properti role dan onLogout
const UserLayout = ({ role, onLogout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const [jumlahKeranjang, setJumlahKeranjang] = useState(0);

  useEffect(() => {
    const hitungKeranjang = () => {
      const keranjang = JSON.parse(localStorage.getItem("keranjang")) || [];
      const total = keranjang.reduce((akumulator, item) => akumulator + item.jumlah, 0);
      setJumlahKeranjang(total);
    };

    hitungKeranjang();
    window.addEventListener("keranjangChanged", hitungKeranjang);
    return () => window.removeEventListener("keranjangChanged", hitungKeranjang);
  }, []);

  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden bg-stone-50">
      
      {/* === HEADER / NAVBAR === */}
      <header className="bg-stone-900 text-stone-100 py-3 px-6 md:px-10 flex items-center justify-between border-b border-stone-800 sticky top-0 z-[100] shadow-md">
        
        {/* Logo */}
        <div className="flex items-center gap-3 cursor-pointer group" onClick={() => navigate('/home')}>
          <svg className="w-8 h-8 text-amber-600 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
            <path d="M2,21V19H20V21H2M20,8V5H18V8H20M20,3A2,2 0 0,1 22,5V8A2,2 0 0,1 20,10H18V13A4,4 0 0,1 14,17H8A4,4 0 0,1 4,13V3H20M16,5H6V13A2,2 0 0,0 8,15H14A2,2 0 0,0 16,13V5Z" />
          </svg>
          <div>
            <h1 className="text-lg md:text-xl font-extrabold tracking-wider leading-none text-white">KOPI WAE</h1>
            <p className="text-[9px] md:text-[10px] tracking-[0.2em] text-amber-600/80 uppercase font-semibold">Coffee & Roasters</p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="hidden md:flex flex-1 max-w-md mx-8 relative">
          <input 
            type="text" 
            placeholder="Cari kopi kesukaanmu..." 
            className="w-full bg-stone-800 text-sm text-white placeholder-stone-400 px-4 py-2 pl-10 rounded-full border border-stone-700 focus:outline-none focus:border-amber-600 focus:ring-1 focus:ring-amber-600 transition-all"
          />
          <svg className="w-4 h-4 absolute left-4 top-3 text-stone-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>

        {/* Kanan: Navigasi Desktop & Action */}
        <div className="flex items-center gap-6">
          <nav className="hidden lg:flex items-center gap-6 text-[12px] font-bold tracking-wider uppercase text-stone-300">
            <Link to="/home" className="hover:text-amber-500 transition-colors">Beranda</Link>
            <Link to="/home/produk" className="hover:text-amber-500 transition-colors">Produk</Link>
            <Link to="/home/history" className="hover:text-amber-500 transition-colors">Riwayat</Link>
            <Link to="/home/profil" className="hover:text-amber-500 transition-colors">Profil</Link>
          </nav>

          {/* Cart Icon */}
          <Link to="/home/keranjang" className="relative hover:text-amber-500 transition-colors hidden sm:block text-stone-300">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            
            {/* Hanya tampilkan angka jika user login dan keranjang tidak kosong */}
            {role === 'user' && jumlahKeranjang > 0 && (
              <span className="absolute -top-2 -right-2 bg-amber-600 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold border border-stone-900">
                {jumlahKeranjang}
              </span>
            )}
          </Link>

          {/* === 2. LOGIKA TOMBOL LOGIN / LOGOUT === */}
          {role === 'guest' ? (
            <button 
              onClick={() => navigate('/login')}
              className="hidden lg:block bg-amber-700 hover:bg-amber-600 text-white px-5 py-2 rounded-full text-[11px] font-bold tracking-wider uppercase transition-all shadow-md"
            >
              Daftar / Masuk
            </button>
          ) : (
            <button 
              onClick={onLogout}
              className="hidden lg:block border border-stone-600 hover:border-red-500 text-stone-300 hover:text-red-500 hover:bg-red-500/10 px-5 py-2 rounded-full text-[11px] font-bold tracking-wider uppercase transition-all"
            >
              Keluar
            </button>
          )}

          <button className="lg:hidden text-stone-300 p-1" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>
        </div>
      </header>

      {/* === MOBILE SIDEBAR MENU === */}
      <div className={`lg:hidden fixed inset-0 z-[90] bg-stone-900/95 backdrop-blur-md transition-transform duration-300 ease-in-out ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col items-center justify-center h-full gap-8 text-lg font-bold uppercase tracking-widest text-stone-300">
          
          <div className="w-3/4 relative mb-4">
            <input type="text" placeholder="Cari kopi..." className="w-full bg-stone-800 text-white px-4 py-3 pl-12 rounded-full focus:outline-none border border-stone-700" />
            <svg className="w-5 h-5 absolute left-4 top-3.5 text-stone-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          </div>

          <Link to="/home" onClick={() => setIsMenuOpen(false)} className="hover:text-amber-500 transition">Beranda</Link>
          <Link to="/home/produk" onClick={() => setIsMenuOpen(false)} className="hover:text-amber-500 transition">Katalog Produk</Link>
          <Link to="/home/history" onClick={() => setIsMenuOpen(false)} className="hover:text-amber-500 transition">Riwayat Transaksi</Link>
          <Link to="/home/keranjang" onClick={() => setIsMenuOpen(false)} className="hover:text-amber-500 transition">
            Keranjang {(role === 'user' && jumlahKeranjang > 0) ? `(${jumlahKeranjang})` : ""}
          </Link>
          <Link to="/home/profil" onClick={() => setIsMenuOpen(false)} className="hover:text-amber-500 transition">Profil Saya</Link>
          
          {role === 'guest' ? (
             <button onClick={() => { navigate('/login'); setIsMenuOpen(false); }} className="mt-6 bg-amber-700 text-white px-10 py-3 rounded-full text-sm font-bold tracking-widest uppercase hover:bg-amber-600 transition-all">
               Daftar / Masuk
             </button>
          ) : (
            <button onClick={() => { onLogout(); setIsMenuOpen(false); }} className="mt-6 border border-red-500/50 text-red-400 px-10 py-3 rounded-full text-sm hover:bg-red-500 hover:text-white transition-all">
              Keluar Akun
            </button>
          )}
        </div>
      </div>

      <main className={`flex-grow transition-all duration-300 ${isMenuOpen ? 'blur-md scale-[0.98]' : ''}`}>
        <Outlet />
      </main>

    </div>
  );
};

export default UserLayout;