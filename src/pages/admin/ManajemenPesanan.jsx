import React, { useState, useEffect } from "react";
import axios from "axios";

export default function ManajemenPesanan() {
  // Poin 3: useState untuk state management
  const [pesanan, setPesanan] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState("semua");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Poin 3: useEffect untuk fetch data
  useEffect(() => {
    fetchPesanan();
  }, []);

  // Poin 4: Ambil data dari API yang sama (Coffee API)
  const fetchPesanan = async () => {
    setIsLoading(true);
    try {
      // Ambil data kopi untuk dijadikan item pesanan
      const coffeeRes = await axios.get("https://api.sampleapis.com/coffee/hot");
      const coffeeData = coffeeRes.data.slice(0, 10);

      // Generate data pesanan berdasarkan data kopi
      const pesananData = coffeeData.map((coffee, index) => {
        const customers = ["Budi Santoso", "Ani Wijaya", "Citra Dewi", "Dedi Kusuma", "Eka Putri", "Fani Rachman", "Gilang Prakoso", "Hana Safira", "Irfan Hakim", "Joko Widodo"];

        const statusList = ["menunggu", "diproses", "dikirim", "selesai", "dibatalkan"];
        const paymentMethods = ["Transfer Bank", "E-Wallet", "COD", "Kartu Kredit"];

        // Generate random quantity dan total harga
        const quantity = Math.floor(Math.random() * 5) + 1;
        const pricePerItem = Math.floor(Math.random() * 50000) + 25000;
        const totalHarga = quantity * pricePerItem;

        return {
          id: index + 1,
          nomorPesanan: `CW-${String(index + 1).padStart(4, "0")}`,
          pelanggan: customers[index],
          tanggal: new Date(Date.now() - Math.floor(Math.random() * 14) * 86400000).toISOString().split("T")[0],
          produk: [
            {
              id: coffee.id,
              nama: coffee.title,
              gambar: coffee.image,
              jumlah: quantity,
              harga: pricePerItem,
              catatan: ["Tidak ada", "Extra shot", "Less sugar", "No ice", "Double espresso"][Math.floor(Math.random() * 5)],
            },
          ],
          totalItem: quantity,
          totalHarga: totalHarga,
          status: statusList[Math.floor(Math.random() * statusList.length)],
          alamat: `Jl. Kopi No. ${Math.floor(Math.random() * 50) + 1}, Jakarta`,
          pembayaran: paymentMethods[Math.floor(Math.random() * 4)],
          catatan: ["Tolong cepat", "Packing rapi", "Tanpa plastik", "", "Gelas terpisah"][Math.floor(Math.random() * 5)],
        };
      });

      setPesanan(pesananData);
      setIsLoading(false);
    } catch (error) {
      console.error("Gagal mengambil data pesanan:", error);
      setIsLoading(false);
    }
  };

  // Filter pesanan berdasarkan status
  const filteredPesanan = filterStatus === "semua" ? pesanan : pesanan.filter((order) => order.status === filterStatus);

  // Hitung statistik
  const totalPesanan = pesanan.length;
  const pesananBaru = pesanan.filter((o) => o.status === "menunggu").length;
  const pesananDiproses = pesanan.filter((o) => o.status === "diproses" || o.status === "dikirim").length;
  const pesananSelesai = pesanan.filter((o) => o.status === "selesai").length;
  const totalPendapatan = pesanan.filter((o) => o.status === "selesai").reduce((sum, o) => sum + o.totalHarga, 0);

  // Buka detail modal
  const openDetail = (order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  // Update status pesanan
  const updateStatus = (orderId, newStatus) => {
    setPesanan(pesanan.map((order) => (order.id === orderId ? { ...order, status: newStatus } : order)));
  };

  // Format rupiah
  const formatRupiah = (angka) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(angka);
  };

  // Status color mapping
  const getStatusColor = (status) => {
    switch (status) {
      case "menunggu":
        return "bg-yellow-100 text-yellow-800 border-yellow-300";
      case "diproses":
        return "bg-blue-100 text-blue-800 border-blue-300";
      case "dikirim":
        return "bg-purple-100 text-purple-800 border-purple-300";
      case "selesai":
        return "bg-green-100 text-green-800 border-green-300";
      case "dibatalkan":
        return "bg-red-100 text-red-800 border-red-300";
      default:
        return "bg-gray-100 text-gray-800 border-gray-300";
    }
  };

  return (
    <main className="p-2 md:p-6">
      {/* Header */}
      <header className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-stone-800">Manajemen Pesanan</h1>
          <p className="text-stone-500 mt-1">Kelola semua pesanan kopi dari pelanggan</p>
        </div>
        <button onClick={fetchPesanan} className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-lg transition-colors shadow-sm text-sm font-medium">
          Refresh Data
        </button>
      </header>

      {/* Poin 2: Grid untuk statistik */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-xl shadow-sm border border-stone-100 hover:shadow-md transition-shadow">
          <p className="text-stone-500 text-xs font-semibold uppercase">Total Pesanan</p>
          <p className="text-2xl font-bold text-stone-800 mt-1">{totalPesanan}</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-stone-100 hover:shadow-md transition-shadow">
          <p className="text-stone-500 text-xs font-semibold uppercase">Pesanan Baru</p>
          <p className="text-2xl font-bold text-amber-600 mt-1">{pesananBaru}</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-stone-100 hover:shadow-md transition-shadow">
          <p className="text-stone-500 text-xs font-semibold uppercase">Diproses</p>
          <p className="text-2xl font-bold text-blue-600 mt-1">{pesananDiproses}</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-stone-100 hover:shadow-md transition-shadow">
          <p className="text-stone-500 text-xs font-semibold uppercase">Pendapatan</p>
          <p className="text-xl font-bold text-green-600 mt-1">{formatRupiah(totalPendapatan)}</p>
        </div>
      </section>

      {/* Filter Status */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-stone-100 mb-6">
        <p className="text-xs font-semibold text-stone-500 uppercase mb-3">Filter Status Pesanan</p>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setFilterStatus("semua")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${filterStatus === "semua" ? "bg-stone-800 text-white shadow-md" : "bg-stone-100 text-stone-600 hover:bg-stone-200"}`}
          >
            Semua ({totalPesanan})
          </button>
          <button
            onClick={() => setFilterStatus("menunggu")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${filterStatus === "menunggu" ? "bg-yellow-600 text-white shadow-md" : "bg-yellow-50 text-yellow-700 hover:bg-yellow-100"}`}
          >
            Menunggu ({pesanan.filter((o) => o.status === "menunggu").length})
          </button>
          <button
            onClick={() => setFilterStatus("diproses")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${filterStatus === "diproses" ? "bg-blue-600 text-white shadow-md" : "bg-blue-50 text-blue-700 hover:bg-blue-100"}`}
          >
            Diproses ({pesanan.filter((o) => o.status === "diproses").length})
          </button>
          <button
            onClick={() => setFilterStatus("dikirim")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${filterStatus === "dikirim" ? "bg-purple-600 text-white shadow-md" : "bg-purple-50 text-purple-700 hover:bg-purple-100"}`}
          >
            Dikirim ({pesanan.filter((o) => o.status === "dikirim").length})
          </button>
          <button
            onClick={() => setFilterStatus("selesai")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${filterStatus === "selesai" ? "bg-green-600 text-white shadow-md" : "bg-green-50 text-green-700 hover:bg-green-100"}`}
          >
            Selesai ({pesanan.filter((o) => o.status === "selesai").length})
          </button>
          <button
            onClick={() => setFilterStatus("dibatalkan")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${filterStatus === "dibatalkan" ? "bg-red-600 text-white shadow-md" : "bg-red-50 text-red-700 hover:bg-red-100"}`}
          >
            Dibatalkan ({pesanan.filter((o) => o.status === "dibatalkan").length})
          </button>
        </div>
      </div>

      {/* Poin 3: Conditional Rendering & Poin 4: Loading Indicator */}
      {isLoading ? (
        <div className="flex flex-col items-center justify-center p-12 bg-white rounded-xl shadow-sm border border-stone-100">
          <div className="w-12 h-12 border-4 border-stone-200 border-t-amber-600 rounded-full animate-spin mb-4"></div>
          <p className="text-stone-600 font-medium">Memuat data pesanan kopi...</p>
          <p className="text-stone-400 text-sm mt-1">Mohon tunggu sebentar</p>
        </div>
      ) : (
        <>
          {/* Tabel Pesanan - Desktop */}
          <div className="hidden md:block bg-white rounded-xl shadow-sm border border-stone-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-stone-50 border-b border-stone-200">
                    <th className="text-left px-4 py-4 text-xs font-semibold text-stone-600 uppercase">No. Pesanan</th>
                    <th className="text-left px-4 py-4 text-xs font-semibold text-stone-600 uppercase">Pelanggan</th>
                    <th className="text-left px-4 py-4 text-xs font-semibold text-stone-600 uppercase">Produk</th>
                    <th className="text-center px-4 py-4 text-xs font-semibold text-stone-600 uppercase">Jumlah</th>
                    <th className="text-right px-4 py-4 text-xs font-semibold text-stone-600 uppercase">Total</th>
                    <th className="text-left px-4 py-4 text-xs font-semibold text-stone-600 uppercase">Pembayaran</th>
                    <th className="text-center px-4 py-4 text-xs font-semibold text-stone-600 uppercase">Status</th>
                    <th className="text-center px-4 py-4 text-xs font-semibold text-stone-600 uppercase">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {filteredPesanan.length > 0 ? (
                    filteredPesanan.map((order) => (
                      <tr key={order.id} className="hover:bg-stone-50 transition-colors">
                        <td className="px-4 py-4">
                          <span className="font-semibold text-amber-700 text-sm">{order.nomorPesanan}</span>
                          <p className="text-xs text-stone-400">{order.tanggal}</p>
                        </td>
                        <td className="px-4 py-4">
                          <p className="font-medium text-stone-800 text-sm">{order.pelanggan}</p>
                          <p className="text-xs text-stone-400 truncate max-w-[150px]">{order.alamat}</p>
                        </td>
                        <td className="px-4 py-4">
                          <div className="flex items-center gap-2">
                            <img src={order.produk[0].gambar} alt={order.produk[0].nama} className="w-10 h-10 rounded-lg object-cover" />
                            <span className="text-sm text-stone-700">{order.produk[0].nama}</span>
                          </div>
                        </td>
                        <td className="px-4 py-4 text-center text-sm text-stone-600">{order.totalItem} cup</td>
                        <td className="px-4 py-4 text-right text-sm font-semibold text-stone-800">{formatRupiah(order.totalHarga)}</td>
                        <td className="px-4 py-4 text-sm text-stone-600">{order.pembayaran}</td>
                        <td className="px-4 py-4 text-center">
                          <select value={order.status} onChange={(e) => updateStatus(order.id, e.target.value)} className={`text-xs font-semibold px-3 py-1.5 rounded-full border cursor-pointer ${getStatusColor(order.status)}`}>
                            <option value="menunggu">Menunggu</option>
                            <option value="diproses">Diproses</option>
                            <option value="dikirim">Dikirim</option>
                            <option value="selesai">Selesai</option>
                            <option value="dibatalkan">Dibatalkan</option>
                          </select>
                        </td>
                        <td className="px-4 py-4 text-center">
                          <button onClick={() => openDetail(order)} className="text-amber-600 hover:text-amber-800 text-sm font-semibold hover:underline">
                            Detail
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="8" className="px-6 py-12 text-center">
                        <p className="text-stone-500">Tidak ada pesanan dengan status "{filterStatus}"</p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Card Pesanan - Mobile */}
          <div className="md:hidden space-y-4">
            {filteredPesanan.length > 0 ? (
              filteredPesanan.map((order) => (
                <div key={order.id} className="bg-white p-4 rounded-xl shadow-sm border border-stone-100">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <p className="font-bold text-amber-700">{order.nomorPesanan}</p>
                      <p className="text-sm text-stone-600">{order.pelanggan}</p>
                      <p className="text-xs text-stone-400">{order.tanggal}</p>
                    </div>
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${getStatusColor(order.status)}`}>{order.status.charAt(0).toUpperCase() + order.status.slice(1)}</span>
                  </div>

                  <div className="flex items-center gap-3 mb-3 p-3 bg-stone-50 rounded-lg">
                    <img src={order.produk[0].gambar} alt={order.produk[0].nama} className="w-12 h-12 rounded-lg object-cover" />
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-stone-800">{order.produk[0].nama}</p>
                      <p className="text-xs text-stone-500">
                        {order.totalItem} cup x {formatRupiah(order.produk[0].harga)}
                      </p>
                    </div>
                  </div>

                  <div className="text-sm text-stone-600 space-y-1 mb-3">
                    <div className="flex justify-between">
                      <span>Pembayaran</span>
                      <span className="font-medium">{order.pembayaran}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Total</span>
                      <span className="font-bold text-amber-700">{formatRupiah(order.totalHarga)}</span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button onClick={() => openDetail(order)} className="flex-1 bg-amber-50 text-amber-700 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-amber-100 transition-colors">
                      Detail
                    </button>
                    <select value={order.status} onChange={(e) => updateStatus(order.id, e.target.value)} className={`flex-1 text-xs font-semibold px-3 py-2 rounded-lg border cursor-pointer text-center ${getStatusColor(order.status)}`}>
                      <option value="menunggu">Menunggu</option>
                      <option value="diproses">Diproses</option>
                      <option value="dikirim">Dikirim</option>
                      <option value="selesai">Selesai</option>
                      <option value="dibatalkan">Dibatalkan</option>
                    </select>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-stone-100">
                <p className="text-stone-500">Tidak ada pesanan dengan status "{filterStatus}"</p>
              </div>
            )}
          </div>
        </>
      )}

      {/* Modal Detail Pesanan */}
      {isModalOpen && selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full max-h-[85vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white flex items-center justify-between p-6 border-b border-stone-200">
              <div>
                <h2 className="text-xl font-bold text-stone-800">Detail Pesanan</h2>
                <p className="text-sm text-amber-700 font-semibold">{selectedOrder.nomorPesanan}</p>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="text-stone-400 hover:text-stone-600 transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-4">
              {/* Status */}
              <div className="flex justify-between items-center">
                <span className="text-stone-500 text-sm">Status Pesanan</span>
                <span className={`text-xs font-semibold px-3 py-1.5 rounded-full border ${getStatusColor(selectedOrder.status)}`}>{selectedOrder.status.charAt(0).toUpperCase() + selectedOrder.status.slice(1)}</span>
              </div>

              {/* Info Pelanggan */}
              <div className="bg-stone-50 p-4 rounded-lg space-y-2">
                <h3 className="font-semibold text-stone-800 text-sm">Informasi Pelanggan</h3>
                <div className="flex justify-between text-sm">
                  <span className="text-stone-500">Nama</span>
                  <span className="font-medium text-stone-800">{selectedOrder.pelanggan}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-stone-500">Alamat</span>
                  <span className="font-medium text-stone-800 text-right max-w-[200px]">{selectedOrder.alamat}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-stone-500">Tanggal</span>
                  <span className="font-medium text-stone-800">{selectedOrder.tanggal}</span>
                </div>
              </div>

              {/* Detail Produk */}
              <div className="bg-stone-50 p-4 rounded-lg space-y-3">
                <h3 className="font-semibold text-stone-800 text-sm">Produk Dipesan</h3>
                {selectedOrder.produk.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <img src={item.gambar} alt={item.nama} className="w-14 h-14 rounded-lg object-cover" />
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-stone-800">{item.nama}</p>
                      <p className="text-xs text-stone-500">
                        {item.jumlah} x {formatRupiah(item.harga)}
                      </p>
                      {item.catatan && item.catatan !== "Tidak ada" && <p className="text-xs text-amber-600 mt-1">Catatan: {item.catatan}</p>}
                    </div>
                    <p className="text-sm font-bold text-stone-800">{formatRupiah(item.jumlah * item.harga)}</p>
                  </div>
                ))}
              </div>

              {/* Ringkasan Pembayaran */}
              <div className="bg-stone-50 p-4 rounded-lg space-y-2">
                <h3 className="font-semibold text-stone-800 text-sm">Ringkasan Pembayaran</h3>
                <div className="flex justify-between text-sm">
                  <span className="text-stone-500">Metode Pembayaran</span>
                  <span className="font-medium text-stone-800">{selectedOrder.pembayaran}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-stone-500">Total Item</span>
                  <span className="font-medium text-stone-800">{selectedOrder.totalItem} cup</span>
                </div>
                <div className="flex justify-between text-sm pt-2 border-t border-stone-200">
                  <span className="font-semibold text-stone-800">Total Pembayaran</span>
                  <span className="font-bold text-amber-700 text-lg">{formatRupiah(selectedOrder.totalHarga)}</span>
                </div>
              </div>

              {/* Catatan */}
              {selectedOrder.catatan && (
                <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
                  <p className="text-sm font-semibold text-yellow-800">Catatan Pelanggan:</p>
                  <p className="text-sm text-yellow-700 mt-1">{selectedOrder.catatan}</p>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="sticky bottom-0 bg-white flex justify-end gap-3 p-6 border-t border-stone-200">
              <button onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-stone-600 hover:text-stone-800 font-medium transition-colors">
                Tutup
              </button>
              {selectedOrder.status === "menunggu" && (
                <button
                  onClick={() => {
                    updateStatus(selectedOrder.id, "diproses");
                    setIsModalOpen(false);
                  }}
                  className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-lg transition-colors font-medium"
                >
                  Proses Pesanan
                </button>
              )}
              {selectedOrder.status === "diproses" && (
                <button
                  onClick={() => {
                    updateStatus(selectedOrder.id, "dikirim");
                    setIsModalOpen(false);
                  }}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors font-medium"
                >
                  Kirim Pesanan
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
