import React, { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';

export default function AdminLayout({ onLogout }) {
  // Poin 3: React Logic (useState) untuk fitur buka-tutup sidebar
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  // Fungsi sederhana untuk mengubah path URL menjadi Judul Halaman di Navbar
  const getPageTitle = () => {
    const path = location.pathname;
    if (path.includes('produk')) return 'Manajemen Produk';
    if (path.includes('kategori')) return 'Manajemen Kategori';
    if (path.includes('pesanan')) return 'Manajemen Pesanan';
    if (path.includes('pengguna')) return 'Manajemen Pengguna';
    if (path.includes('laporan')) return 'Laporan Penjualan';
    return 'Dashboard Admin';
  };

  return (
    /* Poin 2: Flexbox - Membungkus seluruh layar dan membaginya jadi kiri (sidebar) dan kanan (main) */
    <div className="flex h-screen bg-stone-100 font-sans">
      
      {/* 
        === SIDEBAR ===
        Poin 2: Layout Responsif (Mobile & Desktop)
        - Di Mobile: Posisi 'fixed', disembunyikan (-translate-x-full)
        - Di Desktop (md:): Posisi relative, selalu tampil (md:translate-x-0)
        Poin 2: Efek Visual
        - transition-transform duration-300: Animasi mulus saat ditarik/didorong
        - shadow-2xl: Memberi bayangan agar terlihat timbul
      */}
      <aside 
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-stone-900 text-white transform 
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
        md:relative md:translate-x-0 transition-transform duration-300 ease-in-out shadow-2xl flex flex-col`}
      >
        {/* Header Sidebar */}
        <div className="flex items-center justify-center h-16 border-b border-stone-700">
          <h2 className="text-2xl font-bold text-amber-500">Admin Wae</h2>
        </div>

        {/* Menu Navigasi - Diambil dari struktur folder di image_b1e6f2.jpg */}
        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          {/* Poin 2: Efek Visual (hover:bg-stone-700, transition-colors) */}
          <Link to="/admin" className="block px-4 py-2 rounded-lg hover:bg-stone-700 transition-colors">Dashboard</Link>
          <Link to="/admin/kategori" className="block px-4 py-2 rounded-lg hover:bg-stone-700 transition-colors">Kategori</Link>
          <Link to="/admin/produk" className="block px-4 py-2 rounded-lg hover:bg-stone-700 transition-colors">Produk</Link>
          <Link to="/admin/pesanan" className="block px-4 py-2 rounded-lg hover:bg-stone-700 transition-colors">Pesanan</Link>
          <Link to="/admin/pengguna" className="block px-4 py-2 rounded-lg hover:bg-stone-700 transition-colors">Pengguna</Link>
          <Link to="/admin/laporan" className="block px-4 py-2 rounded-lg hover:bg-stone-700 transition-colors">Laporan</Link>
        </nav>

        {/* Tombol Logout di bawah Sidebar */}
        <div className="p-4 border-t border-stone-700">
          <button 
            onClick={onLogout} 
            className="w-full px-4 py-2 text-left text-red-400 rounded-lg hover:bg-stone-800 hover:text-red-300 transition-colors flex items-center"
          >
            <span className="font-semibold">Logout</span>
          </button>
        </div>
      </aside>

      {/* 
        === KONTEN KANAN (NAVBAR & MAIN) === 
        Poin 2: Flexbox (flex-1 flex flex-col)
      */}
      <div className="flex-1 flex flex-col overflow-hidden">
        
        {/* === NAVBAR === */}
        <header className="flex items-center justify-between px-6 py-4 bg-white border-b shadow-sm">
          <div className="flex items-center">
            {/* Tombol Hamburger (Hanya muncul di Mobile/Layar Kecil) */}
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="text-stone-500 focus:outline-none md:hidden mr-4"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </button>
            
            {/* Judul Halaman Dinamis */}
            <h1 className="text-xl font-semibold text-stone-800">{getPageTitle()}</h1>
          </div>

          {/* Profil Admin */}
          <div className="flex items-center space-x-3">
            <span className="text-sm font-medium text-stone-600 hidden sm:block">Halo, Admin</span>
            {/* Contoh Avatar Sederhana */}
            <div className="w-10 h-10 rounded-full bg-amber-600 text-white flex items-center justify-center font-bold shadow-md">
              A
            </div>
          </div>
        </header>

        {/* 
          === AREA KONTEN UTAMA (OUTLET) === 
          Di sinilah halaman seperti Dashboard, Produk, dll akan dirender.
        */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-stone-50 p-6">
          <Outlet />
        </main>

      </div>

      {/* Overlay Gelap untuk Mobile saat sidebar terbuka */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black bg-opacity-50 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

    </div>
  );
};

export default AdminLayout;