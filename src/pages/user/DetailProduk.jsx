import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom"; // Tambahkan useLocation

const DetailProduk = () => {
  const [jumlah, setJumlah] = useState(1);
  const [produkAktif, setProdukAktif] = useState(null);
  const [error, setError] = useState("");
  
  const navigate = useNavigate();
  const location = useLocation(); // Hook untuk menangkap data lemparan

  // Mengambil data produk yang dilempar dari ListProduk
  useEffect(() => {
    window.scrollTo(0, 0); // Selalu scroll ke atas saat halaman dibuka

    // Mengecek apakah ada data ('state') yang dibawa saat navigasi
    if (location.state && location.state.productData) {
      const dataDariList = location.state.productData;
      
      // Memformat ulang data dari ListProduk agar sesuai dengan struktur DetailProduk
      setProdukAktif({
        id: dataDariList.id,
        nama: dataDariList.name,
        kategori: dataDariList.cat,
        harga: dataDariList.price,
        hargaLama: dataDariList.price + 5000, // Simulasi diskon Rp 5.000
        foto: dataDariList.img,
        stok: dataDariList.stock ? 50 : 0, // Simulasi stok (50 kalau true, 0 kalau false)
        rating: (Math.random() * (5.0 - 4.5) + 4.5).toFixed(1), // Rating acak 4.5 - 5.0
        review: Math.floor(Math.random() * 200) + 50, // Review acak 50 - 250
        terjual: Math.floor(Math.random() * 1000) + 100, // Terjual acak
        deskripsiSingkat: `Nikmati kelezatan sejati dari ${dataDariList.name}, diracik khusus untuk memberikan pengalaman rasa terbaik di setiap tegukannya.`,
        deskripsiLengkap: `Produk ${dataDariList.name} ini merupakan salah satu menu andalan kami di Kopi Wae. Dibuat menggunakan bahan-bahan berkualitas premium dan diproses oleh barista berpengalaman untuk memastikan standar rasa yang konsisten. Sangat cocok dinikmati saat bersantai atau sebagai teman kerja Anda.`,
        keunggulan: [
          "Dibuat dari bahan premium berkualitas tinggi",
          "Diracik oleh barista berpengalaman",
          "Rasa konsisten dan autentik",
          "Cocok untuk menemani aktivitas harian"
        ]
      });
      setError("");
    } else {
      // Jika user langsung mengetik URL /home/detail tanpa nge-klik card
      setError("Silakan pilih produk dari halaman Menu terlebih dahulu.");
    }
  }, [location]);

  const formatRupiah = (angka) => {
    return angka.toLocaleString("id-ID");
  };

  const kurangJumlah = () => {
    if (jumlah > 1) setJumlah(jumlah - 1);
  };

  const tambahJumlah = () => {
    if (jumlah < produkAktif.stok) {
      setJumlah(jumlah + 1);
    } else {
      alert("Jumlah tidak boleh melebihi stok yang tersedia.");
    }
  };

  const tambahKeKeranjang = () => {
    if (produkAktif.stok <= 0) {
      alert("Maaf, stok produk sedang habis.");
      return;
    }

    const produkBaru = {
      id: produkAktif.id,
      nama: produkAktif.nama,
      kategori: produkAktif.kategori,
      harga: produkAktif.harga,
      foto: produkAktif.foto,
      stok: produkAktif.stok,
      jumlah: jumlah,
    };

    const keranjangLama = JSON.parse(localStorage.getItem("keranjang")) || [];
    const produkSudahAda = keranjangLama.find((item) => item.id === produkBaru.id);
    let keranjangBaru;

    if (produkSudahAda) {
      keranjangBaru = keranjangLama.map((item) => {
        if (item.id === produkBaru.id) {
          const jumlahBaru = item.jumlah + jumlah;
          if (jumlahBaru > produkAktif.stok) {
            alert("Jumlah di keranjang melebihi batas stok.");
            return item;
          }
          return { ...item, jumlah: jumlahBaru };
        }
        return item;
      });
    } else {
      keranjangBaru = [...keranjangLama, produkBaru];
    }

    localStorage.setItem("keranjang", JSON.stringify(keranjangBaru));
    window.dispatchEvent(new Event("keranjangChanged"));

    alert(`${produkAktif.nama} (${jumlah}x) berhasil ditambahkan ke keranjang!`);
  };

  const beliSekarang = () => {
    if (produkAktif.stok <= 0) {
      alert("Maaf, stok produk sedang habis.");
      return;
    }
    const totalHarga = produkAktif.harga * jumlah;
    alert(`Checkout Instan Berhasil!\n\nProduk: ${produkAktif.nama}\nJumlah: ${jumlah}\nTotal Bayar: Rp ${formatRupiah(totalHarga)}\n\nPesanan Anda segera diproses.`);
    setJumlah(1);
  };

  // --- RENDER ERROR STATE ---
  if (error) {
    return (
      <main className="min-h-screen bg-stone-50 flex flex-col items-center justify-center p-6">
        <div className="text-center bg-white p-10 rounded-3xl shadow-xl max-w-md w-full border border-stone-200">
          <p className="text-6xl mb-4">☕</p>
          <h2 className="text-xl font-bold text-stone-800 mb-2">Oops, Kosong!</h2>
          <p className="text-stone-500 mb-8">{error}</p>
          <button 
            onClick={() => navigate('/home/produk')}
            className="w-full bg-amber-700 text-white py-3 rounded-xl font-bold hover:bg-amber-800 transition"
          >
            Kembali ke Daftar Menu
          </button>
        </div>
      </main>
    );
  }

  // --- RENDER LOADING STATE (Menunggu produkAktif terisi) ---
  if (!produkAktif) {
    return (
      <main className="min-h-screen bg-stone-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 rounded-full border-4 border-amber-200 border-t-amber-700 animate-spin mx-auto mb-4"></div>
          <p className="font-bold text-amber-900 tracking-widest uppercase text-sm">Menyiapkan Produk...</p>
        </div>
      </main>
    );
  }

  // --- RENDER HALAMAN UTAMA ---
  return (
    <main className="min-h-screen bg-white text-stone-800">
      <div className="max-w-7xl mx-auto px-6 py-10">
        
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-3 text-xs font-bold tracking-widest uppercase text-stone-400 mb-8">
          <button onClick={() => navigate('/home')} className="hover:text-amber-600 transition">Beranda</button>
          <span>/</span>
          <button onClick={() => navigate('/home/produk')} className="hover:text-amber-600 transition">Menu</button>
          <span>/</span>
          <span className="text-amber-700">{produkAktif.kategori}</span>
        </div>

        {/* Layout Grid Detail Produk */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          
          {/* Kolom Kiri: Gambar Produk */}
          <div className="relative h-[400px] md:h-[500px] rounded-[3rem] overflow-hidden bg-stone-100 shadow-inner group">
            <span className="absolute top-6 left-6 z-10 bg-red-500 text-white text-xs font-black px-4 py-2 rounded-full tracking-widest uppercase shadow-lg">
              Hot Promo
            </span>
            <img
              src={produkAktif.foto}
              alt={produkAktif.nama}
              className={`w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105 ${produkAktif.stok <= 0 ? 'grayscale' : ''}`}
              onError={(e) => { e.currentTarget.src = "https://images.unsplash.com/photo-1534706936160-d5ee67737249?q=80&w=400&auto=format&fit=crop"; }}
            />
          </div>

          {/* Kolom Kanan: Informasi Produk */}
          <div className="flex flex-col justify-center">
            <span className="inline-block bg-amber-100 text-amber-800 text-[10px] font-black px-4 py-1.5 rounded-full mb-4 w-max uppercase tracking-widest">
              {produkAktif.kategori}
            </span>

            <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tighter leading-tight">
              {produkAktif.nama}
            </h1>
              
            <div className="flex flex-wrap items-center gap-3 text-sm font-semibold text-stone-500 mb-6">
              <span className="text-amber-500 text-lg tracking-widest">★★★★★</span>
              <span>{produkAktif.rating}</span>
              <span>({produkAktif.review} ulasan)</span>
              <span className="text-stone-300">|</span>
              <span>Terjual {produkAktif.terjual}+</span>
            </div>

            <div className="flex items-end gap-4 mb-6">
              <h2 className="text-4xl font-black text-amber-700">
                Rp {formatRupiah(produkAktif.harga)}
              </h2>
              <span className="text-lg text-stone-400 line-through font-bold mb-1">
                Rp {formatRupiah(produkAktif.hargaLama)}
              </span>
            </div>

            <p className="text-stone-600 leading-relaxed mb-8 text-lg">
              {produkAktif.deskripsiSingkat}
            </p>

            <hr className="border-stone-200 mb-8" />

            <div className="space-y-3 text-sm font-medium mb-8">
              <div className="flex items-center">
                <span className="w-32 text-stone-400 uppercase tracking-widest text-[11px] font-black">Status Stok</span>
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${produkAktif.stok > 0 ? "bg-green-100 text-green-700" : "bg-red-100 text-red-600"}`}>
                  {produkAktif.stok > 0 ? `${produkAktif.stok} Porsi Tersedia` : "Habis Terjual"}
                </span>
              </div>
            </div>

            {/* Area Aksi: Kuantitas & Tombol Beli */}
            <div className="flex flex-col sm:flex-row gap-4 mt-auto">
              {/* Counter Jumlah */}
              <div className="flex items-center border-2 border-stone-200 rounded-2xl overflow-hidden h-14 w-full sm:w-auto">
                <button onClick={kurangJumlah} className="w-14 h-full text-2xl hover:bg-stone-100 transition text-stone-500 font-medium">-</button>
                <span className="w-16 text-center font-bold text-lg">{jumlah}</span>
                <button onClick={tambahJumlah} className="w-14 h-full text-2xl hover:bg-stone-100 transition text-stone-500 font-medium">+</button>
              </div>

              {/* Tombol Aksi */}
              <button 
                onClick={tambahKeKeranjang}
                disabled={produkAktif.stok <= 0}
                className="flex-1 bg-stone-900 text-white h-14 rounded-2xl font-bold tracking-wider hover:bg-amber-700 transition shadow-lg disabled:bg-stone-300 disabled:cursor-not-allowed"
              >
                + KERANJANG
              </button>
              
              <button 
                onClick={beliSekarang}
                disabled={produkAktif.stok <= 0}
                className="flex-1 bg-amber-600 text-white h-14 rounded-2xl font-bold tracking-wider hover:bg-amber-700 transition shadow-lg shadow-amber-600/30 disabled:hidden"
              >
                BELI LANGSUNG
              </button>
            </div>
          </div>
        </section>

        {/* Section Bawah: Deskripsi Lengkap */}
        <section className="bg-stone-50 rounded-[3rem] p-8 md:p-12 border border-stone-100">
          <h3 className="text-2xl font-black mb-6 tracking-tight">Detail Informasi</h3>
          <p className="text-stone-600 leading-relaxed mb-6 text-lg">
            {produkAktif.deskripsiLengkap}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {produkAktif.keunggulan.map((item, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center text-xs font-black">✓</div>
                <span className="text-stone-700 font-medium">{item}</span>
              </div>
            ))}
          </div>
        </section>

      </div>
    </main>
  );
};

export default DetailProduk;