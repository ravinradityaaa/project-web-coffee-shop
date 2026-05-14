import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const AdminLayout = ({ onLogout }) => {
  return (
    /* Container Utama Layar Penuh */
    <div className="flex min-h-screen bg-stone-100 font-sans">
      
      {/* ================= SIDEBAR KIRI ================= */}
      {/* w-64 (lebar tetap), bg-amber-900 (coklat gelap), text-white */}
      <aside className="w-64 bg-amber-900 text-white flex flex-col shadow-xl">
        
        {/* Logo / Judul Admin */}
        <div className="p-6 text-2xl font-bold border-b border-amber-800 text-center tracking-wider">
          COFFEE ADMIN
        </div>
        
        {/* Menu Navigasi */}
        <nav className="flex-1 p-4 flex flex-col gap-2">
          {/* Gunakan <Link> agar pindah halaman tidak loading ulang */}
          <Link to="/admin" className="block px-4 py-3 rounded-lg hover:bg-amber-800 transition-colors">
            Dashboard
          </Link>
          <Link to="/admin/produk" className="block px-4 py-3 rounded-lg hover:bg-amber-800 transition-colors">
            Manajemen Produk
          </Link>
          <Link to="/admin/kategori" className="block px-4 py-3 rounded-lg hover:bg-amber-800 transition-colors">
            Manajemen Kategori
          </Link>
        </nav>
        
      </aside>

      {/* ================= AREA KONTEN KANAN ================= */}
      {/* flex-1 (mengisi sisa layar di kanan sidebar) */}
      <main className="flex-1 flex flex-col">
        
        {/* Header Atas */}
        <header className="bg-white h-16 shadow-sm flex items-center justify-between px-8">
          <h2 className="text-gray-600 font-medium">Selamat datang, Admin!</h2>
          <button 
            onClick={onLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-md text-sm font-semibold transition-colors"
          >
            Logout
          </button>
        </header>

        {/* Area Munculnya Halaman (Dinamis) */}
        <div className="p-8 flex-1 overflow-y-auto">
          {/* <Outlet /> ini sangat PENTING! Ini adalah tempat di mana Dashboard, ManajemenProduk, dll akan dirender */}
          <Outlet />
        </div>
        
      </main>

    </div>
  );
};

export default AdminLayout;