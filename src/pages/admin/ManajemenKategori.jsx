import React from 'react';

const ManajemenKategori = () => {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Manajemen Kategori</h1>
        <button className="bg-amber-700 hover:bg-amber-800 text-white px-4 py-2 rounded-lg font-medium transition-colors">
          + Tambah Kategori
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-left">
          
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="p-4 text-sm font-semibold text-gray-600 w-16">No</th>
              <th className="p-4 text-sm font-semibold text-gray-600">Nama Kategori</th>
              <th className="p-4 text-sm font-semibold text-gray-600 w-48">Aksi</th>
            </tr>
          </thead>
          
          <tbody className="divide-y divide-gray-200">
            <tr className="hover:bg-gray-50 transition-colors">
              <td className="p-4 text-gray-800">1</td>
              <td className="p-4 text-gray-800 font-medium">Cold Brew</td>
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

export default ManajemenKategori;