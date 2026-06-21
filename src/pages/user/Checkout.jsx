import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const navigate = useNavigate();

  // 1. STATE MANAGEMENT
  const [items, setItems] = useState([]);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [showValidationModal, setShowValidationModal] = useState(false);
  const [validationMessage, setValidationMessage] = useState("");
  
  // FIX: Menambahkan state formData yang sebelumnya hilang
  const [formData, setFormData] = useState({
    nama: "",
    telepon: "",
    alamat: "",
    pembayaran: "QRIS", // Default pembayaran
  });

  // 2. LIFECYCLE (LOAD DATA)
  useEffect(() => {
    window.scrollTo(0, 0);

    const keranjang = JSON.parse(localStorage.getItem("keranjang")) || [];
    setItems(keranjang);

    const profile = JSON.parse(localStorage.getItem("userProfile")) || {};
    setFormData((prev) => ({
      ...prev,
      nama: profile.name || "",
      telepon: profile.phone || "",
      alamat: profile.address || "",
    }));
  }, []);

  // 3. HELPER FUNCTIONS & COMPUTED PROPERTIES
  const formatRupiah = (angka) => angka.toLocaleString("id-ID");

  const subtotal = items.reduce(
    (total, item) => total + item.harga * item.jumlah,
    0
  );

  const ongkir = items.length > 0 ? 10000 : 0;
  const diskon = subtotal >= 100000 ? 10000 : 0;
  const total = subtotal + ongkir - diskon;

  // 4. HANDLERS
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const pilihMetode = (metode) => {
    setFormData({
      ...formData,
      pembayaran: metode,
    });
  };

  const handleCheckout = () => {
    if (!formData.nama.trim()) {
      setValidationMessage("Nama penerima wajib diisi.");
      setShowValidationModal(true);
      return;
    }

    if (!formData.telepon.trim()) {
      setValidationMessage("Nomor telepon wajib diisi.");
      setShowValidationModal(true);
      return;
    }

    if (!formData.alamat.trim()) {
      setValidationMessage("Alamat pengiriman wajib diisi.");
      setShowValidationModal(true);
      return;
    }

    setShowPaymentModal(true);
  };

  const verifyPayment = () => {
    setIsVerifying(true);

    setTimeout(() => {
      const history = JSON.parse(localStorage.getItem("history")) || [];
      const invoice = "INV-" + Date.now().toString().slice(-8);

      const orderBaru = {
        id: invoice,
        date: new Date().toLocaleDateString("id-ID"),
        total,
        status: "Processing",
        image: items[0]?.foto || "",
        product: items[0]?.nama || "Produk Kopi",
        items,
        customer: formData,
      };

      history.unshift(orderBaru);
      localStorage.setItem("history", JSON.stringify(history));
      localStorage.removeItem("keranjang");

      // Memicu event custom agar navbar/keranjang di page lain terupdate
      window.dispatchEvent(new Event("keranjangChanged"));

      setIsVerifying(false);
      setShowPaymentModal(false);
      setShowSuccessModal(true);
    }, 2000);
  };

  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-6 py-10">

        {/* HEADER */}
        <section className="mb-16">
          <p className="text-[11px] uppercase tracking-[0.4em] font-black text-amber-700 mb-4">
            Premium Checkout Experience
          </p>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-none">
            COMPLETE <span className="text-amber-700">ORDER</span>
          </h1>
          <p className="text-stone-500 mt-5 max-w-xl text-lg">
            Lengkapi data pengiriman dan nikmati kopi favoritmu dengan pengalaman terbaik.
          </p>
        </section>

        {/* PROGRESS BAR */}
        <section className="mb-16">
          <div className="flex items-center justify-center gap-3 md:gap-6 text-xs md:text-sm font-black uppercase tracking-widest">
            <div className="text-green-600">Cart</div>
            <div className="w-12 md:w-20 h-[2px] bg-green-600" />
            <div className="text-amber-700">Checkout</div>
            <div className="w-12 md:w-20 h-[2px] bg-stone-300" />
            <div className="text-stone-400">Payment</div>
            <div className="w-12 md:w-20 h-[2px] bg-stone-300" />
            <div className="text-stone-400">Done</div>
          </div>
        </section>

        <div className="grid lg:grid-cols-[1.7fr_1fr] gap-10">
          
          {/* LEFT SIDE FORM */}
          <div className="space-y-8">
            
            {/* DELIVERY INFO */}
            <section className="bg-stone-50 rounded-[3rem] p-8 border border-stone-100">
              <div className="mb-8">
                <p className="text-[11px] uppercase tracking-[0.3em] font-black text-amber-700 mb-3">
                  Delivery Information
                </p>
                <h2 className="text-3xl font-black tracking-tight">Alamat Pengiriman</h2>
              </div>

              <div className="space-y-5">
                <div>
                  <label className="block text-xs font-black uppercase tracking-widest text-stone-500 mb-3">
                    Nama Penerima
                  </label>
                  <input
                    type="text"
                    name="nama"
                    value={formData.nama}
                    onChange={handleChange}
                    className="w-full rounded-2xl bg-white border border-stone-200 px-5 py-4 outline-none focus:border-amber-600 transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-black uppercase tracking-widest text-stone-500 mb-3">
                    Nomor Telepon
                  </label>
                  <input
                    type="text"
                    name="telepon"
                    value={formData.telepon}
                    onChange={handleChange}
                    className="w-full rounded-2xl bg-white border border-stone-200 px-5 py-4 outline-none focus:border-amber-600 transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-black uppercase tracking-widest text-stone-500 mb-3">
                    Alamat Lengkap
                  </label>
                  <textarea
                    rows="5"
                    name="alamat"
                    value={formData.alamat}
                    onChange={handleChange}
                    className="w-full rounded-2xl bg-white border border-stone-200 px-5 py-4 resize-none outline-none focus:border-amber-600 transition"
                  />
                </div>
              </div>
            </section>

            {/* PAYMENT METHOD */}
            <section className="bg-stone-50 rounded-[3rem] p-8 border border-stone-100">
              <div className="mb-8">
                <p className="text-[11px] uppercase tracking-[0.3em] font-black text-amber-700 mb-3">
                  Payment Method
                </p>
                <h2 className="text-3xl font-black tracking-tight">Pilih Pembayaran</h2>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                {["QRIS", "Transfer Bank", "E-Wallet", "Cash On Delivery"].map((metode) => (
                  <button
                    key={metode}
                    type="button"
                    onClick={() => pilihMetode(metode)}
                    className={`rounded-[2rem] p-5 text-left border-2 transition-all duration-300 ${
                      formData.pembayaran === metode
                        ? "bg-stone-900 text-white border-stone-900"
                        : "bg-white border-stone-200 hover:border-amber-600"
                    }`}
                  >
                    <p className="font-black tracking-wide">{metode}</p>
                    <p className={`text-sm mt-2 ${formData.pembayaran === metode ? "text-stone-300" : "text-stone-500"}`}>
                      Metode pembayaran aman dan terpercaya.
                    </p>
                  </button>
                ))}
              </div>
            </section>

            {/* ORDER ITEMS */}
            <section className="bg-stone-50 rounded-[3rem] p-8 border border-stone-100">
              <div className="mb-8">
                <p className="text-[11px] uppercase tracking-[0.3em] font-black text-amber-700 mb-3">
                  Your Order
                </p>
                <h2 className="text-3xl font-black tracking-tight">Produk Dipesan</h2>
              </div>

              {items.length === 0 ? (
                <div className="text-center py-16">
                  <div className="text-7xl mb-5">☕</div>
                  <h3 className="text-2xl font-black">Keranjang Kosong</h3>
                  <p className="text-stone-500 mt-3">Tambahkan produk terlebih dahulu.</p>
                </div>
              ) : (
                <div className="space-y-5">
                  {items.map((item) => (
                    <div key={item.id} className="bg-white rounded-[2rem] p-5 flex flex-col md:flex-row gap-5 items-center hover:shadow-lg transition-all duration-500">
                      <img
                        src={item.foto}
                        alt={item.nama}
                        className="w-full md:w-28 h-44 md:h-28 object-cover rounded-[1.5rem]"
                      />
                      <div className="flex-1 text-center md:text-left">
                        <p className="text-[10px] uppercase tracking-[0.3em] font-black text-amber-700 mb-2">
                          {item.kategori}
                        </p>
                        <h3 className="text-xl font-black">{item.nama}</h3>
                        <p className="text-stone-500 mt-2">Qty : {item.jumlah}</p>
                      </div>
                      <div>
                        <h3 className="text-xl font-black text-amber-700">
                          Rp {formatRupiah(item.harga * item.jumlah)}
                        </h3>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>
          </div>

          {/* RIGHT SIDE SUMMARY */}
          <div>
            <div className="sticky top-28 bg-stone-900 text-white rounded-[3rem] p-8 shadow-2xl">
              <p className="text-[11px] uppercase tracking-[0.4em] font-black text-amber-500 mb-3">
                Order Summary
              </p>
              <h2 className="text-3xl font-black tracking-tight mb-8">
                Ringkasan <span className="text-amber-500">Pembayaran</span>
              </h2>

              <div className="space-y-5">
                <div className="flex justify-between items-center">
                  <span className="text-stone-400">Subtotal</span>
                  <span className="font-bold">Rp {formatRupiah(subtotal)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-stone-400">Ongkir</span>
                  <span className="font-bold">Rp {formatRupiah(ongkir)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-stone-400">Diskon</span>
                  <span className="font-bold text-green-400">- Rp {formatRupiah(diskon)}</span>
                </div>
                <hr className="border-stone-700" />
                <div className="flex justify-between items-center">
                  <span className="text-lg font-black">Total Bayar</span>
                  <span className="text-3xl font-black text-amber-500">Rp {formatRupiah(total)}</span>
                </div>
              </div>

              <div className="mt-10 bg-stone-800 rounded-[2rem] p-5">
                <p className="text-[10px] uppercase tracking-[0.3em] text-amber-500 font-black mb-2">
                  Payment Method
                </p>
                <p className="font-bold">{formData.pembayaran}</p>
              </div>

              <button
                type="button"
                onClick={handleCheckout}
                disabled={items.length === 0}
                className="w-full mt-8 bg-amber-600 hover:bg-amber-500 disabled:bg-stone-700 disabled:cursor-not-allowed h-14 rounded-2xl font-black uppercase tracking-widest transition-all duration-300 shadow-lg shadow-amber-600/20"
              >
                Complete Payment
              </button>

              <button
                type="button"
                onClick={() => navigate("/home/keranjang")}
                className="w-full mt-3 border border-stone-700 hover:border-amber-500 hover:text-amber-500 h-14 rounded-2xl font-black uppercase tracking-widest transition-all duration-300"
              >
                Back To Cart
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* MODAL VALIDASI */}
      {showValidationModal && (
        <div className="fixed inset-0 z-[999] bg-black/60 backdrop-blur-sm flex items-center justify-center p-5">
          <div className="bg-white rounded-[2rem] p-8 max-w-md w-full text-center">
            <div className="text-6xl mb-4">⚠️</div>
            <h2 className="text-2xl font-black mb-3">Data Belum Lengkap</h2>
            <p className="text-stone-500 mb-8">{validationMessage}</p>
            <button
              type="button"
              onClick={() => setShowValidationModal(false)}
              className="w-full h-14 rounded-2xl bg-stone-900 text-white font-black"
            >
              OK
            </button>
          </div>
        </div>
      )}

      {/* MODAL PAYMENT */}
      {showPaymentModal && (
        <div className="fixed inset-0 z-[999] bg-black/60 backdrop-blur-sm flex items-center justify-center p-5">
          <div className="bg-white rounded-[2rem] p-8 max-w-md w-full">
            <h2 className="text-3xl font-black mb-6">{formData.pembayaran}</h2>

            {formData.pembayaran === "QRIS" && (
              <div className="text-center">
                <img
                  src="https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=KopiWae"
                  alt="QRIS"
                  className="mx-auto rounded-2xl"
                />
                <p className="mt-4 text-stone-500">Scan QRIS untuk membayar</p>
              </div>
            )}

            {formData.pembayaran === "Transfer Bank" && (
              <div className="bg-stone-50 rounded-2xl p-5">
                <p className="font-black">Bank BCA</p>
                <p className="text-2xl font-black text-amber-700 mt-2">1234567890</p>
                <p className="text-stone-500 mt-2">a.n. Kopi Wae Indonesia</p>
              </div>
            )}

            {formData.pembayaran === "E-Wallet" && (
              <div className="bg-stone-50 rounded-2xl p-5">
                <p className="font-black">Nomor E-Wallet</p>
                <p className="text-2xl font-black text-amber-700 mt-2">081234567890</p>
              </div>
            )}

            {formData.pembayaran === "Cash On Delivery" && (
              <div className="bg-stone-50 rounded-2xl p-5">
                <p className="text-stone-600">Pembayaran dilakukan saat pesanan diterima.</p>
              </div>
            )}

            <button
              type="button"
              onClick={verifyPayment}
              disabled={isVerifying}
              className="w-full mt-8 bg-amber-600 hover:bg-amber-700 text-white h-14 rounded-2xl font-black disabled:bg-stone-400"
            >
              {isVerifying ? "Memverifikasi..." : "Cek Verifikasi Pembayaran"}
            </button>
          </div>
        </div>
      )}

      {/* MODAL SUKSES */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-[999] bg-black/60 backdrop-blur-sm flex items-center justify-center p-5">
          <div className="bg-white rounded-[2rem] p-10 max-w-md w-full text-center">
            <div className="text-7xl mb-4">🎉</div>
            <h2 className="text-3xl font-black mb-4">Pembayaran Berhasil</h2>
            <p className="text-stone-500 mb-8">
              Selamat, pesanan anda telah berhasil dibuat dan sedang diproses.
            </p>
            <button
              type="button"
              onClick={() => {
                setShowSuccessModal(false);
                navigate("/home/history");
              }}
              className="w-full h-14 rounded-2xl bg-stone-900 hover:bg-amber-700 text-white font-black"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </main>
  );
};

export default Checkout;