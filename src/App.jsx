import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/user/Login";

import UserLayout from "./layouts/UserLayout";
import Home from "./pages/user/Home";

// 1. IMPORT HALAMAN ADMIN BARUMU DI SINI
import AdminLayout from "./layouts/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import ManajemenProduk from "./pages/admin/ManajemenProduk";
import ManajemenKategori from "./pages/admin/ManajemenKategori";
import ManajemenPengguna from "./pages/admin/ManajemenPengguna";
import ManajemenPesanan from "./pages/admin/ManajemenPesanan";
import LaporanPenjualan from "./pages/admin/LaporanPenjualan";

// Pastikan kamu juga mengimport halaman lainnya nanti jika sudah dibuat
// import ManajemenPesanan from './pages/admin/ManajemenPesanan';
// import ManajemenPengguna from './pages/admin/ManajemenPengguna';

function App() {
  const [role, setRole] = useState("guest");

  return (
    <BrowserRouter>
      <Routes>
        {/* 1. JIKA GUEST (BELUM LOGIN) */}
        {role === "guest" && <Route path="/" element={<Login onLogin={setRole} />} />}

        {/* 2. JIKA ADMIN */}
        {role === "admin" && (
          <Route path="/admin" element={<AdminLayout onLogout={() => setRole("guest")} />}>
            {/* 'index' berarti halaman default saat mengakses /admin */}
            <Route index element={<Dashboard />} />

            {/* 2. TAMBAHKAN ROUTING HALAMAN DI SINI */}
            {/* Ganti <div> yang lama dengan komponen aslinya */}
            <Route path="produk" element={<ManajemenProduk />} />
            <Route path="kategori" element={<ManajemenKategori />} />
            <Route path="pesanan" element={<ManajemenPesanan />} />
            <Route path="pengguna" element={<ManajemenPengguna />} />
            <Route path="laporan" element={<LaporanPenjualan />} />
            {/* Tinggal buka komentar di bawah ini kalau filenya sudah siap */}
            {/* <Route path="pesanan" element={<ManajemenPesanan />} /> */}
            {/* <Route path="pengguna" element={<ManajemenPengguna />} /> */}
          </Route>
        )}

        {/* 3. JIKA USER/PELANGGAN */}
        {role === "user" && (
          <Route
            path="/home"
            element={
              <UserLayout>
                <div className="p-8 bg-stone-100 min-h-screen flex flex-col items-center justify-center">
                  <h1 className="text-3xl font-bold text-amber-900 mb-6">Halaman Utama Pelanggan</h1>
                  <button onClick={() => setRole("guest")} className="bg-red-600 hover:bg-red-700 text-white py-2 px-6 rounded-lg transition-all">
                    Logout
                  </button>
                </div>
              </UserLayout>
            }
          />
        )}

        {/* 4. PROTEKSI REDIRECT */}
        <Route path="*" element={<Navigate to={role === "admin" ? "/admin" : role === "user" ? "/home" : "/"} replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
