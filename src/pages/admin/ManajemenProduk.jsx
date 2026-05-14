import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function ManajemenProduk() {
  // Poin 3: useState untuk menyimpan data produk dan status loading
  const [produk, setProduk] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Poin 3: useEffect untuk memicu pengambilan data saat halaman dibuka
  useEffect(() => {
    // Poin 4: Ambil data dari Public API menggunakan Axios
    // Kita pakai API kopi gratisan sebagai contoh
    axios.get('https://api.sampleapis.com/coffee/hot')
      .then((res) => {
        setProduk(res.data.slice(0, 10)); // Poin 4: Ambil minimal 10 item
        setIsLoading(false); // Matikan loading setelah data didapat
      })
      .catch((err) => {
        console.error("Gagal mengambil data:", err);
        setIsLoading(false);
      });
  }, []);

  return (
    <main className="p-2 md:p-6">
      <header className="mb-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-stone-800">Manajemen Produk</h1>
        {/* Poin 2: Efek visual pada tombol */}
        <button className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-lg transition-colors shadow-sm">
          + Tambah Produk
        </button>
      </header>

      {/* Poin 3: Conditional Rendering & Poin 4: Loading Indicator */}
      {isLoading ? (
        <div className="flex justify-center items-center p-12">
          <p className="text-lg font-semibold text-amber-700 animate-pulse">
            Memuat data kopi dari server...
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-stone-100 overflow-hidden">
          {/* Poin 2: Grid sistem untuk menampilkan list data */}
          <ul className="divide-y divide-stone-200">
            {produk.map((item) => (
              <li key={item.id} className="p-4 flex flex-col md:flex-row md:items-center justify-between hover:bg-stone-50 transition-colors">
                <div className="flex items-center gap-4 mb-2 md:mb-0">
                  <div className="w-12 h-12 bg-stone-200 rounded-lg overflow-hidden">
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h3 className="font-bold text-stone-800">{item.title}</h3>
                    <p className="text-sm text-stone-500 line-clamp-1">{item.description}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="text-blue-600 hover:text-blue-800 text-sm font-semibold">Edit</button>
                  <button className="text-red-600 hover:text-red-800 text-sm font-semibold">Hapus</button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </main>
  );
}