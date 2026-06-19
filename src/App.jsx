import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// 1. Import Layout Utama
import AdminLayout from './layouts/AdminLayout';
import UserLayout from './layouts/UserLayout'; 

// 2. Import Semua Halaman Admin
import Dashboard from './pages/admin/Dashboard';
import ManajemenKategori from './pages/admin/ManajemenKategori';
import ManajemenProduk from './pages/admin/ManajemenProduk';
import ManajemenPesanan from './pages/admin/ManajemenPesanan';
import ManajemenPengguna from './pages/admin/ManajemenPengguna';
import LaporanPenjualan from './pages/admin/LaporanPenjualan';

// 3. Import Semua Halaman User (Kode Agung)
import Login from './pages/user/Login';
import Home from './pages/user/Home';
import ListProduk from './pages/user/ListProduk';
import Checkout from './pages/user/Checkout';
import History from './pages/user/History';
import Profil from './pages/user/Profil';

function App() {
  // State untuk menyimpan status login dummy ('guest', 'admin', 'user')
  const [role, setRole] = useState('guest');

  return (
    <Router>
      <Routes>
        
        {/* === AREA GUEST (BELUM LOGIN) === */}
        {role === 'guest' && (
          <Route path="/" element={<Login onLogin={setRole} />} />
        )}

        {/* === AREA ADMIN === */}
        {role === 'admin' && (
          <Route path="/admin" element={<AdminLayout onLogout={() => setRole('guest')} />}>
            <Route index element={<Dashboard />} />
            <Route path="kategori" element={<ManajemenKategori />} />
            <Route path="produk" element={<ManajemenProduk />} />
            <Route path="pesanan" element={<ManajemenPesanan />} />
            <Route path="pengguna" element={<ManajemenPengguna />} />
            <Route path="laporan" element={<LaporanPenjualan />} />
          </Route>
        )}

        {/* === AREA USER (PELANGGAN) === */}
        {role === 'user' && (
          <Route path="/home" element={<UserLayout onLogout={() => setRole('guest')} />}>
            <Route index element={<Home />} />
            <Route path="produk" element={<ListProduk />} />
            <Route path="checkout" element={<Checkout />} />
            <Route path="history" element={<History />} />
            <Route path="profil" element={<Profil />} />
          </Route>
        )}

        {/* === PROTEKSI REDIRECT === */}
        {/* Mengembalikan user ke tempat yang benar jika memaksa ketik URL ngawur */}
        <Route 
          path="*" 
          element={
            <Navigate to={
              role === 'admin' ? "/admin" : 
              role === 'user' ? "/home" : 
              "/"
            } replace />
          } 
        />
        
      </Routes>
    </Router>
  );
}

export default App;