import React from 'react';

export default function DashboardAdmin() {
  // Data statis sementara untuk simulasi tampilan (Mock Data)
  const ringkasan = {
    pendapatan: 12500000, 
    terlaris: "Arabica Gayo - Single Origin",
    totalPesanan: 48
  };

  const pesananTerbaru = [
    { id: "ORD-001", nama: "Budi Santoso", produk: "Arabica Gayo (250g)", total: 85000, status: "Menunggu Pembayaran", waktu: "10:30 WIB" },
    { id: "ORD-002", nama: "Siti Aminah", produk: "House Blend Espresso (500g)", total: 150000, status: "Diproses", waktu: "09:15 WIB" },
    { id: "ORD-003", nama: "Andi Darmawan", produk: "Robusta Dampit (250g)", total: 65000, status: "Selesai", waktu: "Kemarin" },
    { id: "ORD-004", nama: "Rina Kumala", produk: "Decaf Blend (200g)", total: 95000, status: "Selesai", waktu: "Kemarin" },
  ];

  // Fungsi utilitas untuk format uang
  const formatRupiah = (angka) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(angka);
  };

  return (
    <main className="p-4 md:p-8 bg-stone-50 min-h-screen">
      
      {/* 1. BAGIAN HEADER (Background terpisah) */}
      <header className="mb-6 bg-white p-6 rounded-xl shadow-sm border border-stone-100">
        <h1 className="text-2xl font-bold text-stone-800">Dashboard Admin</h1>
        <p className="text-stone-500 mt-1">Selamat datang di panel kendali Coffee Wae. Berikut adalah ringkasan performa hari ini.</p>
      </header>

      {/* 2. KONTAINER UTAMA DATA (Background besar untuk membungkus card & tabel) */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-stone-100">
        
        {/* 3. GRID CARD RINGKASAN */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          
          {/* Card 1: Total Pendapatan */}
          <div className="p-5 rounded-xl border border-stone-100 bg-stone-50 shadow-sm flex flex-col justify-center hover:border-amber-200 transition-colors">
            <span className="text-sm font-medium text-stone-500 mb-1">Total Pendapatan</span>
            <span className="text-2xl font-bold text-amber-600">{formatRupiah(ringkasan.pendapatan)}</span>
          </div>

          {/* Card 2: Kopi Terlaris */}
          <div className="p-5 rounded-xl border border-stone-100 bg-stone-50 shadow-sm flex flex-col justify-center hover:border-amber-200 transition-colors">
            <span className="text-sm font-medium text-stone-500 mb-1">Kopi Terlaris Bulan Ini</span>
            <span className="text-xl font-bold text-stone-800 line-clamp-1" title={ringkasan.terlaris}>
              {ringkasan.terlaris}
            </span>
          </div>

          {/* Card 3: Total Pesanan */}
          <div className="p-5 rounded-xl border border-stone-100 bg-stone-50 shadow-sm flex flex-col justify-center hover:border-amber-200 transition-colors">
            <span className="text-sm font-medium text-stone-500 mb-1">Pesanan Baru (Hari Ini)</span>
            <span className="text-2xl font-bold text-blue-600">
              {ringkasan.totalPesanan} <span className="text-base font-normal text-stone-500">pesanan</span>
            </span>
          </div>

        </div>

        {/* 4. DAFTAR PESANAN TERBARU (Tampil di bawah ringkasan) */}
        <div>
          <h2 className="text-lg font-bold text-stone-800 mb-4 border-b border-stone-100 pb-2">Pesanan Terbaru</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-stone-100 text-stone-600 text-sm uppercase tracking-wider border-b border-stone-200">
                  <th className="p-4 font-semibold w-28">ID Pesanan</th>
                  <th className="p-4 font-semibold">Pelanggan</th>
                  <th className="p-4 font-semibold">Produk</th>
                  <th className="p-4 font-semibold">Total</th>
                  <th className="p-4 font-semibold text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {pesananTerbaru.map((order, index) => (
                  <tr key={index} className="hover:bg-stone-50 transition-colors">
                    <td className="p-4 text-stone-500 font-mono text-sm">{order.id}</td>
                    <td className="p-4 font-medium text-stone-800">
                      {order.nama}
                      <div className="text-xs text-stone-400 font-normal mt-0.5">{order.waktu}</div>
                    </td>
                    <td className="p-4 text-sm text-stone-600">{order.produk}</td>
                    <td className="p-4 font-medium text-stone-700">{formatRupiah(order.total)}</td>
                    <td className="p-4 text-center">
                      {/* Warna Badge dinamis berdasarkan Status */}
                      <span className={`px-3 py-1 text-xs rounded-full font-medium inline-block w-full max-w-[130px] ${
                        order.status === 'Selesai' ? 'bg-green-100 text-green-700 border border-green-200' :
                        order.status === 'Diproses' ? 'bg-blue-100 text-blue-700 border border-blue-200' :
                        'bg-orange-100 text-orange-700 border border-orange-200'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </main>
  );
}