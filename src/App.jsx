import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/user/Login'; // Pastikan jalur foldernya benar
import AdminLayout from './layouts/AdminLayout';
import Dashboard from './pages/admin/Dashboard';

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
            <div style={{ padding: '20px' }}>
              <h1>Halaman Utama Pelanggan</h1>
              <button onClick={() => setRole('guest')}>Logout</button>
            </div>
          } />
        )}

        {/* PROTEKSI REDIRECT */}
        <Route path="*" element={<Navigate to={role === 'admin' ? "/admin" : role === 'user' ? "/home" : "/"} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;