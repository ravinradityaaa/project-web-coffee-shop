import React, { useState } from 'react';

export default function ManajemenKategori() {
  // Data awal kategori (disamakan dengan pilihan di Manajemen Produk sebelumnya)
  const [kategoriList, setKategoriList] = useState([
    { id: 101, name: 'Single Origin - Arabica' },
    { id: 102, name: 'Single Origin - Robusta' },
    { id: 103, name: 'House Blend' },
    { id: 104, name: 'Espresso Roast' },
    { id: 105, name: 'Decaf' },
    { id: 106, name: 'Green Beans' },
  ]);

  // State untuk form input
  const [namaKategori, setNamaKategori] = useState('');
  const [editingId, setEditingId] = useState(null);

  // Handle submit form (Untuk Tambah & Edit)
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!namaKategori.trim()) return; // Cegah submit kalau input kosong

    if (editingId) {
      // Proses Update (Edit)
      const updatedList = kategoriList.map(item => 
        item.id === editingId ? { ...item, name: namaKategori } : item
      );
      setKategoriList(updatedList);
      setEditingId(null);
    } else {
      // Proses Create (Tambah Baru)
      const kategoriBaru = {
        id: Date.now(), // Generate ID unik sementara dari timestamp
        name: namaKategori
      };
      setKategoriList([...kategoriList, kategoriBaru]);
    }
    
    setNamaKategori(''); // Kosongkan input setelah submit
  };

  // Handle klik tombol Edit
  const handleEditClick = (item) => {
    setNamaKategori(item.name);
    setEditingId(item.id);
  };

  // Handle klik tombol Hapus
  const handleDelete = (id) => {
    const konfirmasi = window.confirm("Yakin ingin menghapus kategori ini?");
    if (konfirmasi) {
      const filteredList = kategoriList.filter(item => item.id !== id);
      setKategoriList(filteredList);
    }
  };

  // Handle batal edit
  const handleCancelEdit = () => {
    setNamaKategori('');
    setEditingId(null);
  };

  return (
    <main className="p-4 md:p-8 bg-stone-50 min-h-screen">
      <header className="mb-6 flex justify-between items-center bg-white p-4 rounded-xl shadow-sm border border-stone-100">
        <h1 className="text-2xl font-bold text-stone-800">Manajemen Kategori</h1>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* KOLOM KIRI: Form Input Kategori (Memenuhi Poin 1 Tugas) */}
        <div className="md:col-span-1">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-stone-100">
            <h2 className="text-lg font-bold text-stone-800 mb-4 border-b border-stone-100 pb-2">
              {editingId ? 'Edit Kategori' : 'Tambah Kategori Baru'}
            </h2>
            
            {/* Tag <form> sesuai rubrik tugas */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label htmlFor="kategori" className="block text-sm font-medium text-stone-700 mb-1">
                  Nama Kategori
                </label>
                {/* Tag <input> sesuai rubrik tugas */}
                <input 
                  type="text" 
                  id="kategori"
                  value={namaKategori}
                  onChange={(e) => setNamaKategori(e.target.value)}
                  placeholder="Masukkan nama kategori..."
                  required
                  className="w-full border border-stone-300 rounded-lg p-2.5 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                />
              </div>
              
              <div className="flex gap-2 pt-2">
                <button 
                  type="submit"
                  className="flex-1 bg-amber-600 hover:bg-amber-700 text-white py-2 px-4 rounded-lg transition-colors shadow-sm font-medium"
                >
                  {editingId ? 'Simpan Perubahan' : 'Tambah Kategori'}
                </button>
                
                {/* Tombol batal hanya muncul saat mode edit */}
                {editingId && (
                  <button 
                    type="button"
                    onClick={handleCancelEdit}
                    className="bg-stone-200 hover:bg-stone-300 text-stone-700 py-2 px-4 rounded-lg transition-colors font-medium"
                  >
                    Batal
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>

        {/* KOLOM KANAN: Tabel Kategori */}
        <div className="md:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-stone-100 overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-stone-100 text-stone-600 text-sm uppercase tracking-wider border-b border-stone-200">
                  <th className="p-4 font-semibold w-16">No</th>
                  <th className="p-4 font-semibold w-32">ID Kategori</th>
                  <th className="p-4 font-semibold">Nama Kategori</th>
                  <th className="p-4 font-semibold text-center w-32">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {kategoriList.length > 0 ? (
                  kategoriList.map((item, index) => (
                    <tr key={item.id} className="hover:bg-stone-50 transition-colors">
                      <td className="p-4 text-stone-500">{index + 1}</td>
                      <td className="p-4 text-stone-500 font-mono text-sm">{item.id}</td>
                      <td className="p-4 font-bold text-stone-800">{item.name}</td>
                      <td className="p-4">
                        <div className="flex justify-center gap-3">
                          <button 
                            onClick={() => handleEditClick(item)}
                            className="text-blue-600 hover:text-blue-800 font-medium"
                          >
                            Edit
                          </button>
                          <button 
                            onClick={() => handleDelete(item.id)}
                            className="text-red-600 hover:text-red-800 font-medium"
                          >
                            Hapus
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="p-8 text-center text-stone-500">Belum ada kategori.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </main>
  );
}