import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/user/Login';
import AdminLayout from './layouts/AdminLayout';
import Dashboard from './pages/admin/Dashboard';
import UserLayout from './layouts/UserLayout'; // 1. Import Layout User
import Home from './pages/user/Home';          // 2. Import Halaman Home

function App() {
  const [role, setRole] = useState('guest');

  return (
    <BrowserRouter>
      <Routes>
        {/* HALAMAN LOGIN */}
        {role === 'guest' ? (
          <Route path="/" element={<Login onLogin={setRole} />} />
        ) : role === 'admin' ? (
          /* AREA ADMIN */
          <Route path="/admin" element={<AdminLayout onLogout={() => setRole('guest')} />}>
            <Route index element={<Dashboard />} />
            <Route path="produk" element={<div>Halaman Kelola Produk (Admin)</div>} />
          </Route>
        ) : (
        /* AREA USER */
        <Route path="/home" element={
          <UserLayout>
            {/* Mengganti inline style dengan class Tailwind */}
            <div className="p-8 bg-stone-100 min-h-screen flex flex-col items-center justify-center">
              
              {/* Styling untuk Heading */}
              <h1 className="text-3xl font-bold text-amber-900 mb-6 shadow-sm">
                Halaman Utama Pelanggan
              </h1>
              
              {/* Styling untuk Button */}
              <button 
                onClick={() => setRole('guest')}
                className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-6 rounded-lg transition-all duration-300"
              >
                Logout
              </button>
              
            </div>
          </UserLayout>
        } />
        )}

        {/* PROTEKSI REDIRECT */}
        <Route path="*" element={<Navigate to={role === 'admin' ? "/admin" : role === 'user' ? "/home" : "/"} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;