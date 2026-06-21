import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Keranjang = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  
  // Karena kita sudah tidak memakai axios ke json lokal, loading bisa dipersingkat/dihilangkan
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState("");

  const ongkir = 10000;

  const formatRupiah = (angka) => {
    return angka.toLocaleString("id-ID");
  };

  useEffect(() => {
    // Membaca keranjang langsung dari Local Storage
    const dataLocalStorage = JSON.parse(localStorage.getItem("keranjang")) || [];

    // JIKA KERANJANG KOSONG, KITA MASUKKAN DATA DUMMY
    if (dataLocalStorage.length === 0) {
      const dummyItem = [
        {
          id: "dummy-1",
          nama: "Latte Machiato Signature",
          kategori: "Coffee",
          harga: 35000,
          foto: "https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?q=80&w=400&auto=format&fit=crop",
          stok: 10,
          jumlah: 2, // Otomatis terisi 2 pcs
        }
      ];
      setItems(dummyItem);
      // Simpan juga ke local storage biar sinkron dengan navbar
      localStorage.setItem("keranjang", JSON.stringify(dummyItem));
      window.dispatchEvent(new Event("keranjangChanged"));
    } else {
      // Jika sudah ada isinya (hasil dari user klik), pakai data aslinya
      setItems(dataLocalStorage);
    }
  }, []);

  const tambahJumlah = (id) => {
    const updateItems = items.map((item) => {
      if (item.id === id) {
        if (item.jumlah >= item.stok) {
          alert("Jumlah tidak boleh melebihi stok.");
          return item;
        }
        return {
          ...item,
          jumlah: item.jumlah + 1,
        };
      }
      return item;
    });

    setItems(updateItems);
    localStorage.setItem("keranjang", JSON.stringify(updateItems));
    window.dispatchEvent(new Event("keranjangChanged"));
  };

  const kurangJumlah = (id) => {
    const updateItems = items.map((item) =>
      item.id === id && item.jumlah > 1
        ? { ...item, jumlah: item.jumlah - 1 }
        : item
    );

    setItems(updateItems);
    localStorage.setItem("keranjang", JSON.stringify(updateItems));
    window.dispatchEvent(new Event("keranjangChanged"));
  };

  const hapusItem = (id) => {
    const updateItems = items.filter((item) => item.id !== id);
    setItems(updateItems);
    
    if (updateItems.length === 0) {
      localStorage.removeItem("keranjang");
    } else {
      localStorage.setItem("keranjang", JSON.stringify(updateItems));
    }
    window.dispatchEvent(new Event("keranjangChanged"));
  };

  const kosongkanKeranjang = () => {
    setItems([]);
    localStorage.removeItem("keranjang");
    window.dispatchEvent(new Event("keranjangChanged"));
  };

  const totalItem = items.reduce((total, item) => {
    return total + item.jumlah;
  }, 0);

  const subtotal = items.reduce((total, item) => {
    return total + item.harga * item.jumlah;
  }, 0);

  const total = subtotal + ongkir;

  // FUNGSI CHECKOUT DIUBAH MENJADI NAVIGASI KE HALAMAN CHECKOUT
  const handleCheckout = () => {
    if (items.length === 0) {
      alert("Keranjang masih kosong.");
      return;
    }
    // Langsung arahkan ke halaman checkout
    navigate("/home/checkout");
  };

  return (
    <main className="min-h-screen bg-[#F8F3EF] px-6 py-10">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <p className="text-sm text-gray-500 mb-2 font-semibold tracking-wider">
            <button onClick={() => navigate('/home')} className="hover:text-amber-700">Home</button> &gt; Keranjang
          </p>
          <h1 className="text-3xl font-bold text-[#2B1A12]">
            Keranjang Belanja
          </h1>
          <p className="text-gray-500 mt-2">
            Cek kembali produk pilihanmu sebelum lanjut checkout.
          </p>
        </div>

        {loading && (
          <div className="bg-white border border-[#D8C9BF] rounded-2xl p-10 text-center">
            <div className="mx-auto mb-4 w-10 h-10 border-4 border-[#D8C9BF] border-t-[#8B5A36] rounded-full animate-spin"></div>
            <p className="font-semibold text-[#8B5A36]">Loading keranjang...</p>
          </div>
        )}

        {error && !loading && (
          <div className="bg-red-50 text-red-600 border border-red-200 rounded-2xl p-8 text-center font-bold">
            {error}
          </div>
        )}

        {!loading && !error && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <section className="lg:col-span-2">
              <div className="flex justify-between items-center mb-4">
                <h2 className="font-bold text-[#2B1A12] text-xl">
                  Daftar Produk ({totalItem} item)
                </h2>

                {items.length > 0 && (
                  <button
                    onClick={kosongkanKeranjang}
                    className="text-sm text-red-500 hover:text-red-700 font-bold transition-colors"
                  >
                    Kosongkan Keranjang
                  </button>
                )}
              </div>

              <div className="border border-[#D8C9BF] rounded-2xl overflow-hidden bg-white shadow-sm">
                <div className="hidden md:grid grid-cols-12 bg-[#F3E7DD] px-5 py-4 text-sm font-bold text-stone-700 tracking-wider uppercase">
                  <div className="col-span-5">Produk</div>
                  <div className="col-span-2 text-center">Harga</div>
                  <div className="col-span-2 text-center">Jumlah</div>
                  <div className="col-span-2 text-center">Subtotal</div>
                  <div className="col-span-1 text-center">Aksi</div>
                </div>

                {items.length === 0 ? (
                  <div className="p-16 text-center">
                    <div className="text-7xl mb-4">🛒</div>
                    <h2 className="text-2xl font-bold mb-2 text-[#2B1A12]">
                      Keranjang masih kosong
                    </h2>
                    <p className="text-gray-500 mb-8">
                      Silakan pilih produk kopi favoritmu terlebih dahulu.
                    </p>
                    <button 
                      onClick={() => navigate("/home/produk")}
                      className="bg-amber-700 text-white px-8 py-3 rounded-full font-bold hover:bg-amber-800 transition"
                    >
                      Mulai Belanja
                    </button>
                  </div>
                ) : (
                  items.map((item) => (
                    <div
                      key={item.id}
                      className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-0 items-center px-5 py-5 border-t border-[#E7DAD0] hover:bg-stone-50 transition"
                    >
                      {/* Kolom 1: Produk */}
                      <div className="md:col-span-5 flex items-center gap-4">
                        <div className="w-24 h-24 rounded-xl overflow-hidden bg-[#F8F3EF] shadow-inner flex-shrink-0">
                          <img
                            src={item.foto}
                            alt={item.nama}
                            className="w-full h-full object-cover"
                            onError={(e) => { e.currentTarget.src = "/vite.svg"; }}
                          />
                        </div>

                        <div>
                          <h2 className="font-bold text-[#2B1A12] text-lg mb-1 leading-tight">
                            {item.nama}
                          </h2>
                          <span className="inline-block bg-stone-100 text-stone-600 text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider mb-2">
                            {item.kategori}
                          </span>
                          <p className="text-xs text-gray-500 font-medium">
                            Sisa stok: {item.stok}
                          </p>
                        </div>
                      </div>

                      {/* Kolom 2: Harga */}
                      <div className="md:col-span-2 md:text-center">
                        <p className="md:hidden text-xs text-gray-500 uppercase tracking-wider font-bold mb-1">Harga</p>
                        <p className="font-semibold text-stone-600">
                          Rp {formatRupiah(item.harga)}
                        </p>
                      </div>

                      {/* Kolom 3: Jumlah */}
                      <div className="md:col-span-2 flex md:justify-center">
                        <div className="flex border-2 border-[#D8C9BF] rounded-xl overflow-hidden h-10 w-28 bg-white">
                          <button
                            onClick={() => kurangJumlah(item.id)}
                            className="w-8 h-full hover:bg-stone-100 font-bold text-stone-600 transition"
                          >
                            -
                          </button>
                          <span className="flex-1 flex items-center justify-center font-bold text-stone-800 border-x-2 border-[#D8C9BF]">
                            {item.jumlah}
                          </span>
                          <button
                            onClick={() => tambahJumlah(item.id)}
                            className="w-8 h-full hover:bg-stone-100 font-bold text-stone-600 transition"
                          >
                            +
                          </button>
                        </div>
                      </div>

                      {/* Kolom 4: Subtotal */}
                      <div className="md:col-span-2 md:text-center">
                        <p className="md:hidden text-xs text-gray-500 uppercase tracking-wider font-bold mb-1">Subtotal</p>
                        <p className="font-bold text-amber-700 text-lg">
                          Rp {formatRupiah(item.harga * item.jumlah)}
                        </p>
                      </div>

                      {/* Kolom 5: Aksi */}
                      <div className="md:col-span-1 md:text-center mt-2 md:mt-0">
                        <button
                          onClick={() => hapusItem(item.id)}
                          className="text-red-500 hover:text-red-700 bg-red-50 hover:bg-red-100 p-2 rounded-lg transition"
                          title="Hapus dari keranjang"
                        >
                          {/* Icon Trash Can */}
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </section>

            <aside className="h-fit sticky top-28">
              <div className="border border-[#D8C9BF] rounded-3xl p-8 bg-white shadow-sm">
                <h2 className="text-xl font-bold text-[#2B1A12] mb-6 border-b border-stone-100 pb-4">
                  Ringkasan Belanja
                </h2>

                <div className="space-y-4 text-sm mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-stone-500 font-medium tracking-wide">Total Item</span>
                    <span className="font-bold text-stone-800">{totalItem} porsi</span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-stone-500 font-medium tracking-wide">Subtotal</span>
                    <span className="font-bold text-stone-800">
                      Rp {formatRupiah(subtotal)}
                    </span>
                  </div>

                  {items.length > 0 && (
                    <div className="flex justify-between items-center">
                      <span className="text-stone-500 font-medium tracking-wide">Ongkos Kirim</span>
                      <span className="font-bold text-stone-800">
                        Rp {formatRupiah(ongkir)}
                      </span>
                    </div>
                  )}
                </div>

                <div className="bg-stone-50 rounded-2xl p-4 mb-6">
                  <div className="flex justify-between items-center">
                    <span className="font-black text-stone-800 uppercase tracking-widest text-xs">Total Bayar</span>
                    <span className="font-black text-amber-700 text-2xl">
                      Rp {formatRupiah(items.length === 0 ? 0 : total)}
                    </span>
                  </div>
                </div>

                <button
                  onClick={handleCheckout}
                  disabled={items.length === 0}
                  className={`w-full py-4 rounded-2xl font-bold tracking-widest uppercase transition-all shadow-lg ${
                    items.length === 0
                      ? "bg-stone-200 text-stone-400 cursor-not-allowed shadow-none"
                      : "bg-[#1E120D] text-white hover:bg-amber-700 hover:-translate-y-1 hover:shadow-amber-700/30"
                  }`}
                >
                  Checkout Sekarang
                </button>

                <button 
                  onClick={() => navigate("/home/produk")}
                  className="w-full mt-4 border-2 border-stone-200 text-stone-600 py-4 rounded-2xl font-bold tracking-widest uppercase hover:bg-stone-50 hover:border-amber-600 hover:text-amber-700 transition-all"
                >
                  Lanjut Belanja
                </button>
              </div>
            </aside>
          </div>
        )}
      </div>
    </main>
  );
};

export default Keranjang;