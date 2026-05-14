import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/user/Login';
import AdminLayout from './layouts/AdminLayout';
import Dashboard from './pages/admin/Dashboard';
import UserLayout from './layouts/UserLayout'; 
import Home from './pages/user/Home'; 

function App() {
  // Pastikan role diset menjadi 'user' setelah login berhasil agar masuk ke area pelanggan
  const [role, setRole] = useState('guest'); 

  return (
    <BrowserRouter>
      <Routes>
        {/* 1. HALAMAN LOGIN: Tampilkan hanya jika role adalah guest */}
        {role === 'guest' && (
          <Route path="/" element={<Login onLogin={setRole} />} />
        )}

        {/* 2. AREA ADMIN: Tampilkan jika role adalah admin */}
        {role === 'admin' && (
          <Route path="/admin" element={<AdminLayout onLogout={() => setRole('guest')} />}>
            <Route index element={<Dashboard />} />
            <Route path="produk" element={<div>Halaman Kelola Produk (Admin)</div>} />
          </Route>
        )}

        {/* 3. AREA USER: Gunakan Komponen Home yang sudah kita buat */}
        {role === 'user' && (
          <Route path="/home" element={
            <UserLayout onLogout={() => setRole('guest')}>
              <Home /> 
            </UserLayout>
          } />
        )}

        {/* 4. PROTEKSI REDIRECT: Menangani jika user mengakses path yang salah atau belum login */}
        <Route path="*" element={
          <Navigate to={
            role === 'admin' ? "/admin" : 
            role === 'user' ? "/home" : "/"
          } replace />
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;