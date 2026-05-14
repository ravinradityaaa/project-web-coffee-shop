import React from 'react';

const ManajemenProduk = () => {
  return (
    <div>
      {/* Bagian Header Tabel */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Manajemen Produk</h1>
        <button className="bg-amber-700 hover:bg-amber-800 text-white px-4 py-2 rounded-lg font-medium transition-colors">
          + Tambah Produk
        </button>
      </div>

      {/* Container Tabel */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-left">
          
          {/* Kepala Tabel */}
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="p-4 text-sm font-semibold text-gray-600">No</th>
              <th className="p-4 text-sm font-semibold text-gray-600">Nama Kopi</th>
              <th className="p-4 text-sm font-semibold text-gray-600">Kategori</th>
              <th className="p-4 text-sm font-semibold text-gray-600">Harga</th>
              <th className="p-4 text-sm font-semibold text-gray-600">Aksi</th>
            </tr>
          </thead>
          
          {/* Isi Tabel (Bisa dilooping pakai .map nanti) */}
          <tbody className="divide-y divide-gray-200">
            <tr className="hover:bg-gray-50 transition-colors">
              <td className="p-4 text-gray-800">1</td>
              <td className="p-4 text-gray-800 font-medium">Iced Americano</td>
              <td className="p-4 text-gray-500">Cold Brew</td>
              <td className="p-4 text-gray-800">Rp 25.000</td>
              <td className="p-4 space-x-2">
                <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">Edit</button>
                <button className="text-red-600 hover:text-red-800 text-sm font-medium">Hapus</button>
              </td>
            </tr>
          </tbody>
          
        </table>
      </div>
    </div>
  );
};

export default ManajemenProduk;