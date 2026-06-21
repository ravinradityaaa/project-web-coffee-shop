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

// 3. Import Semua Halaman User
import Login from './pages/user/Login';
import Register from './pages/user/Register'; // <-- TAMBAHAN IMPORT REGISTER
import Home from './pages/user/Home';
import ListProduk from './pages/user/ListProduk';
import Checkout from './pages/user/Checkout';
import History from './pages/user/History';
import Profil from './pages/user/Profil';
import DetailProduk from './pages/user/DetailProduk'; 
import Keranjang from './pages/user/Keranjang';       

function App() {
  const [role, setRole] = useState('guest');

  return (
    <Router>
      <Routes>
        
        {/* === RUTE AUTH (Berdiri Sendiri) === */}
        <Route path="/login" element={<Login setRole={setRole} />} />
        <Route path="/register" element={<Register />} /> {/* <-- RUTE BARU */}

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

        {/* === AREA PUBLIK & USER (PELANGGAN) === */}
        <Route path="/home" element={<UserLayout role={role} onLogout={() => setRole('guest')} />}>
          
          {/* Rute yang BISA diakses semua orang (Guest & User) */}
          <Route index element={<Home />} />
          <Route path="produk" element={<ListProduk />} />
          <Route path="detail" element={<DetailProduk />} />

          {/* Rute TERPROTEKSI (Kalau belum login / guest, dilempar otomatis ke /login) */}
          <Route path="keranjang" element={role === 'user' ? <Keranjang /> : <Navigate to="/login" />} />
          <Route path="checkout"  element={role === 'user' ? <Checkout />  : <Navigate to="/login" />} />
          <Route path="history"   element={role === 'user' ? <History />   : <Navigate to="/login" />} />
          <Route path="profil"    element={role === 'user' ? <Profil />    : <Navigate to="/login" />} />
        </Route>

        {/* === PROTEKSI REDIRECT URL === */}
        {/* Jika user baru buka web di localhost:5173, langsung diarahkan ke /home */}
        <Route path="/" element={<Navigate to="/home" replace />} />
        
        {/* Jika ketik URL ngawur, arahkan kembali sesuai role */}
        <Route path="*" element={<Navigate to={role === 'admin' ? "/admin" : "/home"} replace />} />
        
      </Routes>
    </Router>
  );
}

export default App;