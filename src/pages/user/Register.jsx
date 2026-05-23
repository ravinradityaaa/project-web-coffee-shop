import { useState } from 'react';

export default function Register({ isDarkMode, onNavigate }) {
  const [formData, setFormData] = useState({
    fullName: '',
    username: '',
    password: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Mendaftar dengan:", formData);
    alert(`Selamat bergabung, ${formData.username}! Silakan login.`);
    onNavigate('login');
  };

  return (
    /* 1. KONTEN UTAMA: Warna background ini disamakan persis dengan logika Home.jsx
      Menggunakan min-h-screen agar warna krem/gelapnya memenuhi seluruh layar saat diakses.
    */
    <div className={`w-full min-h-screen flex items-center justify-center p-6 transition-colors duration-700 font-sans tracking-tight ${
      isDarkMode ? 'bg-[#1A1A1B] text-white' : 'bg-[#F5F5DC] text-[#1A1A1B]'
    }`}>
      
      {/* 2. CARD WRAPPER: Diberikan sedikit kontras/elevasi agar form terlihat estetik.
        - Pada Mode Terang: menggunakan putih bersih agar kontras di atas bg krem.
        - Pada Mode Gelap: menggunakan bg yang sedikit lebih terang (#212122) mirip Story Section di Home.
      */}
      <div className={`w-full max-w-md rounded-[3rem] p-10 md:p-14 shadow-[0_50px_100px_rgba(0,0,0,0.15)] border border-current/5 transition-all duration-700
        ${isDarkMode 
          ? 'bg-[#212122] text-white' 
          : 'bg-white text-[#1A1A1B]'
        }`}
      >
        
        {/* Header Title */}
        <div className="mb-12">
          <h2 className="text-4xl md:text-5xl font-black tracking-tighter uppercase leading-none">
            BUAT <br />
            <span className="text-[#A67C52]">AKUN</span>
          </h2>
          <div className="h-1.5 w-12 bg-[#A67C52] mt-4 rounded-full"></div>
        </div>

        {/* Form Fields */}
        <form onSubmit={handleSubmit} className="space-y-8">
          
          {/* Input: Nama Lengkap */}
          <div className="group">
            <label className="text-[10px] font-black uppercase tracking-[0.3em] opacity-40 mb-2 block">
              Nama Lengkap
            </label>
            <input 
              type="text" 
              required
              placeholder="Jonathan Doe"
              className={`w-full bg-transparent border-b-2 py-3 outline-none transition-all font-bold placeholder:opacity-20
                ${isDarkMode 
                  ? 'border-white/10 focus:border-[#A67C52] text-white' 
                  : 'border-[#1A1A1B]/10 focus:border-[#A67C52] text-[#1A1A1B]'
                }`}
              onChange={(e) => setFormData({...formData, fullName: e.target.value})}
            />
          </div>

          {/* Input: Username */}
          <div className="group">
            <label className="text-[10px] font-black uppercase tracking-[0.3em] opacity-40 mb-2 block">
              Username
            </label>
            <input 
              type="text" 
              required
              placeholder="coffee_lover"
              className={`w-full bg-transparent border-b-2 py-3 outline-none transition-all font-bold placeholder:opacity-20
                ${isDarkMode 
                  ? 'border-white/10 focus:border-[#A67C52] text-white' 
                  : 'border-[#1A1A1B]/10 focus:border-[#A67C52] text-[#1A1A1B]'
                }`}
              onChange={(e) => setFormData({...formData, username: e.target.value})}
            />
          </div>

          {/* Input: Password */}
          <div className="group">
            <label className="text-[10px] font-black uppercase tracking-[0.3em] opacity-40 mb-2 block">
              Password
            </label>
            <input 
              type="password" 
              required
              placeholder="••••••••"
              className={`w-full bg-transparent border-b-2 py-3 outline-none transition-all font-bold placeholder:opacity-20
                ${isDarkMode 
                  ? 'border-white/10 focus:border-[#A67C52] text-white' 
                  : 'border-[#1A1A1B]/10 focus:border-[#A67C52] text-[#1A1A1B]'
                }`}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
            />
          </div>

          {/* Tombol Daftar Utama */}
          <button 
            type="submit" 
            className={`w-full mt-6 py-6 rounded-full font-black text-xs uppercase tracking-[0.2em] shadow-2xl transition-all duration-500 active:scale-95
              ${isDarkMode 
                ? 'bg-white text-[#1A1A1B] hover:bg-[#A67C52] hover:text-white' 
                : 'bg-[#1A1A1B] text-white hover:bg-[#A67C52]'
              }`}
          >
            Daftar Sekarang
          </button>
        </form>

        {/* Bottom Navigation */}
        <div className="mt-12 text-center">
          <button 
            type="button" 
            onClick={() => onNavigate('login')} 
            className="text-[10px] font-black uppercase tracking-[0.15em] opacity-50 hover:opacity-100 transition-opacity"
          >
            Sudah Punya Akun? <span className="text-[#A67C52] ml-1 underline decoration-2 underline-offset-4">LOGIN</span>
          </button>
        </div>

      </div>
    </div>
  );
}