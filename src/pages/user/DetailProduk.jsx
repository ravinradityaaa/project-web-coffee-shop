import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const DetailProduk = () => {
  const [jumlah, setJumlah] = useState(1);
  const [gambarAktif, setGambarAktif] = useState(0);
  const [produkList, setProdukList] = useState([]);
  const [produkAktif, setProdukAktif] = useState(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [loadingDetail, setLoadingDetail] = useState(false);
  const [error, setError] = useState("");
  const [searchProduk, setSearchProduk] = useState("");

  const formatRupiah = (angka) => {
    return angka.toLocaleString("id-ID");
  };

  const kurangJumlah = () => {
    if (jumlah > 1) {
      setJumlah(jumlah - 1);
    }
  };

  const tambahJumlah = () => {
    if (jumlah < produkAktif.stok) {
    setJumlah(jumlah + 1);
  } else {
    alert("Jumlah tidak boleh melebihi stok.");
  }
  };

useEffect(() => {
  const ambilProdukTerkait = async () => {
    try {
      setLoading(true);

      const response = await axios.get("/coffee-products.json");
      const dataProduk = response.data;

      const stokTersimpan = JSON.parse(localStorage.getItem("stokProduk") || "{}");

      const dataProdukDenganStok = dataProduk.map((produk) => ({
        ...produk,
        stok: stokTersimpan[produk.id] ?? produk.stok,
      }));

      setTimeout(() => {
        setProdukList(dataProdukDenganStok);

        const produkArabica =
          dataProduk.find((item) => item.nama === "Kopi Arabica Premium") ||
          dataProduk[0];

        setProdukAktif(produkArabica);

        setError("");
        setLoading(false);
      }, 800);
    } catch (err) {
      console.log("Error ambil produk:", err);
      setError("Gagal mengambil data produk kopi.");
      setLoading(false);
    }
  };

  ambilProdukTerkait();

   const ambilSearchProduk = () => {
    const keyword = localStorage.getItem("searchProduk") || "";
    setSearchProduk(keyword);
  };

  ambilSearchProduk();

  window.addEventListener("searchProdukChanged", ambilSearchProduk);

  return () => {
    window.removeEventListener("searchProdukChanged", ambilSearchProduk);
  };

  setProdukList(dataProdukDenganStok);

  const produkArabica =
    dataProdukDenganStok.find((item) => item.nama === "Kopi Arabica Premium") ||
    dataProdukDenganStok[0];

  setProdukAktif(produkArabica);
   const updateStokProduk = () => {
    const stokTersimpan = JSON.parse(localStorage.getItem("stokProduk") || "{}");

    setProdukList((produkSebelumnya) =>
      produkSebelumnya.map((produk) => {
        return {
          ...produk,
          stok: stokTersimpan[produk.id] ?? produk.stok,
        };
      })
    );

    setProdukAktif((produkSebelumnya) => {
      if (!produkSebelumnya) {
        return produkSebelumnya;
      }

      return {
        ...produkSebelumnya,
        stok: stokTersimpan[produkSebelumnya.id] ?? produkSebelumnya.stok,
      };
    });
  };

  window.addEventListener("stokProdukChanged", updateStokProduk);

  return () => {
    window.removeEventListener("stokProdukChanged", updateStokProduk);
  };
}, []);


  const tambahKeKeranjang = () => {    if (produkAktif.stok <= 0) {
    alert("Stok produk habis.");
    return;
  }

  if (jumlah > produkAktif.stok) {
    alert("Jumlah melebihi stok yang tersedia.");
    return;
  }

  const produkBaru = {
    id: produkAktif.id,
    nama: produkAktif.nama,
    kategori: produkAktif.kategori,
    harga: produkAktif.harga,
    gambar: produkAktif.gambar,
    foto: produkAktif.foto,
    stok: produkAktif.stok,
    jumlah: jumlah,
  };

  const keranjangLama = JSON.parse(localStorage.getItem("keranjang")) || [];

  const produkSudahAda = keranjangLama.find(
    (item) => item.id === produkBaru.id
  );

  let keranjangBaru;

  if (produkSudahAda) {
    keranjangBaru = keranjangLama.map((item) => {
      if (item.id === produkBaru.id) {
        const jumlahBaru = item.jumlah + jumlah;

        if (jumlahBaru > produkAktif.stok) {
          alert("Jumlah di keranjang melebihi stok.");
          return item;
        }

        return {
          ...item,
          jumlah: jumlahBaru,
          stok: produkAktif.stok,
          foto: produkAktif.foto,
        };
      }

      return item;
    });
  } else {
    keranjangBaru = [...keranjangLama, produkBaru];
  }

  localStorage.setItem("keranjang", JSON.stringify(keranjangBaru));
  window.dispatchEvent(new Event("keranjangChanged"));

  alert(`${produkAktif.nama} berhasil ditambahkan ke keranjang!`);
  navigate("/keranjang");
};

 if (loading || !produkAktif) {
  return (
    <main className="min-h-screen bg-white flex items-center justify-center">
      <p>Memuat produk...</p>
    </main>
  );
}

if (loadingDetail) {
  return (
    <main className="min-h-screen bg-[#F8F3EF] flex items-center justify-center">
      <div className="bg-white border border-[#E7DAD0] rounded-2xl shadow-xl px-10 py-8 text-center">
        <div className="mx-auto mb-4 w-12 h-12 border-4 border-[#D8C9BF] border-t-[#8B5A36] rounded-full animate-spin"></div>
        <h2 className="text-xl font-bold text-[#2B1A12]">
          Memuat Detail Produk
        </h2>
        <p className="text-gray-500 mt-2">
          Sedang menampilkan informasi produk pilihan...
        </p>
      </div>
    </main>
  );
}

if (error) {
  return (
    <main className="min-h-screen bg-white flex items-center justify-center">
      <div className="text-center text-red-600 font-semibold">{error}</div>
    </main>
  );
}

const pilihProdukTerkait = (produk) => {
  setLoadingDetail(true);

  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });

  setTimeout(() => {
    setProdukAktif(produk);
    setJumlah(1);
    setGambarAktif(0);
    setLoadingDetail(false);
  }, 1000);
};
 
const produkTerkaitFilter = produkList
  .filter((item) => item.id !== produkAktif.id)
  .filter((item) => {
    const keyword = searchProduk.toLowerCase();

    return (
      item.nama.toLowerCase().includes(keyword) ||
      item.kategori.toLowerCase().includes(keyword)
    );
  });

  const beliSekarang = () => {
  const totalHarga = produkAktif.harga * jumlah;

  alert(
    `Checkout berhasil!\n\nProduk: ${produkAktif.nama}\nJumlah: ${jumlah}\nTotal: Rp ${formatRupiah(totalHarga)}\n\nPesanan kamu sedang diproses.`
  );

  setJumlah(1);
};

  return (
    <main className="min-h-screen bg-white text-[#1F1A17]">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-6">
        {/* Breadcrumb */}
        <div className="flex items-center gap-3 text-sm text-gray-500 mb-5">
          <span>Home</span>
          <span>›</span>
          <span>Shop</span>
          <span>›</span>
          <span className="text-[#1F1A17] font-semibold">
            {produkAktif.nama}
          </span>
        </div>
 
    

        {/* Detail Produk Utama */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Gambar Produk */}
          
            <div className="relative h-64 md:h-80 lg:h-[430px] rounded-xl overflow-hidden bg-[#1E120D]">
              <span className="absolute top-4 left-4 z-10 bg-[#A96B3C] text-white text-sm px-4 py-2 rounded-full">
                -10%
              </span>
              

           <img
              src={produkAktif.foto}
              alt={produkAktif.nama}
              className="w-full h-full object-cover"
               onError={(e) => {
                  e.currentTarget.src = "/vite.svg";
            }}    
            />
            </div>

          {/* Info Produk */}
          
          <div className="pt-1">
            <span className="inline-block bg-[#F3E7DD] text-[#8B5A36] text-xs font-semibold px-4 py-2 rounded-full mb-5">
              BEST SELLER
            </span>

              <h1 className="text-4xl font-bold mb-4">
                {produkAktif.nama}
              </h1>
              
            <div className="flex flex-wrap items-center gap-2 text-sm mb-5">
              <span className="text-yellow-500 text-lg">★★★★★</span>
              <span>{produkAktif.rating}</span>
              <span>({produkAktif.review} Review)</span>
              <span className="text-gray-300">|</span>
              <span>Terjual {produkAktif.terjual}</span>
            </div>

            

            <div className="flex items-center gap-4 mb-4">
             <h2 className="text-3xl font-bold">
                Rp {formatRupiah(produkAktif.harga)}
              </h2>

              <span className="text-gray-400 line-through">
                Rp {formatRupiah(produkAktif.hargaLama)}
              </span>
            </div>

            <p className="text-gray-600 leading-relaxed max-w-xl mb-6">
                {produkAktif.deskripsiSingkat}
              </p>

            <hr className="mb-5" />

            <div className="space-y-2 text-sm mb-6">
              <p>
                  <span className="inline-block w-24 font-semibold">Category</span>
                  : {produkAktif.kategori}
                </p>

                <p>
                  <span className="inline-block w-24 font-semibold">Stock</span>:
                  <span
                    className={`font-semibold ml-1 ${
                      produkAktif.stok > 0 ? "text-green-700" : "text-red-600"
                    }`}
                  >
                    {produkAktif.stok > 0 ? `${produkAktif.stok} tersedia` : "Stok habis"}
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
                

              <button 
              onClick={beliSekarang}
              className="bg-[#C98756] text-white py-4 rounded-lg font-semibold hover:bg-[#B87545] transition">
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
                {produkAktif.deskripsiLengkap}
              </p>

              <ul className="space-y-2 text-gray-700">
                {produkAktif.keunggulan.map((item, index) => (
                  <li key={index}>✓ {item}</li>
                ))}
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
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {produkTerkaitFilter.length === 0 ? (
                    <div className="col-span-full p-8 text-center bg-[#F8F3EF] rounded-xl">
                      <p className="font-semibold text-[#8B5A36]">
                        Produk tidak ditemukan.
                      </p>
                      <p className="text-sm text-gray-500 mt-1">
                        Coba gunakan kata kunci lain.
                      </p>
                    </div>
                  ) : (
                    produkTerkaitFilter.slice(0, 10).map((item) => (
                    <div
                      key={item.id}
                      className="border rounded-xl overflow-hidden grid grid-cols-[150px_1fr] bg-white hover:shadow-md transition"
                    >
                      <div className="h-32 bg-[#F8F3EF] overflow-hidden">
                        <img
                          src={item.foto}
                          alt={item.nama}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.currentTarget.src = "/vite.svg";
                          }}
                        />
                      </div>

                      <div className="p-4">
                        <h3 className="font-bold">{item.nama}</h3>

                        <p className="text-xs text-gray-500 mt-1">{item.kategori}</p>

                        <p className="text-yellow-500 text-sm mt-2">
                          ★★★★★ <span className="text-gray-500">({item.review})</span>
                        </p>

                        <p className="font-bold mt-2">
                          Rp {formatRupiah(item.harga)}
                        </p>

                        <div className="flex gap-2 mt-3">
                          <button
                            onClick={() => pilihProdukTerkait(item)}
                            className="border border-[#C98756] text-[#8B5A36] px-4 py-2 rounded-lg text-sm hover:bg-[#F8F3EF]"
                          >
                            Detail
                          </button>

                          <button
                            onClick={() => {
                              const keranjangLama =
                                JSON.parse(localStorage.getItem("keranjang")) || [];

                              const produkBaru = {
                                id: item.id,
                                nama: item.nama,
                                kategori: item.kategori,
                                harga: item.harga,
                                foto: item.foto,
                                jumlah: 1,
                              };

                              const produkSudahAda = keranjangLama.find(
                                (produk) => produk.id === produkBaru.id
                              );

                              const keranjangBaru = produkSudahAda
                                ? keranjangLama.map((produk) =>
                                    produk.id === produkBaru.id
                                      ? { ...produk, jumlah: produk.jumlah + 1 }
                                      : produk
                                  )
                                : [...keranjangLama, produkBaru];

                              localStorage.setItem("keranjang", JSON.stringify(keranjangBaru));
                              window.dispatchEvent(new Event("keranjangChanged"));

                              alert(`${item.nama} berhasil ditambahkan ke keranjang!`);
                            }}
                            className="bg-[#1E120D] text-white px-4 py-2 rounded-lg text-sm hover:bg-[#3A241A]"
                          >
                            + Keranjang
                          </button>
                        </div>
                      </div>
                    </div>
                  )))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
};

export default DetailProduk;