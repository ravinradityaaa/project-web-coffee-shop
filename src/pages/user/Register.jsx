import { useState } from 'react';

export default function Register({ onNavigate }) {
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
    /* Mengunci w-full min-h-screen dengan background krem penuh tanpa border hitam */
    <div className="w-full min-h-screen flex items-center justify-center p-6 bg-[#F3F1E3] text-[#1A1A1B] font-sans tracking-tight">
      
      {/* CARD FORM */}
      <div className="w-full max-w-md rounded-[3rem] p-10 md:p-14 bg-white text-[#1A1A1B] shadow-[0_50px_100px_rgba(0,0,0,0.06)] border border-[#1A1A1B]/5">
        
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
            <label className="text-[10px] font-black uppercase tracking-[0.3em] text-[#1A1A1B]/50 mb-2 block">
              Nama Lengkap
            </label>
            <input 
              type="text" 
              required
              placeholder="Jonathan Doe"
              className="w-full bg-transparent border-b-2 border-[#1A1A1B]/15 focus:border-[#A67C52] py-3 outline-none transition-all font-bold placeholder:text-[#1A1A1B]/30 text-[#1A1A1B]"
              onChange={(e) => setFormData({...formData, fullName: e.target.value})}
            />
          </div>

          {/* Input: Username */}
          <div className="group">
            <label className="text-[10px] font-black uppercase tracking-[0.3em] text-[#1A1A1B]/50 mb-2 block">
              Username
            </label>
            <input 
              type="text" 
              required
              placeholder="coffee_lover"
              className="w-full bg-transparent border-b-2 border-[#1A1A1B]/15 focus:border-[#A67C52] py-3 outline-none transition-all font-bold placeholder:text-[#1A1A1B]/30 text-[#1A1A1B]"
              onChange={(e) => setFormData({...formData, username: e.target.value})}
            />
          </div>

          {/* Input: Password */}
          <div className="group">
            <label className="text-[10px] font-black uppercase tracking-[0.3em] text-[#1A1A1B]/50 mb-2 block">
              Password
            </label>
            <input 
              type="password" 
              required
              placeholder="••••••••"
              className="w-full bg-transparent border-b-2 border-[#1A1A1B]/15 focus:border-[#A67C52] py-3 outline-none transition-all font-bold placeholder:text-[#1A1A1B]/30 text-[#1A1A1B]"
              onChange={(e) => setFormData({...formData, password: e.target.value})}
            />
          </div>

          {/* Tombol Daftar */}
          <button 
            type="submit" 
            className="w-full mt-6 py-6 rounded-full font-black text-xs uppercase tracking-[0.2em] bg-[#1A1A1B] text-white hover:bg-[#A67C52] shadow-xl transition-all duration-500 active:scale-95"
          >
            Daftar Sekarang
          </button>
        </form>

        {/* Bottom Navigation */}
        <div className="mt-12 text-center">
          <button 
            type="button" 
            onClick={() => onNavigate('login')} 
            className="text-[10px] font-black uppercase tracking-[0.15em] text-[#1A1A1B]/60 hover:text-[#1A1A1B] transition-colors"
          >
            Sudah Punya Akun? <span className="text-[#A67C52] ml-1 underline decoration-2 underline-offset-4">LOGIN</span>
          </button>
        </div>

      </div>
    </div>
  );
}