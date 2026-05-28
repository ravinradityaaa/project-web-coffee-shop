import { useEffect, useState } from "react";
import axios from "axios";

const Keranjang = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const ongkir = 10000;

  const formatRupiah = (angka) => {
    return angka.toLocaleString("id-ID");
  };

  useEffect(() => {
    const ambilDataKeranjang = async () => {
      try {
        setLoading(true);

        const response = await axios.get("/coffee-products.json");

      const dataLocalStorage = JSON.parse(localStorage.getItem("keranjang")) || [];

        const dataAwalKeranjang =
        dataLocalStorage.length > 0
            ? dataLocalStorage
            : [];

        // Delay kecil supaya loading terlihat saat demo
        setTimeout(() => {
          setItems(dataAwalKeranjang);
          setError("");
          setLoading(false);
        }, 800);
      } catch (err) {
        console.log("Error ambil data keranjang:", err);
        setError("Gagal mengambil data keranjang.");
        setLoading(false);
      }
    };

    ambilDataKeranjang();
  }, []);

  const tambahJumlah = (id) => {
  const updateItems = items.map((item) =>
    item.id === id ? { ...item, jumlah: item.jumlah + 1 } : item
  );

  setItems(updateItems);
  localStorage.setItem("keranjang", JSON.stringify(updateItems));
};

  const kurangJumlah = (id) => {
    const updateItems = items.map((item) =>
        item.id === id && item.jumlah > 1
        ? { ...item, jumlah: item.jumlah - 1 }
        : item
    );

    setItems(updateItems);
    localStorage.setItem("keranjang", JSON.stringify(updateItems));
    };

  const hapusItem = (id) => {
  const updateItems = items.filter((item) => item.id !== id);

  setItems(updateItems);
  localStorage.setItem("keranjang", JSON.stringify(updateItems));
};

  const kosongkanKeranjang = () => {
    setItems([]);
    localStorage.removeItem("keranjang");
  };

  const totalItem = items.reduce((total, item) => {
    return total + item.jumlah;
  }, 0);

  const subtotal = items.reduce((total, item) => {
    return total + item.harga * item.jumlah;
  }, 0);

  const total = subtotal + ongkir;

  return (
    <main className="min-h-screen bg-[#F8F3EF] px-6 py-10">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <p className="text-sm text-gray-500 mb-2">Home &gt; Keranjang</p>
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
            <p className="font-semibold text-[#8B5A36]">
              Loading keranjang...
            </p>
            <p className="text-sm text-gray-500 mt-1">
              Sedang mengambil data produk menggunakan Axios.
            </p>
          </div>
        )}

        {error && !loading && (
          <div className="bg-red-50 text-red-600 border border-red-200 rounded-2xl p-8 text-center">
            {error}
          </div>
        )}

        {!loading && !error && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <section className="lg:col-span-2">
              <div className="flex justify-between items-center mb-4">
                <h2 className="font-bold text-[#2B1A12]">
                  Daftar Produk ({totalItem} item)
                </h2>

                {items.length > 0 && (
                  <button
                    onClick={kosongkanKeranjang}
                    className="text-sm text-red-500 hover:text-red-700 font-semibold"
                  >
                    Kosongkan Keranjang
                  </button>
                )}
              </div>

              <div className="border border-[#D8C9BF] rounded-2xl overflow-hidden bg-white">
                <div className="hidden md:grid grid-cols-12 bg-[#F3E7DD] px-5 py-4 text-sm font-semibold text-gray-600">
                  <div className="col-span-5">Produk</div>
                  <div className="col-span-2 text-center">Harga</div>
                  <div className="col-span-2 text-center">Jumlah</div>
                  <div className="col-span-2 text-center">Subtotal</div>
                  <div className="col-span-1 text-center">Aksi</div>
                </div>

                {items.length === 0 ? (
                  <div className="p-10 text-center">
                    <div className="text-5xl mb-4">🛒</div>
                    <h2 className="text-xl font-bold mb-2 text-[#2B1A12]">
                      Keranjang masih kosong
                    </h2>
                    <p className="text-gray-500">
                      Silakan pilih produk kopi favoritmu terlebih dahulu.
                    </p>
                  </div>
                ) : (
                  items.map((item) => (
                    <div
                      key={item.id}
                      className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-0 items-center px-5 py-5 border-t border-[#E7DAD0]"
                    >
                      <div className="md:col-span-5 flex items-center gap-4">
                        <div className="w-24 h-24 bg-[#3A241A] rounded-xl flex items-center justify-center text-white font-bold text-sm text-center px-2">
                          {item.gambar}
                        </div>

                        <div>
                          <h2 className="font-bold text-[#2B1A12]">
                            {item.nama}
                          </h2>
                          <p className="text-sm text-gray-500">
                            {item.kategori}
                          </p>
                        </div>
                      </div>

                      <div className="md:col-span-2 md:text-center">
                        <p className="md:hidden text-sm text-gray-500">
                          Harga
                        </p>
                        <p className="font-semibold">
                          Rp {formatRupiah(item.harga)}
                        </p>
                      </div>

                      <div className="md:col-span-2 flex md:justify-center">
                        <div className="flex border border-[#D8C9BF] rounded-lg overflow-hidden">
                          <button
                            onClick={() => kurangJumlah(item.id)}
                            className="px-4 py-2 hover:bg-[#F3E7DD]"
                          >
                            -
                          </button>

                          <span className="px-5 py-2 border-x border-[#D8C9BF]">
                            {item.jumlah}
                          </span>

                          <button
                            onClick={() => tambahJumlah(item.id)}
                            className="px-4 py-2 hover:bg-[#F3E7DD]"
                          >
                            +
                          </button>
                        </div>
                      </div>

                      <div className="md:col-span-2 md:text-center">
                        <p className="md:hidden text-sm text-gray-500">
                          Subtotal
                        </p>
                        <p className="font-bold text-[#8B5A36]">
                          Rp {formatRupiah(item.harga * item.jumlah)}
                        </p>
                      </div>

                      <div className="md:col-span-1 md:text-center">
                        <button
                          onClick={() => hapusItem(item.id)}
                          className="text-red-500 hover:text-red-700 text-sm font-semibold"
                        >
                          Hapus
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </section>

            <aside className="border border-[#D8C9BF] rounded-2xl p-6 h-fit bg-white">
              <h2 className="text-xl font-bold text-[#2B1A12] mb-5">
                Ringkasan Belanja
              </h2>

              <div className="space-y-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Item</span>
                  <span className="font-semibold">{totalItem} item</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-semibold">
                    Rp {formatRupiah(subtotal)}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-600">Ongkir</span>
                  <span className="font-semibold">
                    Rp {formatRupiah(ongkir)}
                  </span>
                </div>

                <hr />

                <div className="flex justify-between text-lg">
                  <span className="font-bold">Total</span>
                  <span className="font-bold text-[#8B5A36]">
                    Rp {formatRupiah(items.length === 0 ? 0 : total)}
                  </span>
                </div>
              </div>

              <button
                disabled={items.length === 0}
                className={`w-full mt-6 py-3 rounded-xl font-semibold transition ${
                  items.length === 0
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-[#1E120D] text-white hover:bg-[#3A241A]"
                }`}
              >
                Checkout
              </button>

              <button className="w-full mt-3 border border-[#C98756] text-[#8B5A36] py-3 rounded-xl font-semibold hover:bg-[#F8F3EF]">
                Lanjut Belanja
              </button>
            </aside>
          </div>
        )}
      </div>
    </main>
  );
};

export default Keranjang;