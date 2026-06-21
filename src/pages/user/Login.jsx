import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // <-- PENTING: Tambahkan ini

const Login = ({ setRole }) => {
  const navigate = useNavigate(); // <-- Inisialisasi hook navigasi

  const [formLogin, setFormLogin] = useState({
    email: "",
    password: "",
    ingatSaya: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loadingLogin, setLoadingLogin] = useState(false);
  const [pesan, setPesan] = useState({ tipe: "", teks: "" });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormLogin({
      ...formLogin,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setPesan({ tipe: "", teks: "" });

    const emailBersih = formLogin.email.trim().toLowerCase();
    const passwordBersih = formLogin.password.trim();

    if (!emailBersih || !passwordBersih) {
      setPesan({ tipe: "error", teks: "Username/Email dan password wajib diisi." });
      return;
    }

    setLoadingLogin(true);

    setTimeout(() => {
      if (emailBersih === "admin" && passwordBersih === "123") {
        setRole("admin");
        navigate("/admin"); // <-- Lempar admin ke dashboard
      } else {
        setRole("user");
        navigate("/home"); // <-- Lempar user kembali ke halaman utama Kopi Wae
      }
      setLoadingLogin(false);
    }, 800);
  };

  return (
    <main className="min-h-screen bg-stone-100 flex items-center justify-center px-6 py-10">
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 bg-white rounded-3xl overflow-hidden shadow-xl border border-stone-200">
        
        {/* === Bagian Kiri (Gelap) === */}
        <section className="hidden lg:flex flex-col justify-between bg-stone-900 text-white p-10 relative overflow-hidden">
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-10 cursor-pointer" onClick={() => navigate('/home')}>
              <div className="w-11 h-11 rounded-full bg-amber-600 flex items-center justify-center font-bold text-xl">☕</div>
              <h1 className="text-2xl font-bold tracking-wider">Kopi Wae</h1>
            </div>
            <h2 className="text-4xl font-bold leading-tight mb-5">Masuk dan nikmati kopi favoritmu.</h2>
            <p className="text-stone-300 leading-relaxed">Login untuk melanjutkan belanja, melihat keranjang, dan memesan produk kopi pilihan dari Kopi Wae.</p>
          </div>
          <div className="bg-white/10 rounded-2xl p-6 backdrop-blur-sm relative z-10 border border-white/10">
            <p className="text-sm text-stone-200 mb-3 italic">“Kopi terbaik bukan hanya soal rasa, tapi juga tentang pengalaman yang nyaman dari memilih sampai menikmati.”</p>
            <p className="font-semibold text-amber-500">Kopi Wae Roasters</p>
          </div>
          <div className="absolute -right-20 -bottom-20 w-64 h-64 rounded-full bg-amber-600/20 blur-2xl"></div>
          <div className="absolute right-20 bottom-28 w-32 h-32 rounded-full bg-stone-500/10 blur-xl"></div>
        </section>

        {/* === Bagian Kanan (Form Login) === */}
        <section className="p-8 md:p-12 bg-white relative z-10">
          <div className="lg:hidden flex items-center gap-3 mb-8 cursor-pointer" onClick={() => navigate('/home')}>
            <div className="w-11 h-11 rounded-full bg-stone-900 text-white flex items-center justify-center font-bold text-xl">☕</div>
            <h1 className="text-2xl font-bold text-stone-800 tracking-wider">Kopi Wae</h1>
          </div>

          <div className="mb-8">
            <p className="text-sm text-amber-600 font-bold tracking-wider uppercase mb-2">Welcome Back</p>
            <h2 className="text-3xl font-bold text-stone-800">Login Akun</h2>
            <p className="text-stone-500 mt-2">Masukkan username/email dan password untuk melanjutkan.</p>
          </div>

          {pesan.teks && (
            <div className={`mb-5 rounded-xl p-4 text-sm font-semibold transition-all ${pesan.tipe === "success" ? "bg-green-50 text-green-700 border border-green-200" : "bg-red-50 text-red-600 border border-red-200"}`}>
              {pesan.teks}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block font-semibold text-stone-800 mb-2">Username / Email</label>
              <input type="text" name="email" value={formLogin.email} onChange={handleChange} placeholder="Masukkan email atau ketik 'admin'" className="w-full border border-stone-300 rounded-xl px-4 py-3 outline-none focus:border-amber-600 focus:ring-2 focus:ring-amber-600/20 transition-all" disabled={loadingLogin} />
            </div>

            <div>
              <label className="block font-semibold text-stone-800 mb-2">Password</label>
              <div className="relative">
                <input type={showPassword ? "text" : "password"} name="password" value={formLogin.password} onChange={handleChange} placeholder="Masukkan password" className="w-full border border-stone-300 rounded-xl px-4 py-3 pr-24 outline-none focus:border-amber-600 focus:ring-2 focus:ring-amber-600/20 transition-all" disabled={loadingLogin} />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-amber-600 font-bold hover:text-amber-700" disabled={loadingLogin}>
                  {showPassword ? "Sembunyi" : "Lihat"}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between gap-4 text-sm">
              <label className="flex items-center gap-2 text-stone-600 cursor-pointer">
                <input type="checkbox" name="ingatSaya" checked={formLogin.ingatSaya} onChange={handleChange} className="w-4 h-4 accent-amber-600 cursor-pointer" disabled={loadingLogin} />
                Ingat saya
              </label>
              <button type="button" className="text-amber-600 font-bold hover:underline">Lupa password?</button>
            </div>

            <button type="submit" disabled={loadingLogin} className={`w-full py-3.5 rounded-xl font-bold tracking-wide transition-all ${loadingLogin ? "bg-stone-300 text-stone-500 cursor-not-allowed" : "bg-stone-900 text-white hover:bg-amber-700 shadow-lg hover:shadow-amber-700/30"}`}>
              {loadingLogin ? "Memproses login..." : "Masuk"}
            </button>
          </form>

          <div className="my-7 flex items-center gap-4">
            <hr className="flex-1 border-stone-200" />
            <span className="text-sm text-stone-400 font-medium">atau</span>
            <hr className="flex-1 border-stone-200" />
          </div>

          <button className="w-full border border-stone-300 py-3 rounded-xl font-bold text-stone-700 hover:bg-stone-50 hover:border-stone-400 transition-all flex items-center justify-center gap-2">
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Masuk dengan Google
          </button>

          <p className="text-center text-sm text-stone-500 mt-8">
            Belum punya akun?{" "}
            <button 
              onClick={() => navigate('/register')} 
              className="text-amber-600 font-bold hover:underline"
            >
              Daftar sekarang
            </button>
          </p>
        </section>
      </div>
    </main>
  );
};

export default Login;