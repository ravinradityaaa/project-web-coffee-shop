// src/layouts/AdminLayout.jsx
import { Outlet } from 'react-router-dom';

export default function AdminLayout({ onLogout }) {
  return (
    <div style={{ display: 'flex' }}>
      <aside style={{ width: '200px', background: '#333', color: 'white', minHeight: '100vh', padding: '20px' }}>
        <h3>Menu Admin</h3>
        <button onClick={onLogout} style={{ marginTop: '20px', color: 'red', cursor: 'pointer' }}>Logout</button>
      </aside>
      <main style={{ flex: 1, padding: '20px' }}>
        <Outlet />
      </main>
    </div>
  );
}