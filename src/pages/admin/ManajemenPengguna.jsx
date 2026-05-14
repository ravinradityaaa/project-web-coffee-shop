import React, { useState, useEffect } from "react";
import axios from "axios";

export default function ManajemenPengguna() {
  const [pengguna, setPengguna] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState("semua");
  const [filterStatus, setFilterStatus] = useState("semua");
  const [selectedUser, setSelectedUser] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [formEdit, setFormEdit] = useState({
    nama: "",
    email: "",
    telepon: "",
    role: "",
    status: "",
  });
  const [formAdd, setFormAdd] = useState({
    nama: "",
    email: "",
    telepon: "",
    role: "pelanggan",
    status: "aktif",
  });

  useEffect(() => {
    fetchPengguna();
  }, []);

  const fetchPengguna = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get("https://jsonplaceholder.typicode.com/users");

      const roles = ["admin", "staff", "pelanggan", "pelanggan", "pelanggan", "pelanggan", "pelanggan", "pelanggan", "staff", "pelanggan"];
      const statuses = ["aktif", "aktif", "aktif", "aktif", "aktif", "aktif", "aktif", "nonaktif", "aktif", "aktif"];

      const enhancedUsers = response.data.slice(0, 10).map((user, index) => {
        return {
          id: user.id,
          nama: user.name || "Tanpa Nama",
          username: user.username || "unknown",
          email: user.email || "no-email@test.com",
          telepon: user.phone || "-",
          role: roles[index] || "pelanggan",
          status: statuses[index] || "aktif",
          alamat: user.address ? `${user.address.street}, ${user.address.city}` : "Alamat tidak tersedia",
          bergabung: new Date(Date.now() - Math.floor(Math.random() * 365) * 86400000).toISOString().split("T")[0],
          totalPesanan: Math.floor(Math.random() * 50) + 1,
          totalBelanja: Math.floor(Math.random() * 5000000) + 100000,
        };
      });

      setPengguna(enhancedUsers);
      setIsLoading(false);
    } catch (error) {
      console.error("Gagal mengambil data pengguna:", error);
      setIsLoading(false);
    }
  };

  // Filter pengguna
  const filteredPengguna = pengguna.filter((user) => {
    const matchSearch = (user.nama || "").toLowerCase().includes(searchTerm.toLowerCase()) || (user.email || "").toLowerCase().includes(searchTerm.toLowerCase()) || (user.username || "").toLowerCase().includes(searchTerm.toLowerCase());
    const matchRole = filterRole === "semua" || user.role === filterRole;
    const matchStatus = filterStatus === "semua" || user.status === filterStatus;
    return matchSearch && matchRole && matchStatus;
  });

  // Hitung statistik
  const totalPengguna = pengguna.length;
  const pelangganAktif = pengguna.filter((u) => u.role === "pelanggan" && u.status === "aktif").length;
  const totalStaff = pengguna.filter((u) => u.role === "staff" || u.role === "admin").length;
  const penggunaNonaktif = pengguna.filter((u) => u.status === "nonaktif").length;

  // Format rupiah
  const formatRupiah = (angka) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(angka);
  };

  // Buka modal tambah
  const openAdd = () => {
    setFormAdd({
      nama: "",
      email: "",
      telepon: "",
      role: "pelanggan",
      status: "aktif",
    });
    setIsAddModalOpen(true);
  };

  // Handle input tambah
  const handleAddChange = (e) => {
    const { name, value } = e.target;
    setFormAdd({
      ...formAdd,
      [name]: value,
    });
  };

  // Simpan tambah
  const saveAdd = (e) => {
    e.preventDefault();
    const newUser = {
      id: pengguna.length + 1,
      nama: formAdd.nama,
      username: formAdd.nama.toLowerCase().replace(/\s/g, ""),
      email: formAdd.email,
      telepon: formAdd.telepon,
      role: formAdd.role,
      status: formAdd.status,
      alamat: "-",
      bergabung: new Date().toISOString().split("T")[0],
      totalPesanan: 0,
      totalBelanja: 0,
    };
    setPengguna([newUser, ...pengguna]);
    setIsAddModalOpen(false);
  };

  // Buka detail modal
  const openDetail = (user) => {
    setSelectedUser(user);
    setIsDetailModalOpen(true);
  };

  // Buka edit modal
  const openEdit = (user) => {
    setFormEdit({
      nama: user.nama || "",
      email: user.email || "",
      telepon: user.telepon || "",
      role: user.role || "pelanggan",
      status: user.status || "aktif",
    });
    setSelectedUser(user);
    setIsEditModalOpen(true);
  };

  // Handle input edit
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setFormEdit({
      ...formEdit,
      [name]: value,
    });
  };

  // Simpan edit
  const saveEdit = (e) => {
    e.preventDefault();
    setPengguna(pengguna.map((user) => (user.id === selectedUser.id ? { ...user, ...formEdit } : user)));
    setIsEditModalOpen(false);
  };

  // Toggle status
  const toggleStatus = (userId) => {
    setPengguna(pengguna.map((user) => (user.id === userId ? { ...user, status: user.status === "aktif" ? "nonaktif" : "aktif" } : user)));
  };

  // Hapus pengguna
  const hapusPengguna = (userId) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus pengguna ini?")) {
      setPengguna(pengguna.filter((user) => user.id !== userId));
    }
  };

  // Role color
  const getRoleColor = (role) => {
    switch (role) {
      case "admin":
        return "bg-purple-100 text-purple-800 border-purple-300";
      case "staff":
        return "bg-blue-100 text-blue-800 border-blue-300";
      case "pelanggan":
        return "bg-amber-100 text-amber-800 border-amber-300";
      default:
        return "bg-gray-100 text-gray-800 border-gray-300";
    }
  };

  // Status color
  const getStatusColor = (status) => {
    switch (status) {
      case "aktif":
        return "bg-green-100 text-green-800 border-green-300";
      case "nonaktif":
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
          <h1 className="text-2xl md:text-3xl font-bold text-stone-800">Manajemen Pengguna</h1>
          <p className="text-stone-500 mt-1">Kelola semua pengguna aplikasi Coffee Wae</p>
        </div>
        <div className="flex gap-2">
          <button onClick={openAdd} className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-lg transition-colors shadow-sm text-sm font-medium">
            + Tambah Pengguna
          </button>
          <button onClick={fetchPengguna} className="bg-stone-600 hover:bg-stone-700 text-white px-4 py-2 rounded-lg transition-colors shadow-sm text-sm font-medium">
            Refresh Data
          </button>
        </div>
      </header>

      {/* Statistik */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-xl shadow-sm border border-stone-100 hover:shadow-md transition-shadow">
          <p className="text-stone-500 text-xs font-semibold uppercase">Total Pengguna</p>
          <p className="text-2xl font-bold text-stone-800 mt-1">{totalPengguna}</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-stone-100 hover:shadow-md transition-shadow">
          <p className="text-stone-500 text-xs font-semibold uppercase">Pelanggan Aktif</p>
          <p className="text-2xl font-bold text-green-600 mt-1">{pelangganAktif}</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-stone-100 hover:shadow-md transition-shadow">
          <p className="text-stone-500 text-xs font-semibold uppercase">Staff/Admin</p>
          <p className="text-2xl font-bold text-blue-600 mt-1">{totalStaff}</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-stone-100 hover:shadow-md transition-shadow">
          <p className="text-stone-500 text-xs font-semibold uppercase">Nonaktif</p>
          <p className="text-2xl font-bold text-red-600 mt-1">{penggunaNonaktif}</p>
        </div>
      </section>

      {/* Search & Filter */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-stone-100 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <label className="block text-xs font-semibold text-stone-500 uppercase mb-2">Cari Pengguna</label>
            <input
              type="text"
              placeholder="Cari nama, email, atau username..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all"
            />
          </div>
          <div className="w-full md:w-48">
            <label className="block text-xs font-semibold text-stone-500 uppercase mb-2">Role</label>
            <select
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value)}
              className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all"
            >
              <option value="semua">Semua Role</option>
              <option value="admin">Admin</option>
              <option value="staff">Staff</option>
              <option value="pelanggan">Pelanggan</option>
            </select>
          </div>
          <div className="w-full md:w-48">
            <label className="block text-xs font-semibold text-stone-500 uppercase mb-2">Status</label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all"
            >
              <option value="semua">Semua Status</option>
              <option value="aktif">Aktif</option>
              <option value="nonaktif">Nonaktif</option>
            </select>
          </div>
        </div>
      </div>

      {/* Loading */}
      {isLoading ? (
        <div className="flex flex-col items-center justify-center p-12 bg-white rounded-xl shadow-sm border border-stone-100">
          <div className="w-12 h-12 border-4 border-stone-200 border-t-amber-600 rounded-full animate-spin mb-4"></div>
          <p className="text-stone-600 font-medium">Memuat data pengguna...</p>
          <p className="text-stone-400 text-sm mt-1">Mohon tunggu sebentar</p>
        </div>
      ) : (
        <>
          {/* Tabel Desktop */}
          <div className="hidden md:block bg-white rounded-xl shadow-sm border border-stone-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-stone-50 border-b border-stone-200">
                    <th className="text-left px-4 py-4 text-xs font-semibold text-stone-600 uppercase">Pengguna</th>
                    <th className="text-left px-4 py-4 text-xs font-semibold text-stone-600 uppercase">Kontak</th>
                    <th className="text-center px-4 py-4 text-xs font-semibold text-stone-600 uppercase">Role</th>
                    <th className="text-center px-4 py-4 text-xs font-semibold text-stone-600 uppercase">Status</th>
                    <th className="text-center px-4 py-4 text-xs font-semibold text-stone-600 uppercase">Bergabung</th>
                    <th className="text-center px-4 py-4 text-xs font-semibold text-stone-600 uppercase">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {filteredPengguna.length > 0 ? (
                    filteredPengguna.map((user) => (
                      <tr key={user.id} className="hover:bg-stone-50 transition-colors">
                        <td className="px-4 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-amber-200 flex items-center justify-center font-bold text-amber-800 text-sm">{(user.nama || "U").charAt(0)}</div>
                            <div>
                              <p className="font-medium text-stone-800 text-sm">{user.nama || "Tanpa Nama"}</p>
                              <p className="text-xs text-stone-400">@{user.username || "unknown"}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <p className="text-sm text-stone-700">{user.email || "-"}</p>
                          <p className="text-xs text-stone-400">{user.telepon || "-"}</p>
                        </td>
                        <td className="px-4 py-4 text-center">
                          <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${getRoleColor(user.role)}`}>{(user.role || "pelanggan").charAt(0).toUpperCase() + (user.role || "pelanggan").slice(1)}</span>
                        </td>
                        <td className="px-4 py-4 text-center">
                          <button onClick={() => toggleStatus(user.id)} className={`text-xs font-semibold px-3 py-1 rounded-full border cursor-pointer hover:shadow-sm transition-shadow ${getStatusColor(user.status)}`}>
                            {user.status === "aktif" ? "Aktif" : "Nonaktif"}
                          </button>
                        </td>
                        <td className="px-4 py-4 text-center text-sm text-stone-500">{user.bergabung}</td>
                        <td className="px-4 py-4">
                          <div className="flex justify-center gap-2">
                            <button onClick={() => openDetail(user)} className="text-amber-600 hover:text-amber-800 text-xs font-semibold hover:underline">
                              Detail
                            </button>
                            <button onClick={() => openEdit(user)} className="text-blue-600 hover:text-blue-800 text-xs font-semibold hover:underline">
                              Edit
                            </button>
                            <button onClick={() => hapusPengguna(user.id)} className="text-red-600 hover:text-red-800 text-xs font-semibold hover:underline">
                              Hapus
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="px-6 py-12 text-center">
                        <p className="text-stone-500">Tidak ada pengguna ditemukan</p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Card Mobile */}
          <div className="md:hidden space-y-4">
            {filteredPengguna.length > 0 ? (
              filteredPengguna.map((user) => (
                <div key={user.id} className="bg-white p-4 rounded-xl shadow-sm border border-stone-100">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-amber-200 flex items-center justify-center font-bold text-amber-800">{(user.nama || "U").charAt(0)}</div>
                      <div>
                        <p className="font-semibold text-stone-800">{user.nama || "Tanpa Nama"}</p>
                        <p className="text-xs text-stone-400">@{user.username || "unknown"}</p>
                      </div>
                    </div>
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${getStatusColor(user.status)}`}>{user.status === "aktif" ? "Aktif" : "Nonaktif"}</span>
                  </div>
                  <div className="text-sm text-stone-600 space-y-1 mb-3">
                    <p>{user.email || "-"}</p>
                    <p>{user.telepon || "-"}</p>
                    <div className="flex justify-between pt-2">
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${getRoleColor(user.role)}`}>{user.role || "pelanggan"}</span>
                      <span className="text-xs text-stone-500">Bergabung: {user.bergabung}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => openDetail(user)} className="flex-1 bg-amber-50 text-amber-700 px-3 py-2 rounded-lg text-sm font-semibold hover:bg-amber-100 transition-colors">
                      Detail
                    </button>
                    <button onClick={() => openEdit(user)} className="flex-1 bg-blue-50 text-blue-700 px-3 py-2 rounded-lg text-sm font-semibold hover:bg-blue-100 transition-colors">
                      Edit
                    </button>
                    <button onClick={() => hapusPengguna(user.id)} className="flex-1 bg-red-50 text-red-700 px-3 py-2 rounded-lg text-sm font-semibold hover:bg-red-100 transition-colors">
                      Hapus
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-stone-100">
                <p className="text-stone-500">Tidak ada pengguna ditemukan</p>
              </div>
            )}
          </div>
        </>
      )}

      {/* Modal Tambah Pengguna */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full">
            <div className="flex items-center justify-between p-6 border-b border-stone-200">
              <h2 className="text-xl font-bold text-stone-800">Tambah Pengguna Baru</h2>
              <button onClick={() => setIsAddModalOpen(false)} className="text-stone-400 hover:text-stone-600 transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <form onSubmit={saveAdd} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-stone-700 mb-1">Nama Lengkap *</label>
                <input
                  type="text"
                  name="nama"
                  value={formAdd.nama}
                  onChange={handleAddChange}
                  required
                  placeholder="Masukkan nama lengkap"
                  className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-stone-700 mb-1">Email *</label>
                <input
                  type="email"
                  name="email"
                  value={formAdd.email}
                  onChange={handleAddChange}
                  required
                  placeholder="Masukkan email"
                  className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-stone-700 mb-1">Telepon</label>
                <input
                  type="text"
                  name="telepon"
                  value={formAdd.telepon}
                  onChange={handleAddChange}
                  placeholder="Masukkan nomor telepon"
                  className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-stone-700 mb-1">Role</label>
                <select name="role" value={formAdd.role} onChange={handleAddChange} className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500">
                  <option value="pelanggan">Pelanggan</option>
                  <option value="staff">Staff</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-stone-700 mb-1">Status</label>
                <select name="status" value={formAdd.status} onChange={handleAddChange} className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500">
                  <option value="aktif">Aktif</option>
                  <option value="nonaktif">Nonaktif</option>
                </select>
              </div>
              <div className="flex gap-3 pt-4">
                <button type="submit" className="flex-1 bg-amber-600 hover:bg-amber-700 text-white font-medium py-2 px-4 rounded-lg transition-colors">
                  Simpan
                </button>
                <button type="button" onClick={() => setIsAddModalOpen(false)} className="flex-1 bg-stone-200 hover:bg-stone-300 text-stone-700 font-medium py-2 px-4 rounded-lg transition-colors">
                  Batal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Detail */}
      {isDetailModalOpen && selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full max-h-[85vh] overflow-y-auto">
            <div className="sticky top-0 bg-white flex items-center justify-between p-6 border-b border-stone-200">
              <h2 className="text-xl font-bold text-stone-800">Detail Pengguna</h2>
              <button onClick={() => setIsDetailModalOpen(false)} className="text-stone-400 hover:text-stone-600 transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-6">
              <div className="text-center mb-6">
                <div className="w-20 h-20 rounded-full bg-amber-200 flex items-center justify-center font-bold text-amber-800 text-2xl mx-auto mb-3">{(selectedUser.nama || "U").charAt(0)}</div>
                <h3 className="text-lg font-bold text-stone-800">{selectedUser.nama || "Tanpa Nama"}</h3>
                <p className="text-stone-500 text-sm">@{selectedUser.username || "unknown"}</p>
                <div className="flex justify-center gap-2 mt-2">
                  <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${getRoleColor(selectedUser.role)}`}>{(selectedUser.role || "pelanggan").charAt(0).toUpperCase() + (selectedUser.role || "pelanggan").slice(1)}</span>
                  <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${getStatusColor(selectedUser.status)}`}>{selectedUser.status === "aktif" ? "Aktif" : "Nonaktif"}</span>
                </div>
              </div>
              <div className="space-y-3">
                <div className="bg-stone-50 p-4 rounded-lg">
                  <h4 className="text-sm font-semibold text-stone-800 mb-2">Informasi Kontak</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-stone-500">Email</span>
                      <span className="text-stone-800">{selectedUser.email || "-"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-stone-500">Telepon</span>
                      <span className="text-stone-800">{selectedUser.telepon || "-"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-stone-500">Alamat</span>
                      <span className="text-stone-800 text-right max-w-[180px]">{selectedUser.alamat || "-"}</span>
                    </div>
                    <div className="flex justify-between pt-2 border-t border-stone-200">
                      <span className="text-stone-500">Bergabung</span>
                      <span className="text-stone-800">{selectedUser.bergabung}</span>
                    </div>
                  </div>
                </div>
                {selectedUser.role === "pelanggan" && (
                  <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
                    <h4 className="text-sm font-semibold text-amber-800 mb-2">Aktivitas Pelanggan</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-amber-700">Total Pesanan</span>
                        <span className="font-semibold text-amber-800">{selectedUser.totalPesanan} kali</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-amber-700">Total Belanja</span>
                        <span className="font-semibold text-amber-800">{formatRupiah(selectedUser.totalBelanja)}</span>
                      </div>
                    </div>
                  </div>
                )}
                {(selectedUser.role === "admin" || selectedUser.role === "staff") && (
                  <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                    <h4 className="text-sm font-semibold text-purple-800 mb-2">Info Akses</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-purple-700">Role</span>
                        <span className="font-semibold text-purple-800 capitalize">{selectedUser.role}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-purple-700">Status</span>
                        <span className="font-semibold text-purple-800">{selectedUser.status === "aktif" ? "Aktif" : "Nonaktif"}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="sticky bottom-0 bg-white flex justify-end gap-3 p-6 border-t border-stone-200">
              <button onClick={() => setIsDetailModalOpen(false)} className="px-4 py-2 text-stone-600 hover:text-stone-800 font-medium transition-colors">
                Tutup
              </button>
              <button
                onClick={() => {
                  setIsDetailModalOpen(false);
                  openEdit(selectedUser);
                }}
                className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-lg transition-colors font-medium"
              >
                Edit Pengguna
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Edit */}
      {isEditModalOpen && selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full">
            <div className="flex items-center justify-between p-6 border-b border-stone-200">
              <h2 className="text-xl font-bold text-stone-800">Edit Pengguna</h2>
              <button onClick={() => setIsEditModalOpen(false)} className="text-stone-400 hover:text-stone-600 transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <form onSubmit={saveEdit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-stone-700 mb-1">Nama Lengkap</label>
                <input type="text" name="nama" value={formEdit.nama} onChange={handleEditChange} required className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-stone-700 mb-1">Email</label>
                <input type="email" name="email" value={formEdit.email} onChange={handleEditChange} required className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-stone-700 mb-1">Telepon</label>
                <input type="text" name="telepon" value={formEdit.telepon} onChange={handleEditChange} className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-stone-700 mb-1">Role</label>
                <select name="role" value={formEdit.role} onChange={handleEditChange} className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500">
                  <option value="pelanggan">Pelanggan</option>
                  <option value="staff">Staff</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-stone-700 mb-1">Status</label>
                <select name="status" value={formEdit.status} onChange={handleEditChange} className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500">
                  <option value="aktif">Aktif</option>
                  <option value="nonaktif">Nonaktif</option>
                </select>
              </div>
              <div className="flex gap-3 pt-4">
                <button type="submit" className="flex-1 bg-amber-600 hover:bg-amber-700 text-white font-medium py-2 px-4 rounded-lg transition-colors">
                  Simpan Perubahan
                </button>
                <button type="button" onClick={() => setIsEditModalOpen(false)} className="flex-1 bg-stone-200 hover:bg-stone-300 text-stone-700 font-medium py-2 px-4 rounded-lg transition-colors">
                  Batal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}
