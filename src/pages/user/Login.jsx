import { useEffect, useState } from "react";
import axios from "axios";

const Login = () => {
  const [formLogin, setFormLogin] = useState({
    email: "",
    password: "",
    ingatSaya: false,
  });

  const [users, setUsers] = useState([]);
  const [showPassword, setShowPassword] = useState(false);
  const [loadingData, setLoadingData] = useState(true);
  const [loadingLogin, setLoadingLogin] = useState(false);
  const [pesan, setPesan] = useState({
    tipe: "",
    teks: "",
  });

  useEffect(() => {
    const ambilDataUser = async () => {
      try {
        setLoadingData(true);

        const response = await axios.get("/users.json");

        setTimeout(() => {
          setUsers(response.data);
          setLoadingData(false);
        }, 700);
      } catch (error) {
        console.log("Error ambil user:", error);
        setPesan({
          tipe: "error",
          teks: "Gagal mengambil data user.",
        });
        setLoadingData(false);
      }
    };

    ambilDataUser();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormLogin({
      ...formLogin,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setPesan({
      tipe: "",
      teks: "",
    });
    if (!formLogin.email || !formLogin.password) {
      setPesan({
        tipe: "error",
        teks: "Email dan password wajib diisi.",
      });
      return;
    }
    setLoadingLogin(true);
    setTimeout(() => {
      const userDitemukan = users.find(
        (user) =>
          user.email === formLogin.email &&
          user.password === formLogin.password
      );
      if (userDitemukan) {
        const dataLogin = {
          id: userDitemukan.id,
          nama: userDitemukan.nama,
          email: userDitemukan.email,
          role: userDitemukan.role,
          loginAt: new Date().toLocaleString("id-ID"),
        };
        localStorage.setItem("userLogin", JSON.stringify(dataLogin));
        window.dispatchEvent(new Event("userLoginChanged"));
        window.dispatchEvent(new Event("keranjangChanged"));
        setPesan({
          tipe: "success",
          teks: `Login berhasil. Selamat datang, ${userDitemukan.nama}!`,
        });
        setFormLogin({
          email: "",
          password: "",
          ingatSaya: formLogin.ingatSaya,
        });
      } else {
        setPesan({
          tipe: "error",
          teks: "Email atau password salah.",
        });
      }
      setLoadingLogin(false);
    }, 800);
  };

  return (
    <main className="min-h-screen bg-[#F8F3EF] flex items-center justify-center px-6 py-10">
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 bg-white rounded-3xl overflow-hidden shadow-xl border border-[#E7DAD0]">
        {/* Bagian kiri */}
        <section className="hidden lg:flex flex-col justify-between bg-[#1E120D] text-white p-10 relative overflow-hidden">
          <div>
            <div className="flex items-center gap-3 mb-10">
              <div className="w-11 h-11 rounded-full bg-[#C98756] flex items-center justify-center font-bold text-xl">
                C
              </div>
              <h1 className="text-2xl font-bold">Caffe</h1>
            </div>

            <h2 className="text-4xl font-bold leading-tight mb-5">
              Masuk dan nikmati kopi favoritmu.
            </h2>

            <p className="text-[#D8C9BF] leading-relaxed">
              Login untuk melanjutkan belanja, melihat keranjang, dan memesan
              produk kopi pilihan dari Caffe.
            </p>
          </div>

          <div className="bg-white/10 rounded-2xl p-6 backdrop-blur-sm">
            <p className="text-sm text-[#F3E7DD] mb-3">
              “Kopi terbaik bukan hanya soal rasa, tapi juga tentang pengalaman
              yang nyaman dari memilih sampai menikmati.”
            </p>
            <p className="font-semibold">Caffe Coffee Shop</p>
          </div>

          <div className="absolute -right-20 -bottom-20 w-64 h-64 rounded-full bg-[#C98756]/30"></div>
          <div className="absolute right-20 bottom-28 w-24 h-24 rounded-full bg-[#F3E7DD]/10"></div>
        </section>

        {/* Bagian kanan */}
        <section className="p-8 md:p-12">
          <div className="lg:hidden flex items-center gap-3 mb-8">
            <div className="w-11 h-11 rounded-full bg-[#1E120D] text-white flex items-center justify-center font-bold text-xl">
              C
            </div>
            <h1 className="text-2xl font-bold text-[#2B1A12]">Caffe</h1>
          </div>

          <div className="mb-8">
            <p className="text-sm text-[#8B5A36] font-semibold mb-2">
              Welcome Back
            </p>
            <h2 className="text-3xl font-bold text-[#2B1A12]">Login Akun</h2>
            <p className="text-gray-500 mt-2">
              Masukkan email dan password untuk melanjutkan.
            </p>
          </div>

          {loadingData && (
            <div className="mb-5 bg-[#F8F3EF] border border-[#E7DAD0] rounded-xl p-4 flex items-center gap-3">
              <div className="w-6 h-6 border-4 border-[#D8C9BF] border-t-[#8B5A36] rounded-full animate-spin"></div>
              <p className="text-sm text-[#8B5A36] font-semibold">
                Mengambil data user...
              </p>
            </div>
          )}

          {pesan.teks && (
            <div
              className={`mb-5 rounded-xl p-4 text-sm font-semibold ${
                pesan.tipe === "success"
                  ? "bg-green-50 text-green-700 border border-green-200"
                  : "bg-red-50 text-red-600 border border-red-200"
              }`}
            >
              {pesan.teks}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block font-semibold text-[#2B1A12] mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formLogin.email}
                onChange={handleChange}
                placeholder="contoh@email.com"
                className="w-full border border-[#D8C9BF] rounded-xl px-4 py-3 outline-none focus:border-[#8B5A36] focus:ring-2 focus:ring-[#8B5A36]/20"
                disabled={loadingData || loadingLogin}
              />
            </div>

            <div>
              <label className="block font-semibold text-[#2B1A12] mb-2">
                Password
              </label>

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formLogin.password}
                  onChange={handleChange}
                  placeholder="Masukkan password"
                  className="w-full border border-[#D8C9BF] rounded-xl px-4 py-3 pr-24 outline-none focus:border-[#8B5A36] focus:ring-2 focus:ring-[#8B5A36]/20"
                  disabled={loadingData || loadingLogin}
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-[#8B5A36] font-semibold"
                  disabled={loadingData || loadingLogin}
                >
                  {showPassword ? "Sembunyi" : "Lihat"}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between gap-4 text-sm">
              <label className="flex items-center gap-2 text-gray-600">
                <input
                  type="checkbox"
                  name="ingatSaya"
                  checked={formLogin.ingatSaya}
                  onChange={handleChange}
                  className="w-4 h-4 accent-[#8B5A36]"
                  disabled={loadingData || loadingLogin}
                />
                Ingat saya
              </label>

              <button
                type="button"
                className="text-[#8B5A36] font-semibold hover:underline"
              >
                Lupa password?
              </button>
            </div>

            <button
              type="submit"
              disabled={loadingData || loadingLogin}
              className={`w-full py-3 rounded-xl font-semibold transition ${
                loadingData || loadingLogin
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-[#1E120D] text-white hover:bg-[#3A241A]"
              }`}
            >
              {loadingLogin ? "Memproses login..." : "Masuk"}
            </button>
          </form>

          <div className="my-7 flex items-center gap-4">
            <hr className="flex-1 border-[#E7DAD0]" />
            <span className="text-sm text-gray-400">atau</span>
            <hr className="flex-1 border-[#E7DAD0]" />
          </div>

          <button className="w-full border border-[#D8C9BF] py-3 rounded-xl font-semibold text-[#2B1A12] hover:bg-[#F8F3EF] transition">
            Masuk dengan Google
          </button>


          <p className="text-center text-sm text-gray-500 mt-7">
            Belum punya akun?{" "}
            <button className="text-[#8B5A36] font-semibold hover:underline">
              Daftar sekarang
            </button>
          </p>
        </section>
      </div>
    </main>
  );
};

export default Login;