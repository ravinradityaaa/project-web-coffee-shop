import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function ManajemenKategori() {
  const [kategoriList, setKategoriList] = useState([]);
  const [namaKategori, setNamaKategori] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);

  // State untuk Modal Sukses/Gagal
  const [modal, setModal] = useState({ show: false, tipe: '', pesan: '' });
  
  // State untuk Modal Konfirmasi Hapus
  const [confirmDelete, setConfirmDelete] = useState({ show: false, id: null });

  const tampilkanModal = (tipe, pesan) => {
    setModal({ show: true, tipe, pesan });
  };

  const fetchKategori = async () => {
    try {
      const response = await axios.get('/admin/kategori');
      setKategoriList(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Detail Error Fetch:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchKategori();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!namaKategori.trim()) return; 

    try {
      if (editingId) {
        await axios.put(`/admin/kategori/${editingId}`, { nama_kategori: namaKategori });
        tampilkanModal('success', 'Data kategori berhasil diperbarui.');
      } else {
        await axios.post('/admin/kategori', { nama_kategori: namaKategori });
        tampilkanModal('success', 'Data kategori baru berhasil ditambahkan.');
      }
      
      setNamaKategori('');
      setEditingId(null);
      fetchKategori(); 
      
    } catch (error) {
      console.error("Detail Error Submit:", error.response || error);
      tampilkanModal('error', 'Terjadi kendala saat menyimpan data. Silakan periksa kembali koneksi atau log server.');
    }
  };

  const handleDeleteClick = (id) => {
    setConfirmDelete({ show: true, id: id });
  };

  const executeDelete = async () => {
    try {
      await axios.delete(`/admin/kategori/${confirmDelete.id}`);
      setConfirmDelete({ show: false, id: null });
      tampilkanModal('success', 'Data kategori berhasil dihapus.');
      fetchKategori(); 
    } catch (error) {
      setConfirmDelete({ show: false, id: null });
      tampilkanModal('error', 'Kategori ini tidak dapat dihapus karena masih terkait dengan data produk kopi.');
    }
  };

  const handleEditClick = (item) => {
    setNamaKategori(item.nama_kategori);
    setEditingId(item.id_kategori);
  };

  const handleCancelEdit = () => {
    setNamaKategori('');
    setEditingId(null);
  };

  return (
    <main className="p-4 md:p-8 bg-stone-50 min-h-screen relative">
      
      {/* =================================================== */}
      {/* 1. OVERLAY MODAL CUSTOM UNTUK KONFIRMASI HAPUS        */}
      {/* =================================================== */}
      {confirmDelete.show && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-6 md:p-8 shadow-2xl max-w-sm w-full text-center">
            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full mb-4 bg-amber-100 text-amber-600">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
              </svg>
            </div>
            
            <h3 className="text-xl font-bold text-stone-800 mb-2">Konfirmasi Penghapusan</h3>
            <p className="text-stone-600 mb-6">Apakah Anda yakin ingin menghapus data kategori ini? Data yang telah dihapus tidak dapat dikembalikan.</p>
            
            <div className="flex gap-3">
              <button 
                onClick={() => setConfirmDelete({ show: false, id: null })} 
                className="flex-1 py-2.5 rounded-xl font-bold text-stone-700 bg-stone-200 hover:bg-stone-300 transition-colors"
              >
                Batal
              </button>
              <button 
                onClick={executeDelete} 
                className="flex-1 py-2.5 rounded-xl font-bold text-white bg-red-600 hover:bg-red-700 transition-colors shadow-sm"
              >
                Hapus Data
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =================================================== */}
      {/* 2. OVERLAY MODAL CUSTOM UNTUK SUKSES & GAGAL          */}
      {/* =================================================== */}
      {modal.show && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm transition-opacity">
          <div className="bg-white rounded-2xl p-6 md:p-8 shadow-2xl max-w-sm w-full text-center transform transition-all">
            
            <div className={`mx-auto flex items-center justify-center h-16 w-16 rounded-full mb-4 ${modal.tipe === 'success' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
              {modal.tipe === 'success' ? (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
              ) : (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12"></path></svg>
              )}
            </div>
            
            <h3 className="text-xl font-bold text-stone-800 mb-2">
              {modal.tipe === 'success' ? 'Berhasil' : 'Terjadi Kesalahan'}
            </h3>
            <p className="text-stone-600 mb-6 leading-relaxed">
              {modal.pesan}
            </p>
            
            <button
              onClick={() => setModal({ show: false, tipe: '', pesan: '' })}
              className="w-full py-3 rounded-xl font-bold text-white bg-stone-800 hover:bg-[#A67C52] transition-colors focus:outline-none"
            >
              Tutup
            </button>
          </div>
        </div>
      )}
      {/* ========================================= */}

      <header className="mb-6 flex justify-between items-center bg-white p-4 rounded-xl shadow-sm border border-stone-100">
        <h1 className="text-2xl font-bold text-stone-800">Manajemen Kategori</h1>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* KOLOM KIRI: Form Input */}
        <div className="md:col-span-1">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-stone-100">
            <h2 className="text-lg font-bold text-stone-800 mb-4 border-b border-stone-100 pb-2">
              {editingId ? 'Ubah Data Kategori' : 'Tambah Kategori Baru'}
            </h2>
            
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label htmlFor="kategori" className="block text-sm font-medium text-stone-700 mb-1">
                  Nama Kategori
                </label>
                <input 
                  type="text" 
                  id="kategori"
                  value={namaKategori}
                  onChange={(e) => setNamaKategori(e.target.value)}
                  placeholder="Masukkan nama kategori..."
                  required
                  className="w-full border border-stone-300 rounded-lg p-2.5 focus:ring-2 focus:ring-[#A67C52] focus:outline-none transition-all"
                />
              </div>
              
              <div className="flex gap-2 pt-2">
                <button 
                  type="submit"
                  className="flex-1 bg-[#A67C52] hover:bg-amber-800 text-white py-2 px-4 rounded-lg transition-colors shadow-sm font-bold"
                >
                  {editingId ? 'Simpan Data' : 'Tambah Kategori'}
                </button>
                
                {editingId && (
                  <button 
                    type="button"
                    onClick={handleCancelEdit}
                    className="bg-stone-200 hover:bg-stone-300 text-stone-700 py-2 px-4 rounded-lg transition-colors font-bold"
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
                  <th className="p-4 font-bold w-16">No</th>
                  <th className="p-4 font-bold w-32">ID Kategori</th>
                  <th className="p-4 font-bold">Nama Kategori</th>
                  <th className="p-4 font-bold text-center w-32">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {loading ? (
                  <tr>
                    <td colSpan="4" className="p-8 text-center text-stone-500 font-bold">Memuat data kategori...</td>
                  </tr>
                ) : kategoriList.length > 0 ? (
                  kategoriList.map((item, index) => (
                    <tr key={item.id_kategori} className="hover:bg-stone-50 transition-colors">
                      <td className="p-4 text-stone-500 font-medium">{index + 1}</td>
                      <td className="p-4 text-stone-500 font-mono text-sm">{item.id_kategori}</td>
                      <td className="p-4 font-bold text-stone-800">{item.nama_kategori}</td>
                      <td className="p-4">
                        <div className="flex justify-center gap-3">
                          <button 
                            onClick={() => handleEditClick(item)}
                            className="text-blue-600 hover:text-blue-800 font-bold transition-colors"
                          >
                            Edit
                          </button>
                          <button 
                            onClick={() => handleDeleteClick(item.id_kategori)}
                            className="text-red-600 hover:text-red-800 font-bold transition-colors"
                          >
                            Hapus
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="p-8 text-center text-stone-500 font-medium">Belum ada data kategori.</td>
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