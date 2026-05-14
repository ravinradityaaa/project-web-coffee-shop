import React, { useState, useEffect } from "react";
import axios from "axios";

export default function LaporanPenjualan() {
  const [laporan, setLaporan] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filterPeriode, setFilterPeriode] = useState("bulan");
  const [filterStatus, setFilterStatus] = useState("semua");
  const [selectedLaporan, setSelectedLaporan] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  useEffect(() => {
    fetchLaporan();
  }, []);

  const fetchLaporan = async () => {
    setIsLoading(true);
    try {
      const [coffeeRes, cartsRes] = await Promise.all([axios.get("https://api.sampleapis.com/coffee/hot"), axios.get("https://fakestoreapi.com/carts")]);

      const coffeeData = coffeeRes.data.slice(0, 10);
      const cartsData = cartsRes.data.slice(0, 12);

      const laporanData = cartsData.map((cart, index) => {
        const coffee = coffeeData[index % coffeeData.length];
        const statuses = ["selesai", "selesai", "selesai", "diproses", "dibatalkan"];
        const pembayaran = ["Transfer Bank", "E-Wallet", "COD", "Kartu Kredit"];

        const quantity = Math.floor(Math.random() * 10) + 1;
        const hargaSatuan = Math.floor(Math.random() * 50000) + 25000;
        const totalHarga = quantity * hargaSatuan;
        const diskon = Math.random() > 0.7 ? Math.floor(totalHarga * 0.1) : 0;
        const totalAkhir = totalHarga - diskon;

        const tanggal = new Date(Date.now() - Math.floor(Math.random() * 30) * 86400000);

        return {
          id: cart.id,
          nomorTransaksi: `TRX-${String(cart.id).padStart(5, "0")}`,
          tanggal: tanggal.toISOString().split("T")[0],
          waktu: `${String(tanggal.getHours()).padStart(2, "0")}:${String(tanggal.getMinutes()).padStart(2, "0")}`,
          produk: coffee.title,
          kategori: coffee.ingredients ? coffee.ingredients[0] : "Kopi",
          quantity: quantity,
          hargaSatuan: hargaSatuan,
          totalHarga: totalHarga,
          diskon: diskon,
          totalAkhir: totalAkhir,
          status: statuses[Math.floor(Math.random() * statuses.length)],
          pembayaran: pembayaran[Math.floor(Math.random() * 4)],
          kasir: ["Admin", "Staff 1", "Staff 2"][Math.floor(Math.random() * 3)],
        };
      });

      laporanData.sort((a, b) => new Date(b.tanggal) - new Date(a.tanggal));
      setLaporan(laporanData);
      setIsLoading(false);
    } catch (error) {
      console.error("Gagal mengambil data laporan:", error);
      setIsLoading(false);
    }
  };

  const filteredLaporan = laporan.filter((item) => {
    const matchStatus = filterStatus === "semua" || item.status === filterStatus;
    return matchStatus;
  });

  const totalTransaksi = laporan.length;
  const totalPendapatan = laporan.filter((l) => l.status === "selesai").reduce((sum, l) => sum + l.totalAkhir, 0);
  const transaksiSelesai = laporan.filter((l) => l.status === "selesai").length;
  const transaksiBatal = laporan.filter((l) => l.status === "dibatalkan").length;
  const rataRataTransaksi = transaksiSelesai > 0 ? totalPendapatan / transaksiSelesai : 0;

  const formatRupiah = (angka) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(angka);
  };

  const formatTanggal = (tanggal) => {
    const bulan = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"];
    const t = new Date(tanggal);
    return `${t.getDate()} ${bulan[t.getMonth()]} ${t.getFullYear()}`;
  };

  const openDetail = (item) => {
    setSelectedLaporan(item);
    setIsDetailModalOpen(true);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "selesai":
        return "bg-green-100 text-green-800 border-green-300";
      case "diproses":
        return "bg-blue-100 text-blue-800 border-blue-300";
      case "dibatalkan":
        return "bg-red-100 text-red-800 border-red-300";
      default:
        return "bg-gray-100 text-gray-800 border-gray-300";
    }
  };

  // Data chart 7 hari
  const chartData = () => {
    const last7Days = [];
    const hari = ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"];
    for (let i = 6; i >= 0; i--) {
      const date = new Date(Date.now() - i * 86400000);
      const dateStr = date.toISOString().split("T")[0];
      const dayTransactions = laporan.filter((l) => l.tanggal === dateStr && l.status === "selesai");
      const total = dayTransactions.reduce((sum, l) => sum + l.totalAkhir, 0);
      const count = dayTransactions.length;
      last7Days.push({
        label: hari[date.getDay()],
        tanggal: dateStr,
        total: total,
        count: count,
      });
    }
    return last7Days;
  };

  const maxChartValue = Math.max(...chartData().map((d) => d.total), 100000);

  // Export CSV
  const exportToExcel = () => {
    let csv = "No,No Transaksi,Tanggal,Waktu,Produk,Kategori,Qty,Harga Satuan,Total Harga,Diskon,Total Akhir,Status,Pembayaran,Kasir\n";
    filteredLaporan.forEach((item, index) => {
      csv += `${index + 1},${item.nomorTransaksi},${formatTanggal(item.tanggal)},${item.waktu},"${item.produk}",${item.kategori},${item.quantity},${item.hargaSatuan},${item.totalHarga},${item.diskon},${item.totalAkhir},${item.status},${
        item.pembayaran
      },${item.kasir}\n`;
    });
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `Laporan_Penjualan_CoffeeWae_${new Date().toISOString().split("T")[0]}.csv`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Cetak
  const exportToXLSX = () => {
    const printWindow = window.open("", "_blank");
    let html = `<html><head><title>Laporan Penjualan Coffee Wae</title><style>body{font-family:Arial,sans-serif;padding:20px}h2{color:#92400e;text-align:center}table{width:100%;border-collapse:collapse;margin-top:20px}th{background:#92400e;color:white;padding:10px;font-size:12px}td{padding:8px;border:1px solid #ddd;font-size:12px}tr:nth-child(even){background:#f9fafb}.total-row{font-weight:bold;background:#fef3c7}.footer{margin-top:20px;text-align:right;font-size:12px;color:#666}</style></head><body><h2>LAPORAN PENJUALAN COFFEE WAE</h2><p style="text-align:center;color:#666">Periode: ${formatTanggal(
      chartData()[6].tanggal
    )} - ${formatTanggal(chartData()[0].tanggal)}</p><table><thead><tr><th>No</th><th>No Transaksi</th><th>Tanggal</th><th>Produk</th><th>Qty</th><th>Harga</th><th>Total</th><th>Status</th><th>Pembayaran</th></tr></thead><tbody>`;
    filteredLaporan.forEach((item, index) => {
      html += `<tr><td>${index + 1}</td><td>${item.nomorTransaksi}</td><td>${formatTanggal(item.tanggal)}</td><td>${item.produk}</td><td>${item.quantity}</td><td>${formatRupiah(item.hargaSatuan)}</td><td>${formatRupiah(
        item.totalAkhir
      )}</td><td>${item.status}</td><td>${item.pembayaran}</td></tr>`;
    });
    html += `</tbody><tfoot><tr class="total-row"><td colspan="6" style="text-align:right"><strong>TOTAL PENDAPATAN</strong></td><td colspan="3"><strong>${formatRupiah(
      totalPendapatan
    )}</strong></td></tr></tfoot></table><div class="footer"><p>Dicetak pada: ${new Date().toLocaleString(
      "id-ID"
    )}</p><p>Total Transaksi: ${totalTransaksi} | Selesai: ${transaksiSelesai} | Dibatalkan: ${transaksiBatal}</p></div></body></html>`;
    printWindow.document.write(html);
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <main className="p-2 md:p-6">
      {/* Header */}
      <header className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-stone-800">Laporan Penjualan</h1>
          <p className="text-stone-500 mt-1">Ringkasan transaksi dan pendapatan Coffee Wae</p>
        </div>
        <div className="flex gap-2">
          <button onClick={fetchLaporan} className="bg-stone-600 hover:bg-stone-700 text-white px-4 py-2 rounded-lg transition-colors shadow-sm text-sm font-medium">
            Refresh
          </button>
          <button onClick={exportToExcel} className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors shadow-sm text-sm font-medium">
            Export CSV
          </button>
          <button onClick={exportToXLSX} className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-lg transition-colors shadow-sm text-sm font-medium">
            Cetak
          </button>
        </div>
      </header>

      {/* Statistik */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-xl shadow-sm border border-stone-100 hover:shadow-md transition-shadow">
          <p className="text-stone-500 text-xs font-semibold uppercase">Total Transaksi</p>
          <p className="text-2xl font-bold text-stone-800 mt-1">{totalTransaksi}</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-stone-100 hover:shadow-md transition-shadow">
          <p className="text-stone-500 text-xs font-semibold uppercase">Transaksi Selesai</p>
          <p className="text-2xl font-bold text-green-600 mt-1">{transaksiSelesai}</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-stone-100 hover:shadow-md transition-shadow">
          <p className="text-stone-500 text-xs font-semibold uppercase">Total Pendapatan</p>
          <p className="text-xl font-bold text-amber-600 mt-1">{formatRupiah(totalPendapatan)}</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-stone-100 hover:shadow-md transition-shadow">
          <p className="text-stone-500 text-xs font-semibold uppercase">Rata-rata Transaksi</p>
          <p className="text-xl font-bold text-blue-600 mt-1">{formatRupiah(rataRataTransaksi)}</p>
        </div>
      </section>

      {/* ============ BAR CHART SIMPLE ============ */}
      <div className="bg-white p-4 md:p-6 rounded-xl shadow-sm border border-stone-100 mb-6">
        <div className="mb-4">
          <h3 className="text-lg font-bold text-stone-800">Grafik Pendapatan 7 Hari Terakhir</h3>
          <p className="text-sm text-stone-500">Total pendapatan per hari (transaksi selesai)</p>
        </div>

        {/* Chart */}
        <div className="flex items-end justify-between gap-2 h-56 px-2">
          {chartData().map((day, index) => {
            const barHeight = maxChartValue > 0 ? (day.total / maxChartValue) * 100 : 0;

            return (
              <div key={index} className="flex-1 flex flex-col items-center h-full justify-end">
                {/* Nilai Rupiah */}
                <span className="text-xs font-bold text-amber-700 mb-1">{day.total > 0 ? formatRupiah(day.total) : ""}</span>

                {/* Bar */}
                <div className="w-full relative group" style={{ height: `${barHeight}%`, minHeight: "4px" }}>
                  <div className="w-full h-full bg-amber-500 rounded-t-lg hover:bg-amber-400 transition-colors cursor-pointer" title={`${formatRupiah(day.total)} - ${day.count} transaksi`}></div>

                  {/* Jumlah Transaksi di tengah bar */}
                  {day.count > 0 && barHeight > 15 && <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white text-xs font-bold">{day.count}tx</span>}
                </div>

                {/* Jumlah Transaksi di bawah */}
                <span className="text-xs text-stone-500 mt-1">{day.count}tx</span>

                {/* Hari */}
                <span className="text-xs font-semibold text-stone-700 mt-1">{day.label}</span>
                <span className="text-[10px] text-stone-400">{day.tanggal.slice(5)}</span>
              </div>
            );
          })}
        </div>

        {/* Garis Dasar */}
        <div className="border-t-2 border-stone-300 mt-2"></div>

        {/* Summary */}
        <div className="flex justify-between mt-4 pt-4 border-t border-stone-200">
          <div className="text-sm text-stone-600">
            Total: <span className="font-bold text-amber-700">{formatRupiah(totalPendapatan)}</span>
          </div>
          <div className="text-sm text-stone-600">
            Rata-rata/hari: <span className="font-bold text-amber-700">{formatRupiah(totalPendapatan / 7)}</span>
          </div>
        </div>
      </div>

      {/* Filter */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-stone-100 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="w-full md:w-48">
            <label className="block text-xs font-semibold text-stone-500 uppercase mb-2">Periode</label>
            <select value={filterPeriode} onChange={(e) => setFilterPeriode(e.target.value)} className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all">
              <option value="minggu">7 Hari Terakhir</option>
              <option value="bulan">30 Hari Terakhir</option>
              <option value="tahun">Tahun Ini</option>
            </select>
          </div>
          <div className="w-full md:w-48">
            <label className="block text-xs font-semibold text-stone-500 uppercase mb-2">Status</label>
            <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all">
              <option value="semua">Semua Status</option>
              <option value="selesai">Selesai</option>
              <option value="diproses">Diproses</option>
              <option value="dibatalkan">Dibatalkan</option>
            </select>
          </div>
        </div>
      </div>

      {/* Loading */}
      {isLoading ? (
        <div className="flex flex-col items-center justify-center p-12 bg-white rounded-xl shadow-sm border border-stone-100">
          <div className="w-12 h-12 border-4 border-stone-200 border-t-amber-600 rounded-full animate-spin mb-4"></div>
          <p className="text-stone-600 font-medium">Memuat data laporan penjualan...</p>
        </div>
      ) : (
        <>
          {/* Tabel Desktop */}
          <div className="hidden md:block bg-white rounded-xl shadow-sm border border-stone-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-stone-50 border-b border-stone-200">
                    <th className="text-left px-4 py-4 text-xs font-semibold text-stone-600 uppercase">No. Transaksi</th>
                    <th className="text-left px-4 py-4 text-xs font-semibold text-stone-600 uppercase">Tanggal</th>
                    <th className="text-left px-4 py-4 text-xs font-semibold text-stone-600 uppercase">Produk</th>
                    <th className="text-center px-4 py-4 text-xs font-semibold text-stone-600 uppercase">Qty</th>
                    <th className="text-right px-4 py-4 text-xs font-semibold text-stone-600 uppercase">Harga</th>
                    <th className="text-right px-4 py-4 text-xs font-semibold text-stone-600 uppercase">Total</th>
                    <th className="text-center px-4 py-4 text-xs font-semibold text-stone-600 uppercase">Status</th>
                    <th className="text-center px-4 py-4 text-xs font-semibold text-stone-600 uppercase">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {filteredLaporan.length > 0 ? (
                    filteredLaporan.map((item) => (
                      <tr key={item.id} className="hover:bg-stone-50 transition-colors">
                        <td className="px-4 py-4">
                          <span className="font-semibold text-amber-700 text-sm">{item.nomorTransaksi}</span>
                        </td>
                        <td className="px-4 py-4">
                          <p className="text-sm text-stone-800">{formatTanggal(item.tanggal)}</p>
                          <p className="text-xs text-stone-400">{item.waktu}</p>
                        </td>
                        <td className="px-4 py-4 text-sm text-stone-700 max-w-[200px] truncate">{item.produk}</td>
                        <td className="px-4 py-4 text-center text-sm text-stone-600">{item.quantity}x</td>
                        <td className="px-4 py-4 text-right text-sm text-stone-700">{formatRupiah(item.hargaSatuan)}</td>
                        <td className="px-4 py-4 text-right text-sm font-semibold text-stone-800">{formatRupiah(item.totalAkhir)}</td>
                        <td className="px-4 py-4 text-center">
                          <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${getStatusColor(item.status)}`}>{item.status.charAt(0).toUpperCase() + item.status.slice(1)}</span>
                        </td>
                        <td className="px-4 py-4 text-center">
                          <button onClick={() => openDetail(item)} className="text-amber-600 hover:text-amber-800 text-sm font-semibold hover:underline">
                            Detail
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="8" className="px-6 py-12 text-center">
                        <p className="text-stone-500">Tidak ada data laporan</p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Card Mobile */}
          <div className="md:hidden space-y-4">
            {filteredLaporan.length > 0 ? (
              filteredLaporan.map((item) => (
                <div key={item.id} className="bg-white p-4 rounded-xl shadow-sm border border-stone-100">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <p className="font-bold text-amber-700">{item.nomorTransaksi}</p>
                      <p className="text-sm text-stone-600">{formatTanggal(item.tanggal)}</p>
                    </div>
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${getStatusColor(item.status)}`}>{item.status.charAt(0).toUpperCase() + item.status.slice(1)}</span>
                  </div>
                  <div className="text-sm text-stone-600 space-y-1 mb-3">
                    <p>Produk: {item.produk}</p>
                    <p>
                      Jumlah: {item.quantity}x | Harga: {formatRupiah(item.hargaSatuan)}
                    </p>
                    <div className="flex justify-between pt-2 border-t border-stone-200">
                      <span>Total</span>
                      <span className="font-bold text-amber-700">{formatRupiah(item.totalAkhir)}</span>
                    </div>
                  </div>
                  <button onClick={() => openDetail(item)} className="w-full bg-amber-50 text-amber-700 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-amber-100 transition-colors">
                    Detail
                  </button>
                </div>
              ))
            ) : (
              <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-stone-100">
                <p className="text-stone-500">Tidak ada data laporan</p>
              </div>
            )}
          </div>
        </>
      )}

      {/* Modal Detail */}
      {isDetailModalOpen && selectedLaporan && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full max-h-[85vh] overflow-y-auto">
            <div className="sticky top-0 bg-white flex items-center justify-between p-6 border-b border-stone-200">
              <h2 className="text-xl font-bold text-stone-800">Detail Transaksi</h2>
              <button onClick={() => setIsDetailModalOpen(false)} className="text-stone-400 hover:text-stone-600 transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div className="text-center pb-4 border-b border-stone-200">
                <p className="text-2xl font-bold text-amber-700">{selectedLaporan.nomorTransaksi}</p>
                <span className={`text-xs font-semibold px-3 py-1 rounded-full border mt-2 inline-block ${getStatusColor(selectedLaporan.status)}`}>{selectedLaporan.status.charAt(0).toUpperCase() + selectedLaporan.status.slice(1)}</span>
              </div>
              <div className="bg-stone-50 p-4 rounded-lg space-y-2">
                <h4 className="text-sm font-semibold text-stone-800 mb-2">Informasi Transaksi</h4>
                <div className="flex justify-between text-sm">
                  <span className="text-stone-500">Tanggal</span>
                  <span className="text-stone-800">
                    {formatTanggal(selectedLaporan.tanggal)} {selectedLaporan.waktu}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-stone-500">Kasir</span>
                  <span className="text-stone-800">{selectedLaporan.kasir}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-stone-500">Pembayaran</span>
                  <span className="text-stone-800">{selectedLaporan.pembayaran}</span>
                </div>
              </div>
              <div className="bg-stone-50 p-4 rounded-lg space-y-2">
                <h4 className="text-sm font-semibold text-stone-800 mb-2">Detail Produk</h4>
                <div className="flex justify-between text-sm">
                  <span className="text-stone-500">Produk</span>
                  <span className="text-stone-800">{selectedLaporan.produk}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-stone-500">Jumlah</span>
                  <span className="text-stone-800">{selectedLaporan.quantity} cup</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-stone-500">Harga Satuan</span>
                  <span className="text-stone-800">{formatRupiah(selectedLaporan.hargaSatuan)}</span>
                </div>
              </div>
              <div className="bg-amber-50 p-4 rounded-lg border border-amber-200 space-y-2">
                <h4 className="text-sm font-semibold text-amber-800 mb-2">Ringkasan Pembayaran</h4>
                <div className="flex justify-between text-sm">
                  <span className="text-amber-700">Subtotal</span>
                  <span className="text-amber-800">{formatRupiah(selectedLaporan.totalHarga)}</span>
                </div>
                {selectedLaporan.diskon > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-green-700">Diskon</span>
                    <span className="text-green-800">-{formatRupiah(selectedLaporan.diskon)}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm pt-2 border-t border-amber-300">
                  <span className="font-semibold text-amber-800">Total Akhir</span>
                  <span className="font-bold text-amber-800 text-lg">{formatRupiah(selectedLaporan.totalAkhir)}</span>
                </div>
              </div>
            </div>
            <div className="sticky bottom-0 bg-white flex justify-end p-6 border-t border-stone-200">
              <button onClick={() => setIsDetailModalOpen(false)} className="px-6 py-2 bg-stone-200 hover:bg-stone-300 text-stone-700 rounded-lg font-medium transition-colors">
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
