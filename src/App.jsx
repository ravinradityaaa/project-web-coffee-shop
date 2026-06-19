import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// 1. Import Layout Utama
import AdminLayout from './layouts/AdminLayout'; // Pastikan path-nya sesuai folder kamu

// 2. Import Semua Halaman Admin (Sesuai gambar yang kamu kirim)
import Dashboard from './pages/admin/Dashboard';
import ManajemenKategori from './pages/admin/ManajemenKategori';
import ManajemenProduk from './pages/admin/ManajemenProduk';
import ManajemenPesanan from './pages/admin/ManajemenPesanan';
import ManajemenPengguna from './pages/admin/ManajemenPengguna';
import LaporanPenjualan from './pages/admin/LaporanPenjualan';

function App() {
  // Fungsi dummy untuk props onLogout di AdminLayout
  const handleLogout = () => {
    console.log("Logout diklik!");
    // Nanti di sini kamu tambahkan logika hapus token/session
  };

  return (
    <Router>
      <Routes>
        {/* RUTE BERSARANG (NESTED ROUTES) UNTUK ADMIN
          Semua rute di dalam block ini akan menggunakan AdminLayout.
          Komponen halamannya akan otomatis dirender di area <Outlet />
        */}
        <Route path="/admin" element={<AdminLayout onLogout={handleLogout} />}>
          
          {/* Rute Default saat akses /admin (index) -> Muncul Dashboard */}
          <Route index element={<Dashboard />} />
          
          {/* Rute untuk halaman lainnya */}
          <Route path="kategori" element={<ManajemenKategori />} />
          <Route path="produk" element={<ManajemenProduk />} />
          <Route path="pesanan" element={<ManajemenPesanan />} />
          <Route path="pengguna" element={<ManajemenPengguna />} />
          <Route path="laporan" element={<LaporanPenjualan />} />
          
        </Route>

        {/* Nanti kamu bisa tambah rute lain di luar admin di sini, misal untuk pembeli */}
        {/* <Route path="/" element={<HalamanDepan />} /> */}
      </Routes>
    </Router>
  );
}

export default App;