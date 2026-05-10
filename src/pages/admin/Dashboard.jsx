// src/pages/admin/Dashboard.jsx

export default function Dashboard() {
  return (
    <div className="dashboard-container">
      <h1>Dashboard Admin</h1>
      <p>Selamat datang di panel kendali Kopi Wae.</p>
      <div className="stats-grid">
        <div className="stat-card">Total Penjualan: 150</div>
        <div className="stat-card">Produk Aktif: 12</div>
      </div>
    </div>
  );
}