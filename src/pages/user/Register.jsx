import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loadingRegister, setLoadingRegister] = useState(false);
  const [pesan, setPesan] = useState({ tipe: "", teks: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setPesan({ tipe: "", teks: "" });

    const namaBersih = formData.fullName.trim();
    const usernameBersih = formData.username.trim();
    const passwordBersih = formData.password.trim();

    if (!namaBersih || !usernameBersih || !passwordBersih) {
      setPesan({ tipe: "error", teks: "Semua kolom wajib diisi untuk mendaftar." });
      return;
    }

    setLoadingRegister(true);

    // Simulasi loading pendaftaran
    setTimeout(() => {
      console.log("Mendaftar dengan:", formData);
      alert(`Selamat bergabung, ${usernameBersih}! Silakan login.`);
      setLoadingRegister(false);
      
      // Arahkan ke rute /login setelah sukses daftar
      navigate('/login'); 
    }, 800);
  };

  return (
    <main className="min-h-screen bg-stone-100 flex items-center justify-center px-4 py-10 font-sans">
      
      {/* Container Utama (Card di Tengah) */}
      <div className="w-full max-w-md bg-white rounded-[2rem] shadow-xl overflow-hidden border border-stone-200">
        
        {/* --- Header Card Gelap (Aksen Tema Kopi Wae) --- */}
        <div className="bg-stone-900 px-8 py-10 text-center relative overflow-hidden">
          {/* Efek Gradasi Blur di Background Header */}
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-amber-600/20 rounded-full blur-xl"></div>
          <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-stone-500/20 rounded-full blur-xl"></div>
          
          <div className="relative z-10 flex flex-col items-center">
            <div 
              className="w-14 h-14 rounded-full bg-amber-600 text-white flex items-center justify-center font-bold text-2xl mb-4 shadow-lg cursor-pointer hover:scale-105 transition-transform"
              onClick={() => navigate('/home')}
              title="Kembali ke Beranda"
            >
              ☕
            </div>
            <h2 className="text-2xl font-bold text-white tracking-wide">Buat Akun</h2>
            <p className="text-stone-400 mt-2 text-sm leading-relaxed">
              Daftar untuk menyimpan menu favorit dan nikmati layanan dari Kopi Wae.
            </p>
          </div>
        </div>

        {/* --- Bagian Bawah Card (Form Inputs) --- */}
        <div className="p-8">
          {pesan.teks && (
            <div className={`mb-6 rounded-xl p-4 text-sm font-semibold text-center transition-all ${pesan.tipe === "success" ? "bg-green-50 text-green-700 border border-green-200" : "bg-red-50 text-red-600 border border-red-200"}`}>
              {pesan.teks}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5" autoComplete="off">
            <div>
              <label className="block text-sm font-semibold text-stone-800 mb-2">Nama Lengkap</label>
              <input 
                type="text" 
                name="fullName" 
                value={formData.fullName} 
                onChange={handleChange} 
                placeholder="cth: Jonathan Doe" 
                autoComplete="off"
                className="w-full border border-stone-300 rounded-xl px-4 py-3 outline-none focus:border-amber-600 focus:ring-2 focus:ring-amber-600/20 transition-all text-sm" 
                disabled={loadingRegister} 
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-stone-800 mb-2">Username</label>
              <input 
                type="text" 
                name="username" 
                value={formData.username} 
                onChange={handleChange} 
                placeholder="cth: coffeelover" 
                autoComplete="off"
                className="w-full border border-stone-300 rounded-xl px-4 py-3 outline-none focus:border-amber-600 focus:ring-2 focus:ring-amber-600/20 transition-all text-sm" 
                disabled={loadingRegister} 
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-stone-800 mb-2">Password</label>
              <div className="relative">
                <input 
                  type={showPassword ? "text" : "password"} 
                  name="password" 
                  value={formData.password} 
                  onChange={handleChange} 
                  placeholder="Buat password yang kuat" 
                  autoComplete="new-password"
                  className="w-full border border-stone-300 rounded-xl px-4 py-3 pr-20 outline-none focus:border-amber-600 focus:ring-2 focus:ring-amber-600/20 transition-all text-sm" 
                  disabled={loadingRegister} 
                />
                <button 
                  type="button" 
                  onClick={() => setShowPassword(!showPassword)} 
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-amber-600 font-bold hover:text-amber-700" 
                  disabled={loadingRegister}
                >
                  {showPassword ? "Sembunyi" : "Lihat"}
                </button>
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loadingRegister} 
              className={`w-full mt-2 py-3.5 rounded-xl font-bold tracking-wide transition-all text-sm ${loadingRegister ? "bg-stone-300 text-stone-500 cursor-not-allowed" : "bg-stone-900 text-white hover:bg-amber-700 shadow-lg hover:shadow-amber-700/30"}`}
            >
              {loadingRegister ? "Memproses..." : "Daftar Sekarang"}
            </button>
          </form>

          {/* Garis Pemisah */}
          <div className="my-6 flex items-center gap-4">
            <hr className="flex-1 border-stone-200" />
            <span className="text-xs text-stone-400 font-medium">atau</span>
            <hr className="flex-1 border-stone-200" />
          </div>

          {/* Tombol Google */}
          <button className="w-full border border-stone-300 py-3 rounded-xl font-bold text-stone-700 hover:bg-stone-50 hover:border-stone-400 transition-all flex items-center justify-center gap-2 text-sm">
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Daftar dengan Google
          </button>

          {/* Link Login */}
          <p className="text-center text-sm text-stone-500 mt-6">
            Sudah punya akun?{" "}
            <button 
              onClick={() => navigate('/login')} 
              className="text-amber-600 font-bold hover:underline"
            >
              Masuk di sini
            </button>
          </p>
        </div>
      </div>
    </main>
  );
}