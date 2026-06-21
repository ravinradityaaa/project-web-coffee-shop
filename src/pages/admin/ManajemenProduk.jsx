import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function ManajemenProduk() {
  const [produk, setProduk] = useState([]);
  const [kategoriList, setKategoriList] = useState([]); 
  const [isLoading, setIsLoading] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  
  // State untuk Modal Sukses/Gagal
  const [modalAlert, setModalAlert] = useState({ show: false, tipe: '', pesan: '' });
  
  // State untuk Modal Konfirmasi Hapus
  const [confirmDelete, setConfirmDelete] = useState({ show: false, id: null });

  const [formData, setFormData] = useState({
    nama_kopi: '',
    id_kategori: '', 
    harga_kopi: '',
    stok: '',
    stok_minimal: ''
  });

  const tampilkanModal = (tipe, pesan) => {
    setModalAlert({ show: true, tipe, pesan });
  };

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const resKategori = await axios.get('/admin/kategori');
      setKategoriList(resKategori.data);

      const resKopi = await axios.get('/admin/produk');
      setProduk(resKopi.data);
    } catch (err) {
      console.error("Detail Error Fetch:", err.response || err.message);
      let pesanError = 'Terjadi kendala saat memuat data dari server.';
      if (err.response?.status === 404) pesanError = 'Jalur komunikasi API tidak ditemukan.';
      tampilkanModal('error', pesanError);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const formatRupiah = (angka) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(angka);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddClick = () => {
    setFormData({ nama_kopi: '', id_kategori: '', harga_kopi: '', stok: '', stok_minimal: '' });
    setEditingId(null);
    setIsModalOpen(true);
  };

  const handleEditClick = (item) => {
    setFormData({
      nama_kopi: item.nama_kopi,
      id_kategori: item.id_kategori, 
      harga_kopi: item.harga_kopi,
      stok: item.stok,
      stok_minimal: item.stok_minimal
    });
    setEditingId(item.id_kopi);
    setIsModalOpen(true);
  };

  const handleDeleteClick = (id) => {
    setConfirmDelete({ show: true, id: id });
  };

  const executeDelete = async () => {
    try {
      await axios.delete(`/admin/produk/${confirmDelete.id}`);
      setConfirmDelete({ show: false, id: null }); 
      tampilkanModal('success', 'Data produk berhasil dihapus.');
      fetchData(); 
    } catch (error) {
      setConfirmDelete({ show: false, id: null });
      tampilkanModal('error', 'Produk ini tidak dapat dihapus karena masih terkait dengan data pesanan.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payloadData = {
      nama_kopi: formData.nama_kopi,
      id_kategori: parseInt(formData.id_kategori), 
      harga_kopi: parseFloat(formData.harga_kopi), 
      stok: parseInt(formData.stok),               
      stok_minimal: parseInt(formData.stok_minimal)
    };
    
    try {
      if (editingId) {
        await axios.put(`/admin/produk/${editingId}`, payloadData);
        tampilkanModal('success', 'Data produk berhasil diperbarui.');
      } else {
        await axios.post('/admin/produk', payloadData);
        tampilkanModal('success', 'Data produk baru berhasil ditambahkan.');
      }
      setIsModalOpen(false);
      fetchData(); 
    } catch (error) {
      console.error("Detail Error Submit:", error.response || error.message);
      const pesanServer = error.response?.data?.pesan || 'Terjadi kendala saat menyimpan data.';
      tampilkanModal('error', pesanServer);
    }
  };

  return (
    <main className="p-4 md:p-8 bg-stone-50 min-h-screen relative">
      
      {/* OVERLAY MODAL CUSTOM UNTUK KONFIRMASI HAPUS */}
      {confirmDelete.show && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-6 md:p-8 shadow-2xl max-w-sm w-full text-center">
            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full mb-4 bg-amber-100 text-amber-600">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
              </svg>
            </div>
            
            <h3 className="text-xl font-bold text-stone-800 mb-2">Konfirmasi Penghapusan</h3>
            <p className="text-stone-600 mb-6">Apakah Anda yakin ingin menghapus data produk ini? Data yang telah dihapus tidak dapat dikembalikan.</p>
            
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

      {/* OVERLAY MODAL CUSTOM UNTUK SUKSES & GAGAL */}
      {modalAlert.show && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-6 md:p-8 shadow-2xl max-w-sm w-full text-center">
            <div className={`mx-auto flex items-center justify-center h-16 w-16 rounded-full mb-4 ${modalAlert.tipe === 'success' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
              {modalAlert.tipe === 'success' ? (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
              ) : (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12"></path></svg>
              )}
            </div>
            <h3 className="text-xl font-bold text-stone-800 mb-2">
              {modalAlert.tipe === 'success' ? 'Berhasil' : 'Terjadi Kesalahan'}
            </h3>
            <p className="text-stone-600 mb-6">{modalAlert.pesan}</p>
            <button 
              onClick={() => setModalAlert({ show: false, tipe: '', pesan: '' })} 
              className="w-full py-3 rounded-xl font-bold text-white bg-amber-600 hover:bg-amber-700 transition-colors"
            >
              Tutup
            </button>
          </div>
        </div>
      )}

      {/* KONTEN HALAMAN */}
      <header className="mb-6 flex justify-between items-center bg-white p-4 rounded-xl shadow-sm border border-stone-100">
        <h1 className="text-2xl font-bold text-stone-800">Manajemen Produk</h1>
        <button onClick={handleAddClick} className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-lg transition-colors shadow-sm font-medium">
          + Tambah Produk
        </button>
      </header>

      {isLoading ? (
        <div className="flex justify-center items-center p-12">
          <p className="text-lg font-semibold text-amber-700 animate-pulse">Memuat data produk...</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-stone-100 overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-stone-100 text-stone-600 text-sm uppercase tracking-wider border-b border-stone-200">
                <th className="p-4 font-semibold w-16">No</th>
                <th className="p-4 font-semibold">Nama Produk</th>
                <th className="p-4 font-semibold w-32">Kategori</th>
                <th className="p-4 font-semibold w-32">Harga</th>
                <th className="p-4 font-semibold w-24 text-center">Stok</th>
                <th className="p-4 font-semibold text-center w-32">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {produk.map((item, index) => (
                <tr key={item.id_kopi} className="hover:bg-stone-50 transition-colors">
                  <td className="p-4 text-stone-500">{index + 1}</td>
                  <td className="p-4 font-bold text-stone-800">{item.nama_kopi}</td>
                  <td className="p-4 text-sm text-amber-600 font-medium">
                    <span className="bg-amber-50 px-2 py-1 rounded border border-amber-100 whitespace-nowrap">{item.nama_kategori}</span>
                  </td>
                  <td className="p-4 text-stone-700 font-medium whitespace-nowrap">
                    {formatRupiah(item.harga_kopi)}
                  </td>
                  <td className="p-4 text-center">
                    <span className={`font-bold ${item.stok <= item.stok_minimal ? 'text-red-500' : 'text-stone-700'}`}>
                      {item.stok}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex justify-center gap-3">
                      <button onClick={() => handleEditClick(item)} className="text-blue-600 hover:text-blue-800 font-medium">Edit</button>
                      <button onClick={() => handleDeleteClick(item.id_kopi)} className="text-red-600 hover:text-red-800 font-medium">Hapus</button>
                    </div>
                  </td>
                </tr>
              ))}
              {produk.length === 0 && (
                <tr>
                  <td colSpan="6" className="p-8 text-center text-stone-500">Belum ada data produk.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* MODAL FORM PRODUK */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-lg overflow-hidden">
            <div className="p-5 border-b border-stone-100 flex justify-between items-center bg-stone-50">
              <h2 className="text-xl font-bold text-stone-800">{editingId ? 'Ubah Data Produk' : 'Tambah Produk Baru'}</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-stone-400 hover:text-stone-600 text-2xl">&times;</button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-4">
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1">Nama Produk Kopi</label>
                <input required type="text" name="nama_kopi" value={formData.nama_kopi} onChange={handleInputChange} className="w-full border border-stone-300 rounded-lg p-2.5 focus:ring-2 focus:ring-amber-500 outline-none" />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1">Kategori</label>
                  <select required name="id_kategori" value={formData.id_kategori} onChange={handleInputChange} className="w-full border border-stone-300 rounded-lg p-2.5 focus:ring-2 focus:ring-amber-500 outline-none bg-white">
                    <option value="" disabled>Pilih kategori...</option>
                    {kategoriList.map((kat) => (
                      <option key={kat.id_kategori} value={kat.id_kategori}>
                        {kat.nama_kategori}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1">Harga (Rp)</label>
                  <input required type="number" name="harga_kopi" value={formData.harga_kopi} onChange={handleInputChange} className="w-full border border-stone-300 rounded-lg p-2.5 focus:ring-2 focus:ring-amber-500 outline-none" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1">Stok Saat Ini</label>
                  <input required type="number" name="stok" value={formData.stok} onChange={handleInputChange} className="w-full border border-stone-300 rounded-lg p-2.5 focus:ring-2 focus:ring-amber-500 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1">Stok Minimal</label>
                  <input required type="number" name="stok_minimal" value={formData.stok_minimal} onChange={handleInputChange} className="w-full border border-stone-300 rounded-lg p-2.5 focus:ring-2 focus:ring-amber-500 outline-none" />
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-4 pt-4 border-t border-stone-100">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-5 py-2 border border-stone-300 rounded-lg text-stone-600 hover:bg-stone-50 font-medium">Batal</button>
                <button type="submit" className="px-5 py-2 bg-amber-600 rounded-lg text-white hover:bg-amber-700 font-medium shadow-sm">Simpan Data</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}