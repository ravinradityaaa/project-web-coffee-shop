import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const DetailProduk = () => {
  const [jumlah, setJumlah] = useState(1);
  const [gambarAktif, setGambarAktif] = useState(0);
  const [produkTerkait, setProdukTerkait] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const gambarProduk = [
    "/src/assets/arb.jpg",
    "/src/assets/arb1.jpg",
    "/src/assets/arb2.jpg",
    "/src/assets/arb3.jpg",
  ];


  const formatRupiah = (angka) => {
    return angka.toLocaleString("id-ID");
  };

  const kurangJumlah = () => {
    if (jumlah > 1) {
      setJumlah(jumlah - 1);
    }
  };

  const tambahJumlah = () => {
    setJumlah(jumlah + 1);
  };

useEffect(() => {
  const ambilProdukTerkait = async () => {
    try {
      setLoading(true);

      const response = await axios.get("/coffee-products.json");

      setTimeout(() => {
        setProdukTerkait(response.data);
        setError("");
        setLoading(false);
      }, 1000);
    } catch (err) {
      console.log("Error ambil produk:", err);
      setError("Gagal mengambil data produk kopi.");
      setLoading(false);
    }
  };

  ambilProdukTerkait();
}, []);

  const tambahKeKeranjang = () => {
    const produkBaru = {
      id: 1,
      nama: "Kopi Arabica Premium",
      kategori: "Coffee Beans",
      harga: 85000,
      gambar: "ARABICA",
      jumlah: jumlah,
    };

    const keranjangLama = JSON.parse(localStorage.getItem("keranjang")) || [];

    const produkSudahAda = keranjangLama.find(
      (item) => item.id === produkBaru.id
    );

    let keranjangBaru;

    if (produkSudahAda) {
      keranjangBaru = keranjangLama.map((item) =>
        item.id === produkBaru.id
          ? { ...item, jumlah: item.jumlah + jumlah }
          : item
      );
    } else {
      keranjangBaru = [...keranjangLama, produkBaru];
    }

    localStorage.setItem("keranjang", JSON.stringify(keranjangBaru));

    alert("Produk berhasil ditambahkan ke keranjang!");
    navigate("/keranjang");
  };

  return (
    <main className="min-h-screen bg-white text-[#1F1A17]">
      <div className="max-w-7xl mx-auto px-6 py-6">
        {/* Breadcrumb */}
        <div className="flex items-center gap-3 text-sm text-gray-500 mb-5">
          <span>Home</span>
          <span>›</span>
          <span>Shop</span>
          <span>›</span>
          <span className="text-[#1F1A17] font-semibold">
            Kopi Arabica Premium
          </span>
        </div>

        {/* Detail Produk Utama */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Gambar Produk */}
          <div>
            <div className="relative h-[430px] rounded-xl overflow-hidden bg-[#1E120D]">
              <span className="absolute top-4 left-4 z-10 bg-[#A96B3C] text-white text-sm px-4 py-2 rounded-full">
                -10%
              </span>

              <img
                src={gambarProduk[gambarAktif]}
                alt="Kopi Arabica Premium"
                className="w-full h-full object-cover"
              />

              <button
                onClick={() =>
                  setGambarAktif(
                    gambarAktif === 0 ? gambarProduk.length - 1 : gambarAktif - 1
                  )
                }
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow flex items-center justify-center text-2xl"
              >
                ‹
              </button>

              <button
                onClick={() =>
                  setGambarAktif(
                    gambarAktif === gambarProduk.length - 1 ? 0 : gambarAktif + 1
                  )
                }
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow flex items-center justify-center text-2xl"
              >
                ›
              </button>
            </div>

            {/* Thumbnail */}
            <div className="grid grid-cols-4 gap-3 mt-3">
              {gambarProduk.map((gambar, index) => (
                <button
                  key={index}
                  onClick={() => setGambarAktif(index)}
                  className={`h-20 rounded-lg overflow-hidden border-2 ${
                    gambarAktif === index
                      ? "border-[#8B5A36]"
                      : "border-transparent"
                  }`}
                >
                  <img
                    src={gambar}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Info Produk */}
          <div className="pt-1">
            <span className="inline-block bg-[#F3E7DD] text-[#8B5A36] text-xs font-semibold px-4 py-2 rounded-full mb-5">
              BEST SELLER
            </span>

            <h1 className="text-4xl font-bold mb-4">Kopi Arabica Premium</h1>

            <div className="flex flex-wrap items-center gap-2 text-sm mb-5">
              <span className="text-yellow-500 text-lg">★★★★★</span>
              <span>4.9</span>
              <span>(120 Review)</span>
              <span className="text-gray-300">|</span>
              <span>Terjual 250+</span>
            </div>

            <div className="flex items-center gap-4 mb-4">
              <h2 className="text-3xl font-bold">Rp 85.000</h2>
              <span className="text-gray-400 line-through">Rp 95.000</span>
            </div>

            <p className="text-gray-600 leading-relaxed max-w-xl mb-6">
              Kopi arabica premium dengan aroma floral, rasa seimbang, dan
              kualitas biji pilihan yang cocok untuk manual brew maupun
              espresso.
            </p>

            <hr className="mb-5" />

            <div className="space-y-2 text-sm mb-6">
              <p>
                <span className="inline-block w-24 font-semibold">Category</span>
                : Coffee Beans
              </p>
              <p>
                <span className="inline-block w-24 font-semibold">Stock</span>:
                <span className="text-green-700 font-semibold ml-1">
                  In Stock
                </span>
              </p>
            </div>

            <div className="flex items-center gap-6 mb-6">
              <span className="font-semibold">Quantity</span>

              <div className="flex border rounded-lg overflow-hidden">
                <button
                  onClick={kurangJumlah}
                  className="w-12 py-2 hover:bg-gray-100"
                >
                  -
                </button>
                <span className="w-16 py-2 border-x text-center">{jumlah}</span>
                <button
                  onClick={tambahJumlah}
                  className="w-12 py-2 hover:bg-gray-100"
                >
                  +
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-xl mb-6">
              <button
                  onClick={tambahKeKeranjang}
                  className="bg-[#1E120D] text-white py-4 rounded-lg font-semibold hover:bg-[#3A241A] transition"
                >
                  🛒 Tambah Keranjang
                </button>

              <button className="bg-[#C98756] text-white py-4 rounded-lg font-semibold hover:bg-[#B87545] transition">
                Beli Sekarang
              </button>
            </div>

            <div className="flex gap-8 text-gray-600">
              <button className="hover:text-[#8B5A36]">♡ Tambah Wishlist</button>
              <button className="hover:text-[#8B5A36]">↗ Bagikan</button>
            </div>
          </div>
        </section>

        {/* Benefit */}
        <section className="grid grid-cols-1 md:grid-cols-4 gap-4 border rounded-xl mt-8 p-5">
          <div className="flex items-center gap-4">
            <span className="text-3xl">🚚</span>
            <div>
              <h3 className="font-bold">Gratis Ongkir</h3>
              <p className="text-sm text-gray-500">Min. belanja Rp 100.000</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-3xl">🛡️</span>
            <div>
              <h3 className="font-bold">Pembayaran Aman</h3>
              <p className="text-sm text-gray-500">Transaksi 100% aman</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-3xl">📦</span>
            <div>
              <h3 className="font-bold">Packing Aman</h3>
              <p className="text-sm text-gray-500">Produk dikemas dengan baik</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-3xl">⏱️</span>
            <div>
              <h3 className="font-bold">Pengiriman Cepat</h3>
              <p className="text-sm text-gray-500">1-2 hari sampai</p>
            </div>
          </div>
        </section>

        {/* Deskripsi dan Review */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-5">
          <div className="border rounded-xl p-6">
            <h2 className="text-xl font-bold mb-2">Deskripsi Produk</h2>
            <p className="text-gray-600 mb-4">
              Biji kopi arabica pilihan dari dataran tinggi dengan ketinggian
              1200-1600 mdpl. Diproses secara higienis untuk menghasilkan cita
              rasa terbaik di setiap seduhan.
            </p>

            <ul className="space-y-2 text-gray-700">
              <li>✔ 100% Arabica Premium</li>
              <li>✔ Aroma floral yang khas</li>
              <li>✔ Rasa seimbang dan lembut</li>
              <li>✔ Cocok untuk manual brew & espresso</li>
              <li>✔ Diproses secara higienis</li>
            </ul>
          </div>

          <div className="border rounded-xl p-6">
            <div className="flex justify-between mb-4">
              <h2 className="text-xl font-bold">Review Customer</h2>
              <button className="text-sm text-[#8B5A36] font-semibold">
                Lihat Semua
              </button>
            </div>

            <div className="space-y-4">
              <div className="flex gap-4 border-b pb-4">
                <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center">
                  👤
                </div>
                <div className="flex-1">
                  <div className="flex justify-between">
                    <h3 className="font-bold">Andi Pratama</h3>
                    <span className="text-sm text-gray-500">2 hari lalu</span>
                  </div>
                  <p className="text-yellow-500">★★★★★</p>
                  <p className="text-gray-600">
                    Kopinya enak banget! Aromanya strong, rasa pas, bakal repeat
                    order lagi.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center">
                  👤
                </div>
                <div className="flex-1">
                  <div className="flex justify-between">
                    <h3 className="font-bold">Budi Santoso</h3>
                    <span className="text-sm text-gray-500">5 hari lalu</span>
                  </div>
                  <p className="text-yellow-500">★★★★☆</p>
                  <p className="text-gray-600">
                    Pengiriman cepat, packing aman, kualitas kopi tidak
                    mengecewakan 👌
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Produk Terkait */}
        <section className="border rounded-xl mt-5 p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-xl font-bold">Produk Terkait</h2>
            <span className="text-sm text-gray-500">Data kopi dari JSON</span>
          </div>

            {loading && (
              <div className="p-8 text-center bg-[#F8F3EF] rounded-xl">
                <div className="mx-auto mb-3 w-10 h-10 border-4 border-[#D8C9BF] border-t-[#8B5A36] rounded-full animate-spin"></div>
                <p className="font-semibold text-[#8B5A36]">Loading produk kopi...</p>
                <p className="text-sm text-gray-500 mt-1">
                  Sedang mengambil data produk menggunakan Axios.
                </p>
              </div>
            )}

          {error && !loading && (
            <div className="p-8 text-center bg-red-50 text-red-600 rounded-xl">
              {error}
            </div>
          )}

          {!loading && !error && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {produkTerkait.slice(0, 6).map((item) => (
                <div
                  key={item.id}
                  className="border rounded-xl overflow-hidden grid grid-cols-[150px_1fr] bg-white hover:shadow-md transition"
                >
                  <div className="h-32 bg-[#3A241A] flex items-center justify-center text-white font-bold text-sm text-center px-3">
                    {item.gambar}
                  </div>

                  <div className="p-4">
                    <h3 className="font-bold">{item.nama}</h3>

                    <p className="text-xs text-gray-500 mt-1">{item.kategori}</p>

                    <p className="text-yellow-500 text-sm mt-2">
                      ★★★★★{" "}
                      <span className="text-gray-500">({item.review})</span>
                    </p>

                    <p className="font-bold mt-2">
                      Rp {item.harga.toLocaleString("id-ID")}
                    </p>

                    <button className="mt-3 border border-[#C98756] text-[#8B5A36] px-4 py-2 rounded-lg text-sm hover:bg-[#F8F3EF]">
                      + Keranjang
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
};

export default DetailProduk;