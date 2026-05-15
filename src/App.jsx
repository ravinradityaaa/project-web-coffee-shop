// src/App.jsx
import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/user/Login';
import AdminLayout from './layouts/AdminLayout';
import Dashboard from './pages/admin/Dashboard';
import UserLayout from './layouts/UserLayout'; 
import Home from './pages/user/Home'; 
import ListProduk from './pages/user/ListProduk'; // 1. Pastikan di-import

function App() {
  const [role, setRole] = useState('user'); // Sementara set ke 'user' untuk testing

  return (
    <BrowserRouter>
      <Routes>
        {/* 1. HALAMAN LOGIN */}
        {role === 'guest' && (
          <Route path="/" element={<Login onLogin={setRole} />} />
        )}

        {/* 2. AREA ADMIN */}
        {role === 'admin' && (
          <Route path="/admin" element={<AdminLayout onLogout={() => setRole('guest')} />}>
            <Route index element={<Dashboard />} />
            <Route path="produk" element={<div>Halaman Kelola Produk (Admin)</div>} />
          </Route>
        )}

        {/* 3. AREA USER: TAMBAHKAN DI SINI */}
        {role === 'user' && (
          <>
            {/* Rute untuk Landing Page */}
            <Route path="/home" element={
              <UserLayout onLogout={() => setRole('guest')}>
                <Home /> 
              </UserLayout>
            } />

            {/* RUTE BARU: Halaman List Produk (Menu) */}
            <Route path="/menu" element={
              <UserLayout onLogout={() => setRole('guest')}>
                <ListProduk /> 
              </UserLayout>
            } />
          </>
        )}

        {/* 4. PROTEKSI REDIRECT */}
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