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
          /* 3. Bungkus dengan UserLayout */
          <Route path="/home" element={
            <UserLayout>
              <div style={{ padding: '20px' }}>
                <h1>Halaman Utama Pelanggan</h1>
                <button onClick={() => setRole('guest')}>Logout</button>
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