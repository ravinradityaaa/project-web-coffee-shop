import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Dashboard() {
  const [stats, setStats] = useState({
    pendapatan: 0,
    pesanan_baru: 0,
    total_produk: 0,
    pesanan_terbaru: []
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await axios.get('/admin/dashboard');
        setStats(response.data);
      } catch (error) {
        console.error("Gagal memuat data dashboard:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const formatRupiah = (angka) => {
    return new Intl.NumberFormat('id-ID', { 
      style: 'currency', 
      currency: 'IDR', 
      minimumFractionDigits: 0 
    }).format(angka || 0);
  };

  const formatTanggal = (tanggalString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(tanggalString).toLocaleDateString('id-ID', options);
  };

  const getStatusStyle = (status) => {
    switch (status?.toLowerCase()) {
      case 'selesai': return 'bg-green-100 text-green-700';
      case 'diproses': return 'bg-blue-100 text-blue-700';
      case 'menunggu pembayaran': return 'bg-amber-100 text-amber-700';
      default: return 'bg-stone-100 text-stone-700';
    }
  };

  if (isLoading) {
    return (
      <main className="p-4 md:p-8 bg-stone-50 min-h-screen flex justify-center items-center">
        <p className="text-lg font-semibold text-amber-700 animate-pulse">Memuat dashboard...</p>
      </main>
    );
  }

  return (
    <main className="p-4 md:p-8 bg-stone-50 min-h-screen">
      
      {/* HEADER PESAN SELAMAT DATANG */}
      <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-stone-100 mb-8">
        <h1 className="text-3xl font-bold text-stone-800 mb-2">Dashboard Admin</h1>
        <p className="text-stone-500">Selamat datang di panel kendali Coffee Wae. Berikut adalah ringkasan performa hari ini.</p>
      </div>

      {/* KARTU STATISTIK RINGKASAN */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-stone-100 flex flex-col justify-center">
          <p className="text-stone-500 font-medium mb-1">Total Pendapatan</p>
          <p className="text-3xl font-bold text-[#A67C52]">{formatRupiah(stats.pendapatan)}</p>
        </div>
        
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-stone-100 flex flex-col justify-center">
          <p className="text-stone-500 font-medium mb-1">Total Varian Produk</p>
          <div className="flex items-baseline gap-2">
            <p className="text-3xl font-bold text-stone-800">{stats.total_produk}</p>
            <span className="text-stone-500 text-sm">macam kopi</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-stone-100 flex flex-col justify-center">
          <p className="text-stone-500 font-medium mb-1">Total Pesanan</p>
          <div className="flex items-baseline gap-2">
            <p className="text-3xl font-bold text-[#A67C52]">{stats.pesanan_baru}</p>
            <span className="text-stone-500 text-sm">transaksi</span>
          </div>
        </div>
      </div>

      {/* TABEL PESANAN TERBARU */}
      <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-stone-100">
        <h2 className="text-xl font-bold text-stone-800 mb-6">Pesanan Terbaru</h2>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-stone-50 text-stone-500 text-sm uppercase tracking-wider">
                <th className="p-4 font-semibold rounded-tl-xl w-32">ID Pesanan</th>
                <th className="p-4 font-semibold">Pelanggan</th>
                <th className="p-4 font-semibold">Tanggal</th>
                <th className="p-4 font-semibold">Total</th>
                <th className="p-4 font-semibold text-center rounded-tr-xl">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {stats.pesanan_terbaru.length > 0 ? (
                stats.pesanan_terbaru.map((pesanan) => (
                  <tr key={pesanan.id_transaksi} className="hover:bg-stone-50 transition-colors">
                    <td className="p-4 font-mono text-sm text-stone-500">ORD-{pesanan.id_transaksi.toString().padStart(3, '0')}</td>
                    <td className="p-4 font-bold text-stone-800">{pesanan.pelanggan}</td>
                    <td className="p-4 text-sm text-stone-500">{formatTanggal(pesanan.tgl_transaksi)}</td>
                    <td className="p-4 font-medium text-stone-800">{formatRupiah(pesanan.total_harga)}</td>
                    <td className="p-4 text-center">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap ${getStatusStyle(pesanan.status_pesanan)}`}>
                        {pesanan.status_pesanan}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="p-8 text-center text-stone-500">
                    Belum ada transaksi yang tercatat di database.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

    </main>
  );
}