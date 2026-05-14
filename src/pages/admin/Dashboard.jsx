import React from 'react';

export default function Dashboard() {
  return (
    // Poin 1: <main> sebagai pembungkus konten utama
    <main className="p-2 md:p-6">
      
      {/* Poin 1: <header> untuk bagian atas halaman */}
      {/* Poin 2: Layout responsif & Flexbox (flex-col di mobile, flex-row di desktop) */}
      <header className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-stone-800">Dashboard Admin</h1>
          <p className="text-stone-500 mt-1">Selamat datang di panel kendali Coffee Wae.</p>
        </div>
      </header>

      {/* Poin 2: Sistem Grid (1 kolom di mobile, 2 di tablet, 4 di desktop besar) */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Poin 2: Efek Visual (hover:shadow-lg, transition-shadow) */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-stone-100 hover:shadow-lg transition-shadow duration-300">
          <h3 className="text-stone-500 text-sm font-semibold mb-2">Total Penjualan</h3>
          <p className="text-3xl font-bold text-amber-600">150</p>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border border-stone-100 hover:shadow-lg transition-shadow duration-300">
          <h3 className="text-stone-500 text-sm font-semibold mb-2">Produk Aktif</h3>
          <p className="text-3xl font-bold text-green-600">12</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-stone-100 hover:shadow-lg transition-shadow duration-300">
          <h3 className="text-stone-500 text-sm font-semibold mb-2">Pesanan Baru</h3>
          <p className="text-3xl font-bold text-blue-600">5</p>
        </div>

      </section>
    </main>
  );
}