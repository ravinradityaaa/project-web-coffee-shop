import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function ManajemenProduk() {
  const [produk, setProduk] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  
  const [formData, setFormData] = useState({
    title: '',
    category: '', 
    description: '',
    price: '',
    image: ''
  });

  useEffect(() => {
    axios.get('https://api.sampleapis.com/coffee/hot')
      .then((res) => {
        const dataDenganHarga = res.data.slice(0, 10).map(item => ({
          ...item,
          // Harga dinaikkan sedikit karena biji kopi biasanya lebih mahal dari per cup
          price: Math.floor(Math.random() * 50000) + 75000, 
          // Default kategori disesuaikan ke biji kopi
          category: 'House Blend' 
        }));
        setProduk(dataDenganHarga);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Gagal mengambil data:", err);
        setIsLoading(false);
      });
  }, []);

  const formatRupiah = (angka) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(angka);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddClick = () => {
    setFormData({ title: '', category: '', description: '', price: '', image: '' });
    setEditingId(null);
    setIsModalOpen(true);
  };

  const handleEditClick = (item) => {
    setFormData({
      title: item.title,
      category: item.category || '', 
      description: item.description,
      price: item.price,
      image: item.image
    });
    setEditingId(item.id);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    const konfirmasi = window.confirm("Yakin ingin menghapus produk ini?");
    if (konfirmasi) {
      const produkBaru = produk.filter(item => item.id !== id);
      setProduk(produkBaru);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (editingId) {
      const updatedProduk = produk.map(item => 
        item.id === editingId ? { ...item, ...formData, price: Number(formData.price) } : item
      );
      setProduk(updatedProduk);
    } else {
      const produkBaru = {
        ...formData,
        id: Date.now(),
        price: Number(formData.price),
        image: formData.image || 'https://images.unsplash.com/photo-1559525839-b184a4d698c7?w=500&q=80' // Gambar default diganti tema biji kopi
      };
      setProduk([produkBaru, ...produk]);
    }
    
    setIsModalOpen(false);
  };

  return (
    <main className="p-4 md:p-8 bg-stone-50 min-h-screen">
      <header className="mb-6 flex justify-between items-center bg-white p-4 rounded-xl shadow-sm border border-stone-100">
        <h1 className="text-2xl font-bold text-stone-800">Manajemen Produk</h1>
        <button 
          onClick={handleAddClick}
          className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-lg transition-colors shadow-sm font-medium"
        >
          + Tambah Produk
        </button>
      </header>

      {isLoading ? (
        <div className="flex justify-center items-center p-12">
          <p className="text-lg font-semibold text-amber-700 animate-pulse">Memuat data kopi...</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-stone-100 overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-stone-100 text-stone-600 text-sm uppercase tracking-wider border-b border-stone-200">
                <th className="p-4 font-semibold w-16">No</th>
                <th className="p-4 font-semibold w-24">Gambar</th>
                <th className="p-4 font-semibold w-1/5">Nama Produk</th>
                <th className="p-4 font-semibold w-32">Kategori</th>
                <th className="p-4 font-semibold">Deskripsi</th>
                <th className="p-4 font-semibold w-32">Harga</th>
                <th className="p-4 font-semibold text-center w-32">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {produk.map((item, index) => (
                <tr key={item.id} className="hover:bg-stone-50 transition-colors">
                  <td className="p-4 text-stone-500">{index + 1}</td>
                  <td className="p-4">
                    <img src={item.image} alt={item.title} className="w-12 h-12 rounded object-cover shadow-sm bg-stone-200" />
                  </td>
                  <td className="p-4 font-bold text-stone-800">{item.title}</td>
                  <td className="p-4 text-sm text-amber-600 font-medium">
                    <span className="bg-amber-50 px-2 py-1 rounded border border-amber-100 whitespace-nowrap">{item.category}</span>
                  </td>
                  <td className="p-4 text-sm text-stone-600 line-clamp-2" title={item.description}>
                    {item.description}
                  </td>
                  <td className="p-4 text-stone-700 font-medium whitespace-nowrap">
                    {formatRupiah(item.price)}
                  </td>
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
              ))}
              {produk.length === 0 && (
                <tr>
                  <td colSpan="7" className="p-8 text-center text-stone-500">Belum ada produk.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* MODAL FORM */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-3xl overflow-hidden">
            <div className="p-5 border-b border-stone-100 flex justify-between items-center">
              <h2 className="text-xl font-bold text-stone-800">
                {editingId ? 'Edit Produk' : 'Tambah Produk Baru'}
              </h2>
              <button onClick={() => setIsModalOpen(false)} className="text-stone-400 hover:text-stone-600 text-2xl">&times;</button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6">
              <div className="flex flex-col md:flex-row gap-6">
                
                {/* KOLOM KIRI: Area Gambar */}
                <div className="w-full md:w-1/3 flex flex-col gap-3">
                  <label className="block text-sm font-medium text-stone-700">Preview Gambar</label>
                  
                  <div className="aspect-square bg-stone-50 border-2 border-dashed border-stone-300 rounded-xl flex items-center justify-center overflow-hidden">
                    {formData.image ? (
                      <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
                    ) : (
                      <div className="text-center p-4">
                        {/* Menggunakan Ikon SVG Flat di sini */}
                        <svg className="w-12 h-12 mx-auto mb-2 text-stone-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span className="text-stone-400 text-sm">Gambar akan muncul di sini</span>
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs text-stone-500 mb-1">URL Gambar (Opsional)</label>
                    <input type="url" name="image" value={formData.image} onChange={handleInputChange} placeholder="https://..."
                      className="w-full border border-stone-300 rounded-lg p-2 focus:ring-2 focus:ring-amber-500 focus:outline-none text-sm" />
                  </div>
                </div>

                {/* KOLOM KANAN: Form Input */}
                <div className="w-full md:w-2/3 flex flex-col gap-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-stone-700 mb-1">Nama Kopi / Blend</label>
                      <input required type="text" name="title" value={formData.title} onChange={handleInputChange}
                        className="w-full border border-stone-300 rounded-lg p-2 focus:ring-2 focus:ring-amber-500 focus:outline-none" />
                    </div>
                    
                    {/* Input Kategori Diperbarui */}
                    <div>
                      <label className="block text-sm font-medium text-stone-700 mb-1">Kategori Beans</label>
                      <select required name="category" value={formData.category} onChange={handleInputChange}
                        className="w-full border border-stone-300 rounded-lg p-2 focus:ring-2 focus:ring-amber-500 focus:outline-none bg-white">
                        <option value="" disabled>Pilih kategori...</option>
                        <option value="Single Origin - Arabica">Single Origin - Arabica</option>
                        <option value="Single Origin - Robusta">Single Origin - Robusta</option>
                        <option value="House Blend">House Blend</option>
                        <option value="Espresso Roast">Espresso Roast</option>
                        <option value="Decaf">Decaf</option>
                        <option value="Green Beans">Green Beans</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-1">Harga (Rp)</label>
                    <input required type="number" name="price" value={formData.price} onChange={handleInputChange}
                      className="w-full border border-stone-300 rounded-lg p-2 focus:ring-2 focus:ring-amber-500 focus:outline-none" />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-1">Deskripsi & Tasting Notes</label>
                    <textarea required name="description" value={formData.description} onChange={handleInputChange} rows="4" placeholder="Contoh: Biji kopi dengan notes coklat, caramel, dan sedikit fruity..."
                      className="w-full border border-stone-300 rounded-lg p-2 focus:ring-2 focus:ring-amber-500 focus:outline-none"></textarea>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-stone-100">
                <button type="button" onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2 border border-stone-300 rounded-lg text-stone-600 hover:bg-stone-50 font-medium">
                  Batal
                </button>
                <button type="submit"
                  className="px-5 py-2 bg-amber-600 rounded-lg text-white hover:bg-amber-700 font-medium shadow-sm">
                  Simpan Produk
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}