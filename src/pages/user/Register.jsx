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
    onNavigate('login'); // Pindah ke login setelah sukses
  };

  return (
    <div className="w-full max-w-md mx-auto p-4">
      <div className={`rounded-3xl p-10 md:p-12 shadow-2xl transition-all duration-500 
        ${isDarkMode ? 'bg-[#1A1A1B] text-white border border-white/5' : 'bg-white text-[#1A1A1B]'}`}>
        
        <div className="mb-12">
          <h2 className="text-4xl font-black tracking-tighter uppercase leading-tight">
            BUAT <br />
            <span className="text-[#A67C52]">AKUN</span>
          </h2>
          <div className="h-1 w-10 bg-[#A67C52] mt-4"></div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="group">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40 mb-2 block">Nama Lengkap</label>
            <input 
              type="text" 
              required
              placeholder="Jonathan Doe"
              className={`w-full bg-transparent border-b-2 py-3 outline-none transition-all font-bold placeholder:opacity-10
                ${isDarkMode ? 'border-white/10 focus:border-[#A67C52]' : 'border-black/10 focus:border-[#A67C52]'}`}
              onChange={(e) => setFormData({...formData, fullName: e.target.value})}
            />
          </div>

          <div className="group">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40 mb-2 block">Username</label>
            <input 
              type="text" 
              required
              placeholder="coffee_lover"
              className={`w-full bg-transparent border-b-2 py-3 outline-none transition-all font-bold placeholder:opacity-10
                ${isDarkMode ? 'border-white/10 focus:border-[#A67C52]' : 'border-black/10 focus:border-[#A67C52]'}`}
              onChange={(e) => setFormData({...formData, username: e.target.value})}
            />
          </div>

          <div className="group">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40 mb-2 block">Password</label>
            <input 
              type="password" 
              required
              placeholder="••••••••"
              className={`w-full bg-transparent border-b-2 py-3 outline-none transition-all font-bold placeholder:opacity-10
                ${isDarkMode ? 'border-white/10 focus:border-[#A67C52]' : 'border-black/10 focus:border-[#A67C52]'}`}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
            />
          </div>

          <button type="submit" className="w-full mt-6 py-5 rounded-xl font-black bg-[#1A1A1B] text-white hover:bg-[#A67C52] transition-all duration-300 uppercase tracking-widest text-xs shadow-lg">
            Daftar Sekarang
          </button>
        </form>

        <div className="mt-10 text-center">
          <button type="button" onClick={() => onNavigate('login')} className="text-[10px] font-bold uppercase tracking-[0.1em] opacity-40 hover:opacity-100 transition-opacity">
            Sudah Punya Akun? <span className="text-[#A67C52] font-black ml-1">LOGIN</span>
          </button>
        </div>
      </div>
    </div>
  );
}